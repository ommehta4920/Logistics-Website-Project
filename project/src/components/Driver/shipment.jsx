import React from 'react'
import Driver_sidebar from './driver_sidebar'
import Driver_navbar from './driver_navbar'
import './shipment.css'
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Shipment = () => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [id,setid]=useState('');
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800/dristatus')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          setid(res.data.id);
          // navigate("/vehical");  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/login");
      }
    })
  },[])
  return (
    <>
    <div className='profile-page-container'>
        <div className='sidebar'>
          <Driver_sidebar />
        </div>
        <div className='right'>
          <div className='header'>
            <Driver_navbar  />
          </div>
          <div className='page_title'>
            <p>Your Shipments</p>
          </div>
          <div className='shipment_table'>
            <div className='searchbar'>
                <input type='search' id='search_shipment' placeholder='Search...'></input>
            </div>
            <div className='shipment_details'>
                No Shipments to show.
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Shipment