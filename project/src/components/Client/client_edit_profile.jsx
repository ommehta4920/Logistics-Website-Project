import React from 'react'
import './client_edit_profile.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import validate from './clientvalidate';
const Client_edit_profile = () => {
  const [auth,setauth]=useState(false);
    const [name,setname]=useState(null);
    const [message,setmessage]=useState('');
    const [id,setid]=useState(null);
    const [values,setvalues]=useState([]);
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('http://localhost:8800/userstatus')
        .then( res=>{
          if(res.data.Status === "Success"){
              setauth(true);
              //alert(res.data.Status);
              setname(res.data.name);
              setid(res.data.id);
              // navigate("/vehical");
              axios.post("http://localhost:8800/adtdetails",{
                role:"customer",
                did:res.data.id,
        })
        .then(res => {console.log(res.data);
                        console.log("success");
                    setvalues(res.data);
                })
        .catch(err => console.log(err))  
          }
          else{
            setmessage(res.data.Message);
            alert(res.data.Message);
          }
        })
      },[])
      const [errors,seterrors]=useState({});
function handleValidate(e){
    e.preventDefault();
    seterrors(validate(values));
    const checkerr=validate(values);
    console.log(Object.entries(checkerr).length)
    if(Object.entries(checkerr).length=== 0){
      axios.put("http://localhost:8800/updatecust",{
          id:values.cust_id,
          fname:values.first_name,
          lname:values.last_name,
          username:values.username,
          email:values.cust_email,
          contact:values.cust_contact,
          password:values.password,
          address:values.address,
          area:values.area_id,
          gender:values.gender,
      }).then(res => {
        if(res.data.Status === "Success"){
          location.reload(true);
        }
        else{
          alert("Not updated Customer")
        }
      }).catch(err => console.log(err));
    }
  }
  return (
    <>
    <form className='client_edit_profile_form' onSubmit={handleValidate}>
        <div className="client_edit_profile_box">
          <div className="client_edit_profile_content">
            <label>First Name</label>
            <input
              type="text"
              className="txtbox"
              value={values.first_name}
              onChange={e=> setvalues({...values,first_name: e.target.value})}
              placeholder="Enter First Name"
              required
            ></input>
            {errors.fname && <div style={{color:'red'}}>{errors.fname}</div>}
          </div>
          <div className="client_edit_profile_content">
            <label>Last Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter Last Name"
              value={values.last_name}
              onChange={e=> setvalues({...values,last_name: e.target.value})}
              required
            ></input>
            {errors.lname && <div style={{color:'red'}}>{errors.lname}</div>}
          </div>
        </div>
        <div className="client_edit_profile_box">
          <div className="client_edit_profile_content">
            <label>User Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter User Name"
              value={values.username}
              onChange={e=> setvalues({...values,username: e.target.value})}
              required
            ></input>
            {errors.username && <div style={{color:'red'}}>{errors.username}</div>}
          </div>
          <div className="client_edit_profile_content">
            <label>Email</label>
            <input
              type="email"
              className="txtbox"
              placeholder="Enter Your Email"
              value={values.cust_email}
              onChange={e=> setvalues({...values,cust_email: e.target.value})}
              required
            ></input>
            {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
          </div>
        </div>
        <div className="client_edit_profile_box">
          <div className="client_edit_profile_content">
            <label>Contact No.</label>
            <input
              type="tel"
              className="txtbox"
              placeholder="Enter Contact Number"
              value={values.cust_contact}
              onChange={e=> setvalues({...values,cust_contact: e.target.value})}
              required
            ></input>
            {errors.contact && <div style={{color:'red'}}>{errors.contact}</div>}
          </div>
          <div className="client_edit_profile_content">
              <label>Select your Gender:</label>
              <select className="txtbox" name="gender" id="gender" onChange={e=> setvalues({...values,gender: e.target.value})} required value={values.gender}>
                <option disabled={true} selected id="default_op">
                  - Select your gender -
                </option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Others</option>
              </select>
              {errors.gender && <div style={{color:'red'}}>{errors.gender}</div>}
            </div>
        </div>
        <div className="client_edit_profile_box">
          <div className="client_edit_profile_content">
            <label>Password</label>
            <input
              type="password"
              className="txtbox"
              placeholder="Enter Password"
              value={values.password}
              onChange={e=> setvalues({...values,password: e.target.value})}
              required
            ></input>
            {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
          </div>
          <div className="client_edit_profile_content">
            <label>Confirm Password</label>
            <input
              type="password"
              className="txtbox"
              placeholder="Enter Confirm Password"
              value={values.password}
              required
            ></input>
            {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
          </div>
        </div>
        <div className="client_edit_profile_box">
          <div className="client_edit_profile_content">
            <label>Address</label>
            <textarea
              className="txtbox"
              placeholder="Enter your Address"
              required
              value={values.address}
              onChange={e=> setvalues({...values,address: e.target.value})}
            ></textarea>
            {errors.address && <div style={{color:'red'}}>{errors.address}</div>}
          </div>
        </div>
        <div className="client_edit_profile_box">
          <div className="client_edit_profile_content">
            <label>Area</label>
            <select className="txtbox" name="area" id="area" required value={values.area_id} onChange={e=> setvalues({...values,area_id: e.target.value})}>
              <option disabled={true} selected>
                -- Select your area --
              </option>
              <option value="1">area1</option>
              <option value="2">area2</option>
              <option value="3">area3</option>
            </select>
            {errors.area && <div style={{color:'red'}}>{errors.area}</div>}
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </>
  )
}

export default Client_edit_profile