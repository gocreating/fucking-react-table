import React from 'react'
import DataTable from '../components/DataTable'

const DemoTable = ({ columns, ...rest }) => (
  <DataTable
    renderHeader={() => (
      <DataTable.Tr>
        {columns.map(column => (
          <DataTable.Th
            key={column.id}
            cellWidth={column.width}
          >
            {column.content}
          </DataTable.Th>
        ))}
      </DataTable.Tr>
    )}
    renderRow={record => (
      <DataTable.Tr key={record.id}>
        {columns.map(column => (
          <DataTable.Td
            key={`row-${record.id}-col-${column.id}`}
            cellWidth={column.width}
          >
            {record[column.id]}
          </DataTable.Td>
        ))}
      </DataTable.Tr>
    )}
    {...rest}
  />
)

export default DemoTable
