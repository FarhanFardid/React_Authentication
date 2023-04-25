import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './Components/Main.jsx'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import AuthProvider from './providers/AuthProvider'
import PrivateRoute from './Routes/PrivateRoute'
import Orders from './Components/Orders'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      },
      {
        path: 'orders',
        element:<PrivateRoute><Orders></Orders></PrivateRoute>
      }
    ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} ></RouterProvider>
    
    </AuthProvider>
   
  </React.StrictMode>,
)
