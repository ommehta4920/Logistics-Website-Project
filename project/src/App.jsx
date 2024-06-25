import React from 'react'
import Nav from './components/navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import Login from './components/login'
import Vehicle from './components/vehicle'
import Order_Booking from './components/order_booking'
import Register from './components/register'
import Footer from './components/footer'
import Admin_login from './components/Admin/Admin_login'
import D_Home from './components/Admin/d_home'
import State from './components/Admin/state'
import State_insert from './components/Admin/admin_state_insert'
import State_edit from './components/Admin/admin_state_edit'
import City from './components/Admin/city'
import City_insert from './components/Admin/city_insert'
import City_edit from './components/Admin/city_edit'
import Customer from './components/Admin/customer'
import Customer_insert from './components/Admin/customer_insert'
import Customer_edit from './components/Admin/customer_edit'
import Area from './components/Admin/area'
import Total_Vehicle from './components/Admin/vehicle'
import Vehicle_details from './components/Admin/vehicle_details'
import Vehicle_detail_insert from './components/Admin/vehicle_detail_insert'
import Vehicle_detail_edit from './components/Admin/vehicle_detail_edit'
import Driver from './components/Admin/driver'
import Driver_insert from './components/Admin/driver_insert'
import Driver_edit from './components/Admin/driver_edit'
import Booking from './components/Admin/booking'
import Feedback from './components/Admin/feedback'
import Driver_Home from './components/Driver/Driver_Home'
import Driver_profile from './components/Driver/driver_profile'
import Shipment from './components/Driver/shipment'
import Client_home from './components/Client/client_home'
import Client_navbar from './components/Client/client_navbar'
import Client_footer from './components/Client/client_footer'
import Client_profile from './components/Client/client_profile'
import Client_about from './components/Client/client_about'
import Client_vehicle from './components/Client/client_vehicle'
import Client_booking from './components/Client/client_booking'
import Client_booking_history from './components/Client/client_booking_history'
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Nav/><Home /><Footer /></>
    },
    {
      path: "/login",
      element: <><Nav /><Login /><Footer /></>
    },
    {
      path: "/about",
      element: <><Nav /><About /><Footer /></>
    },
    {
      path: "/vehicle",
      element: <><Nav /><Vehicle /><Footer /></>
    },
    {
      path: "/booking",
      element: <><Nav /><Order_Booking /></>
    },
    {
      path: "/register",
      element: <><Nav /><Register /><Footer /></>
    },
    {
      path:"/admin/login",
      element:<><Admin_login /></>
    },
    {
      path: "/admin/home",
      element: <><D_Home /></>
    },
    {
      path: "/admin/state",
      element: <><State /></>
    },
    {
      path: "/admin/state/insert",
      element: <><State_insert /></>
    },
    {
      path: "/admin/state/edit",
      element: <><State_edit /></>
    },
    {
      path: "/admin/city",
      element: <><City /></>
    },
    {
      path: "/admin/city/insert",
      element: <><City_insert /></>
    },
    {
      path: "/admin/city/edit",
      element: <><City_edit /></>
    },
    {
      path: "/admin/area",
      element: <><Area /></>
    },
    {
      path: "/admin/customer",
      element: <><Customer /></>
    },
    {
      path: "/admin/customer/insert",
      element: <><Customer_insert /></>
    },
    {
      path: "/admin/customer/edit",
      element: <><Customer_edit /></>
    },
    {
      path: "/admin/vehicle",
      element: <><Total_Vehicle /></>
    },
    {
      path: "/admin/vehicle_details",
      element: <><Vehicle_details /></>
    },
    {
      path: "/admin/vehicle_detail/insert",
      element: <><Vehicle_detail_insert /></>
    },
    {
      path: "/admin/vehicle_detail/edit",
      element: <><Vehicle_detail_edit /></>
    },
    {
      path: "/admin/driver",
      element: <><Driver /></>
    },
    {
      path: "/admin/driver/insert",
      element: <><Driver_insert /></>
    },
    {
      path: "/admin/driver/edit",
      element: <><Driver_edit /></>
    },
    {
      path: "/admin/booking",
      element: <><Booking /></>
    },
    {
      path: "/admin/feedback",
      element: <><Feedback /></>
    },
    {
      path: "/driver/home",
      element: <><Driver_Home /></>
    },
    {
      path: "/driver/profile",
      element: <><Driver_profile /></>
    },
    {
      path: "/driver/shipment",
      element: <><Shipment /></>
    },
    {
      path: "/client/home",
      element: <><Client_navbar /><Client_home /><Client_footer /></>
    },
    {
      path: "/client/profile",
      element: <><Client_navbar /><Client_profile /><Client_footer /></>
    },
    {
      path: "/client/about",
      element: <><Client_navbar /><Client_about /><Client_footer /></>
    },
    {
      path: "/client/vehicle",
      element: <><Client_navbar /><Client_vehicle /><Client_footer /></>
    },
    {
      path: "/client/booking",
      element: <><Client_navbar /><Client_booking /><Client_footer /></>
    },
    {
      path: "/client/booking_history",
      element: <><Client_navbar /><Client_booking_history /><Client_footer /></>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App