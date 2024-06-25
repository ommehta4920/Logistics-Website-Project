import React from 'react'
import Sidebar from './sidebar'
import Navbar from "./d_navbar";
import { useState } from "react";
import vehvalidate from './vehiclevalidate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const vehicle_detail_insert = () => {
  const [chassis,setchassis]=useState(0); 
  const [vehno,setvehno]=useState(0);
  const [vehname,setvehname]=useState('');
  const [rent,setrent]=useState(0);
  const [capacity,setcapacity]=useState(0);
  const [image,setimage]=useState('');
  const [driid,setdriid]=useState(null);
  const [errors,seterrors]=useState({});
  const navigate=useNavigate();
  function handlevalidate(e){
    e.preventDefault();
    seterrors(vehvalidate(chassis,vehno,vehname,rent,capacity,image));
    const checkerr=vehvalidate(chassis,vehno,vehname,rent,capacity,image);
    if(Object.entries(checkerr).length=== 0){
      var formdata= new FormData();
      formdata.append("chassis",chassis);formdata.append("vehno",vehno);formdata.append("vehname",vehname);
      formdata.append("rent",rent);formdata.append("capacity",capacity);formdata.append("driid",driid);
      formdata.append("image",image);
      const config={
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
      axios.post('http://localhost:8800/insvehdet',formdata,config)
      .then(res => {
        if(res.data.Status=== "Success"){
          console.log("Succeded")
          navigate("/admin/vehicle_details");
        }
        else{
          console.log( "Data",res.data)
        }
      })
      .catch(err => console.log("Error",err));
    }
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
              <p>Insert into the Vehicle details Table</p>
            </div>
            <div className="body" style={{width: "90%", overflow:"hidden"}}>
              <form>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "3% 0 0 5%", fontSize: "20px"}}>Chasis No</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Vehicle Chasis No"
                      required
                      onChange={(e)=>{setchassis(e.target.value)}}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.chassis && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.chassis}</div>}
                  </div>
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "3% 0 0 5%", fontSize: "20px"}}>Vehicle Registration No</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Vehicle Registration No"
                      required
                      onChange={(e)=>{setvehno(e.target.value)}}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.vehno && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.vehno}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Vehicle Name</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Vehicle Name"
                      required
                      onChange={(e)=>{setvehname(e.target.value)}}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.vehname && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.vehname}</div>}
                  </div>
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Rent (in Rs.)</label>
                    <input
                      type="number"
                      className="txtbox"
                      placeholder="Enter Rent Amount (in Rs.)"
                      required
                      onChange={(e)=>{setrent(e.target.value)}}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.rent && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.rent}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Capacity of Vehicle</label>
                    <input
                      type="number"
                      className="txtbox"
                      placeholder="Enter Capacity of Vehicle"
                      required
                      onChange={(e)=>{setcapacity(e.target.value)}}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.capacity && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.capacity}</div>}
                  </div>
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Driver ID</label>
                    <input
                      type="number"
                      className="txtbox"
                      placeholder="Enter Driver ID"
                      required
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                      onChange={(e)=>{setdriid(e.target.value)}}
                    ></input>
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "50%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Vehicle's Image</label>
                    <input
                      type="file"
                      className="txtbox"
                      accept='image/*'
                      required
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                      onChange={(e)=>{setimage(e.target.files[0])}}
                    ></input>
                    {errors.image && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.image}</div>}
                  </div>
                </div>
                <button className="btn_insert" onClick={handlevalidate} type="submit">Insert</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default vehicle_detail_insert