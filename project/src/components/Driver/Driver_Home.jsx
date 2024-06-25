import React from 'react'
import Driver_sidebar from './driver_sidebar'
import Driver_navbar from './driver_navbar'
import './Driver_Home.css'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Driver_Home = () => {
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [id,setid]=useState('');
  const [values,setvalues]=useState({});
  const [vehicle,setvehicle]=useState({});
  const navigate=useNavigate();
  const [msg_avil, setMsg_avil] = useState('');

  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800/dristatus')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          setid(res.data.id);
          // alert("useEffect id : "+id)
          // navigate("/vehical");  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/login");
      }
    })
  },[])
  useEffect(()=>{
    axios.post("http://localhost:8800/adtdetails",{
        role:"vehicle_details",
        did:id,
    })
    .then(res => {console.log("Vehicle details",res.data);
                    console.log("success");
                setvalues(res.data);
                console.log(values.veh_image);
            })
    .catch(err => console.log("Vehicle Details",err))
  },[name,id])


  const [is_avail_values, setIs_available] = useState({
    is_available: '',
    dri_id: ''
  });

  const handleAvailable = (event) => {
    // alert(event.target.name+" : "+event.target.value+"\nuseEffect id : "+id);
    setIs_available(prev => ({...prev, [event.target.name] : [event.target.value]}));
  }

  function handleSubmit(event){
    event.preventDefault();

    alert("is_available_:: : "+is_avail_values.is_available+"\ndri_id_:: : "+id)
    axios.post('http://localhost:8800/driavailable', 
    {is_available:is_avail_values.is_available, 
      dri_id:is_avail_values.dri_id=id})
    .then(
      res => {
        if(res.data.message){
          console.log("res.data.message : "+res.data.message);
          setMsg_avil(res.data.message);
        }}
    )
    .catch(err => {console.log("error : "+err)})
  }

  return (
    <>
    <div className='home-container'>
        <div className='sidebar'>
          <Driver_sidebar />
        </div>
        <div className='right'>
          <div className='header'>
            <Driver_navbar  />
          </div>
          <div className='main-content'>
            <div className='cards'>
              <div className='available-card'>
                <form onSubmit={handleSubmit}>
                  <p>Are you available?</p>
                  <div className="choice">
                    <fieldset>
                      <div>
                        <input
                                className="available_radio"
                                type="radio"
                                name="is_available"
                                value="1"
                                id="available"
                                onChange={handleAvailable}
                                // data-parsley-required="true"
                        />
                        <label for="available">
                            Available
                        </label>
                      </div>
                      <div>
                        <input
                                className="available_radio"
                                type="radio"
                                name="is_available"
                                value="0"
                                id="not_available"
                                onChange={handleAvailable}
                        />
                        <label for="not_available">
                            Not Available
                        </label>
                      </div>
                    </fieldset>
                    {/* <select className="txtbox" name="area" id="area" required>
                      <option disabled={true} selected>
                        -- Select Availability --
                      </option>
                      <option value="1">Available</option>
                      <option value="2">Not Available</option>
                    </select> */}
                    <button type='submit' className='available-btn'>Submit</button>
                    <p style={{color:'red',fontsize:'7px',textAlign:'center',paddingTop:0}}>{msg_avil}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  </div>
                  
                </form>
              </div>
              <div className='v_details'>
                <div className='v_text'>
                  <div className='v_title'>
                    <p>Allotted Vehicle</p>
                  </div>
                  <div className='vehicle'>
                    <table className='driver_home_tbl'>
                      <tr>
                        <th className='driver_home_th'>Vehicle Name</th>
                        <td className='driver_home_td'>{values.veh_desc}</td>
                      </tr>
                      <tr>
                        <th className='driver_home_th'>Capacity</th>
                        <td className='driver_home_td'>{values.capacity}</td>
                      </tr>
                      <tr>
                        <th className='driver_home_th'>Vehicle Registration No</th>
                        <td className='driver_home_td'>{values.veh_no}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className='v_img'>
                  <img src={'http://localhost:8800/'+values.veh_image} alt='vehicle' style={{width:"170px",height:"170px"}}></img>
                </div>
              </div>
            </div>
            <div className='table-title'>
              <p>Your Today's Shipments</p>
            </div>
            <div className='table-area'>
              <div className='table-content'>
                No Shipments to Show.
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Driver_Home