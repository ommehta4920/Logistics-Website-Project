import React from 'react'
import './client_my_profile.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
const Client_my_profile = () => {
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
  return (
    <>
    <table className='client_my_profile_tbl'>
        <tr>
            <th className='client_my_profile_th' style={{width: "40%"}}>First Name</th>
            <td className='client_my_profile_td'>{values.first_name}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>Last Name</th>
            <td className='client_my_profile_td'>{values.last_name}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>User Name</th>
            <td className='client_my_profile_td'>{values.username}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>Email ID</th>
            <td className='client_my_profile_td'>{values.cust_email}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>Contact No</th>
            <td className='client_my_profile_td'>{values.cust_contact}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>Gender</th>
            <td className='client_my_profile_td'>{values.gender}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>Address</th>
            <td className='client_my_profile_td'>{values.address}</td>
        </tr>
        <tr>
            <th className='client_my_profile_th'>Area</th>
            <td className='client_my_profile_td'>{values.area_id}</td>
        </tr>
    </table>
    </>
  )
}

export default Client_my_profile