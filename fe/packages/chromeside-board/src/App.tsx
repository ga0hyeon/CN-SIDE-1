import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCountStore, PixelButton } from "ui-components";
import ChatSample from "./components/ChatSample";

function App() {
  const { count, countUp, resetCount } = useCountStore((state: any) => {
    return {
      count: state.count,
      countUp: state.countUp,
      resetCount: state.resetCount,
    };
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + zustand</h1>
      <div className="card">
        {/* <button onClick={() => countUp()}>count is {count}</button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <PixelButton
          onClick={() => countUp()}
          label={`count is ${count}`}
        ></PixelButton>
      </div>
      <p className="read-the-docs">
        <PixelButton
          onClick={() => resetCount()}
          label="reset"
          backgroundColor="#f19d01"
        ></PixelButton>
      </p>
      <ChatSample />
    </div>
  );
}

export default App;
