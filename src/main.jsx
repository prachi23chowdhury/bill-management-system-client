import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from './component/Home/Home';
import AllBills from './component/AllBills/AllBills';
import RootLayout from './layout/RootLayout';

const router = createBrowserRouter([
  {
    path: "/",
    Component :RootLayout,
    children:[
      // nested route
      {
        index:true,
        Component:Home
      },
      {
        path:"alBills",
        Component: AllBills
      }
      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <RouterProvider router={router} />

  </StrictMode>,
)

