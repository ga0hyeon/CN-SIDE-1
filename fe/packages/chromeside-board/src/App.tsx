import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCountStore, PixelButton, FlipCard, Timer } from "ui-components";
import ChatSample from "./components/ChatSample";
import { useRef } from "react";

function App() {
  const { count, countUp, resetCount } = useCountStore((state: any) => {
    return {
      count: state.count,
      countUp: state.countUp,
      resetCount: state.resetCount,
    };
  });
  const childRef = useRef<{doFlip: () => void}>(null);

  const doFlip = () => {
    if(childRef.current) {
       childRef.current.doFlip();
    }
  }

  setInterval(() => {
    doFlip();
  }, 2000)

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
        {/* <button onClick={() => countUp()}>count is {count}</button> */}
        <button className="bg-pink-300 hover:bg-pink-350 text-white border-gray-400 font-bold py-1 px-4 rounded-full m-3" onClick={() => countUp()}>count is {count}</button>
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
      <table>
        <tr>
          <td>
            <FlipCard
              ref={childRef}
              type={'circle'}
              front={<h1>앞면</h1>}
              frontColor={"tomato"}
              back = {<h1>뒷면</h1>}
              backColor={"royalblue"}
              />
          </td>
          <td>
            <FlipCard
              type={'circle'}
              front={<h1>앞면</h1>}
              frontColor={"tomato"}
              back = {<h1>뒷면</h1>}
              backColor={"royalblue"}
              />
          </td>
        </tr>
        <tr>
        <td>
            <FlipCard
              type={'circle'}
              front={<h1>앞면</h1>}
              frontColor={"tomato"}
              back = {<h1>뒷면</h1>}
              backColor={"royalblue"}
              />
          </td>
          <td>
            <FlipCard
              type={'circle'}
              front={<h1>앞면</h1>}
              frontColor={"tomato"}
              back = {<h1>뒷면</h1>}
              backColor={"royalblue"}
              />
          </td>
        </tr>
      </table>

      <Timer onTimeout={():void=>{console.log('test!!')}} />
    </div>
  );
}

export default App;
