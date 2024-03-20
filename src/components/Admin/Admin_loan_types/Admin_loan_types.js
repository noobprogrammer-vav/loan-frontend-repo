import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminLoanTypes = () => {

  const[summary,setSummary]=useState();
  const[description,setDescription]=useState();
  const[tabler,setTabler]=useState();

  useEffect(() => {
    axios.get("http://192.168.29.108:3001/get_loan_types").then((response) => {
      if(response.data.length > 0)
      {
        setTabler(response.data.map((data,index) => <tr>
          <td>{index+1}</td>
          <td>{data.loan_name}</td>
          <td>{data.gist}</td>
          <td dangerouslySetInnerHTML={{__html : data.summary}}></td>
          <td><img src={`http://192.168.29.108:3001/uploads/${data.image}`} /></td>
          <td><i className='fa fa-eye btn btn-sm btn-outline-warning' /></td>
          <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`http://192.168.29.108:3001/activate_loan_types/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>

        </tr>))
      }
    })
  },[])

  function submitter(e){

    e.preventDefault()
    const formData = new FormData()
    formData.append("name", e.target.name.value)
    formData.append("gist", e.target.gist.value)
    formData.append("summary", summary)
    formData.append("description", description)
    formData.append("file", e.target.image.files[0])
    console.log(e.target.image.files[0])

    axios.post("http://192.168.29.108:3001/add_loan_types",formData).then((response) => {
    })
  }

  return(<div className=''>
    <AdminHeader title="Loan Types" />
    <form className='container' onSubmit={(e) => submitter(e)} >
      <label>Name</label>
      <input required className='form-control' name='name' placeholder='Enter the Name of Loan'></input><br></br>
      <label>Gist</label>
      <input required className='form-control' name='gist' placeholder='Enter the Gist'></input><br></br>
      <label>Summary</label>
      <ReactQuill theme='snow' onChange={setSummary}/>
      <label>Description</label>
      <ReactQuill theme='snow' onChange={setDescription}/>
      <label>Image</label>
      <input required type='file' name='image' placeholder='image' className='form-control'></input><br></br>
      <button className='btn btn-outline-success ' type='submit'>Submit</button>
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
