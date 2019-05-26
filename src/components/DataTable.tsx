import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import styled, { css } from 'styled-components'
import {
  TableProp,
  TableState,
  ScrollerProp,
  TrProp,
  StyledThProp,
  ThProp,
  StyledTdProp,
  TdProp,
} from './DataTable.d';

/**
 * Wrapper
 */
const Wrapper = styled.div`
  position: relative;
  /* Fit child width */
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
`

/**
 * Scroller
 */
const Scroller: any = styled.div<ScrollerProp>`
  overflow-x: auto;
  overflow-y: visible;
  max-width: 100%;
  float: left;
  width: auto;
  ${({ maxHeight }) => maxHeight && css`
    max-height: ${maxHeight}px;
  `}
`

Scroller.propTypes = {
  maxHeight: PropTypes.number,
}

/**
 * Table
 */
const StyledTable = styled.table`
  border-collapse: collapse;
  /* clear agent styles */
  & * {
    margin: 0px;
    padding: 0px;
  }
`

/**
 * THead
 */
const THead = styled.thead`
`

/**
 * TBody
 */
const TBody = styled.tbody`
`

/**
 * Tr
 */
const Tr: any = styled.tr<TrProp>`
  overflow: hidden;
  z-index: 999;
  ${({ width }) => width && css`
    width: ${width}px;
  `}
  ${props => {
    if (props.globalSticky) {
      return css`
        position: fixed;
        top: 0px;
      `
    }
    if (props.localSticky) {
      return css`
        position: absolute;
        top: 0px;
      `
    }
    return ''
  }}
  ${({ bottomShadow }) => bottomShadow && css`
    box-shadow: 0 15px 15px -15px rgba(0, 0, 0, 1);
  `}
`

Tr.propTypes = {
  width: PropTypes.number,
  globalSticky: PropTypes.bool,
  localSticky: PropTypes.bool,
  bottomShadow: PropTypes.bool,
};

Tr.defaultProps = {
  globalSticky: false,
  localSticky: false,
  bottomShadow: false,
};

/**
 * StyledTh
 */
const StyledTh: any = styled.th<StyledThProp>`
  text-align: left;
  white-space: nowrap;
  ${({ cellWidth }) => css`
    min-width: ${cellWidth}px;
  `}
  height: ${(props) => props.height}px;
  line-height: ${(props) => props.height}px;
  ${({ freezeLeftOffset }) => typeof freezeLeftOffset === 'number' && css`
    position: sticky;
    left: ${freezeLeftOffset}px;
  `}
`

StyledTh.propTypes = {
  cellWidth: PropTypes.number.isRequired,
  height: PropTypes.number,
}

/**
 * Th
 */
const Th: React.SFC<ThProp> = (props, { headerRowHeight }) => (
  <StyledTh height={headerRowHeight} {...props}  />
)

Th.contextTypes = {
  headerRowHeight: PropTypes.number,
};

/**
 * StyledTd
 */
const StyledTd: any = styled.td<StyledTdProp>`
  text-align: left;
  white-space: nowrap;
  ${({ cellWidth }) => css`
    min-width: ${cellWidth}px;
  `}
  height: ${props => props.height}px;
  line-height: ${props => props.height}px;
  ${({ freezeLeftOffset }) => typeof freezeLeftOffset === 'number' && css`
    position: sticky;
    left: ${freezeLeftOffset}px;
  `}
`

StyledTd.propTypes = {
  height: PropTypes.number,
}

/**
 * Td
 */
const Td: React.SFC<TdProp> = (props, { rowHeight }) => (
  <StyledTd height={rowHeight} {...props}  />
)

Td.contextTypes = {
  rowHeight: PropTypes.number.isRequired,
};

/**
 * Shadow Td
 */
const ShadowedTd = styled(StyledTd).attrs({
  cellWidth: 15,
})`
  z-index: 99999;
  box-shadow: inset 15px 0 15px -15px rgba(0, 0, 0, 1);
  position: absolute;
`

/**
 * ClearFloat
 */
const ClearFloat = styled.div`
  clear: both;
`

/**
 * DataTable
 */
class DataTable<Entry> extends Component<TableProp<Entry>, TableState> {
  /**
   * Exposed Components
   */
  static THead = THead
  static TBody = TBody
  static Tr = Tr
  static Th = Th
  static Td = Td

  static propTypes = {
    data: PropTypes.array.isRequired,
    headerRowHeight: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    columnCount: PropTypes.number,
    maxHeight: PropTypes.number,
    throttleWait: PropTypes.number,
    preRenderRowCount: PropTypes.number,
    globalStickyHeader: PropTypes.bool,
    localStickyHeader: PropTypes.bool,
    enableStickyHeaderShadow: PropTypes.bool,
    enableFreezeColumnShadow: PropTypes.bool,
    freezeColumnShadowLeftOffset: PropTypes.number,
    renderHeader: PropTypes.func,
    renderRow: PropTypes.func,
  }

  static childContextTypes = {
    headerRowHeight: PropTypes.number,
    rowHeight: PropTypes.number,
  }

  static defaultProps = {
    maxHeight: -1,
    throttleWait: 16,
    preRenderRowCount: 0,
    globalStickyHeader: false,
    localStickyHeader: false,
    enableStickyHeaderShadow: true,
    enableFreezeColumnShadow: true,
    freezeColumnShadowLeftOffset: null,
    renderHeader: () => {},
    renderRow: () => {},
  }

  private scroller: React.RefObject<HTMLDivElement>
  private styledTable: React.RefObject<HTMLTableElement>
  private tHeadTr: React.RefObject<HTMLElement>
  private throttledHandleWindowResize: () => void
  private throttledHandleWindowScroll: () => void
  private throttledHandleScrollerScroll: () => void

  constructor(props: TableProp<Entry>) {
    super(props)
    this.scroller = React.createRef()
    this.styledTable = React.createRef()
    this.tHeadTr = React.createRef()
    this.state = {
      scrollerClientWidth: 0,
      scrollerHeight: 0,
      scrollerScrollLeft: 0,
      renderFromIndex: 0,
      renderToIndex: 0,
      isGlobalHeaderSticky: false,
      isLocalHeaderSticky: false,
    }
  }

  getChildContext() {
    const { headerRowHeight, rowHeight } = this.props
    return {
      headerRowHeight,
      rowHeight,
    }
  }

  componentDidMount() {
    this.addListeners()
    this.handleWindowResize()
  }

  componentDidUpdate(prevProps: TableProp<Entry>, prevState: TableState) {
    const { columnCount, globalStickyHeader, maxHeight, throttleWait } = this.props
    const { isGlobalHeaderSticky } = this.state
    const prevColumnCount = prevProps.columnCount
    const prevMaxHeight = prevProps.maxHeight
    const prevThrottleWait = prevProps.throttleWait
    const prevIsHeaderSticky = prevState.isGlobalHeaderSticky

    if (columnCount !== prevColumnCount) {
      this.handleWindowResize()
    }
    if (
      globalStickyHeader &&
      isGlobalHeaderSticky !== prevIsHeaderSticky &&
      isGlobalHeaderSticky === true
    ) {
      this.syncStickyHeaderScrollLeft()
    }
    if (
      maxHeight !== prevMaxHeight ||
      throttleWait !== prevThrottleWait
    ) {
      this.removeListeners()
      this.addListeners()
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  isAutoHeight = (props?: TableProp<Entry>) => {
    const { maxHeight } = (props || this.props)
    return maxHeight < 0
  }

  addListeners = () => {
    if (!this.scroller.current) {
      return
    }
    const { throttleWait } = this.props
    this.throttledHandleWindowResize = throttle(this.handleWindowResize, throttleWait)
    this.throttledHandleWindowScroll = throttle(this.handleWindowScroll, throttleWait)
    this.throttledHandleScrollerScroll = throttle(this.handleScrollerScroll, this.isAutoHeight() ? 16 : throttleWait)
    this.handleWindowResize()
    this.handleWindowScroll()
    this.handleScrollerScroll()
    window.addEventListener('resize', this.throttledHandleWindowResize)
    window.addEventListener('scroll', this.throttledHandleWindowScroll)
    this.scroller.current.addEventListener('scroll', this.throttledHandleScrollerScroll)
  }

  removeListeners = () => {
    if (!this.scroller.current) {
      return
    }
    window.removeEventListener('resize', this.throttledHandleWindowResize)
    if (this.isAutoHeight()) {
      window.removeEventListener('scroll', this.throttledHandleWindowScroll)
    } else {
      this.scroller.current.removeEventListener('scroll', this.throttledHandleWindowScroll)
    }
  }

  handleWindowResize = () => {
    if (!this.scroller.current) {
      return
    }
    const scrollerClientWidth = this.scroller.current.clientWidth
    const scrollerClientHeight = this.scroller.current.clientHeight
    let scrollerHeight
    if (this.isAutoHeight()) {
      scrollerHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    } else {
      scrollerHeight = scrollerClientHeight
    }
    this.setState({
      scrollerClientWidth,
      scrollerHeight,
    }, () => {
      this.handleWindowScroll()
    })
  }

  getRenderIndexRange = (tbodyTopY: number, tbodyBottomY: number) => {
    const { rowHeight, data } = this.props
    const { scrollerHeight } = this.state
    let renderFromIndex
    let renderToIndex

    if (tbodyTopY >= 0) {
      renderFromIndex = 0
    } else {
      renderFromIndex = Math.min(Math.floor(-tbodyTopY / rowHeight), data.length - 1)
    }
    if (tbodyBottomY - scrollerHeight >= 0) {
      renderToIndex = data.length - 1 - Math.floor((tbodyBottomY - scrollerHeight) / rowHeight)
    } else {
      renderToIndex = data.length - 1
    }

    return {
      renderFromIndex,
      renderToIndex,
    }
  }

  handleWindowScroll = () => {
    if (!this.scroller.current) {
      return
    }
    const { preRenderRowCount, headerRowHeight, rowHeight, data } = this.props
    const rectScroller = this.scroller.current.getBoundingClientRect()
    let newState = {}

    if (this.isAutoHeight()) {
      const detectMargin = preRenderRowCount * rowHeight
      const tbodyHeight = rowHeight * data.length
      const tbodyTopY = rectScroller.top + headerRowHeight + detectMargin
      const tbodyBottomY = rectScroller.top + headerRowHeight + tbodyHeight - detectMargin
      const { renderFromIndex, renderToIndex } = this.getRenderIndexRange(tbodyTopY, tbodyBottomY)
      newState = {
        ...newState,
        renderFromIndex,
        renderToIndex,
      }
    }

    const topOffset = 0
    const bottomOffset = 0
    const isGlobalHeaderSticky = (
      rectScroller.top <= -topOffset &&
      rectScroller.bottom > headerRowHeight - bottomOffset
    )
    newState = {
      ...newState,
      isGlobalHeaderSticky,
    }

    this.setState(newState)
  }

  handleScrollerScroll = () => {
    if (!this.scroller.current) {
      return
    }
    const {
      preRenderRowCount,
      headerRowHeight,
      rowHeight,
      data,
      globalStickyHeader,
      localStickyHeader,
      enableFreezeColumnShadow,
    } = this.props
    let newState = {}

    if (globalStickyHeader || localStickyHeader) {
      this.syncStickyHeaderScrollLeft()
    }
    if (!this.isAutoHeight()) {
      const scrollerScrollTop = this.scroller.current.scrollTop
      const detectMargin = preRenderRowCount * rowHeight
      const tbodyHeight = rowHeight * data.length
      const tbodyTopY = -scrollerScrollTop + headerRowHeight + detectMargin
      const tbodyBottomY = -scrollerScrollTop + headerRowHeight + tbodyHeight - detectMargin
      const { renderFromIndex, renderToIndex } = this.getRenderIndexRange(tbodyTopY, tbodyBottomY)
      const isLocalHeaderSticky = (scrollerScrollTop > 0)

      newState = {
        ...newState,
        renderFromIndex,
        renderToIndex,
        isLocalHeaderSticky,
      }
    }
    if (enableFreezeColumnShadow) {
      newState = {
        ...newState,
        scrollerScrollLeft: this.scroller.current.scrollLeft,
      }
    }
    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }

  syncStickyHeaderScrollLeft = () => {
    if (!this.tHeadTr.current || !this.scroller.current) {
      return
    }
    this.tHeadTr.current.scrollLeft = this.scroller.current.scrollLeft
  }

  render() {
    const {
      data,
      maxHeight,
      headerRowHeight,
      rowHeight,
      globalStickyHeader,
      localStickyHeader,
      enableStickyHeaderShadow,
      enableFreezeColumnShadow,
      freezeColumnShadowLeftOffset,
      renderHeader,
      renderRow,
      ...rest
    } = this.props
    const {
      renderFromIndex,
      renderToIndex,
      isGlobalHeaderSticky,
      isLocalHeaderSticky,
      scrollerClientWidth,
      scrollerHeight,
      scrollerScrollLeft,
    } = this.state
    const renderedLength = (
      renderToIndex > renderFromIndex ?
      renderToIndex - renderFromIndex + 1 :
      1
    )
    const initialRenderedTableHeader = renderHeader()
    return (
      <Wrapper {...rest}>
        <Scroller
          ref={this.scroller}
          maxHeight={this.isAutoHeight() ? undefined : maxHeight}
        >
          <StyledTable ref={this.styledTable}>
            <DataTable.TBody>
              {(
                enableFreezeColumnShadow &&
                typeof freezeColumnShadowLeftOffset === 'number' &&
                scrollerScrollLeft > 0
              ) && (
                <Tr>
                  <ShadowedTd
                    rowSpan="0"
                    freezeLeftOffset={freezeColumnShadowLeftOffset}
                    height={this.isAutoHeight() ? (this.styledTable.current || {} as any).clientHeight : scrollerHeight}
                  />
                </Tr>
              )}
              {initialRenderedTableHeader && (
                React.cloneElement(
                  initialRenderedTableHeader,
                  {
                    ref: this.tHeadTr,
                    globalSticky: (globalStickyHeader && isGlobalHeaderSticky),
                    localSticky: (localStickyHeader && isLocalHeaderSticky),
                    width: (isGlobalHeaderSticky || isLocalHeaderSticky) ? scrollerClientWidth : undefined,
                    bottomShadow: (
                      enableStickyHeaderShadow && (
                        (globalStickyHeader && isGlobalHeaderSticky) ||
                        (localStickyHeader && isLocalHeaderSticky)
                      )
                    ),
                  },
                )
              )}
              {
                (
                  (globalStickyHeader && isGlobalHeaderSticky) ||
                  (localStickyHeader && isLocalHeaderSticky)
                ) && (
                  <Tr height={headerRowHeight} />
                )
              }
              {renderFromIndex > 0 && (
                <Tr height={rowHeight * renderFromIndex} />
              )}
              {
                Array(renderedLength)
                  .fill(0)
                  .map((_, idx) => idx + renderFromIndex)
                  .map(dataIndex => {
                    const record = data[dataIndex]
                    {/* when data is updated and row count is decreased, dataIndex may become out of bound */}
                    if (record) {
                      return renderRow(data[dataIndex], dataIndex, data)
                    }
                    return null
                  })
              }
              {renderToIndex < data.length - 1 && (
                <Tr height={rowHeight * (data.length - renderToIndex)} />
              )}
            </DataTable.TBody>
          </StyledTable>
        </Scroller>
        <ClearFloat />
      </Wrapper>
    )
  }
}

export default DataTable
