import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import validate from './adminvalidate';
const city_edit = () => {
  const [values,setvalues]=useState([]);
  const location=useLocation();
  const navigate=useNavigate();
  const [id,setid]=useState(0);
  console.log("test",location.state.id)
  useEffect(()=>{
    console.log("useeffect",location.state.id)
    axios.post("http://localhost:8800/adtdetails",{
      role:"city",
      did:location.state.id,
    }).then(res =>{
      console.log(res.data);
      setvalues(res.data);
      setid(res.data.city_id);
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
          role:"city",
          city_name:values.city_name ,
          state_id:values.state_id,
        }
      ).then(res => {
        if(res.data.Status === "Success"){
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
              <p>Edit City Table</p>
            </div>
            <div className="body" style={{width: "50%"}}>
              <form>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>State Id</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter State Name"
                      required
                      value={values.state_id}
                      onChange={e=> setvalues({...values, state_id: e.target.value})}
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
                      required
                      value={values.city_name}
                      onChange={e=> setvalues({...values, city_name: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.city_name && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.city_name}</div>}
                  </div>
                </div>
                <button className="btn_insert"  onClick={handleupdata}type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default city_edit