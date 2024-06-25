import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import axios from 'axios';
const Sidebar = () => {
  axios.defaults.withCredentials=true;
  const handlelogout=()=>{
    console.log("clicked");
    axios.get('http://localhost:8800/adminlogout')
    .then(res =>{
      if(res.data.Status === "Success"){
      location.reload(true);
      }
      else
      alert("error");
    }).catch(err => console.log(err))
  }
  return (
    <>
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src="/images/logo.png" alt="logo"></img>
          </div>
          <div className="links">
            <ul>
              <Link to="/admin/home" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Home
                </li>
              </Link>
              <Link to="/admin/state" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  State
                </li>
              </Link>
              <Link to="/admin/city" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  City
                </li>
              </Link>
              {/* <Link to="/admin/area" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Area
                </li>
              </Link> */}
              <Link to="/admin/customer" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Customer
                </li>
              </Link>
              {/* <Link to="/admin/vehicle" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Vehicles
                </li>
              </Link> */}
              <Link to="/admin/vehicle_details" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Vehicle Details
                </li>
              </Link>
              <Link to="/admin/driver" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Driver
                </li>
              </Link>
              <Link to="/admin/booking" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Booking
                </li>
              </Link>
              <Link to="/admin/feedback" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Feedback
                </li>
              </Link>
              <Link  className=" logout">
                <li onClick={handlelogout}>
                  <div className="icon">
                    <PiSignOutBold />
                  </div>
                  Signout
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar