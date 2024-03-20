import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import login from '../../components/loans_img/login.png';
import Footer from '../footer/footer';


const Signup = () => {

  
  const[userIp,setUserIp]=useState();


  function submitter(e)
  {
    e.preventDefault()
    const formData={
      name:e.target.name.value,
      email:e.target.email.value,
      mobile:e.target.mobile.value,
      birthday:e.target.dob.value,
      gender:e.target.gender.value,
      present_address:e.target.presentadd.value,
      permanent_address:e.target.peradd.value,
      occupation:e.target.occupation.value,
      password:e.target.password.value,
      ip:userIp
    }
    axios.post("http://192.168.29.108:3001/signup",formData).then((response) => {
       
    })
    console.log(formData)
  }

  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((response) => setUserIp(response.data.IPv4)).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])


  return(<div>
    <div className='login'>
  <div className='container'>
    <div className='row'>
      <div className='col-sm-6'>
            <div className=' rounded rounded-5 formcard'>
              <div className='form'>
                <h5><b>Let's get Started! </b></h5><br></br>
                <p>Please enter your Details</p><br></br><br></br>
                <form onSubmit={(e)=>submitter(e)} >
                <div className='row'>
                  <div className='col-sm-6'>
                  <label><b>Enter Your Name </b></label>
                <input required name='name' type="text" placeholder='Enter your Name...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <label><b>Enter Your Mobile No</b></label>
                <input required name='mobile' id='mobile' onChange={(e) => e.target.value.length > 10 ? document.getElementById("mobile").value = e.target.value.slice(0,10) : ""} type="number" placeholder='Enter your Mobile...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <label><b>Enter Your DOB</b></label>
                <input required name='dob' type="date" placeholder='Enter your DOB...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <label><b>Enter Your Permanent Address</b></label>
                <input required name='peradd' type="text" placeholder='Enter your permanent Add...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                  </div>
                  
                  <div className='col-sm-6'>
                  <label><b>Enter Your Email ID</b></label>
                <input required name='email' type="email" placeholder='Enter your Email...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                  <label><b>Enter Your Gender</b></label>
                <select defaultValue="disabled" name='gender'  placeholder='Enter your Gender...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}>
                <option value="disabled" disabled>--Select--</option>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
                </select>
                <br></br><br></br>
                <label><b>Enter Your Present Address</b></label>
                <input required name='presentadd' type="text" placeholder='Enter your Present Add...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <label><b>Enter Your Occupation</b></label>
                <input required name='occupation' type="text" placeholder='Enter your occupaion...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                  </div>
                </div>
                <label><b>Enter Your Password</b></label>
                <input required name='password' type="text" placeholder='Enter your password...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                <p>Do you have an account? <b>Signup</b></p><br></br>
                <button type='submit' className='btn btn-outline-success rounded rounded-5'>Sign Up</button>
                </form>
              </div>
          </div>
      </div>
      <div className='col-sm-4'>
        <img src={login} style={{padding:'25%'}}/>
      </div>
      </div>
  </div>

  </div>
  <Footer/>
  </div>
);
  }

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
