import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { GET } from './utils'

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("");
  const fetchTest = async() => {
    const response = await GET("/tes");
    console.log("tes");
    console.log(response);
    setMsg(response.data.message);
  }

  useEffect(() => {
    fetchTest();
  }, [])
  return (
    <>
      <div>
        <h1>{msg}</h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
