import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Area = () => {
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
            navigate("/admin/area");  
        }
        else{
          setmessage(res.data.Message);
          navigate("/admin/login");
        }
      })
    },[])
  return (
    <>
    <div className="page-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="right">
          <div className="header">
            <Navbar />
          </div>
          <div className="main-content">
            <div className="title">
              <p>Area Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search...'></input>
              </div>
              <div className="table_container">
                Table will be show here.
              </div>
              <div className="btn_box">
                <button className="btn_insert">Insert</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Area