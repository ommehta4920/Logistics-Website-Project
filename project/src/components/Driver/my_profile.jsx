import React from 'react'
import './my_profile.css'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const My_profile = (props) => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState(null);
  const [message,setmessage]=useState('');
  const [id,setid]=useState(null);
  const [values,setvalues]=useState([]);
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800/dristatus')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          setid(res.data.id);
          // navigate("/vehical");
    //       axios.post("http://localhost:8800/dridetails",{
    //     did:res.data.id,
    // })
    // .then(res => {console.log(res.data);
    //                 console.log("success");
    //             setvalues(res.data);
    //         })
    // .catch(err => console.log(err))  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/login");
      }
    })
  },[])
 console.log("test",props.data);
  useEffect(()=>{
    console.log("props",props);
    axios.post("http://localhost:8800/adtdetails",{
        role:"driver",
        did:id,
    })
    .then(res => {console.log(res.data);
                    console.log("success");
                setvalues(res.data);
            })
    .catch(err => console.log(err))
  },[name,id])
//  console.log(driid);
  return (
    <>
    <table className='driver_my_profile_tbl'>
        <tr>
            <th className='driver_my_profile_th'>First Name</th>
            <td className='driver_my_profile_td'>{values.first_name}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Last Name</th>
            <td className='driver_my_profile_td'> {values.last_name}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>User Name</th>
            <td className='driver_my_profile_td'>{values.username}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Email ID</th>
            <td className='driver_my_profile_td'>{values.dri_email}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Contact No</th>
            <td className='driver_my_profile_td'>{values.dri_contact}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Gender</th>
            <td className='driver_my_profile_td'>{values.gender}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Address</th>
            <td className='driver_my_profile_td'>{values.address}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Area</th>
            <td className='driver_my_profile_td'>{values.area}</td>
        </tr>
        <tr>
            <th className='driver_my_profile_th'>Licence No</th>
            <td className='driver_my_profile_td'>{values.dri_license}</td>
        </tr>
    </table>
    </>
  )
}

export default My_profile