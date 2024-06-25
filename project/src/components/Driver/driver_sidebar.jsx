import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import './driver_sidebar.css'
import axios from 'axios';
const Driver_sidebar = () => {
  const handlelogout=()=>{
    axios.get('http://localhost:8800/drlogout')
    .then(res =>{
      if(res.data.Status === "Success")
      location.reload(true);
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
              <Link to="/driver/home" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Home
                </li>
              </Link>
              <Link to="/driver/profile" className="link">
                <li>
                  <div className="icon">
                    <FaUser />
                  </div>
                  Profile
                </li>
              </Link>
              <Link to="/driver/shipment" className="link">
                <li>
                  <div className="icon">
                    <MdDashboard />
                  </div>
                  Shipments
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
  )
}

export default Driver_sidebar