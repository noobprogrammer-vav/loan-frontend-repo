import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminCustomers = () => {

  const [tabler,setTabler] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_customers`).then((response) => {
      setTabler(response.data.map((data,index) => <tr>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.application_count}</td>
        <td>{Date(data.created_at)}</td>
        <td onClick={() => navigate("/admin/customer/view",{state:data.cid})}><i className='fa fa-eye btn btn-sm btn-outline-success' /></td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
  
  return(<div>
    <AdminHeader title="Customers" />
    <div className='container'>
      <table className='table'>
        <thead>
          <th>#</th>
          <th>Customer name</th>
          <th>Number of Loans</th>
          <th>Joined At</th>
        </thead>
        <tbody>
          {tabler}
        </tbody>
      </table>
    </div>
  </div>
);
}

AdminCustomers.propTypes = {};

AdminCustomers.defaultProps = {};

export default AdminCustomers;
