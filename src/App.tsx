import { useState } from 'react'
import './App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import init, { create_rust_objects } from './wasm/pkg/wasm_pack'

const createJSObjects = (amount: number) => {
  const arr: Array<{ index: number }> = []
  for (let i = 0; i < amount; i++) {
    arr.push({
      index: i
    })
  }
  return arr
}

interface FuncCallerProps {
  initiated: boolean
  func: (arg: number) => Record<any, any>
}

const FuncCaller = ({ initiated, func }: FuncCallerProps) => {
  if (!initiated) return null
  const [val, setVal] = useState('')
  const [time, setTime] = useState<number | null>(null)

  const handleClick = () => {
      const start = performance.now()
      func(Number(val))
      const stop = performance.now() - start
      setTime(stop)
  }
  return (
    <Grid item sm>
      <Grid>
        <TextField value={val} onChange={({ target }) => setVal(target.value)} />
        <Button onClick={handleClick}>Send</Button>
      </Grid>
      <Grid>
        {time}
      </Grid>
    </Grid>
  )
}

function App() {
  const [initiated, setInitiated] = useState<boolean>(false)

  init().then(() => {
    setInitiated(true)
  }).catch((err) => {
    console.log('something went wrong, ',  err)
  })

  if (!initiated) return <>Loading..</>

  return (
    <div className="App">
      <header className="App-header">
        <Grid container>
          <FuncCaller initiated={initiated} func={createJSObjects} />
          <FuncCaller initiated={initiated} func={create_rust_objects} />
        </Grid>
      </header>
    </div>
  )
}

export default App
