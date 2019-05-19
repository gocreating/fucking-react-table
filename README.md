# React Virtual Table

A virtualized table structured with native table elements.

## Playground

[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://gocreating.github.io/react-virtual-table)

## Why

- Why native table element?

  TBD.

- Why reinventing the wheel?

  TBD.

## Quick Start

``` jsx
const data = [
  { id: 'a', value: 'Apple' },
  { id: 'b', value: 'Banana' },
]
const Tr = DataTable.Tr
const Th = DataTable.Th
const Td = DataTable.Td

return (
  <DataTable
    data={data}
    headerRowHeight={60}
    rowHeight={80}
    renderHeader={() => (
      <Tr>
        <Th cellWidth={100}>ID</Th>
        <Th cellWidth={150}>Fruit</Th>
      </Tr>
    )}
    renderRow={row => (
      <Tr key={row.id}>
        <Td cellWidth={100}>{row.id}</Td>
        <Td cellWidth={150}>{row.value}</Td>
      </Tr>
    )}
  />
)
```

## Props

| prop name | required | description |
| --------- | -------- | ----------- |
| `data` | yes | data source |
| `headerRowHeight` | yes | Fixed row height of table header. Table header is not virtualized and is always rendered. |
| `rowHeight` | yes | fixed row height of table row |
| `columnCount` | conditional | if your column count will change during runtime, you must pass current column count. This prop is only for detecting width changing and won't affect any other table behaviors. |
| TBD |  |  |

## Development

```
npm start
```

## Storybook

Launch local storybook

```
yarn storybook
```

Deploy to gh-pages

```
yarn deploy-storybook
```
