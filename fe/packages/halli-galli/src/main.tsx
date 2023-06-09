import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './../../../tailwind.css'
import './index.css'
import EnterPage from './page/EnterPage'
import GamePage from './page/GamePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

console.log(import.meta.env.VITE_WSS_URL)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<EnterPage />}></Route>
        <Route path={"/game"} element={<GamePage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
