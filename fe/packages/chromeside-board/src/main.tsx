import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {EnterPage, GamePage, HalliGalli} from "halli-galli";

console.log(import.meta.env.VITE_WSS_URL)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<EnterPage />}></Route>
        <Route path={"/game"} element={<HalliGalli />}></Route>
        <Route path={"/test"} element={<App />}></Route>
        <Route path={"/halli"} element={<HalliGalli />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
