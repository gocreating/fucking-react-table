import React, { useState } from 'react'
import styled from 'styled-components'
import DemoTable from './stories/DemoTable'
import generateColumns from '../src/utils/generateColumns'
import generateRows from './utils/generateRows'

const column_10 = generateColumns(10)
const data_10_row_10_column = generateRows(10, column_10)
const data_100_row_10_column = generateRows(100, column_10)

const Toolbar = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  padding: 30px;
  background-color: rgba(200, 200, 200, 0.5);
  z-index: 1;
`

const Placeholder = styled.div`
  height: 250px;
`

const App = () => {
  const [data, setData] = useState(data_10_row_10_column);
  const [maxHeight, setMaxHeight] = useState();
  const [throttleWait, setThrottleWait] = useState(200);
  const [preRenderRowCount, setPreRenderRowCount] = useState();
  return (
    <>
      <Toolbar>
        <button
          onClick={() => setData(
            data.length === 20 ?
            data_10_row_10_column :
            data_100_row_10_column
          )}
        >
          Toggle data
        </button>
        <button onClick={() => setMaxHeight(maxHeight ? undefined : 400)}>
          Toggle maxHeight
        </button>
        <button onClick={() => setThrottleWait(throttleWait === 200 ? 2000 : 200)}>
          Toggle throttleWait
        </button>
        <button onClick={() => setPreRenderRowCount(preRenderRowCount ? undefined : 10)}>
          Toggle preRenderRowCount
        </button>
        <p>data: {data.length} rows</p>
        <p>maxHeight: {maxHeight ? `${maxHeight}px` : 'Disabled'}</p>
        <p>throttleWait: {throttleWait}ms</p>
        <p>preRenderRowCount: {preRenderRowCount ? `${preRenderRowCount}` : 'Disabled'}</p>
      </Toolbar>
      <Placeholder />
      <DemoTable
        columns={column_10}
        data={data}
        maxHeight={maxHeight}
        throttleWait={throttleWait}
        preRenderRowCount={preRenderRowCount}
      />
    </>
  )
}

export default App
