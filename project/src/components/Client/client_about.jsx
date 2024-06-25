import React from 'react'
import { FaTruckFast } from "react-icons/fa6";
import { PiHeadsetFill } from "react-icons/pi";
import { Ri24HoursLine } from "react-icons/ri";
import './client_about.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Client_about = () => {
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
          setname(res.data.name);
          setid(res.data.id);
      }
      else{
        setmessage(res.data.Message);
        navigate("/login");
      }
    })
  },[])
  return (
    <>
    <div className='client'>
      <div className='client_banner'>
            <div className='client_banner_overlay'>
              <div className='client_title'>
                <h3>Who we are</h3>
                <h2>About Our Company</h2>
              </div>
            </div>
      </div>
      <div className='client_about'>
        <div className='client_about_left'>
          <div className='client_about_title'>
            <h1>Our Services</h1>
          </div>
          <div className='client_about_content'>
            <p>
            M&P Movers Packers are well-known Packing and Mover Company in ahmedabad. We provide high-quality services for packing and moving, company shifting, and home relocation. If you are planning to shift to a new location you can trust M&P Movers Packers. We move all kinds of goods to various locations. M&P Movers Packers has got a dedicated team of experienced executives. They are intelligent enough to resolve the issue of the clients. We have got packing professionals who know all kinds of packing of the goods.
            </p>
            <p>
            We M&P Movers Packers   secure and affordable home relocation services. M&P Movers Packers are the professional packers and movers in Ahmedabad. The company will provide you with the best possible local house shifting. The company also caters to office, commercial, and industrial relocation needs. 
            </p>
          </div>
        </div>
        <div className='client_about_right'>
          <img src='/images/crew.png' alt='our team'></img>
        </div>
      </div>

      <div className='client_about_more'>
        <div className='client_about_more_left'>
          <div className='client_about_more_title'>
            <h2>More about Us</h2>
            <h1>Why people choose us</h1>
          </div>
          <div className='client_about_more_content'>
            <p>
              M&P Movers Packers have smart and skilled, trained staff for quality work. We provide services such as Household Shifting, Office Shifting, Packing and Unpacking, Loading and Unloading.
            </p>
            <div className='client_about_services'>
              <div className='client_about_service'>
                <div className='client_services_left'>
                  <FaTruckFast />
                </div>
                <div className='client_services_right'>
                  <h2>Safe and Time-Saving Service</h2>
                  <p>We ensure that the goods moved are protected properly against rain, dust, sun, water and pilferage possibilities.</p> 
                </div>
              </div>
              <div className='client_about_service'>
                <div className='client_services_left'>
                  <PiHeadsetFill />
                </div>
                <div className='client_services_right'>
                  <h2>Safety & Compliance</h2>
                  <p>M&P Movers Packers have smart and skilled, trained staff for quality work. They are intelligent enough to resolve the issue of the clients</p> 
                </div>
              </div>
              <div className='client_about_service'>
                <div className='client_services_left'>
                  <Ri24HoursLine />
                </div>
                <div className='client_services_right'>
                  <h2>24/7 Support</h2>
                  <p>24/7 support means a support service that is provided 24 hours a day and 7 days a week.</p> 
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

export default Client_about