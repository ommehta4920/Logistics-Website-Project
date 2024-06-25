import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Customer = () => {
    const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const [cusdata,setcusdata]=useState([]);
    const [search,setsearch]=useState('');
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            navigate("/admin/customer");  
        }
        else{
          setmessage(res.data.Message);
          navigate("/admin/login");
        }
      })
    },[])
    useEffect(()=>{
      axios.post('http://localhost:8800/admintable',{
          fetch:'customer',
      })
      .then(res => {
        setcusdata(res.data);
        console.log(res.data);
      })
      .catch(err => {console.log(err)});
    }
  ,[]);
  const handledelete=(id)=>{
    axios.delete('http://localhost:8800/cusdelete/'+id)
    .then(res => {console.log(res.data.Message);
      window.location.reload();
    })
    .catch(err => console.log(err));
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
              <p>Customer Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search user' onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
              <table className='admin_tbl'>
                  <thead>
                    <tr>
                      <th className='admin_tbl_th' style={{width: "10%"}}>Id</th>
                      <th className='admin_tbl_th' style={{width: "autp"}}>Name</th>
                      <th className='admin_tbl_th' style={{width: "auto"}}>Email</th>
                      <th className='admin_tbl_th' style={{width: "auto"}}>Contact</th>
                      <th className='admin_tbl_th' style={{width: "15%"}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      cusdata.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.username.toLowerCase().includes(search);
                      }).map((cusdata)=>(
                      <tr key={cusdata.cust_id}>
                        <td className='admin_tbl_td'>{cusdata.cust_id}</td>
                        <td className='admin_tbl_td'>{cusdata.username}</td>
                        <td className='admin_tbl_td'>{cusdata.cust_email}</td>
                        <td className='admin_tbl_td'>{cusdata.cust_contact}</td>
                        <td className='admin_tbl_td'>
                          <button onClick={()=>navigate('/admin/customer/edit',{state:{id:cusdata.cust_id}})} style={{backgroundColor:"green", color:"white", border:"1px solid green"}}>Edit</button>&nbsp;&nbsp;&nbsp;
                          <button onClick={()=>handledelete(cusdata.cust_id)} style={{backgroundColor:"red", color:"white", border:"1px solid red"}}>Delete</button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>    
              </div>
              {
               <div className="btn_box">
                <button onClick={()=>navigate('/admin/customer/insert')}className="btn_insert">Insert</button>
              </div> 
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customer