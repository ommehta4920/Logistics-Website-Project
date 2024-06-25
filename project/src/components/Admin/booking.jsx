import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Booking = () => {
  const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const [booking,setbooking]=useState([]);
    const [search,setsearch]=useState('');
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            navigate("/admin/booking");  
        }
        else{
          setmessage(res.data.Message);
          navigate("/admin/login");
        }
      })
    },[])
    useEffect(()=>{
      axios.post('http://localhost:8800/admintable',{
          fetch:'booking',
      })
      .then(res => {
        setbooking(res.data);
        console.log(res.data);
      })
      .catch(err => {console.log(err)});
    }
  ,[]);
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
              <p>Booking Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search booking' onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
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
                      booking.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.pickup_address.toLowerCase().includes(search);
                      }).map((cusdata)=>(
                      <tr key={cusdata.book_id}>
                        <td className='admin_tbl_td'>{cusdata.book_id}</td>
                        <td className='admin_tbl_td'>{cusdata.pickup_address}</td>
                        <td className='admin_tbl_td'>{cusdata.drop_address}</td>
                        <td className='admin_tbl_td'>{cusdata.cust_id}</td>
                        <td className='admin_tbl_td'>{cusdata.dri_id}</td>
                        <td className='admin_tbl_td'>{cusdata.amount}</td>
                        <td className='admin_tbl_td'>{cusdata.approx_km}</td>
                        <td className='admin_tbl_td'>{cusdata.payment_status}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>    
              </div>
              {/* <div className="btn_box">
                <button className="btn_insert">Insert</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Booking