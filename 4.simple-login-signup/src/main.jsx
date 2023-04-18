import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Components/Root/Root';
import Home from './Components/Root/Layout/Home';
import Google from './Components/Root/Layout/Google';
import Github from './Components/Root/Layout/Github';
import Register from './Components/Root/Layout/Register';
import Login from './Components/Root/Layout/Login';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
    {
      path:'google',
      element:<Google></Google>
    },
    {
      path:'github',
      element:<Github></Github>
    },
    {
      path:'register',
      element:<Register></Register>
    },
    {
      path:'login',
      element:<Login></Login>
    }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
