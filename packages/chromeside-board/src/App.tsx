import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCountStore, Button as UIButton } from "ui-components";

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
      <div className="text-2xl text-pink-300">Vite + React + zustand</div>
      <div className="card">
        <button className="bg-pink-300 hover:bg-pink-350 text-white border-gray-400 font-bold py-1 px-4 rounded-full m-3" onClick={() => countUp()}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <UIButton label="" primary={true} backgroundColor="#75c6dc"></UIButton>
      </div>
      <p className="read-the-docs">
        <button className="bg-pink-300 hover:bg-pink-350 text-white border-gray-400 font-bold py-1 px-4 rounded-full" onClick={() => resetCount()}>reset</button>
      </p>
    </div>
  );
}

export default App;
