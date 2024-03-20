import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import login from '../../components/loans_img/login.png';
import Footer from '../footer/footer';



const Login = () => {

  const[userIp,setUserIp]=useState();

  function submitter(e)
  {
    e.preventDefault()
    const formData={
      email:e.target.email.value,
      password:e.target.password.value,
      ip:userIp
    }
    console.log(formData)
    axios.post("http://192.168.29.108:3001/login",formData).then((response) => {
      if(response.data.length > 0)
      {
        sessionStorage.setItem("token",response.data)
      }
      else{
        toast.warning("Incorrect Credentials",{position:"top-center"})
      }
    })
  }

  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((response) => setUserIp(response.data.IPv4)).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
 return( <div className='login'>
  <div className='container'>
    <div className='row'>
      <div className='col-sm-6'>
            <div className=' rounded rounded-5 formcard'>
              <div className='form'>
                <h5><b>Welecom Back! </b></h5><br></br>
                <p>Sign in to your account and join us </p><br></br><br></br>
                <form onSubmit={(e)=>submitter(e)} >
                <label><b>Enter Your Email ID</b></label>
                <input name='email' placeholder='Enter your Email...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <label><b>Enter Your Password</b></label>
                <input name='password' placeholder='Enter your Passwaord...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <p>Do you have an account? <b>Signup</b></p><br></br>
                <button type='submit' className='btn btn-outline-success rounded rounded-5'>Sign Up</button>
                </form>
              </div>
          </div>
      </div>
      <div className='col-sm-4'>
        <img src={login}/>
      </div>
      </div>
  </div>
<Footer/>
  </div>
);
 }

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
