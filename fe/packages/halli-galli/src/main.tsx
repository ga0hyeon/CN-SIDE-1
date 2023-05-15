import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EnterPage from './page/EnterPage'
import GamePage from './page/GamePage'
import HalliGalli from './page/HalliGalli'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<EnterPage />}></Route>
        {/* <Route path={"/game"} element={<GamePage />}></Route> */}
        <Route path={"/game"} element={<HalliGalli />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
