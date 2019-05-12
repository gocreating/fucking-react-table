export default function generateRows(rowCount, columns) {
  return Array(rowCount).fill(0).map((_, rowIndex) => ({
    id: `row-id-${rowIndex}`,
    width: (rowIndex + 1) * 10,
    ...columns.reduce((obj, column, columnIndex) => ({
      ...obj,
      [column.id]: `cell (${rowIndex}, ${columnIndex})`,
    }), {}),
  }))
} 
