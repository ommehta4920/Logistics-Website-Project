import React from 'react'
import './client_booking_history.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Client_booking_history = () => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [id,setid]=useState('');
  const [values,setvalues]=useState([]);
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800/userstatus')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          setname(res.data.name);
          setid(res.data.id);
      }
      else{
        setmessage(res.data.Message);
        navigate("/login");
      }
    })
  },[])
  useEffect(()=>{
    axios.post("http://localhost:8800/bookdetails",{
      role:"booking",
      did:id,
})
.then(res => {console.log(res.data);
              console.log("success");
          setvalues(res.data);
      })
.catch(err => console.log(err)) 
  },[id])
  return (
    <>
    <div className='booking_history'>
        <div className='client_bookingh_banner'>
            <div className='client_bookingh_banner_overlay'>
              <div className='client_bookingh_title'>
                <h3>Your Bookings</h3>
                <h2>Booking History</h2>
              </div>
            </div>
        </div>
        <div className='bookingh_body'>
            <div className='bookingh_left_body'>
                <div className='bookingh_table'>
                <table className='admin_tbl'>
                  <thead>
                    <tr>
                      <th className='admin_tbl_th'>Id</th>
                      <th className='admin_tbl_th'>Pickup</th>
                      <th className='admin_tbl_th'>Drop</th>
                      <th className='admin_tbl_th'>Custid</th>
                      <th className='admin_tbl_th'>Driid</th>
                      <th className='admin_tbl_th'>Cost</th>
                      <th className='admin_tbl_th'>Distance(kms)</th>
                      <th className='admin_tbl_th'>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      values.map((values)=>(
                      <tr key={values.book_id}>
                        <td className='admin_tbl_td'>{values.book_id}</td>
                        <td className='admin_tbl_td'>{values.pickup_address}</td>
                        <td className='admin_tbl_td'>{values.drop_address}</td>
                        <td className='admin_tbl_td'>{values.cust_id}</td>
                        <td className='admin_tbl_td'>{values.dri_id}</td>
                        <td className='admin_tbl_td'>{values.amount}</td>
                        <td className='admin_tbl_td'>{values.approx_km}</td>
                        <td className='admin_tbl_td'>{values.payment_status}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>    
                </div>
            </div>
            <div className='bookingh_right_body'>
                <img src='/images/delivery-boy.png' alt='delivery-boy'></img>
            </div>
        </div>
    </div>
    </>
  )
}

export default Client_booking_history