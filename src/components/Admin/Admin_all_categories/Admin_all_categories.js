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
    axios.post(`http://192.168.29.108:3001/add_occupation`,{name : e.target.category.value}).then((response) => {
      toast.success("Success",{position:"top-center"})
    })
  }

  useEffect(() => {
    axios.get(`http://192.168.29.108:3001/get_occupation`).then((response) => {
      setTabler(response.data.map((data,index) =>  <tr>
        <td>{index+1}</td>
        <td>{data.occupation_name}</td>
        <td><button className={`btn btn-sm btn-${data.status == 1 ? "danger" : "success"}`} onClick={() => axios.get(`http://192.168.29.108:3001/activate_occupation/${data.id}`).then((response) => window.location.reload(true))}>{data.status == 1 ? "Deactivate" : "Activate"}</button></td>
      </tr>))
    })
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
