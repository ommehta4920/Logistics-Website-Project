import React, {useState} from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import ClientForm from './client_login'
import DriverForm from './driver_login'
const Login = () => {
    const [showForm, setShowForm] = useState(true);
  return (
    <>
    <div className='body_container'>
      <div className='banner'>
            <div className='banner_overlay'>
              <div className='title'>
                <h3>prove your identity</h3>
                <h2>login your account</h2>
              </div>
            </div>
      </div>
      <div className='form_box'>
        <div className='login_form'>
          <div className='box_header'>
            <h2>login to your account</h2>
          </div>
          <div className='form_body'>
            <div className='user_select'>
                <button className={`btn_user ${showForm ? 'btn_active' : 'btn_inactive'}`} onClick={ () => setShowForm(true)}>Client</button>
                <button className={`btn_user ${!showForm ? 'btn_active' : 'btn_inactive'}`} onClick={ () => setShowForm(false)}>Driver</button>
            </div>
            {showForm ? <ClientForm /> : <DriverForm />}
          </div>
          <div className='form_end'>
            <h3>Forget your Password ?</h3>
            <p>no worries, <Link to='/register' className='link'>click here</Link> to reset your password.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login