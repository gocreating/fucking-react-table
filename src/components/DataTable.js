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
  width: 100%;
`

/**
 * Table
 */
const Table = styled.table`
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
    super(props);
    this.wrapper = React.createRef()
    this.handleWindowResize = throttle(this._handleWindowResize, 200)
    this.handleWindowScroll = throttle(this._handleWindowScroll, 200)
    this.state = {
      windowHeight: 0,
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
    this.handleWindowResize()
    this.handleWindowScroll()
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillMount() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  _handleWindowResize = () => {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    this.setState({ windowHeight }, () => {
      this.handleWindowScroll()
    })
  }

  _handleWindowScroll = () => {
    const { headerRowHeight, rowHeight, data } = this.props
    const { windowHeight } = this.state
    const rectWrapper = this.wrapper.current.getBoundingClientRect()
    const tbodyTop = rectWrapper.top + headerRowHeight
    const tbodyBottom = rectWrapper.top + headerRowHeight + rowHeight * data.length
    let renderFromIndex
    let renderToIndex
    
    if (tbodyTop > 0) {
      renderFromIndex = 0
    } else if (tbodyTop < 0 && tbodyBottom > 0) {
      renderFromIndex = Math.floor(-tbodyTop / rowHeight)
    } else {
      renderFromIndex = data.length - 1
    }
    if (tbodyBottom - windowHeight > 0) {
      renderToIndex = data.length - 1 - Math.floor((tbodyBottom - windowHeight) / rowHeight)
    } else {
      renderToIndex = data.length - 1
    }
    this.setState({
      renderFromIndex,
      renderToIndex,
    })
  }

  render() {
    const { data, rowHeight, renderHeader, renderRow } = this.props
    const { renderFromIndex, renderToIndex } = this.state
    const renderedLength = (
      renderToIndex > renderFromIndex ?
      renderToIndex - renderFromIndex + 1 :
      1
    )
    return (
      <Wrapper ref={this.wrapper}>
        <Scroller>
          <Table>
            <DataTable.THead>
              {renderHeader()}
            </DataTable.THead>
            <DataTable.TBody>
              {renderFromIndex > 0 && (
                <Tr height={rowHeight * renderFromIndex} />
              )}
              {
                Array(renderedLength)
                  .fill(0)
                  .map((_, idx) => idx + renderFromIndex)
                  .map(dataIndex => renderRow(data[dataIndex], dataIndex, data))
              }
              {renderToIndex < data.length - 1 && (
                <Tr height={rowHeight * (data.length - renderToIndex)} />
              )}
            </DataTable.TBody>
          </Table>
        </Scroller>
      </Wrapper>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array,
  headerRowHeight: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  renderHeader: PropTypes.func,
  renderRow: PropTypes.func,
}

DataTable.childContextTypes = {
  headerRowHeight: PropTypes.number,
  rowHeight: PropTypes.number,
};

/**
 * Exposed Components
 */
DataTable.THead = THead
DataTable.TBody = TBody
DataTable.Tr = Tr
DataTable.Th = Th
DataTable.Td = Td

export default DataTable
