import React from 'react'
import Sidebar from './sidebar'
import Navbar from "./d_navbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import validate from './adminvalidate';
const vehicle_detail_edit = () => {
  const [values,setvalues]=useState([]);
  const location=useLocation();
  const navigate=useNavigate();
  const [id,setid]=useState(0);
  const [oldid,setoldid]=useState('');
  console.log("test",location.state.id)
  useEffect(()=>{
    console.log("useeffect",location.state.id)
    axios.post("http://localhost:8800/adtdetails",{
      role:"vehicle",
      did:location.state.id,
    }).then(res =>{
      console.log(res.data);
      setvalues(res.data);
      setoldid(res.data.dri_id);
      setid(res.data.veh_id);
    }).catch(err => console.log(err))
  },location.state.id)
  const [errors,seterrors]=useState({});
  function handleupdata(e){
    e.preventDefault();
    seterrors(validate(values));
    if(values.dri_id==='')
      values.dri_id=null;
    const checkerr=validate(values);
    console.log("old",oldid);
    if(Object.entries(checkerr).length=== 0){
      axios.put("http://localhost:8800/update/"+id,
        {
          role:"vehicle",
          chassis:values.chassis_no,
          vehno:values.veh_no,
          vehname:values.veh_desc,
          rent:values.rent,
          capacity:values.capacity,
          dri_id:values.dri_id,
          olddri:oldid,
        }
      ).then(res => {
        console.log("Message",res.data.Message)
        if(res.data.Message === "Success"){
          navigate("/admin/vehicle_details")
        }
        else{
          alert("Not updated the Vehicle")
        }
      }).catch(err => console.log(err));
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
              <p>Edit Vehicle details Table</p>
            </div>
            <div className="body" style={{width: "90%", overflow:"hidden"}}>
              <form onSubmit={handleupdata}>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "3% 0 0 5%", fontSize: "20px"}}>Chasis No</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Vehicle Chasis No"
                      // 
                      value={values.chassis_no}
                      onChange={e=> setvalues({...values, chassis_no: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.chassis_no && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.chassis_no}</div>}
                  </div>
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "3% 0 0 5%", fontSize: "20px"}}>Vehicle Registration No</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Vehicle Registration No"
                      
                      value={values.veh_no}
                      onChange={e=> setvalues({...values, veh_no: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.veh_no && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.veh_no}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Vehicle Name</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Vehicle Name"
                      
                      value={values.veh_desc}
                      onChange={e=> setvalues({...values, veh_desc: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.veh_desc && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.veh_desc}</div>}
                  </div>
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Rent (in Rs.)</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Rent Amount (in Rs.)"
                      value={values.rent}
                      onChange={e=> setvalues({...values, rent: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.rent && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.rent}</div>}
                  </div>
                </div>
                <div className="box">
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Capacity of Vehicle</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Capacity of Vehicle"
                      value={values.capacity}
                      onChange={e=> setvalues({...values, capacity: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                    {errors.capacity && <div style={{color:'red',margin: "0 0 0 5%"}}>{errors.capacity}</div>}
                  </div>
                  <div className="content" style={{width: "100%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Driver ID</label>
                    <input
                      type="text"
                      className="txtbox"
                      placeholder="Enter Driver ID"
                      value={values.dri_id}
                      onChange={e=> setvalues({...values, dri_id: e.target.value})}
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                  </div>
                </div>
                {/* <div className="box">
                  <div className="content" style={{width: "50%"}}>
                    <label style={{margin: "2% 0 0 5%", fontSize: "20px"}}>Vehicle's Image</label>
                    <input
                      type="file"
                      className="txtbox"
                      accept='image/*'
                      
                      style={{margin: "2% 0 0 5%", width: "80%"}}
                    ></input>
                  </div>
                </div> */}
                <button className="btn_insert" type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default vehicle_detail_edit