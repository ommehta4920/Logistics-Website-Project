import React from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelope } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { FaLock, FaUser } from "react-icons/fa";
import {PiSignOutBold} from 'react-icons/pi';
import './client_navbar.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const client_navbar = () => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [id,setid]=useState('');
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800/userstatus')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          setid(res.data.id);
        //   navigate("/home");  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/login");
      }
    })
  },[])
    const handlelogout=()=>{
        axios.get('http://localhost:8800/userlogout')
        .then(res =>{
          if(res.data.Status === "Success")
          location.reload(true);
          else
          alert("error");
        }).catch(err => console.log(err))
      }
  return (
    <>
        <div className='client-navbar-top_bar'>
                <div className='client_content'>
                    <div class="client_left-content">
                        <p>Welcome<span> {name}</span></p>
                    </div>
                    <div class="client_right-content">
                        <ul>
                            <li class="registration">
                                <Link to="/client/profile" className='link'><FaUser className='icon' />Profile</Link>
                            </li>
                            <li class="registration" onClick={handlelogout}>
                                <Link className='link' id='logout'><PiSignOutBold className='icon' />Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='client_nav_container'>
                <div className='client_upper_box'>
                    <div className='client_upper_box'>
                        <img src='/images/logo.png' alt='logo' className='client_nav_logo'></img>
                    </div>
                    <div className='details'>
                        <div className='box'>
                            <div className='left'>
                                <BsEnvelope />
                            </div>
                            <div className='right'>
                                <h2>email</h2>
                                <p>swift_logistics@gmail.com</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='left'>
                                <MdOutlinePhoneIphone />
                            </div>
                            <div className='right'>
                                <h2>call now</h2>
                                <p>(+91) 87348-44204</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='left'>
                                <FiMapPin />
                            </div>
                            <div className='right'>
                                <h2>find us</h2>
                                <p>Ahemdabad, Gujarat, India</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lower_box'>
                    <ul className='ul_links'>
                        <Link to="/client/home" className='small_name'><li>Home</li></Link>
                        <Link to="/client/about" className='small_name'><li>About</li></Link>
                        <Link to="/client/vehicle" className='link'><li>Vehicle</li></Link>
                        {/* <Link to="/client/feedback" className='link'><li>Feedback</li></Link> */}
                        <Link to="/client/booking_history" className='booking_btn'><li>Booking History</li></Link>
                        <Link to="/client/booking" className='booking_btn'><li>Booking</li></Link>                     
                    </ul>
                </div>
            </div>
    </>
  )
}

export default client_navbar