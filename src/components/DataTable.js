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
`

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
    this.state = {
      scrollerHeight: 0,
      renderFromIndex: 0,
      renderToIndex: 0,
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

  componentDidUpdate(prevProps) {
    const { maxHeight, throttleWait } = this.props
    const prevMaxHeight = prevProps.maxHeight
    const prevThrottleWait = prevProps.throttleWait
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
    let scrollerHeight
    if (this.isAutoHeight()) {
      scrollerHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    } else {
      scrollerHeight = maxHeight
    }
    this.setState({ scrollerHeight }, () => {
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
    })
  }

  render() {
    const { data, maxHeight, rowHeight, renderHeader, renderRow } = this.props
    const { renderFromIndex, renderToIndex } = this.state
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
        >
          <StyledTable>
            <DataTable.TBody>
              {renderHeader()}
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
