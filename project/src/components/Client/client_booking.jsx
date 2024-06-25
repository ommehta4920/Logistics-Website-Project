import React from 'react'
import './client_booking.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validate from './bookvalidate';
const Client_booking = () => {
    const [auth,setauth]=useState(false);
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const [id,setid]=useState('');
    const [distance,setdistance]=useState(0);
    const [price,setprice]=useState(0);
    const navigate=useNavigate();
    const [values,setvalues]=useState({pickup:'',drop:''});
    const [date,setDate]=useState('');
    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:8800/userstatus')
      .then( res=>{
        if(res.data.Status === "Success"){
            setauth(true);
            setname(res.data.name);
            setid(res.data.id);
        }
        else{
          setmessage(res.data.Message);
          navigate("/login");
        }
      })
    },[])
    useEffect(()=>{
        console.log("Running");
        console.log("drop",values.drop,"pickup",values.pickup);
        if((values.pickup =='ahmedabad' && values.drop =='gandhinagar') || 
        (values.drop =='ahmedabad' && values.pickup =='gandhinagar')){ 
            setdistance(28);
            setprice(28*150);
            console.log("entered");
        }
        else if((values.pickup =='ahmedabad' && values.drop=='surat') ||
        (values.drop =='ahmedabad' && values.pickup=='surat') ){
            setdistance(260);
            setprice(260*150);
        }
        else if((values.pickup =='ahmedabad' && values.drop=='jaipur') ||
        (values.drop =='ahmedabad' && values.pickup=='jaipur') ){
            setdistance(660);
            setprice(660*150);
        }
        else if((values.pickup =='gandhinagar' && values.drop=='surat') ||
        (values.drop =='gandhinagar' && values.pickup=='surat') ){
            setdistance(290);
            setprice(290*150);
        }
        else if((values.pickup =='jaipur' && values.drop=='surat') ||
        (values.drop =='jaipur' && values.pickup=='surat') ){
            setdistance(940);
            setprice(940*150);
        }
        else if((values.pickup =='gandhinagar' && values.drop=='jaipur') ||
        (values.drop =='gandhinagar' && values.pickup=='jaipur') ){
            setdistance(641);
            setprice(641*150);
        }
    },[values.pickup,values.drop])
    function handleinput(event){
        const newObj={...values,[event.target.name]:(event.target.value).toLowerCase()}
        setvalues(newObj);
    }
    const [errors,seterrors]=useState({});
    function handlevalidate(e){
        e.preventDefault();
        seterrors(validate(values,date));
        const checkerr=validate(values,date);
        console.log(Object.entries(checkerr).length)
        if(Object.entries(checkerr).length=== 0){
            axios.post('http://localhost:8800/booking',{
                id:id,
                date:date,
                pickup:values.pickup,
                drop:values.drop,
                dist:distance,
                price:price,
            }).then(res=>{
                // console.log(res.result.Message);
                if(res.data.Status==="Success"){
                    alert("Booking confirmed");
                    navigate("/client/booking_history");
                }
                else{
                    console.log("res.data",res.data);
                    alert("Booking not confirmed");
                }
            }).catch(err=>{ console.log(err)})
    }
    }
  return (
    <>
    <div className='booking'>
        <div className='client_booking_banner'>
            <div className='client_booking_banner_overlay'>
              <div className='client_booking_title'>
                <h3>book your order</h3>
                <h2>Online Service Booking</h2>
              </div>
            </div>
        </div>
        <div className='client_booking_body'>
            <div className='client_booking_left'>
                <div className='client_booking_left_title'>
                    <h1>Place Booking Online</h1>
                </div>
                <div className='client_booking_left_content'>
                    <p>
                        The swift logistics.com is a one-stop platform for getting various solutions on relocation. The website has a vast network of packers and movers service offerings, which are trusted and operating throughout the country. With this one can assure you of getting the most steadfast solutions in the field of household and office relocation.
                    </p>
                </div>
                <div className='client_booking_form'>
                    <form>
                        <div className='client_booking_form_box'>
                            <div className='client_booking_form_content'>
                                <label>Shipment Date</label>
                                <input type='date' className='txtbox' min={new Date().toJSON().slice(0,10)} name='shipdate' onChange={(e)=>setDate(e.target.value)} ></input>
                                {errors.date && <div style={{color:'red'}}>{errors.date}</div>}
                            </div>
                        </div>
                        <div className='client_booking_form_box'>
                            <div className='client_booking_form_content'>
                                <label>Departure Location</label>
                                <input type='text' className='txtbox' placeholder='Enter Pickup City' name='pickup' required onChange={handleinput}></input>
                                {errors.pickup && <div style={{color:'red'}}>{errors.pickup}</div>}
                            </div>
                        </div>
                        <div className='client_booking_form_box'>
                            <div className='client_booking_form_content'>
                                <label>Destination Location</label>
                                <input type='text' className='txtbox' placeholder='Enter Delivery City' name='drop' required onChange={handleinput}></input>
                                {errors.drop && <div style={{color:'red'}}>{errors.drop}</div>}
                            </div>
                        </div>
                        <div className='client_booking_form_box'>
                            <div className='client_booking_form_content'>
                                <label>Approx Kilometer(s)</label>
                                <input type='text' className='txtbox' placeholder='Enter Approx km(s)' value={distance} required></input>
                            </div>
                        </div>
                        <div className='client_booking_rent'>
                            <label>Vehicle Rent:</label>
                            <label><span>{price}₹/Km</span></label>
                        </div>
                        <div className='client_booking_form_box'>
                            <div className='client_booking_form_content'>
                                <label>Select Payment Method:</label>
                                <div className='payment_radio'>
                                    <input type='radio' id='rozar_pay' name='payment'></input>
                                    <label>Pay with Rozar Pay</label>                                    
                                </div>
                                <div className='payment_radio'>
                                    <input type='radio' id='cod' name='payment' value='Cash on Delivery'></input>
                                    <label>Cash on Delivery</label>
                                </div>
                            </div>
                        </div>
                        <div className='client_booking_btn'>
                            <button type='submit' onClick={handlevalidate}>Book Now</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='client_booking_right'>
                <img src='/images/booking.png' alt='delivery_man'></img>
            </div>
        </div>
    </div>
    </>
  )
}

export default Client_booking