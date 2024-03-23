import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import login from '../../components/loans_img/login.png';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  
  const[userIp,setUserIp]=useState();

  const [occupation,setOccupation] = useState();
  const navigate = useNavigate()

  function submitter(e)
  {
    e.preventDefault()
    const formData={
      name : e.target.name.value,
      email : e.target.email.value,
      mobile : e.target.mobile.value,
      gender : e.target.gender.value,
      occupation : e.target.occupation.value.length == 0 ? null : e.target.occupation.value,
      occupation_id : e.target.occupation_id.value,
      password : e.target.password.value,
      ip : userIp
    }
    axios.post("http://192.168.29.108:3001/signup",formData).then((response) => {
       if(response.data == 1062)
       {
        alert("Email or mobile already exists")
        toast.error("Email or mobile already exists",{position:"top-center"})
       }
       else{
        navigate("/login")  
       }
    })
    // console.log(formData)
  }

  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((response) => setUserIp(response.data.IPv4)).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get("http://192.168.29.108:3001/get_occupation").then((response) => {
      setOccupation(response.data.map((data,index) => <option value={data.id}>{data.occupation_name}</option>))
    })

  },[])

  function occupationSet(e)
  {
    if (e == 1)
    {
      document.getElementById("occu").style.display = "block"
    }
    else{
      document.getElementById("occu").style.display = "none"
    }
  }


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
                  </div>
                  <div className='col-sm-6'>
                    <label><b>Enter Your Mobile </b></label>
                    <input required name='mobile' type="text" placeholder='Enter your Mobile...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                  </div>
                  <div className='col-sm-6'>
                    <label><b>Enter Your Email-Id </b></label>
                    <input required name='email' type="text" placeholder='Enter your Email...' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                  </div>
                  <div className='col-sm-6'>
                    <label><b>Select Your Gender </b></label>
                    <select defaultValue={0} required name="gender" className='form-control rounded rounded-5'>
                      <option disabled value={0}>-- --</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className='col-sm-6'>
                    <label><b>Enter Your Occupation </b></label>
                    <select onChange={(e) => occupationSet(e.target.value)} defaultValue={0} required name="occupation_id" className='form-control rounded rounded-5'>
                      <option disabled value={0}>-- --</option>
                      {occupation}
                    </select>
                    <br />
                    <input style={{display:"none"}} id='occu' placeholder='Enter your Occupation' className='form-control rounded rounded-5' name='occupation' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label><b>Enter Your Password </b></label>
                    <input required name='password' type="password" placeholder='Password' className='form-control rounded rounded-5' style={{backgroundColor:'#F7F9F9'}}></input><br></br><br></br>
                  </div>
                </div>
                <p>Do you have an account? <b>Signup</b></p><br></br>
                <button type='submit' className='btn btn-outline-success rounded rounded-5'>Sign Up</button>
                </form>
              </div>
          </div>
      </div>
      <div className='col-sm-6'>
        <center><img src={login} /></center>
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
