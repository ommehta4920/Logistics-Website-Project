import React, { useState } from "react";
import My_profile from "./client_my_profile";
import Edit_profile from "./client_edit_profile";
import "./client_profile.css";
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Client_profile = () => {
  const [showForm, setShowForm] = useState(true);
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
      <div className="client_profile-page-container">
        <div className="client_profile_body-content">
          <div className="client_profile">
            <button
              className={`btn_profile ${
                showForm ? "btn_active" : "btn_inactive"
              }`}
              onClick={() => setShowForm(true)}
            >
              My Profile
            </button>
            <button
              className={`btn_profile ${
                !showForm ? "btn_active" : "btn_inactive"
              }`}
              onClick={() => setShowForm(false)}
            >
              Edit Profile
            </button>
          </div>
          <div className="client_display_profile">
            {showForm ? <My_profile /> : <Edit_profile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Client_profile;