import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from './component/Home/Home';
import AllBills from './component/AllBills/AllBills';
import RootLayout from './layout/RootLayout';
import AuthProvider from './context/AuthProvider';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import { IoClose } from 'react-icons/io5';
import BillDetails from './component/BillsDetails';
import BillsPage from './component/BillPages';
import PayBill from './component/PayBill';
import MyPayBills from './component/MyPayBills';
import About from './component/About';
import AddBill from './component/AddBill';
import Profile from './component/Profile';


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
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "about",
        Component: About
      },
      {
        path: "/bills/:id",
        Component: BillDetails
      },
      {
        path: "/bills",
        Component: BillsPage
      },
      {
        path: "paybill", 
        Component: PayBill
      },
     {
        path: "mypaybills", 
        Component: MyPayBills
      },
       {
        path: "profile", 
        Component: Profile
      },
       {
    path: "*",
    element: (
      <div className=" flex items-center justify-center min-h-screen bg-gradient-to-r from-red-100 via-pink-100 to-orange-100">
       <IoClose className="text-6xl text-red-500  mb-3 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-red-600 mb-2">
            Error 404 - Page Not Found
          </h2>
      </div>
    ),
  }
      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

  </StrictMode>,
)

