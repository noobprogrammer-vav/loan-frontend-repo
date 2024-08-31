import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../header/header'


const ContactUs = () => {

  const resetbtn = useRef(null)

  function submitter(e)
  {
    e.preventDefault()
    if(e.target.mobile.value.length == 10)
    {
      const formData = {
        name : e.target.name.value,
        email : e.target.email.value,
        mobile : e.target.mobile.value,
        message : e.target.message.value,
      }
      axios.post(`${sessionStorage.getItem("urls")}/contact`,formData).then((response) => {
        toast.success("We will contat you real soon",{position:"top-center"})
        resetbtn.current.click()
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      toast.warning("Mobile number should be of 10 digits",{position:"top-center"})
    }



  }

  return(<div>
    <Header />
  <div className='container contact'>
    <div className='row'>
      <div className='col-sm-7 containerform'>
        <form onSubmit={(e) => submitter(e)}>
        <div className='row'>
          <div className='col-sm-6'>
          <label>Name</label><br></br>
       <input required className='form-control rounded rounded-5' placeholder='Name' name='name'></input><br></br><br></br>
       <label>Mobile</label><br></br>
       <input min={1} required onChange={(e) => e.target.value.length > 10 ? document.getElementById("mobile").value = e.target.value.slice(0,10) : ''} id='mobile' className='form-control rounded rounded-5' placeholder='Mobile' type='number' name='mobile'></input><br></br><br></br>
       <button className='btn btn-success rounded rounded-5' type='submit'>Send Message</button><button style={{display:"none"}} type="reset" ref={resetbtn} />

        </div>
        <div className='col-sm-6'>
          <label>Email</label><br></br>
       <input required className='form-control rounded rounded-5' placeholder='Email' type='email' name='email'></input><br></br><br></br>
       <label>Message</label><br></br>
       <textarea required className='form-control rounded rounded-5' placeholder='Message' name='message'></textarea>
        </div>
      </div>
      </form>
      </div>
      <div className='col-sm-1'></div>
      <div className='col-sm-4 help'>
       <center><h3><b>Need More Help?</b></h3><br></br></center> 
        <hr></hr><br></br>
        <div className='card'>
          <center><i class="fa fa-phone"></i> <h5><b>Call Us</b></h5></center>
          <p><center>(123)0984-4567</center></p>
          <p><center>(123)0984-4567</center></p>

        </div><br></br>
        <div className='card'>
          <center><i class="fa fa-envelope"></i> <h5><b>Email</b></h5></center>
          <p><center>example@gmail.com</center></p>
          <p><center>loanlink@gmail.com</center></p>

        </div><br></br>
        <div className='card'>
          <center><i class="fa fa-map"></i> <h5><b>Location</b></h5></center>
          <p><center>Sector-9 Avas Vikas</center></p>

        </div>
      </div>
      </div>
    </div>
  </div>
);
}

ContactUs.propTypes = {};

ContactUs.defaultProps = {};

export default ContactUs;
