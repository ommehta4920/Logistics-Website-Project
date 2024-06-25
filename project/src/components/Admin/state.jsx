import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./d_navbar";
import "./table_page.css";
// import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const State = () => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [state,setstate]=useState([]);
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          navigate("/admin/state");  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/admin/login");
      }
    })
  },[])
  const [search,setsearch]=useState('');
    useEffect(()=>{
      axios.post('http://localhost:8800/admintable',{
          fetch:'state',
      })
      .then(res => {
        setstate(res.data);
        console.log(res.data);
      })
      .catch(err => {console.log(err)});
    }
  ,[]);
  const handledelete=(id)=>{
    axios.delete('http://localhost:8800/stdelete/'+id)
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
              <p>State Table</p>
            </div>
            <div className="body">
              <div className='searchbar'>
                <input type='search' id='search_state' placeholder='Search state' onChange={(e)=>{setsearch(e.target.value)}}></input>
              </div>
              <div className="table_container">
              <table className="admin_tbl">
                  <thead>
                    <tr>
                      <th className='admin_tbl_th' style={{width: "10%"}}> State Id</th>
                      <th className='admin_tbl_th' style={{width: "75%"}}> State Name</th>
                      <th className='admin_tbl_th' style={{width: "20%"}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      state.filter((item) =>{
                      return search.toLowerCase()=== ''? item : item.state_name.toLowerCase().includes(search);
                      }).map((dridata)=>(
                      <tr key={dridata.state_id}>
                        <td className='admin_tbl_td'>{dridata.state_id}</td>
                        <td className='admin_tbl_td'>{dridata.state_name}</td>
                        <td className='admin_tbl_td'>
                          <button onClick={()=>navigate('/admin/state/edit',{replace:true,state:{id:dridata.state_id}})} style={{backgroundColor:"green", color:"white", border:"1px solid green"}}>Edit</button> &nbsp;&nbsp;&nbsp;
                          <button onClick={()=>handledelete(dridata.state_id)} style={{backgroundColor:"red", color:"white", border:"1px solid red"}}>Delete</button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>  
              </div>
              <div className="btn_box">
                <button onClick={()=>navigate('/admin/state/insert')}className="btn_insert">Insert</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default State;
