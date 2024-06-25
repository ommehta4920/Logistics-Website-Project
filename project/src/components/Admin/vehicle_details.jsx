import React from 'react'
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Vehicle_details = () => {
  const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const [vehicle,setvehicle]=useState([]);
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhxost:8800')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            navigate("/admin/vehicle_details");  
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
          fetch:'vehicle',
      })
      .then(res => {
        setvehicle(res.data);
        console.log(res.data);
      })
      .catch(err => {console.log(err)});
    }
  ,[]);
  const handledelete=(id)=>{
    axios.delete('http://localhost:8800/vehdelete/'+id)
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
              <p>Vehicle Details Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search Vehicle name'onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
              <table className='admin_tbl'>
                  <thead>
                    <tr>
                      <th className='admin_tbl_th'> Vehicle Id</th>
                      <th className='admin_tbl_th'> Chasis no.</th>
                      <th className='admin_tbl_th'>Veh no.</th>
                      <th className='admin_tbl_th'>Veh Name</th>
                      <th className='admin_tbl_th'>Rent</th>
                      <th className='admin_tbl_th'>Capacity</th>
                      <th className='admin_tbl_th'>Dri_id</th>
                      <th className='admin_tbl_th'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      vehicle.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.veh_desc.toLowerCase().includes(search);
                      }).map((dridata)=>(
                      <tr key={dridata.veh_id} className='admin_tbl_tr'>
                        <td className='admin_tbl_td'>{dridata.veh_id}</td>
                        <td className='admin_tbl_td'>{dridata.chassis_no}</td>
                        <td className='admin_tbl_td'>{dridata.veh_no}</td>
                        <td className='admin_tbl_td'>{dridata.veh_desc}</td>
                        <td className='admin_tbl_td'>{dridata.rent}</td>
                        <td className='admin_tbl_td'>{dridata.capacity}</td>
                        <td className='admin_tbl_td'>{dridata.dri_id}</td>
                        <td className='admin_tbl_td'>
                          <button onClick={()=>navigate('/admin/vehicle_detail/edit',{state:{id:dridata.veh_id}})} style={{backgroundColor:"green", color:"white", border:"1px solid green"}}>Edit</button> &nbsp;&nbsp;&nbsp;
                          <button onClick={()=>handledelete(dridata.veh_id)} style={{backgroundColor:"red", color:"white", border:"1px solid red"}}>Delete</button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>  
              </div>
              <div className="btn_box">
                <button onClick={()=>navigate('/admin/vehicle_detail/insert')}className="btn_insert">Insert</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vehicle_details