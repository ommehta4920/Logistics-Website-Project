import ClientForm from './client_register'
import DriverForm from './driver_register'
import './register.css';
import { useState } from "react";
const Register = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <>
      <div className="body_container">
        <div className="banner">
          <div className="banner_overlay">
            <div className="title">
              <h3>create your account</h3>
              <h2>Sign Up</h2>
            </div>
          </div>
        </div>
        <div className="form_box">
          <div className="form">
            <div className="box_header">
              <h2>register a new account</h2>
            </div>
            <div className='form_content'>
              <div className='user_select'>
                <button className={`btn_user ${showForm ? 'btn_active' : 'btn_inactive'}`} onClick={ () => setShowForm(true)}>Client</button>
                <button className={`btn_user ${!showForm ? 'btn_active' : 'btn_inactive'}`} onClick={ () => setShowForm(false)}>Driver</button>
              </div>
              {showForm ? <ClientForm /> : <DriverForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register