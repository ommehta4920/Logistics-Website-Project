import React from 'react'
import './client_vehicle.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Client_vehicle = () => {
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
    <div className='client_vehicle'>
        <div className='client_vehicle_banner'>
          <div className='client_vehicle_banner_overlay'>
            <div className='client_vehicle_title'>
              <h3>Our expertise</h3>
              <h2>Vehicles</h2>
            </div>
          </div>
        </div>
        <div className='client_vehicle_table'>
          <div className='client_vehicle_box'>
            <div className='client_vehicle_row'>
              <div className='client_vehicle_img'><img src='/images/container 32ft.jpg' alt='truck img'></img></div>
              <div className='client_vehicle_content'>
                <h2>Container 32ft</h2>
                <p>Rent: <span>150₹/KM</span></p>
                <p>Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iste eius exercitationem cumque recusandae iusto illo eum, provident maiores culpa reprehenderit adipisci enim non, pariatur placeat? Voluptatibus odio cum eius.</span></p>
                <p>Capacity: <span>40,000 KG</span></p>
              </div>
            </div>
            <div className='client_vehicle_row'>
              <div className='client_vehicle_content'>
                <h2>Tata Taurus</h2>
                <p>Rent: <span>150₹/KM</span></p>
                <p>Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iste eius exercitationem cumque recusandae iusto illo eum, provident maiores culpa reprehenderit adipisci enim non, pariatur placeat? Voluptatibus odio cum eius.</span></p>
                <p>Capacity: <span>40,000 KG</span></p>
              </div>
              <div className='client_vehicle_img'><img src='/images/tata tauras.jpg' alt='truck img'></img></div>
            </div>
            <div className='client_vehicle_row'>
              <div className='client_vehicle_img'><img src='/images/eicher 19.jpg' alt='truck img'></img></div>
              <div className='client_vehicle_content'>
                <h2>Eicher 19</h2>
                <p>Rent: <span>150₹/KM</span></p>
                <p>Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iste eius exercitationem cumque recusandae iusto illo eum, provident maiores culpa reprehenderit adipisci enim non, pariatur placeat? Voluptatibus odio cum eius.</span></p>
                <p>Capacity: <span>40,000 KG</span></p>
              </div>
            </div>
            <div className='client_vehicle_row'>
              <div className='client_vehicle_content'>
                <h2>Tata Ultra</h2>
                <p>Rent: <span>150₹/KM</span></p>
                <p>Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iste eius exercitationem cumque recusandae iusto illo eum, provident maiores culpa reprehenderit adipisci enim non, pariatur placeat? Voluptatibus odio cum eius.</span></p>
                <p>Capacity: <span>40,000 KG</span></p>
              </div>
              <div className='client_vehicle_img'><img src='/images/tata ultra.jpg' alt='truck img'></img></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Client_vehicle