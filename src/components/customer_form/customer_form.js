import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import customerform from '../loans_img/customer_form_inPixio.png';
import Footer from '../footer/footer';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import { toast } from 'react-toastify';

const CustomerForm = () => {

  const [incomes,setIncomes] = useState()
  const [occupations,setOccupations] = useState()

  const [mini,setMini] = useState(0)
  const [maxi,setMaxi] = useState(100)


  const navigate = useNavigate()
  const nav_data = useLocation().state

  function occupational(e)
  {
    if(e == 1)
    {
      document.getElementById("others").style.display = "block"
    }
    else{
      document.getElementById("others").style.display = "none"
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem("token") != null)
    {
      axios.get(`${sessionStorage.getItem("urls")}/active_income`).then((response) => {
        if(response.data.length > 0)
        {
          setIncomes(response.data.map((data,index) => <option value={[data.id,data.max_income.charAt(data.max_income.length - 1) == 1 ? `more than ${parseInt(data.max_income) - 1}` : `${index == 0 ? '0' : response.data[index -1].max_income} - ${data.max_income}`]}>{data.max_income.charAt(data.max_income.length - 1) == 1 ? `more than ${parseInt(data.max_income) - 1}` : `${index == 0 ? '0' : response.data[index -1].max_income} - ${data.max_income}`}</option>))
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  
      axios.get(`${sessionStorage.getItem("urls")}/get_occupation`).then((response) => {
        setOccupations(response.data.map((data,index) => <option value={data.id}>{data.occupation_name}</option>))
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
  
      axios.post(`${sessionStorage.getItem("urls")}/get_specific_customer_info`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length != 0)
        {
          navigate("/application",{state:nav_data})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      navigate("/login")
    }

  },[])

  function submitter(e)
  {
    e.preventDefault()
    if(e.target.income_id.value != "none" && e.target.occupation_id.value != "none")
    {
      const formData = new FormData()
      formData.append("token",sessionStorage.getItem("token"))
      formData.append("present_address",e.target.present_address.value)
      formData.append("permanent_address",e.target.permanent_address.value)
      formData.append("photo",e.target.photo.files[0])
      formData.append("dob",e.target.dob.value)
      formData.append("income_id",e.target.income_id.value.split(',')[0])
      formData.append("income",e.target.income.value)
      formData.append("occupation_id",e.target.occupation_id.value)
      formData.append("occupation",e.target.occupation.value)
      formData.append("income_statement",e.target.statement.files[0])
      formData.append("aadhar_no",e.target.aadhar_no.value)
      formData.append("aadhar_doc",e.target.aadhar_doc.files[0])
      formData.append("pan_no",e.target.pan_no.value)
      formData.append("pan_doc",e.target.pan_doc.files[0])
      formData.append("emi",e.target.emi.value)
  
      axios.post(`${sessionStorage.getItem("urls")}/add_customer_info`,formData).then((response) => {
        navigate("/application",{state:nav_data})
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      toast.warning("All fields are Required",{position:"top-center"})
    }
  }

  function income_checker(e)
  {
    if(e != "none")
    {
      setMini(parseInt(e.split(',')[1].split('-')[0]))
      setMaxi(parseInt(e.split(',')[1].split('-')[1]))
    }
  }

  return(<div>
    <Header />
    <h2 className='text-center'>Welcome!</h2><br></br>
    <h4 className='text-center'>Fill Your Details here.</h4>
    <div className='conatiner ' style={{marginTop:'5%'}}>
      <div className='row'>
        <div className='col-sm-8'>
        <div className='customerform' >
              <form onSubmit={(e) => submitter(e)}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label>Present Address</label>
                    <textarea required className='form-control rounded rounded-5' name='present_address' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Permanent Address</label>
                    <textarea required className='form-control rounded rounded-5' name='permanent_address' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Profile Photo</label>
                    <input required type='file' className='form-control rounded rounded-5' name='photo' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Date of Birth</label>
                    <input required type='date' className='form-control rounded rounded-5' name='dob' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Income category</label>
                    <select defaultValue={"none"} className='form-control rounded rounded-5' onChange={(e) => income_checker(e.target.value)} name='income_id' >
                      <option value={"none"}>--Select--</option>
                      {incomes}
                    </select><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Income</label>
                    <input required type='number' min={mini} max={maxi} className='form-control rounded rounded-5' name='income' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Occupation ID</label>
                    <select defaultValue={"none"} onChange={(e) => occupational(e.target.value)} className='form-control rounded rounded-5' name='occupation_id' type='number'>
                      <option value={"none"}>--Select--</option>
                      {occupations}
                    </select><br></br>
                    <input required className='form-control rounded rounded-5' placeholder='Enter your Occupation' name='occupation' style={{display:"none"}} id='others' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Income Statement</label>
                    <input required type='file' className='form-control rounded rounded-5' name='statement' />
                  </div>
                  <div className='col-sm-6'>
                    <label>Aadhar Number</label>
                    <input required min={1} onChange={(e) => e.target.value.length > 12 ? document.getElementById("aadhar_no").value = e.target.value.slice(0,12) : ''} id='aadhar_no' className='form-control rounded rounded-5' name='aadhar_no' type='number' placeholder='Aadhar number'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Aadhar Document</label>
                    <input required className='form-control rounded rounded-5' name='aadhar_doc' type='file'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>PAN Number</label>
                    <input pattern='[A-Z]{5}[0-9]{4}[A-Z]{1}' required min={1} onChange={(e) => e.target.value.length > 10 ? document.getElementById("pan_no").value = e.target.value.slice(0,10) : ''} className='form-control rounded rounded-5' id='pan_no' name='pan_no' type='text' placeholder='PAN number'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>PAN Document</label>
                    <input required className='form-control rounded rounded-5' name='pan_doc' type='file'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>EMI Amount</label>
                    <input required min={1} placeholder='Total Yearly EMI amount' className='form-control rounded rounded-5' name='emi' type='number'></input><br />
                  </div>
              <button className='btn btn-success' style={{height:'fit-content',width:'fit-content',marginLeft:'45%'}} type='submit'>Submit</button>
                
                </div>
                </form> 
            </div>
            </div>
        <div className='col-sm-4 text-center'>
          <img src={customerform} style={{width:'100%'}}/>
        </div>
      </div>
    </div>
  </div>
);
}

CustomerForm.propTypes = {};

CustomerForm.defaultProps = {};

export default CustomerForm;
