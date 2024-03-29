import { MyAccordion, MyCard, MyTab, MyTabGroup, MyTabPanel } from "@sterashima78/lit-practice-react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isUsingToggleLogger, setIsUsingToggleLogger] = useState(true);
  const [isUsingOpenLogger, setIsUsingOpenLogger] = useState(true);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <MyTabGroup>
        <MyTab name="setting">Setting</MyTab>
        <MyTab name="contents">Contens</MyTab>
        <MyTabPanel name="setting">
          <label>
            <input type="checkbox" onChange={() => setIsOpen(!isOpen)} checked={isOpen} />
            Toggle Accordion
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => setIsUsingToggleLogger(!isUsingToggleLogger)}
              checked={isUsingToggleLogger}
            />
            with Toggle Logger
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => setIsUsingOpenLogger(!isUsingOpenLogger)}
              checked={isUsingOpenLogger}
            />
            with Open Logger
          </label>
        </MyTabPanel>
        <MyTabPanel name="contents">
          <MyAccordion
            isOpen={isOpen}
            onToggle={isUsingToggleLogger
              ? ({ isOpen }) => {
                setIsOpen(isOpen);
                console.log(`set isOpen=${isOpen}`);
              }
              : ({ isOpen }) => setIsOpen(isOpen)}
            onOpen={isUsingOpenLogger
              ? () => {
                console.log("open");
              }
              : () => ""}
          >
            <h1 slot="header">Vite + React</h1>
            <p slot="header" className="subtitle">multiple slot</p>
            <MyCard>
              <p slot="header">Counter</p>
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
            </MyCard>
          </MyAccordion>
        </MyTabPanel>
      </MyTabGroup>
    </div>
  );
}

export default App;
