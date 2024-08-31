import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../../header/header';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminHeader from '../Admin_header/Admin_header';
import ReactQuill from 'react-quill';


const AdminCustomerLoansView = () => {

  const nav_data = useLocation().state
  const [formval,setFormval] = useState()
  const [image,setImage] = useState()

  const [reloader,setReloader] = useState()



  // const [set]

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_specific_loan_types/${nav_data}`).then((response) => {
      axios.get(`${sessionStorage.getItem("urls")}/get_tc`).then((response2) => {
        if(response.data.length>0){
          let data = response.data[0]
          document.getElementById("name").innerHTML = data.loan_name
          document.getElementById("gist").innerHTML = data.gist
          document.getElementById("summary").innerHTML = data.summary
          document.getElementById("description").innerHTML = data.description
          document.getElementById("t_and_c").innerHTML = data.conditions
          setImage(`${sessionStorage.getItem("urls")}/uploads/${data.image}`)
          setFormval(<div className='row'>
            <div className='col-sm-6'>
              <br />
              <label>Loan Name</label>
              <input required className='form-control rounded rounded-5' name="name" type='text' defaultValue={data.loan_name} />
            </div>
            <div className='col-sm-6'>
              <br />
              <label>Interest Rate</label>
              <input required step="0.01" className='form-control rounded rounded-5' name="rate" type='number' defaultValue={data.interest_rate} />
            </div>
            <div className='col-sm-6'>
              <br />
              <label>Gist</label>
              <input required className='form-control rounded rounded-5' name="gist" type='text' defaultValue={data.gist} />
            </div>
            <div className='col-sm-6'>
              <br />
              <label>T and C</label>
              <select className='form-control rounded rounded-5' name="tc_id" defaultValue={data.tc_id}>
                {response2.data.map((data,index) => <option value={data.id}>{data.tc_name}</option>)}
              </select>
            </div>
            <div className='col-sm-12'>
              <br />
              <label>Image</label>
              <input className='form-control rounded rounded-5' name="image" type='file' />
            </div>
            <div className='col-sm-6'>
              <br />
              <label>Summary</label>
              <ReactQuill id='summary_form' theme='snow' defaultValue={data.summary} />
            </div>
            <div className='col-sm-6'>
              <br />
              <label>Description</label>
              <ReactQuill id='description_form' theme='snow' defaultValue={data.description} />
            </div>
          </div>)
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[reloader])

  function submitter(e)
  {
    e.preventDefault()
    const formData = {
      name : e.target.name.value,
      rate : e.target.rate.value,
      gist : e.target.gist.value,
      tc_id : e.target.tc_id.value,
      summary : document.getElementById("summary_form").lastChild.firstChild.innerHTML,
      description : document.getElementById("description_form").lastChild.firstChild.innerHTML,
    }

    axios.post(`${sessionStorage.getItem("urls")}/edit_loan_types/${nav_data}`,formData).then((response) => {
      toast.success("Updated",{position:"top-center"})
      setReloader(!reloader)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    console.log('formData', formData)
    if(e.target.image.value.length != 0)
    {
      const image_file = new FormData()
      image_file.append("file",e.target.image.files[0])
      axios.post(`${sessionStorage.getItem("urls")}/edit_loan_image/${nav_data}`,image_file).then((response) => {
        setReloader(!reloader)
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
  }

  return(<div>
    <AdminHeader title="Loan View" />
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6'>
          <div className='container'>
          <h1 id='name' />
          <h5 id='gist' />
          <img id='image' src={image} style={{width:"100%"}} />
          <p id='summary' />
          <p id='description' />
          <div className='container border border-dark'>
            <h1>Terms and Conditions</h1>
            <p id='t_and_c' />
          </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <h1 className='text-center'>Editor</h1>
          <form onSubmit={(e) => submitter(e)}>
          {formval}
          <br />
          <center><button className='btn btn-sm btn-success'>Update</button></center>
          </form>
        </div>
      </div>
    </div>

  </div>
);
}

AdminCustomerLoansView.propTypes = {};

AdminCustomerLoansView.defaultProps = {};

export default AdminCustomerLoansView;
