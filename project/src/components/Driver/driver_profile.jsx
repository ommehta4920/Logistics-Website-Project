import React, {useState} from 'react'
import Driver_sidebar from './driver_sidebar'
import Driver_navbar from './driver_navbar'
import My_profile from './my_profile'
import Edit_profile from './edit_profile'
import './driver_profile.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Driver_profile = () => {
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
    const [showForm, setShowForm] = useState(true);
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
          <div className='body-content'>
            <div className='profile'>
                <button className={`btn_profile ${showForm ? 'btn_active' : 'btn_inactive'}`} onClick={ () => setShowForm(true)}>My Profile</button>
                <button className={`btn_profile ${!showForm ? 'btn_active' : 'btn_inactive'}`} onClick={ () => setShowForm(false)}>Edit Profile</button>
            </div>
            <div className='display_profile'>
                {showForm ? <My_profile data={id}/> : <Edit_profile data={id} />}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Driver_profile