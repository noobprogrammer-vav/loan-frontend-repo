import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminHeader from '../Admin_header/Admin_header';


const AdminIncomeCategories = () => {

  const [tabler,setTabler] = useState()

  function submitter(e)
  {
    e.preventDefault()
    axios.post(`${sessionStorage.getItem("urls")}/add_income`,{name : e.target.type.value}).then((response) => {
      toast.success("Success",{position:"top-center"})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_income`).then((response) => {
      setTabler(response.data.map((data,index) =>  <tr>
        <td>{index+1}</td>
        <td>{data.max_income}</td>
        <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`${sessionStorage.getItem("urls")}/activate_income/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div>
    <AdminHeader title="Income Category" />
    <div className='container text-center'>
      <h3>Add Income Categories</h3>
      <form onSubmit={(e)=>submitter(e)}>
        <input min={0} className='form-control' type='number' name='type' />
        <br />
        <button className='btn btn-sm btn-success' type='submit'>Submit</button>
      </form>
      <br />
      <hr />
      <br />
      <table className='table'>
        <thead>
          <th>#</th>
          <th>Category</th>
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

AdminIncomeCategories.propTypes = {};

AdminIncomeCategories.defaultProps = {};

export default AdminIncomeCategories;
