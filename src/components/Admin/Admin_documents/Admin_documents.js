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
    axios.post("http://192.168.29.108:3001/add_doc_type",formData).then((response) => {
      toast.success("Added")
    })
  }
  useEffect(()=>{
    axios.get("http://192.168.29.108:3001/get_doc_type").then((response)=>{
      if(response.data.length>0){
        setTabler(response.data.map((data,index)=><tr>
          <td>{index+1}</td>
          <td>{data.document_name}</td>
          <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`http://192.168.29.108:3001/activate_doc_type/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>

        </tr>))

      }
    })
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
