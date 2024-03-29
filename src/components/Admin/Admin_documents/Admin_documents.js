import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminHeader from '../Admin_header/Admin_header';


const AdminDocuments = () => {
  const[tabler,setTabler]=useState();

  function submitter(e){
    e.preventDefault()
    const formData={
      name:e.target.document_name.value,
    }
    console.log(formData)
    axios.post(`${sessionStorage.getItem("urls")}/add_doc_type`,formData).then((response) => {
      toast.success("Added")
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }
  useEffect(()=>{
    axios.get(`${sessionStorage.getItem("urls")}/get_doc_type`).then((response)=>{
      if(response.data.length>0){
        setTabler(response.data.map((data,index)=><tr>
          <td>{index+1}</td>
          <td>{data.document_name}</td>
          <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`${sessionStorage.getItem("urls")}/activate_doc_type/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>

        </tr>))

      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
  return(<div>
    <AdminHeader title="Document Type" />
    <form onSubmit={(e)=>submitter(e)}>
    <label>Document Name</label>
    <input required className='form-control' placeholder='document name' name='document_name'></input><br></br>
    <button type='submit' className='btn btn-success'>Submit</button>
    </form>
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Document Name</th>
        <th>Status</th>
      </thead>
      <tbody>
        {tabler}
      </tbody>
    </table>

  </div>
);
  }

AdminDocuments.propTypes = {};

AdminDocuments.defaultProps = {};

export default AdminDocuments;
