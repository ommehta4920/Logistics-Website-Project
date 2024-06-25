import React from 'react'
import Sidebar from './sidebar'
import Navbar from "./d_navbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import validate from './adminvalidate';
const customer_edit = () => {
  const [values,setvalues]=useState([]);
  const location=useLocation();
  const navigate=useNavigate();
  const [id,setid]=useState(0);
  console.log("test",location.state.id)
  useEffect(()=>{
    console.log("useeffect",location.state.id)
    axios.post("http://localhost:8800/adtdetails",{
      role:"customer",
      did:location.state.id,
    }).then(res =>{
      console.log(res.data);
      setvalues(res.data);
      setid(res.data.cust_id);
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
          role:"customer",
          username:values.username,
          cust_email:values.cust_email,
          cust_contact:values.cust_contact,
        }
      ).then(res => {
        if(res.data.Status === "Success"){
          navigate("/admin/customer")
        }
        else{
          alert("Not updated customer")
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
              <p>Edit Customer Table</p>
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
                      value={values.username}
                      onChange={e=> setvalues({...values, username: e.target.value})}
                      required
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
                      value={values.cust_email}
                      onChange={e=> setvalues({...values, cust_email: e.target.value})}
                      required
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.cust_email && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.cust_email}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "5% 0 0 5%", fontSize: "20px"}}>Contact No</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Contact No"
                      value={values.cust_contact}
                      onChange={e=> setvalues({...values, cust_contact: e.target.value})}
                      required
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.contact && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.conatct}</div>}
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

export default customer_edit