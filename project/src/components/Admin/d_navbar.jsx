import React from 'react'
import './d_navbar.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Dashboard_Navbar = () => {
  const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            console.log("Admin Navbar Login");
        }
        else{
          setmessage(res.data.Message);
          // navigate("/admin/login");
        }
      })
    },[])
  return (
    <>
      <div className='driver_header'>
        <div className='box'>
          <h2>Welcome <span>{name}!</span></h2>
        </div>
      </div>
    </>
  )
}

export default Dashboard_Navbar