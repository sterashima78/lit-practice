import { MyAccordion, MyCard } from "@sterashima78/lit-practice-react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isUseLogger, setIsUseLogger] = useState(true);

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
      <label>
        <input type="checkbox" onChange={() => setIsOpen(!isOpen)} checked={isOpen} />
        Toggle Accordion
      </label>

      <label>
        <input type="checkbox" onChange={() => setIsUseLogger(!isUseLogger)} checked={isUseLogger} />
        with Logger
      </label>

      <MyAccordion
        isOpen={isOpen}
        onToggle={isUseLogger
          ? ({ isOpen }) => {
            setIsOpen(isOpen);
            console.log(`set isOpen=${isOpen}`);
          }
          : ({ isOpen }) => setIsOpen(isOpen)}
      >
        <h1 slot="header">Vite + React</h1>
        <MyCard>
          <p slot="header">Counter</p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </MyCard>
      </MyAccordion>
    </div>
  );
}

export default App;
