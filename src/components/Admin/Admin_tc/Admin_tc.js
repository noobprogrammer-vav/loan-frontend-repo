import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminHeader from '../Admin_header/Admin_header';




const AdminTc = () => {

  const [tc,setTc] = useState()
  const [tabler,setTabler] = useState()

  function submitter()
  {
    axios.post(`${sessionStorage.getItem("urls")}/add_tc`,{terms : tc, name : document.getElementById("name").value}).then((response) => {
      toast.success("Success",{position:"top-center"})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_tc`).then((response) => {
      setTabler(response.data.map((data,index) =>  <tr>
        <td>{index+1}</td>
        <td>{data.tc_name}</td>
        <td dangerouslySetInnerHTML={{__html : data.conditions}} />
        <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`${sessionStorage.getItem("urls")}/activate_tc/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div className='container'>
    <AdminHeader title="Terms and Conditions" />
    <br />
    <div className='container'>
      <form onSubmit={submitter}>
      <label>Condition name</label>
      <input className='form-control rounded rounded-5' required id='name' name='name' type='text' />
      <br />
      <ReactQuill theme="snow" onChange={setTc} />
      <br />
      <button className='btn btn-sm btn-success' type='submit'>Submit</button>
      </form>
    </div>
    <br />
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>Terms and Conditions</th>
        <th>Status</th>
      </thead>
      <tbody>
        {tabler}
      </tbody>
    </table>
  </div>
);
}

AdminTc.propTypes = {};

AdminTc.defaultProps = {};

export default AdminTc;
