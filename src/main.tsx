import React from 'react'
import ReactDOM from 'react-dom/client'
import { ComicContextProvider } from './context/ComicContext.tsx'
import { CartContextProvider } from './context/CartContext.tsx'
import { BrowserRouter } from "react-router-dom"
import './styles/globals.css'
import { Router } from './Router.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ComicContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Router />
        </ BrowserRouter>
      </CartContextProvider>
    </ComicContextProvider>
  </React.StrictMode>,
)
