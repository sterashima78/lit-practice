import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { MyAccordion, MyCard } from "@sterashima78/lit-practice-react";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <MyAccordion>
      <h1 slot="header">Vite + React</h1>
      <MyCard className="card">
        <p slot="header">Counter</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </MyCard>
      </MyAccordion>
    </div>
  )
}

export default App
