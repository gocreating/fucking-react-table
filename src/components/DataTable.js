import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`

const Scroller = styled.div`
  overflow-x: auto;
  overflow-y: visible;
  width: 100%;
`

const Table = styled.table`
  border-collapse: collapse;
  background-color: #26282b;
`

const THead = styled.thead`
`

const TBody = styled.tbody`
`

const Tr = styled.tr`
`

const Th = styled.th`
  text-align: left;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #aaaaaa;
  white-space: nowrap;
  ${({ cellWidth }) => css`
    min-width: ${cellWidth}px;
  `}
`

const Td = styled.td`
  text-align: left;
  height: 62px;
  background-color: rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  color: #ffffff;
  ${({ cellWidth }) => css`
    min-width: ${cellWidth}px;
  `}
`

class DataTable extends Component {
  render() {
    const { children } = this.props
    return (
      <Wrapper>
        <Scroller>
          <Table>
            {children}
          </Table>
        </Scroller>
      </Wrapper>
    )
  }
}

DataTable.THead = THead
DataTable.TBody = TBody
DataTable.Tr = Tr
DataTable.Th = Th
DataTable.Td = Td

export default DataTable
