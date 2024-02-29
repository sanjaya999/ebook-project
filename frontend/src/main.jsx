import React from 'react'
import  ReactDOM  from 'react-dom/client'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContextProvider from './Context/UserContext.jsx'






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
   
  <App />
  </UserContextProvider>
  </React.StrictMode>,
)
