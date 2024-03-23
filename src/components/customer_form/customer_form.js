import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import customerform from '../loans_img/customer_form_inPixio.png';
import Footer from '../footer/footer';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerForm = () => {

  const [incomes,setIncomes] = useState()
  const [occupations,setOccupations] = useState()

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
      axios.get("http://192.168.29.108:3001/active_income").then((response) => {
        if(response.data.length > 0)
        {
          setIncomes(response.data.map((data,index) => <option value={data.id}>{data.max_income.charAt(data.max_income.length - 1) == 1 ? `more than ${parseInt(data.max_income) - 1}` : `${index == 0 ? '0' : response.data[index -1].max_income} - ${data.max_income}`}</option>))
        }
      })
  
      axios.get("http://192.168.29.108:3001/get_occupation").then((response) => {
        setOccupations(response.data.map((data,index) => <option value={data.id}>{data.occupation_name}</option>))
      })
  
      axios.post("http://192.168.29.108:3001/get_specific_customer_info",{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length != 0)
        {
          navigate("/application",{state:nav_data})
        }
      })
    }
    else{
      navigate("/login")
    }

  },[])

  function submitter(e)
  {
    e.preventDefault()
    const formData = new FormData()
    formData.append("token",sessionStorage.getItem("token"))
    formData.append("present_address",e.target.present_address.value)
    formData.append("permanent_address",e.target.permanent_address.value)
    formData.append("photo",e.target.photo.files[0])
    formData.append("dob",e.target.dob.value)
    formData.append("income_id",e.target.income_id.value)
    formData.append("income",e.target.income.value)
    formData.append("occupation_id",e.target.occupation_id.value)
    formData.append("occupation",e.target.occupation.value)
    formData.append("income_statement",e.target.statement.files[0])
    formData.append("aadhar_no",e.target.aadhar_no.value)
    formData.append("aadhar_doc",e.target.aadhar_doc.files[0])
    formData.append("pan_no",e.target.pan_no.value)
    formData.append("pan_doc",e.target.pan_doc.files[0])
    formData.append("emi",e.target.emi.value)

    axios.post("http://192.168.29.108:3001/add_customer_info",formData).then((response) => {
      navigate("/application",{state:nav_data})
    })

  }

  return(<div>
    <h2 className='text-center'>Welecome!</h2><br></br>
    <h4 className='text-center'>Fill Your Details here.</h4>
    <div className='conatiner ' style={{marginTop:'5%'}}>
      <div className='row'>
        <div className='col-sm-8'>
        <div className='customerform' >
              <form onSubmit={(e) => submitter(e)}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label>Present Address</label>
                    <textarea className='form-control rounded rounded-5' name='present_address' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Permanent Address</label>
                    <textarea className='form-control rounded rounded-5' name='permanent_address' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Profile Photo</label>
                    <input type='file' className='form-control rounded rounded-5' name='photo' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Date of Birth</label>
                    <input type='date' className='form-control rounded rounded-5' name='dob' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Income category</label>
                    <select className='form-control rounded rounded-5' name='income_id' type='number' >
                      <option>--Select--</option>
                      {incomes}
                    </select><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Income</label>
                    <input type='number' className='form-control rounded rounded-5' name='income' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Occupation ID</label>
                    <select defaultValue={"none"} onChange={(e) => occupational(e.target.value)} className='form-control rounded rounded-5' name='occupation_id' type='number'>
                      <option value={"none"}>--Select--</option>
                      {occupations}
                    </select><br></br>
                    <input className='form-control rounded rounded-5' placeholder='Enter your Occupation' name='occupation' style={{display:"none"}} id='others' /><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Income Statement</label>
                    <input type='file' className='form-control rounded rounded-5' name='statement' />
                  </div>
                  <div className='col-sm-6'>
                    <label>Aadhar Number</label>
                    <input className='form-control rounded rounded-5' name='aadhar_no' type='number' placeholder='Aadhar number'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>Aadhar Document</label>
                    <input className='form-control rounded rounded-5' name='aadhar_doc' type='file'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>PAN Number</label>
                    <input className='form-control rounded rounded-5' name='pan_no' type='number' placeholder='PAN number'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>PAN Document</label>
                    <input className='form-control rounded rounded-5' name='pan_doc' type='file'></input><br />
                  </div>
                  <div className='col-sm-6'>
                    <label>EMI Number</label>
                    <input className='form-control rounded rounded-5' name='emi' type='number'></input><br />
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
<Footer/>
  </div>
);
}

CustomerForm.propTypes = {};

CustomerForm.defaultProps = {};

export default CustomerForm;
