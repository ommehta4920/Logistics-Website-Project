import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import validate from './adminvalidate';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const city_insert = () => {
  const [values,setvalues]=useState({state_id:'',city_name:''});
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
        role:"city",
        city:values.city_name,
        stateid:values.state_id,
    }).then(res=>{if(res.data.Message === "Success"){
      navigate("/admin/city")
    }
    else{
      alert("Not updated city name")
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
              <p>Insert into the City Table</p>
            </div>
            <div className="body" style={{width: "50%"}}>
              <form onSubmit={handlevalidate}>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>State Id</label>
                    <input
                      type="number"
                      className="txtbox"
                      placeholder="Enter State Name"
                      name="state_id"
                      // required
                      onChange={handleinput}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.state_id && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.state_id}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>City Name</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter City Name"
                     // required
                     onChange={handleinput} 
                     name='city_name'
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.city_name && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.city_name}</div>}
                  </div>
                </div>
                <button className="btn_insert" type="submit">Insert</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default city_insert