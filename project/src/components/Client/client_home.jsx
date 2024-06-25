import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaTruckFast } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TbPackages } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { FaWarehouse } from "react-icons/fa";
import './client_home.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const client_home = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [auth,setauth]=useState(false);
  const [name,setname]=useState('');
  const [message,setmessage]=useState('');
  const [id,setid]=useState('');
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:8800/userstatus')
    .then( res=>{
      if(res.data.Status === "Success"){
          setauth(true);
          //alert(res.data.Status);
          setname(res.data.name);
          setid(res.data.id);
          // navigate("/about");  
      }
      else{
        setmessage(res.data.Message);
        // alert(res.data.Message);
        navigate("/login");
      }
    })
  },[])
  return (
    <>
      <div className="Home">
        <div className="slider-container">
          <Slider {...settings}>
            <div className="slider1">
              <img src="/images/Slider1.jpg" alt="Slide 1" />
              <div className="overlay-content">
                <div className="text-box">
                  <h1>Providing Logistics Services</h1>
                  <p>
                    We provide always our best services for our clients and
                    always
                  </p>
                  <p>try to achieve our client's trust and satisfaction.</p>
                  <Link to="#home_contact" className="contact_btn">
                    Contact Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="slider2">
              <img src="/images/Slider2.jpg" alt="Slide 2" />
              <div className="overlay-content">
                <div className="text-box">
                  <h1>Logistic Vehicle Details</h1>
                  <p>
                    We provide different vehicles for logistics transportation.
                  </p>
                  <Link to="/client/vehicle" className="contact_btn">
                    Vehicle Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="slider3">
              <img src="/images/Slider3.jpg" alt="Slide 3" />
              <div className="overlay-content">
                <div className="text-box">
                  <h1>Providing Logistics Solutions</h1>
                  <p>
                    <span>-Providing Services Since 1970-</span>
                  </p>
                  <p>We provide best solutions to our clients.</p>
                  <Link to="#home_contact" className="contact_btn">
                    Contact Now
                  </Link>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        <div className="home_about_section">
          <div className="left_section">
            <div className="home_about_title">
              <h2>who we are</h2>
              <h1>About our company</h1>
            </div>
            <div className="home_about_text">
              <p>
                Uniquely disseminate economically sound bandwidth and
                frictionless methodologies. Quickly reinvent cross functional
                infrastructures without high standards in niche markets.
                Distinctively visualize open-source functionalities rather than
                interdependent e-business. Interactively simplify client-based
                collaboration and idea-sharing and goal-oriented intellectual
                capital. Phosfluorescently foster e-business sources whereas
                sustainable internal or "organic" sources.
              </p>
              <p>
                Uniquely disseminate economically sound bandwidth and
                frictionless methodologies. Quickly reinvent cross functional
                infrastructures without high standards in niche markets.
                Distinctively visualize open-source functionalities rather than
                interdependent e-business.
              </p>
              <Link to="/about" className="read_link">
                Read More...
              </Link>
            </div>
          </div>
          <div className="right_section">
            <img src="/images/about-us-home.jpg"></img>
          </div>
        </div>
        <div className="service_content">
          <div className="service_title">
            <h1>Our Services</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              congue justo scelerisque mattis iaculis. Maecenas vestibulum
              faucibus enim scelerisque egestas. Praesent facilisis, tortor vel
              vehicula imperdiet, felis massa ultrices metus, sed consectetur
              massa ex vitae sem.
            </p>
          </div>
          <div className="service_cards">
            <div className="service_card">
              <FaTruckFast className="card_icon" />
              <h2>Transportation</h2>
            </div>
            <div className="service_card">
              <FaBoxOpen className="card_icon" />
              <h2>Ware Housing</h2>
            </div>
            <div className="service_card">
              <LiaTruckLoadingSolid className="card_icon" />
              <h2>Door To Door Delivery</h2>
            </div>
            <div className="service_card">
              <TbPackages className="card_icon" />
              <h2>Packaging And Storage</h2>
            </div>
            <div className="service_card">
              <FaShippingFast className="card_icon" />
              <h2>Fast Delivery</h2>
            </div>
            <div className="service_card">
              <Ri24HoursFill className="card_icon" />
              <h2>24/7 Support</h2>
            </div>
          </div>
        </div>
        <div className="home_process">
          <div className="home_process_title">
            <h1>Our Process</h1>
            <p>
              Cras varius purus in tempus porttitor ut dapibus efficitur sagittis cras vitae lacus metus nunc vulputate facilisis nisi
eu lobortis erat consequat ut. Aliquam et justo ante. Nam a cursus velit
            </p>
          </div>
          <div className="home_process_steps">
            <div className="step">
              <div className="step_icon">
                <FaUser className="i"/>
              </div>
              <h2>Step: 1</h2>
              <h3>Create Your Account</h3>
            </div>
            <div className="step">
              <div className="step_icon">
                <CiBoxList className="i"/>
              </div>
              <h2>Step: 2</h2>
              <h3>Place your order</h3>
            </div>
            <div className="step">
              <div className="step_icon">
                <FaWarehouse className="i"/>
              </div>
              <h2>Step: 3</h2>
              <h3>We collect it</h3>
            </div>
            <div className="step">
              <div className="step_icon">
                <FaShippingFast className="i"/>
              </div>
              <h2>Step: 4</h2>
              <h3>Delivered</h3>
            </div>
          </div>
        </div>
        <div className="home_testimonial">
          <div className="home_testimonial_Cards">
            <div className="home_testimonial-slider-container">
              <Slider {...settings}>
                <div className="home_testimonial_card">
                  <div className="home_testimonial_img">
                    <img src="/images/testimonial.jpg" alt="testimonial image"></img>
                  </div>
                  <div className="home_testimonial_msg">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam lacus lectus a quam eget, fringilla suscipit
                      sapien. Duis aliquet malesuada ipsum non sodales.
                      Suspendisse a consequat leo. Fusce tempus vitae erat at
                      consequat. Aenean commodo felis odio, ut congue est mollis
                      non. Sed tincidunt.
                    </p>
                    <h4>John Doe</h4>
                  </div>
                </div>
                <div className="home_testimonial_card">
                  <div className="home_testimonial_img">
                    <img src="/images/testimonial.jpg" alt="testimonial image"></img>
                  </div>
                  <div className="home_testimonial_msg">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam lacus lectus a quam eget, fringilla suscipit
                      sapien. Duis aliquet malesuada ipsum non sodales.
                      Suspendisse a consequat leo. Fusce tempus vitae erat at
                      consequat. Aenean commodo felis odio, ut congue est mollis
                      non. Sed tincidunt.
                    </p>
                    <h4>John Doe</h4>
                  </div>
                </div>
                <div className="home_testimonial_card">
                  <div className="home_testimonial_img">
                    <img src="/images/testimonial.jpg" alt="testimonial image"></img>
                  </div>
                  <div className="home_testimonial_msg">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam lacus lectus a quam eget, fringilla suscipit
                      sapien. Duis aliquet malesuada ipsum non sodales.
                      Suspendisse a consequat leo. Fusce tempus vitae erat at
                      consequat. Aenean commodo felis odio, ut congue est mollis
                      non. Sed tincidunt.
                    </p>
                    <h4>John Doe</h4>
                  </div>
                </div>
                <div className="home_testimonial_card">
                  <div className="home_testimonial_img">
                    <img src="/images/testimonial.jpg" alt="testimonial image"></img>
                  </div>
                  <div className="home_testimonial_msg">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam lacus lectus a quam eget, fringilla suscipit
                      sapien. Duis aliquet malesuada ipsum non sodales.
                      Suspendisse a consequat leo. Fusce tempus vitae erat at
                      consequat. Aenean commodo felis odio, ut congue est mollis
                      non. Sed tincidunt.
                    </p>
                    <h4>John Doe</h4>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>    
    </>
  )
}

export default client_home