import React from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelope } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { FaLock, FaUser } from "react-icons/fa";
import './navbar.css'
const navbar = () => {
    return (
        <>
            <div className='top_bar'>
                <div className='content'>
                    <div class="left-content">
                        <p><span>Office Hours :</span> Monday to Saturday - 8am to 5pm</p>
                    </div>
                    <div class="right-content">
                        <ul>
                            <li class="login">
                                <Link to="/login" className='link'><FaLock className='icon' />Login</Link>
                            </li>
                            <li class="registration">
                                <Link to="/register" className='link'><FaUser className='icon' />Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='nav_container'>
                <div className='upper_box'>
                    <div className='logo'>
                        <img src='/images/logo.png' alt='logo' id='visitor_nav_logo'></img>
                    </div>
                    <div className='details'>
                        <div className='box'>
                            <div className='left'>
                                <BsEnvelope />
                            </div>
                            <div className='right'>
                                <h2>email</h2>
                                <p>swift_logistics@gmail.com</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='left'>
                                <MdOutlinePhoneIphone />
                            </div>
                            <div className='right'>
                                <h2>call now</h2>
                                <p>(+91) 87348-44204</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='left'>
                                <FiMapPin />
                            </div>
                            <div className='right'>
                                <h2>find us</h2>
                                <p>Ahemdabad, Gujarat, India</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lower_box'>
                    <ul className='ul_links'>
                        <Link to="/" className='small_name'><li>Home</li></Link>
                        <Link to="/about" className='small_name'><li>About</li></Link>
                        <Link to="/vehicle" className='link'><li>Vehicle</li></Link>
                        <Link to="/login" className='booking_btn'><li>Booking</li></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default navbar