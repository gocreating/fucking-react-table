import React, { useState } from 'react'
import styled from 'styled-components'
import SomeTable from './components/SomeTable'

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

const getData = (rowCount) => Array(rowCount).fill(0).map((val, rowIndex) => ({
  id: `row-id-${rowIndex}`,
  width: (rowIndex + 1) * 10,
  ...columns.reduce((obj, column, columnIndex) => ({
    ...obj,
    [column.key]: `cell (${rowIndex}, ${columnIndex})`,
  }), {}),
}))

const data20 = getData(20)
const data200 = getData(200)

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
  const [data, setData] = useState(data20);
  const [maxHeight, setMaxHeight] = useState();
  const [throttleWait, setThrottleWait] = useState(200);
  const [preRenderRowCount, setPreRenderRowCount] = useState();
  return (
    <>
      <Toolbar>
        <button onClick={() => setData(data.length === 20 ? data200 : data20)}>
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
      <SomeTable
        columns={columns}
        data={data}
        maxHeight={maxHeight}
        throttleWait={throttleWait}
        preRenderRowCount={preRenderRowCount}
      />
    </>
  )
}

export default App
