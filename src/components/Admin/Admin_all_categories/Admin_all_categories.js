import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminHeader from '../Admin_header/Admin_header';


const AdminAllCategories = () => {

  const [tabler,setTabler] = useState()

  function submitter(e)
  {
    e.preventDefault()
    axios.post(`${sessionStorage.getItem("urls")}/add_occupation`,{name : e.target.category.value}).then((response) => {
      toast.success("Success",{position:"top-center"})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_occupation`).then((response) => {
      setTabler(response.data.map((data,index) =>  <tr>
        <td>{index+1}</td>
        <td>{data.occupation_name}</td>
        <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`${sessionStorage.getItem("urls")}/activate_occupation/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div className='container text-center'>
    <AdminHeader title="Occupation Category" />
    <br />
    <h3>Add Categories</h3>
    <form onSubmit={(e) => submitter(e)}>
      <input className='form-control' type='text' name='category'  />
      <br />
      <button className='btn btn-sm btn-success' type='submit'>Submit</button>
    </form>
    <div>
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Occupations</th>
        <th>Status</th>
      </thead>
      <tbody>
        {tabler}
      </tbody>
    </table>
    </div>
  </div>
);
}

AdminAllCategories.propTypes = {};

AdminAllCategories.defaultProps = {};

export default AdminAllCategories;
