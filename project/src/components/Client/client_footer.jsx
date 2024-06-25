import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { Link } from 'react-router-dom'
import './client_footer.css'
const Client_footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='upper_content'>
            <div className='logo'>
                <div className='box'>
                    <img src='/images/logo_footer.png' alt='logo'></img>
                </div>
            </div>
            <div className='details'>
                <div className='box'>
                    <div className='icon'>
                        <FaMapMarkerAlt />
                    </div>
                    <div className='text'>
                        <p>Shivranjani Cross Rd, Shivranjani,<br/> 
                            Satellite, Ahmedabad, <br/>
                            Gujarat 380015</p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon'>
                        <FaPhone />
                    </div>
                    <div className='text'>
                        <p>+91 87348-44204</p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon'>
                        <GoMail />
                    </div>
                    <div className='text'>
                        <p>swift_logistics@gmail.com</p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon'>
                        <TbDeviceLandlinePhone />
                    </div>
                    <div className='text'>
                        <p>+91 98259-57545</p>
                    </div>
                </div>
            </div>
            <div className='site_links'>
                <div className='box'>
                    <h3>Site Links</h3>
                    <ul>
                        <li><Link to='/' className='link'>Home Page</Link></li>
                        <li><Link to='/about' className='link'>About Us</Link></li>
                        <li><Link to='/' className='link'>Vehicles</Link></li>
                        <li><Link to='/' className='link'>FeedBack</Link></li>
                        <li><Link to='/' className='link'>Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className='services'>
                <div className='box'>
                    <h3>Our Services</h3>
                    <ul>
                        <li>Packaging And Storage</li>
                        <li>Worldwide Transport</li>
                        <li>International Air Freight</li>
                        <li>Ground Shipping</li>
                        <li>24/7 Support</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='lower_content'>
            <p>© 2024 Swift Logistics. All Rights Reserved.</p>
        </div>
    </div>
    </>
  )
}

export default Client_footer