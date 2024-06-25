import React from "react";
import './register_form.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import validate from "./regvalidate";
import { useState } from "react";
const ClientForm = () => {
  const [registerstatus,setregisterstatus]=useState("");
  const [values,setvalues]=useState({fname:'',lname:'',username:'',email:'',gender:'',
  password:'',cpassword:'',contact:0,address:'',area:0,
  });
  function handleinput(event){
    const newObj={...values,[event.target.name]:event.target.value}
    setvalues(newObj);
  }
  const [errors,seterrors]=useState({});
  const navigate=useNavigate();
  function register(event){
    event.preventDefault();
    seterrors(validate(values));
    const checkerr=validate(values);
    console.log(Object.entries(checkerr).length)
    if(Object.entries(checkerr).length=== 0){
     axios.post("http://localhost:8800/register",{
      fname:values.fname,
      lname:values.lname,
      username:values.username,
      email:values.email,
      gender:values.gender,
      password:values.password,
      cpassword:values.cpassword,
      contact:values.contact,
      address:values.address,
      area:values.area,   
    }).then((response)=>{
      if(response.data.message){
        setregisterstatus(response.data.message);
        console.log(response.data.message)
      }else{
        setregisterstatus("Account created Successfully");
        navigate("/login");
      }
    })
    }
  }
  return (
    <>
      <form onSubmit={register}>
      <div style={{color:'red',fontsize:'7px',textAlign:'center', marginTop:'5px'}}>{registerstatus} </div>
        <div className="box">
          <div className="content">
            <label>First Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter First Name"
              name="fname"
              onChange={handleinput}
            ></input>
            {errors.fname && <div style={{color:'red'}}>{errors.fname}</div>}
          </div>
          <div className="content">
            <label>Last Name</label>
            <input
              type="text"
              className="txtbox"
              placeholder="Enter Last Name"
              name="lname"
              onChange={handleinput}
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
              name="username"
              onChange={handleinput}
            ></input>
            {errors.username && <div style={{color:'red'}}>{errors.username}</div>}
          </div>
          <div className="content">
            <label>Email</label>
            <input
              type="email"
              className="txtbox"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleinput}
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
              name="contact"
              onChange={handleinput}
            ></input>
            {errors.contact && <div style={{color:'red'}}>{errors.contact}</div>}
          </div>
          <div className="content">
              <label>Select your Gender:</label>
              <select className="txtbox" name="gender" id="gender" onChange={handleinput}>
                <option value="" selected id="default_op">
                  - Select your gender -
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
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
              name="password"
              onChange={handleinput}
            ></input>
            {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
          </div>
          <div className="content">
            <label>Confirm Password</label>
            <input
              type="password"
              className="txtbox"
              placeholder="Enter Confirm Password"
              name="cpassword"
              onChange={handleinput}
            ></input>
            {errors.cpassword && <div style={{color:'red'}}>{errors.cpassword}</div>}
          </div>
        </div>
        <div className="box">
          <div className="content">
            <label>Address</label>
            <textarea
              className="txtbox"
              placeholder="Enter your Address"
              name="address"
              onChange={handleinput}
            ></textarea>
            {errors.address && <div style={{color:'red'}}>{errors.address}</div>}
          </div>
        </div>
        <div className="box">
          <div className="content">
            <label>Area</label>
            <select className="txtbox" name="area" id="area" onChange={handleinput}>
              <option value="" selected>
                -- Select your area --
              </option>
              <option value="1">Isanpur</option>
              <option value="2">Maninagar</option>
              <option value="3">Vastrapur</option>
            </select>
            {errors.area && <div style={{color:'red'}}>{errors.area}</div>}
          </div>
        </div>
        <button type="submit">register</button>
      </form>
    </>
  );
};

export default ClientForm;
