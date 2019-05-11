import React, { useState } from 'react'
import styled from 'styled-components'
import SomeTable from './components/SomeTable'

const Toolbar = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  padding: 30px;
  background-color: rgba(200, 200, 200, 0.5);
  z-index: 1;
`

const Placeholder = styled.div`
  height: 180px;
`

const App = () => {
  const [maxHeight, setMaxHeight] = useState();
  const [throttleWait, setThrottleWait] = useState(200);
  const [preRenderRowCount, setPreRenderRowCount] = useState();
  return (
    <>
      <Toolbar>
        <button onClick={() => setMaxHeight(maxHeight ? undefined : 400)}>
          Toggle maxHeight
        </button>
        <button onClick={() => setThrottleWait(throttleWait === 200 ? 1000 : 200)}>
          Toggle throttleWait
        </button>
        <button onClick={() => setPreRenderRowCount(preRenderRowCount ? undefined : 10)}>
          Toggle preRenderRowCount
        </button>
        <p>maxHeight: {maxHeight ? `${maxHeight}px` : 'Disabled'}</p>
        <p>throttleWait: {throttleWait}ms</p>
        <p>preRenderRowCount: {preRenderRowCount ? `${preRenderRowCount}` : 'Disabled'}</p>
      </Toolbar>
      <Placeholder />
      <SomeTable
        maxHeight={maxHeight}
        throttleWait={throttleWait}
        preRenderRowCount={preRenderRowCount}
      />
    </>
  )
}

export default App
