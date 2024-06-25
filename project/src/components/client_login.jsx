import React from "react";
import './login_form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Validation from './Validation';
import axios from 'axios';
const Client_login = () => {
  const [values,setvalues]= useState({
    email:'',
    password:''
  })
  const [errors,seterrors]=useState({
    email:'',
    password:'',
  });
  const navigate= useNavigate();
  function handleinput(event){
    const newObj={...values,[event.target.name]:event.target.value}
    setvalues(newObj);
  }
  const [loginstatus,setloginstatus]=useState("");
  axios.defaults.withCredentials=true;
  function handleValidation(event){
    event.preventDefault();
    seterrors(Validation(values));
    const checkerror=Validation(values);
    console.log(checkerror.email);
    //alert(errors.email+" "+errors.password);
     if(checkerror.email=== undefined && checkerror.password=== undefined){
      axios.post("http://localhost:8800/login",{
      email:values.email,
      password:values.password,
      }).then((response)=>{
        if(response.data.message){
          setloginstatus(response.data.message);
          console.log(response.data.maessage);
        }else{
          setloginstatus("Logged in");
          console.log("Logged in");
          navigate("/client/home")
        }
      })
    }
  }
  return (
    <>
      <form onSubmit={handleValidation}>
      <div style={{color:'red',fontsize:'10px',textAlign:'center', marginTop:'5px'}}>{loginstatus} </div>
        <div className="form_container">
          <div className="content">
            <label>Email ID</label>
            <input type="text" className="txtbox" placeholder="Enter Email ID" name='email' onChange={handleinput}></input>
            {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
          </div>
        </div>
        <div className="form_container">
          <div className="content">
            <label>Password</label>
            <input type="password" className="txtbox" placeholder="Enter Password" name='password' onChange={handleinput}></input>
            {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
          </div>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Client_login;
