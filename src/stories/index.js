import React from 'react'
import { storiesOf } from '@storybook/react'
import generateColumns from '../src/utils/generateColumns'
import generateRows from '../src/utils/generateRows'
import DemoTable from './DemoTable'

const column_3 = generateColumns(3)
const column_10 = generateColumns(10)
const data_10_row_3_column = generateRows(10, column_3)
const data_100_row_3_column = generateRows(100, column_3)
const data_10_row_10_column = generateRows(10, column_10)
const data_100_row_10_column = generateRows(100, column_10)

storiesOf('Virtualized Row', module)
  .add('10 rows x 3 columns', () => (
    <DemoTable
      columns={column_3}
      data={data_10_row_3_column}
    />
  ))
  .add('100 rows x 3 columns', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
    />
  ))
  .add('10 rows x 10 columns', () => (
    <DemoTable
      columns={column_10}
      data={data_10_row_10_column}
    />
  ))
  .add('100 rows x 10 columns', () => (
    <DemoTable
      columns={column_10}
      data={data_100_row_10_column}
    />
  ))

storiesOf('maxHeight', module)
  .add('maxHeight: 300px', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
      maxHeight={300}
    />
  ))
  .add('maxHeight: 500px', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
      maxHeight={500}
    />
  ))

storiesOf('throttleWait', module)
  .add('throttleWait: 200ms', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
      throttleWait={200}
    />
  ))
  .add('throttleWait: 1000ms', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
      throttleWait={1000}
    />
  ))

storiesOf('preRenderRowCount', module)
  .add('preRenderRowCount: 0', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
      preRenderRowCount={0}
    />
  ))
  .add('preRenderRowCount: 10', () => (
    <DemoTable
      columns={column_3}
      data={data_100_row_3_column}
      preRenderRowCount={10}
    />
  ))
