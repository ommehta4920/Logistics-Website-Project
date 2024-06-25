import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import validate from './adminvalidate';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const admin_state_insert = () => {
  const [values,setvalues]=useState({state_name:''});
  const [errors,seterrors]=useState({});
  const navigate=useNavigate();
  function handleinput(event){
    const newObj={...values,[event.target.name]:event.target.value}
    setvalues(newObj);
  }
  function handlevalidate(e){
    e.preventDefault();
    seterrors(validate(values));
    const checkerr=validate(values);
    if(Object.entries(checkerr).length=== 0){
    axios.post('http://localhost:8800/insert',{
        role:"state",
        state:values.state_name,
    }).then(res=>{if(res.data.Message === "Success"){
      navigate("/admin/state")
    }
    else{
      alert("Not updated state name")
    }
  }).catch(err => console.log(err));
} }
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
              <p>Insert into the State Table</p>
            </div>
            <div className="body" style={{width: "50%"}}>
              <form onSubmit={handlevalidate}>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>State Name</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter State Name"
                      // required
                      name="state_name"
                      onChange={handleinput}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.state_name && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.state_name}</div>}
                  </div>
                </div>
                <button className="btn_insert" type="submit">Insert</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default admin_state_insert;
