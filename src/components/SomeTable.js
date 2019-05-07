import React from 'react'
import DataTable from './DataTable'

const columns = [{
  key: 'column0',
  content: 'Column 0',
  width: 100,
}, {
  key: 'column1',
  content: 'Column 1',
  width: 150,
}, {
  key: 'column2',
  content: 'Column 2',
  width: 90,
}, {
  key: 'column3',
  content: 'Column 3',
  width: 230,
}, {
  key: 'column4',
  content: 'Column 4',
  width: 170,
}, {
  key: 'column5',
  content: 'Column 5',
  width: 100,
}, {
  key: 'column6',
  content: 'Column 6',
  width: 130,
}, {
  key: 'column7',
  content: 'Column 7',
  width: 170,
}, {
  key: 'column8',
  content: 'Column 8',
  width: 90,
}, {
  key: 'column9',
  content: 'Column 9',
  width: 160,
}, {
  key: 'column10',
  content: 'Column 10',
  width: 100,
}]

const data = Array(20).fill(0).map((val, rowIndex) => ({
  id: `row-id-${rowIndex}`,
  width: (rowIndex + 1) * 10,
  ...columns.reduce((obj, column, columnIndex) => ({
    ...obj,
    [column.key]: `cell (${rowIndex}, ${columnIndex})`,
  }), {}),
}))

const SomeTable = () => (
  <DataTable>
    <DataTable.THead>
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
    </DataTable.THead>
    <DataTable.TBody>
      {data.map(record => (
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
      ))}
    </DataTable.TBody>
  </DataTable>
)

export default SomeTable