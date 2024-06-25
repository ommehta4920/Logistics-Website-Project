import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const City = () => {
    const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const navigate=useNavigate();
    const [city,setcity]=useState([]);
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            navigate("/admin/city");  
        }
        else{
          setmessage(res.data.Message);
          navigate("/admin/login");
        }
      })
    },[])
    const handledelete=(id)=>{
      axios.delete('http://localhost:8800/ctdelete/'+id)
      .then(res => {console.log(res.data.Message);
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
    const [search,setsearch]=useState('');
    useEffect(()=>{
      axios.post('http://localhost:8800/admintable',{
          fetch:'city',
      })
      .then(res => {
        setcity(res.data);
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
              <p>City Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search city' onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
              <table className='admin_tbl'>
                  <thead>
                    <tr>
                      <th className='admin_tbl_th' style={{width: "10%"}}> City Id</th>
                      <th className='admin_tbl_th' style={{width: "auto"}}> City Name</th>
                      <th className='admin_tbl_th' style={{width: "auto"}}>State Id</th>
                      <th className='admin_tbl_th' style={{width: "15%"}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      city.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.city_name.toLowerCase().includes(search);
                      }).map((dridata)=>(
                      <tr key={dridata.city_id}>
                        <td className='admin_tbl_td'>{dridata.city_id}</td>
                        <td className='admin_tbl_td'>{dridata.city_name}</td>
                        <td className='admin_tbl_td'>{dridata.state_id}</td>
                        <td className='admin_tbl_td'>
                          <button onClick={()=>navigate('/admin/city/edit',{state:{id:dridata.city_id}})} style={{backgroundColor:"green", color:"white", border:"1px solid green"}}>Edit</button> &nbsp;&nbsp;&nbsp;
                          <button onClick={()=>handledelete(dridata.city_id)} style={{backgroundColor:"red", color:"white", border:"1px solid red"}}>Delete</button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>    
              </div>
              <div className="btn_box">
                <button onClick={()=>navigate('/admin/city/insert')}className="btn_insert">Insert</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default City