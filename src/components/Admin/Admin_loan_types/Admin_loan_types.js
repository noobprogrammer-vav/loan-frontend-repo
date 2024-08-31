import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AdminLoanTypes = () => {

  const[summary,setSummary]=useState();
  const[description,setDescription]=useState();
  const[tabler,setTabler]=useState();

  const [reloader,setReloader] = useState(true)
  const navigate = useNavigate()

  const [tc, setTc] = useState()

  const resetbtn = useRef(null)

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_loan_types`).then((response) => {
      if(response.data.length > 0)
      {
        setTabler(response.data.map((data,index) => <tr>
          <td>{index+1}</td>
          <td>{data.loan_name}</td>
          <td>{data.gist}</td>
          <td dangerouslySetInnerHTML={{__html : data.summary}}></td>
          <td><img src={`${sessionStorage.getItem("urls")}/uploads/${data.image}`} style={{width:"100%"}} /></td>
          <td><i onClick={() => {navigate("/admin/loan/view",{state:data.id})}} className='fa fa-eye btn btn-sm btn-outline-warning' /></td>
          <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`${sessionStorage.getItem("urls")}/activate_loan_types/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>

        </tr>))
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/get_tc`).then((response) => {
      setTc(response.data.map((data,index) => <option value={data.id}>{data.tc_name}</option>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

  },[reloader])

  function submitter(e){

    e.preventDefault()
    if(summary.length > 10 && description.length > 10)
    {
      const formData = new FormData()
      formData.append("name", e.target.name.value)
      formData.append("gist", e.target.gist.value)
      formData.append("rate", e.target.rate.value)
      formData.append("tc_id", e.target.tc.value)
      formData.append("summary", summary)
      formData.append("description", description)
      formData.append("file", e.target.image.files[0])
  
      axios.post(`${sessionStorage.getItem("urls")}/add_loan_types`,formData).then((response) => {
        setReloader(!reloader)
        toast.success("Added",{position:"top-center"})
        resetbtn.current.click()
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      toast.warning("All fields are required")
    }

  }

  return(<div className=''>
    <AdminHeader title="Loan Types" />
    <form className='container' onSubmit={(e) => submitter(e)} >
      <label>Name</label>
      <input required className='form-control' name='name' placeholder='Enter the Name of Loan'></input><br></br>
      <label>Intereset Rate</label>
      <input required step="0.01" className='form-control' type='number' name='rate' placeholder='Enter the rate'></input><br></br>
      <label>Gist</label>
      <input required className='form-control' name='gist' placeholder='Enter the Gist'></input><br></br>
      <label>Terms and Conditions</label>
      <select className='form-control' name='tc'>{tc}</select>
      <label>Summary</label>
      <ReactQuill theme='snow' onChange={setSummary}/>
      <label>Description</label>
      <ReactQuill theme='snow' onChange={setDescription}/>
      <label>Image</label>
      <input required type='file' name='image' placeholder='image' className='form-control'></input><br></br>
      <button className='btn btn-outline-success ' type='submit'>Submit</button><button style={{display:"none"}} type='reset' ref={resetbtn} />
    </form>
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>Gist</th>
        <th>Summary</th>
        <th>Image</th>
        <th>View</th>
        <th>Status</th>
      </thead>
      <tbody>
        {tabler}
      </tbody>
    </table>
  </div>
);
  }

AdminLoanTypes.propTypes = {};

AdminLoanTypes.defaultProps = {};

export default AdminLoanTypes;
