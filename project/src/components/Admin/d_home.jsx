import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import Navbar from './d_navbar'
import './d_home.css'
import { FaUser } from "react-icons/fa";
import { PiListBulletsFill } from "react-icons/pi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [customers,setcustomers]=useState(0);
  const [vehicles,setvehicles]=useState(0);
  const [bookings,setbookings]=useState(0);
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          navigate("/admin/home");  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/admin/login");
      }
    })
  },[])
  useEffect(() =>{
    axios.get('http://localhost:8800/ahcount')
    .then( res =>{
      if(res.data.Status === "Success"){
        console.log(res.data.count);
        setcustomers(res.data.count);
      }
      else{
        console.log(res.data.Message);
      }
    })
  },[])
  useEffect(() =>{
    axios.get('http://localhost:8800/vhcount')
    .then( res =>{
      if(res.data.Status === "Success"){
        console.log(res.data.count);
        setvehicles(res.data.count);
      }
      else{
        console.log(res.data.Message);
      }
    })
  },[])
  useEffect(() =>{
    axios.get('http://localhost:8800/bkcount')
    .then( res =>{
      if(res.data.Status === "Success"){
        console.log(res.data.count);
        setbookings(res.data.count);
      }
      else{
        console.log(res.data.Message);
      }
    })
  },[])
  return (
    <>
      <div className='home-container'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='right'>
          <div className='header'>
            <Navbar />
          </div>
          <div className='main-content'>
            <div className='title'>
              <p>Profile Statistics</p>
            </div>
            <div className='cards'>
              <div className='card'>
                <div className='left'><FaUser /></div>
                <div className='right'>
                  <div className='upper'>
                    <p>Total Customers</p>
                  </div>
                  <div className='lower'>
                    <p>{customers}</p>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='left'><PiListBulletsFill /></div>
                <div className='right'>
                  <div className='upper'>
                    <p>Our Vehicles</p>
                  </div>
                  <div className='lower'>
                    <p>{vehicles}</p>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='left'><RiMoneyRupeeCircleFill /></div>
                <div className='right'>
                  <div className='upper'>
                    <p>Total Booking</p>
                  </div>
                  <div className='lower'>
                    <p>{bookings}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home