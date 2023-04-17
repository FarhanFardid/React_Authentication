import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './components/Root'
import Login from './components/Login'
import Register from './components/Register/Register'
import RBS from './components/ReactBS/RBS'

const router = createBrowserRouter(
  [
    {path:'/',
    element:<Root></Root>,
    children:[
  {
    path:'login',
    element:<Login></Login>
  },
  {
    path:'register',
    element:<Register></Register>
  },
  {
    path:'register-rbs',
    element:<RBS></RBS>
  }
    ]}
  ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
