import random from './random'

export default function generateColumns(columnCount) {
  return Array(columnCount).fill(0).map((_, columnIndex) => ({
    id: `column-id-${columnIndex}`,
    content: `Column ${columnIndex}`,
    width: random(90, 200, columnIndex),
  }))
} 
