import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../Admin_header/Admin_header';
import { toast } from 'react-toastify';


const AdminCustomerLoans = () => {

  const [tabler,setTabler] = useState()
  const nav_data = useLocation().state


  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/emi_table/${nav_data[1]}`).then((response) => {
      setTabler(response.data.map((data,index) =>   <tr>
        <td>{index + 1}</td>
        <td>{data.loan_name}</td>
        <td>{data.description}</td>
        <td>{data.principle}</td>
        <td>{data.amount}</td>
        <td>{Date(data.emic).toLocaleString("en-US",{month:"short",year:"numeric",time:"numeric"})}</td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div>
    <AdminHeader title="Customer Emis" />
    <div className='container'>
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Loan Name</th>
        <th>Description</th>
        <th>Principle amount</th>
        <th>Paid amount</th>
        <th>Paid At</th>
      </thead>
      <tbody>
        {tabler}
      </tbody>
    </table>
    </div>
  </div>
);
}

AdminCustomerLoans.propTypes = {};

AdminCustomerLoans.defaultProps = {};

export default AdminCustomerLoans;
