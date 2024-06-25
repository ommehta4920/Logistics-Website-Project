import React from 'react'
import Sidebar from './sidebar'
import Navbar from "./d_navbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import validate from './adminvalidate';
const driver_edit = () => {
  const [values,setvalues]=useState([]);
  const location=useLocation();
  const navigate=useNavigate();
  const [id,setid]=useState(0);
  console.log("test",location.state.id)
  useEffect(()=>{
    console.log("useeffect",location.state.id)
    axios.post("http://localhost:8800/adtdetails",{
      role:"driver",
      did:location.state.id,
    }).then(res =>{
      console.log(res.data);
      setvalues(res.data);
      setid(res.data.dri_id);
    }).catch(err => console.log(err))
  },location.state.id)
  const [errors,seterrors]=useState({});
  function handleupdata(e){
    e.preventDefault();
    seterrors(validate(values));
    const checkerr=validate(values);
    if(Object.entries(checkerr).length=== 0){
      axios.put("http://localhost:8800/update/"+id,
        {
          role:"driver",
          username:values.username,
          dri_email:values.dri_email,
          dri_contact:values.dri_contact,
        }
      ).then(res => {
        if(res.data.Status === "Success"){
          navigate("/admin/driver")
        }
        else{
          alert("Not updated driver")
        }
      }).catch(err => console.log(err));
    }
  }
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
              <p>Edit Driver Table</p>
            </div>
            <div className="body" style={{width: "50%"}}>
              <form>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>User Name</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter User Name"
                      // required
                      value={values.username}
                      onChange={e=> setvalues({...values, username: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.username && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.username}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>Email ID</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Email ID"
                      required
                      value={values.dri_email}
                      onChange={e=> setvalues({...values, dri_email: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.dri_email && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.dri_email}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>Contact No</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Contact No"
                      required
                      value={values.dri_contact}
                      onChange={e=> setvalues({...values, dri_contact: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.dri_contact && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.dri_contact}</div>}
                  </div>
                </div>
                <button onClick={handleupdata} className="btn_insert" type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default driver_edit