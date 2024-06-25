import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Feedback = () => {
  const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const [feedback,setfeedback]=useState([]);
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            navigate("/admin/feedback");  
        }
        else{
          setmessage(res.data.Message);
          navigate("/admin/login");
        }
      })
    },[])
    const [search,setsearch]=useState('');
    useEffect(()=>{
      axios.post('http://localhost:8800/admintable',{
          fetch:'feedback',
      })
      .then(res => {
        setfeedback(res.data);
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
              <p>Feedback Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search feedback' onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
              <table className='admin_tbl'>
                  <thead>
                    <tr>
                      <th className='admin_tbl_th'> Feedback Id</th>
                      <th className='admin_tbl_th'> Feedback</th>
                      <th className='admin_tbl_th'>Date</th>
                      <th className='admin_tbl_th'>Customer id</th>
                      {/* <th className='fifth'>Actions</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {
                      feedback.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.feed_desc.toLowerCase().includes(search);
                      }).map((dridata)=>(
                      <tr key={dridata.feed_id}>
                        <td className='admin_tbl_td'>{dridata.feed_id}</td>
                        <td className='admin_tbl_td'>{dridata.feed_desc}</td>
                        <td className='admin_tbl_td'>{dridata.feed_date}</td>
                        <td className='admin_tbl_td'>{dridata.cust_id}</td>
                        {/* <td className='fifth'>
                          <button >Edit</button> 
                          <button>Delete</button>
                        </td> */}
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

export default Feedback