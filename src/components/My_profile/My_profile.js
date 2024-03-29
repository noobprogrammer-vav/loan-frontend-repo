import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import { toast } from 'react-toastify';


const MyProfile = () => {


  const [updateform,setUpdateform] = useState()

  const navigate = useNavigate()

  function submitter(e)
  {
    e.preventDefault()
    const formData = {
      income_id : e.target.income_id.value,
      income : e.target.income.value,
      occupation_id : e.target.occupation_id.value,
      occupation : e.target.others.value.length > 1 ? e.target.others.value : null,
      emi : e.target.emi.value,
      token : sessionStorage.getItem("token")
    }

    axios.post(`${sessionStorage.getItem("urls")}/update_docs`, formData).then((response) => {
      axios.post(`${sessionStorage.getItem("urls")}/update_user`, {token : sessionStorage.getItem("token"),name : e.target.name.value}).then((response2) => {
        if(e.target.aadhar_doc.files[0] != undefined)
        {
          const formData = new FormData()
          formData.append("token", sessionStorage.getItem("token"))
          formData.append("file", e.target.aadhar_doc.files[0])
          axios.post(`${sessionStorage.getItem("urls")}/update_aadhar`, formData).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
        }
        if(e.target.pan_doc.files[0] != undefined)
        {
          const formData = new FormData()
          formData.append("token", sessionStorage.getItem("token"))
          formData.append("file", e.target.pan_doc.files[0])
          axios.post(`${sessionStorage.getItem("urls")}/update_pan`, formData).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
        }
        if(e.target.photo.files[0] != undefined)
        {
          const formData = new FormData()
          formData.append("token", sessionStorage.getItem("token"))
          formData.append("file", e.target.photo.files[0])
          axios.post(`${sessionStorage.getItem("urls")}/update_photo`, formData).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
        }
        if(e.target.statement.files[0] != undefined)
        {
          const formData = new FormData()
          formData.append("token", sessionStorage.getItem("token"))
          formData.append("file", e.target.statement.files[0])
          axios.post(`${sessionStorage.getItem("urls")}/update_income_statement`, formData).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
        }
        navigate("/")
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {

    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/get_specific_customer_info`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data.length > 0)
        {
          let data = response.data[0]
          // console.log(new Date(data.birthday).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-'))
          axios.get(`${sessionStorage.getItem("urls")}/active_income`).then((response1) => {
            if(response.data.length > 0)
            {
              axios.get(`${sessionStorage.getItem("urls")}/get_occupation`).then((response2) => {
                setUpdateform(
                  <form onSubmit={(e) => submitter(e)}>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label>Name</label>
                      <input required defaultValue={data.name} type='text' className='form-control rounded rounded-5' name='name' /><br />
                    </div>
                    <div className='col-sm-6'>
                      <label>Profile Photo</label>
                      <div className='row'>
                        <div className='col-sm-11'><input type='file' className='form-control rounded rounded-5' name='photo' /><br /></div>
                        <div className='col-sm-1'><button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.photo}`} target="_blank"><i className='fa fa-download' /></a></button></div>
                      </div> 
                    </div>
                    <div className='col-sm-6'>
                      <label>Income category</label>
                      <select required defaultValue={data.income_id} className='form-control rounded rounded-5' name='income_id' type='number' >
                        {response1.data.map((dataa,index) => <option value={dataa.id}>{dataa.max_income.charAt(dataa.max_income.length - 1) == 1 ? `more than ${parseInt(dataa.max_income) - 1}` : `${index == 0 ? '0' : response1.data[index -1].max_income} - ${dataa.max_income}`}</option>)}
                      </select><br />
                    </div>
                    <div className='col-sm-6'>
                      <label>Income</label>
                      <input required defaultValue={data.income} type='number' className='form-control rounded rounded-5' name='income' /><br />
                    </div>
                    <div className='col-sm-6'>
                      <label>Occupation ID</label>
                      <select required defaultValue={data.occupation_id} onChange={(e) => occupational(e.target.value)} className='form-control rounded rounded-5' name='occupation_id' type='number'>
                        {response2.data.map((dataa,index) => <option value={dataa.id}>{dataa.occupation_name}</option>)}
                      </select><br></br>
                      <input defaultValue={data.occupation} className='form-control rounded rounded-5' placeholder='Enter your Occupation' name='occupation' id='others' /><br />
                    </div>
                    <div className='col-sm-6'>
                      <label>Income Statement</label>
                      <div className='row'>
                        <div defaultValue={data.income_statement} className='col-sm-11'><input type='file' className='form-control rounded rounded-5' name='statement' /></div>
                        <div className='col-sm-1'><button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.income_statement}`} target="_blank"><i className='fa fa-download' /></a></button></div>
                      </div>
                                
                    </div>
                    <div className='col-sm-6'>
                      <label>Aadhar Document</label>
                      <div className='row'>
                        <div className='col-sm-11'><input className='form-control rounded rounded-5' name='aadhar_doc' type='file'></input><br /></div>
                        <div className='col-sm-1'><button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.aadhar_doc}`} target="_blank"><i className='fa fa-download' /></a></button></div>
                      </div>
                                
                    </div>
                    <div className='col-sm-6'>
                      <label>PAN Document</label>
                      <div className='row'>
                        <div className='col-sm-11'><input className='form-control rounded rounded-5' name='pan_doc' type='file'></input><br /></div>
                        <div className='col-sm-1'><button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.pan_doc}`} target="_blank"><i className='fa fa-download' /></a></button></div>
                      </div>  
                    </div>
                    <div className='col-sm-6'>
                      <label>EMI Amount</label>
                      <input required defaultValue={data.emi_amount} className='form-control rounded rounded-5' name='emi' type='number'></input><br />
                    </div>
                    <button className='btn btn-success' style={{height:'fit-content',width:'fit-content',marginLeft:'45%'}} type='submit'>Update</button>      
                  </div>
                </form>
                )
                // setOccupations(response2.data.map((dataa,index) => <option value={dataa.id}>{dataa.occupation_name}</option>))
              }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
              console.log(err)})
              // setIncomes(response1.data.map((data,index) => <option value={data.id}>{data.max_income.charAt(data.max_income.length - 1) == 1 ? `more than ${parseInt(data.max_income) - 1}` : `${index == 0 ? '0' : response.data[index -1].max_income} - ${data.max_income}`}</option>))
            }
          }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
  
        }
  
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      navigate("/login",{state : "yes"})
    }
  },[])

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

  return(<div>
    <Header />
    <div className='container'>
      {updateform}
    </div>
  </div>
);
}

MyProfile.propTypes = {};

MyProfile.defaultProps = {};

export default MyProfile;
