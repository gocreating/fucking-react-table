import React from 'react'
import DataTable from './DataTable'

const SomeTable = ({
  data, columns, maxHeight, throttleWait, preRenderRowCount,
}) => (
  <DataTable
    data={data}
    maxHeight={maxHeight}
    throttleWait={throttleWait}
    preRenderRowCount={preRenderRowCount}
    headerRowHeight={44}
    rowHeight={62}    
    renderHeader={() => (
      <DataTable.Tr>
        {columns.map(column => (
          <DataTable.Th
            key={column.key}
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
            key={`row-${record.id}-col-${column.key}`}
            cellWidth={column.width}
          >
            {record[column.key]}
          </DataTable.Td>
        ))}
      </DataTable.Tr>
    )}
  />
)

export default SomeTable
