import React from 'react'
import styled from 'styled-components'
import DataTable from '../components/DataTable'

const Table = styled(DataTable)`
  background-color: #26282b;
`

const Tr = styled(DataTable.Tr)`
  background-color: rgb(53, 55, 58);
`

const Th = styled(DataTable.Th)`
  background-color: rgb(62, 63, 66);
  color: rgb(156, 157, 158);
`

const Td = styled(DataTable.Td)`
  background-color: rgb(53, 55, 58);
  color: #ffffff;
`

const getFreezeOffsetMap = (columns, freezeToColumnIndex) => {
  if (typeof freezeToColumnIndex !== 'number') {
    return {}
  }
  return columns
    .slice(1, freezeToColumnIndex + 1)
    .reduce((freezeOffsetMap, _, columnnIndex) => ({
      ...freezeOffsetMap,
      [columnnIndex + 1]: freezeOffsetMap[columnnIndex] + columns[columnnIndex].width,
    }), { 0: 0 })
}

const getFreezeColumnShadowLeftOffset = (columns, freezeOffsetMap, freezeToColumnIndex) => {
  if (typeof freezeToColumnIndex !== 'number') {
    return undefined
  }
  return (
    freezeOffsetMap[freezeToColumnIndex] +
    columns[freezeToColumnIndex].width
  )
}

const DemoTable = ({ columns, freezeToColumnIndex, ...rest }) => {
  const freezeOffsetMap = getFreezeOffsetMap(columns, freezeToColumnIndex)
  const freezeColumnShadowLeftOffset = getFreezeColumnShadowLeftOffset(
    columns, freezeOffsetMap, freezeToColumnIndex
  )
  return (
    <Table
      columnCount={columns.length}
      renderHeader={() => (
        <Tr>
          {columns.map((column, columnIndex) => (
            <Th
              key={column.id}
              cellWidth={column.width}
              freezeLeftOffset={freezeOffsetMap[columnIndex]}
            >
              {column.content}
            </Th>
          ))}
        </Tr>
      )}
      renderRow={record => (
        <Tr key={record.id}>
          {columns.map((column, columnIndex) => (
            <Td
              key={`row-${record.id}-col-${column.id}`}
              cellWidth={column.width}
              freezeLeftOffset={freezeOffsetMap[columnIndex]}
            >
              {record[column.id]}
            </Td>
          ))}
        </Tr>
      )}
      freezeColumnShadowLeftOffset={freezeColumnShadowLeftOffset}
      {...rest}
    />
  )
}

export default DemoTable
