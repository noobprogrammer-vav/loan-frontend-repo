import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import login from '../../components/loans_img/login.png';
import Footer from '../footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/header';



const Login = () => {

  const[userIp,setUserIp]=useState();

  const navigate = useNavigate()

  const nav_data = useLocation().state


  function submitter(e)
  {
    e.preventDefault()
    if(e.target.email.value == "admin@gmail.com" && e.target.password.value == "Admin")
    {
      sessionStorage.setItem("user","Admin")
      navigate("/admin")
    }
    else{
      const formData={
        email:e.target.email.value,
        password:e.target.password.value,
        ip:userIp
      }
      // console.log(formData)
      axios.post(`${sessionStorage.getItem("urls")}/login`,formData).then((response) => {
        if(response.data.length > 0)
        {
          sessionStorage.setItem("token",response.data)
          navigate("/")
        }
        else{
          toast.warning("Incorrect Credentials",{position:"top-center"})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }


  }

  useEffect(() => {

    if(nav_data == "yes")
    {
      toast.warning("Login to Continue",{position:"top-center"})
    }
    else if(nav_data == "yesir")
    {
      toast.warning("Session Time has ended login again",{position:"top-center"})
    }

    axios.get("https://geolocation-db.com/json/").then((response) => setUserIp(response.data.IPv4)).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
 return( <div className='login'>
  <Header />
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
                <input type='password' name='password' placeholder='Enter your Password...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <center><button type='submit' className='btn btn-outline-success rounded rounded-5'>Log in</button></center><br />
                <p>New Here? <b style={{cursor:"pointer"}} onClick={() => navigate("/signup")}>Signup</b></p><br></br>
                </form>
              </div>
          </div>
      </div>
      <div className='col-sm-4'>
        <img src={login}/>
      </div>
      </div>
  </div>
  </div>
);
 }

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
