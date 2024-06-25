import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import validate from './adminvalidate';
import { useNavigate } from 'react-router-dom';
const admin_state_edit = () => {
  const [values,setvalues]=useState({state_name:''});
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const location=useLocation();
  const navigate=useNavigate();
  const [id,setid]=useState(0);
  useEffect(()=>{
    console.log("useeffect",location.state.id)
    axios.post("http://localhost:8800/adtdetails",{
      role:"state",
      did:location.state.id,
    }).then(res =>{
      console.log(res.data);
      setvalues(res.data);
      setid(res.data.state_id);
    }).catch(err => console.log(err))
  },location.state.id)
  const [errors,seterrors]=useState({});
  function handleupdata(e){
     e.preventDefault();
    seterrors(validate(values));
    const checkerr=validate(values);
  //   console.log("values",values);
  //  console.log("errors",checkerr);
  //   console.log("error real",errors);
    if(Object.entries(checkerr).length=== 0){
      axios.put("http://localhost:8800/update/"+id,
        {
          role:"state",
          state_name:values.state_name 
        }
      ).then(res => {
        if(res.data.Status === "Success"){
          navigate("/admin/state")
        }
        else{
          alert("Not updated state name")
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
              <p>Edit State Table</p>
            </div>
            <div className="body" style={{width: "50%"}}>
              <form>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>State Name</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter State Name"
                      required
                      value={values.state_name}
                      onChange={e=> setvalues({...values, state_name: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.state_name && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.state_name}</div>}
                  </div>
                </div>
                <button className="btn_insert" onClick={handleupdata} type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default admin_state_edit