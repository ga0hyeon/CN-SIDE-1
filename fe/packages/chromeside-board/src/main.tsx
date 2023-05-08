import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import EnterPage from './pages/EnterPage'
import GamePage from './pages/GamePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

console.log(import.meta.env.VITE_WSS_URL)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<EnterPage />}></Route>
        <Route path={"/game"} element={<GamePage />}></Route>
        <Route path={"/test"} element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
