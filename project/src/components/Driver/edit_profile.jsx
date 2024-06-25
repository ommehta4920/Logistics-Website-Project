import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import validate from './drivervalidate'
const Edit_profile = (props) => {
  const [values,setvalues]=useState([]);
  useEffect(()=>{
    axios.post("http://localhost:8800/adtdetails",{
      role:"driver",
      did:props.data,
    }).then(res =>{
      console.log(res.data);
      setvalues(res.data);
    }).catch(err => console.log(err))
  },props.data)
  const [errors,seterrors]=useState({});
  const navigate=useNavigate();
  function register(event){
    event.preventDefault();
    seterrors(validate(values));
    const checkerr=validate(values);
    console.log(Object.entries(checkerr).length)
    if(Object.entries(checkerr).length=== 0){
      axios.put("http://localhost:8800/updatedriver",{
          id:values.dri_id,
          fname:values.first_name,
          lname:values.last_name,
          username:values.username,
          email:values.dri_email,
          contact:values.dri_contact,
          password:values.password,
          address:values.address,
          area:values.area,
          gender:values.gender,
          license:values.dri_license,
      }).then(res => {
        if(res.data.Status === "Success"){
          location.reload(true);
        }
        else{
          alert("Not updated Driver")
        }
      }).catch(err => console.log(err));
    }
  }
  return (
    <>
    <form>
        <div className="box">
          <div className="content">
            <label>First Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter First Name"
              value={values.first_name}
              onChange={e=> setvalues({...values,first_name: e.target.value})}
              required
            ></input>
            {errors.fname && <div style={{color:'red'}}>{errors.fname}</div>}
          </div>
          <div className="content">
            <label>Last Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter Last Name"
              value={values.last_name}
              onChange={e=> setvalues({...values, last_name: e.target.value})}
              required
            ></input>
            {errors.lname && <div style={{color:'red'}}>{errors.lname}</div>}
          </div>
        </div>
        <div className="box">
          <div className="content">
            <label>User Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter User Name"
              value={values.username}
              onChange={e=> setvalues({...values, username: e.target.value})}
              required
            ></input>
            {errors.username && <div style={{color:'red'}}>{errors.username}</div>}
          </div>
          <div className="content">
            <label>Email</label>
            <input
              type="email"
              className="txtbox"
              placeholder="Enter Your Email"
              value={values.dri_email}
              required
              onChange={e=> setvalues({...values, dri_email: e.target.value})}
            ></input>
            {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
          </div>
        </div>
        <div className="box">
          <div className="content">
            <label>Contact No.</label>
            <input
              type="tel"
              className="txtbox"
              placeholder="Enter Contact Number"
              value={values.dri_contact}
              required
              onChange={e=> setvalues({...values, dri_contact: e.target.value})}
            ></input>
            {errors.contact && <div style={{color:'red'}}>{errors.contact}</div>}
          </div>
          <div className="content">
              <label>Select your Gender:</label>
              <select className="txtbox" name="gender" id="gender" required value={values.gender} onChange={e=> setvalues({...values, gender: e.target.value})}>
                <option disabled={true}  value="" selected id="default_op">
                  - Select your gender -
                </option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Others</option>
              </select>
              {errors.gender && <div style={{color:'red'}}>{errors.gender}</div>}
            </div>
        </div>
        <div className="box">
          <div className="content">
            <label>Password</label>
            <input
              type="password"
              className="txtbox"
              placeholder="Enter Password"
              value={values.password}
              required
              onChange={e=> setvalues({...values, password: e.target.value})}
            ></input>
            {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
          </div>
          <div className="content">
            <label>Confirm Password</label>
            <input
              type="password"
              className="txtbox"
              placeholder="Enter Confirm Password"
              value={values.password}
              required
              //onChange={e=> setvalues({...values, cpassword: e.target.value})}
            ></input>
            {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
          </div>
        </div>
        <div className="box">
          <div className="content">
            <label>Address</label>
            <textarea
              className="txtbox"
              placeholder="Enter your Address"
              value={values.address}
              required
              onChange={e=> setvalues({...values, address: e.target.value})}
            ></textarea>
            {errors.address && <div style={{color:'red'}}>{errors.address}</div>}
          </div>
        </div>
        <div className="box">
          <div className="content">
            <label>Area</label>
            <select className="txtbox" name="area" id="area" required value={values.area} onChange={e=> setvalues({...values, area: e.target.value})}>
              <option disabled={true} value="" selected>
                -- Select your area --
              </option>
              <option value="1">area1</option>
              <option value="2">area2</option>
              <option value="3">area3</option>
            </select>
            {errors.area && <div style={{color:'red'}}>{errors.area}</div>}
          </div>
          <div className="content">
            <label>Licence No</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter Licence Number"
              value={values.dri_license}
              required
              onChange={e=> setvalues({...values, dri_license: e.target.value})}
            ></input>
            {errors.license && <div style={{color:'red'}}>{errors.license}</div>}
          </div>
        </div>
        <button onClick={register} type="submit">Update</button>
      </form>
    </>
  )
}

export default Edit_profile