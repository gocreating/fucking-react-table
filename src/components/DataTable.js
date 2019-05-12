import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import styled, { css } from 'styled-components'

/**
 * Wrapper
 */
const Wrapper = styled.div`
  position: relative;
`

/**
 * Scroller
 */
const Scroller = styled.div`
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
  background-color: #26282b;
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
const Tr = styled.tr`
  overflow: hidden;
  background-color: rgb(62, 63, 66);
  ${({ width }) => width && css`
    width: ${width}px;
  `}
  ${({ sticky }) => sticky && css`
    position: fixed;
    top: 0px;
  `}
`

Tr.propTypes = {
  sticky: PropTypes.bool,
  width: PropTypes.number,
};

Tr.defaultProps = {
  sticky: false,
};

/**
 * StyledTh
 */
const StyledTh = styled.th`
  text-align: left;
  background-color: rgba(255, 255, 255, 0.1);
  color: #aaaaaa;
  white-space: nowrap;
  ${({ cellWidth }) => css`
    min-width: ${cellWidth}px;
  `}
  height: ${(props) => props.height}px;
`

StyledTh.propTypes = {
  height: PropTypes.number,
}

/**
 * Th
 */
const Th = (props, { headerRowHeight }) => (
  <StyledTh height={headerRowHeight} {...props}  />
)

Th.contextTypes = {
  headerRowHeight: PropTypes.number,
};

/**
 * StyledTd
 */
const StyledTd = styled.td`
  text-align: left;
  background-color: rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  color: #ffffff;
  ${({ cellWidth }) => css`
    min-width: ${cellWidth}px;
  `}
  height: ${props => props.height}px;
`

StyledTd.propTypes = {
  height: PropTypes.number,
}

/**
 * Td
 */
const Td = (props, { rowHeight }) => (
  <StyledTd height={rowHeight} {...props}  />
)

Td.contextTypes = {
  rowHeight: PropTypes.number.isRequired,
};

/**
 * DataTable
 */
class DataTable extends Component {
  constructor(props) {
    super(props)
    this.scroller = React.createRef()
    this.tHeadTr = React.createRef()
    this.state = {
      scrollerClientWidth: 0,
      scrollerHeight: 0,
      renderFromIndex: 0,
      renderToIndex: 0,
      isHeaderSticky: false,
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { stickyHeader, maxHeight, throttleWait } = this.props
    const { isHeaderSticky } = this.state
    const prevMaxHeight = prevProps.maxHeight
    const prevThrottleWait = prevProps.throttleWait
    const prevIsHeaderSticky = prevState.isHeaderSticky

    if (
      stickyHeader &&
      isHeaderSticky !== prevIsHeaderSticky &&
      isHeaderSticky === true
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

  isAutoHeight = (props) => {
    const { maxHeight } = (props || this.props)
    return maxHeight < 0
  }

  addListeners = () => {
    const { throttleWait } = this.props
    this.handleWindowResize = throttle(this._handleWindowResize, throttleWait)
    this.handleWindowScroll = throttle(this._handleWindowScroll, throttleWait)
    this.handleScrollerScroll = throttle(this._handleScrollerScroll, 10)
    this.handleWindowResize()
    this.handleWindowScroll()
    window.addEventListener('resize', this.handleWindowResize)
    if (this.isAutoHeight()) {
      window.addEventListener('scroll', this.handleWindowScroll)
    } else {
      this.scroller.current.addEventListener('scroll', this.handleWindowScroll)
    }
  }

  removeListeners = () => {
    window.removeEventListener('resize', this.handleWindowResize)
    if (this.isAutoHeight()) {
      window.removeEventListener('scroll', this.handleWindowScroll)
    } else {
      this.scroller.current.removeEventListener('scroll', this.handleWindowScroll)
    }
  }

  _handleWindowResize = () => {
    const { maxHeight } = this.props
    const scrollerClientWidth = this.scroller.current.clientWidth
    let scrollerHeight
    if (this.isAutoHeight()) {
      scrollerHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    } else {
      scrollerHeight = maxHeight
    }
    this.setState({
      scrollerClientWidth,
      scrollerHeight,
    }, () => {
      this.handleWindowScroll()
    })
  }

  _handleWindowScroll = () => {
    const { preRenderRowCount, headerRowHeight, rowHeight, data } = this.props
    const { scrollerHeight } = this.state
    const rectScroller = this.scroller.current.getBoundingClientRect()
    const detectMargin = preRenderRowCount * rowHeight
    const tbodyHeight = rowHeight * data.length
    let tbodyTopY
    let tbodyBottomY
    let renderFromIndex
    let renderToIndex

    const topOffset = 0
    const bottomOffset = 0
    const isHeaderSticky = (
      rectScroller.top <= -topOffset &&
      rectScroller.bottom > headerRowHeight - bottomOffset
    )
    if (this.isAutoHeight()) {
      tbodyTopY = rectScroller.top + headerRowHeight + detectMargin
      tbodyBottomY = rectScroller.top + headerRowHeight + tbodyHeight - detectMargin
    } else {
      tbodyTopY = -this.scroller.current.scrollTop + headerRowHeight + detectMargin
      tbodyBottomY = -this.scroller.current.scrollTop + headerRowHeight + tbodyHeight - detectMargin
    }    

    if (tbodyTopY >= 0) {
      renderFromIndex = 0
    } else if (tbodyTopY < 0 && 0 < tbodyBottomY) {
      renderFromIndex = Math.floor(-tbodyTopY / rowHeight)
    } else {
      renderFromIndex = data.length - 1
    }
    if (tbodyBottomY - scrollerHeight >= 0) {
      renderToIndex = data.length - 1 - Math.floor((tbodyBottomY - scrollerHeight) / rowHeight)
    } else {
      renderToIndex = data.length - 1
    }

    this.setState({
      renderFromIndex,
      renderToIndex,
      isHeaderSticky,
    })
  }

  _handleScrollerScroll = () => {
    this.syncStickyHeaderScrollLeft()
  }

  syncStickyHeaderScrollLeft = () => {
    this.tHeadTr.current.scrollLeft = this.scroller.current.scrollLeft
  }

  render() {
    const {
      data,
      maxHeight,
      headerRowHeight,
      rowHeight,
      stickyHeader,
      renderHeader,
      renderRow,
    } = this.props
    const {
      renderFromIndex,
      renderToIndex,
      isHeaderSticky,
      scrollerClientWidth,
    } = this.state
    const renderedLength = (
      renderToIndex > renderFromIndex ?
      renderToIndex - renderFromIndex + 1 :
      1
    )
    return (
      <Wrapper>
        <Scroller
          ref={this.scroller}
          maxHeight={this.isAutoHeight() ? undefined : maxHeight}
          onScroll={stickyHeader ? this.handleScrollerScroll : undefined}
        >
          <StyledTable>
            <DataTable.TBody>
              {
                stickyHeader ?
                (
                  React.cloneElement(
                    renderHeader(),
                    {
                      ref: this.tHeadTr,
                      sticky: isHeaderSticky,
                      width: isHeaderSticky ? scrollerClientWidth : undefined,
                    },
                  )
                ) :
                renderHeader()
              }
              {stickyHeader && isHeaderSticky && (
                <Tr height={headerRowHeight} />
              )}
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
      </Wrapper>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  headerRowHeight: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  maxHeight: PropTypes.number,
  throttleWait: PropTypes.number,
  preRenderRowCount: PropTypes.number,
  stickyHeader: PropTypes.bool,
  renderHeader: PropTypes.func,
  renderRow: PropTypes.func,
}

DataTable.childContextTypes = {
  headerRowHeight: PropTypes.number,
  rowHeight: PropTypes.number,
}

DataTable.defaultProps = {
  maxHeight: -1,
  throttleWait: 200,
  preRenderRowCount: 0,
  stickyHeader: false,
  renderHeader: () => {},
  renderRow: () => {},
}

/**
 * Exposed Components
 */
DataTable.THead = THead
DataTable.TBody = TBody
DataTable.Tr = Tr
DataTable.Th = Th
DataTable.Td = Td

export default DataTable
