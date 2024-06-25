import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Driver = () => {
  const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const [dridata,setdridata]=useState([]);
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            navigate("/admin/driver");  
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
          fetch:'driver',
      })
      .then(res => {
        setdridata(res.data);
        console.log(res.data);
      })
      .catch(err => {console.log(err)});
    }
  ,[]);
  const handledelete=(id)=>{
    axios.delete('http://localhost:8800/dridelete/'+id)
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
              <p>Driver Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search user'  onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
              <table className='admin_tbl'>
                  <thead>
                    <tr>
                      <th className='admin_tbl_th'>Id</th>
                      <th className='admin_tbl_th'>Name</th>
                      <th className='admin_tbl_th'>Email</th>
                      <th className='admin_tbl_th'>Contact</th>
                      <th className='admin_tbl_th'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      dridata.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.username.toLowerCase().includes(search);
                      }).map((dridata)=>(
                      <tr key={dridata.dri_id}>
                        <td className='admin_tbl_td'>{dridata.dri_id}</td>
                        <td className='admin_tbl_td'>{dridata.username}</td>
                        <td className='admin_tbl_td'>{dridata.dri_email}</td>
                        <td className='admin_tbl_td'>{dridata.dri_contact}</td>
                        <td className='admin_tbl_td'>
                        <button onClick={()=>navigate('/admin/driver/edit',{state:{id:dridata.dri_id}})} style={{backgroundColor:"green", color:"white", border:"1px solid green"}}>Edit</button> &nbsp;&nbsp;&nbsp;
                        <button onClick={()=>handledelete(dridata.dri_id)} style={{backgroundColor:"red", color:"white", border:"1px solid red"}}>Delete</button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>    
              </div>
              <div className="btn_box">
                <button onClick={()=>navigate('/admin/driver/insert')}className="btn_insert">Insert</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Driver