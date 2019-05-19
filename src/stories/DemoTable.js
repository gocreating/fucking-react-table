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

const DemoTable = ({ columns, ...rest }) => (
  <Table
    renderHeader={() => (
      <Tr>
        {columns.map(column => (
          <Th
            key={column.id}
            cellWidth={column.width}
          >
            {column.content}
          </Th>
        ))}
      </Tr>
    )}
    renderRow={record => (
      <Tr key={record.id}>
        {columns.map(column => (
          <Td
            key={`row-${record.id}-col-${column.id}`}
            cellWidth={column.width}
          >
            {record[column.id]}
          </Td>
        ))}
      </Tr>
    )}
    {...rest}
  />
)

export default DemoTable
