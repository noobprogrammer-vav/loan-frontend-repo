import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../Admin_header/Admin_header';
import AdminLoanTypes from '../Admin_loan_types/Admin_loan_types';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminHome = () => {

  const [tabler,setTabler] = useState()

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_over_due`).then((response) => {
      if(response.data.length > 0)
      {
        setTabler(response.data.map((data,index) => <tr>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.loan_name}</td>
          <td>{data.application_id}</td>
          <td>{data.principle}</td>
          <td>{data.amount}</td>
          <td>{data.due_date}</td>
        </tr>))
      }
      else{
        setTabler("No customers Have overdue")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])
  
  return(<div>
    <AdminHeader title="Admin Home" />
    <div className='container'>
      <h3 className='text-center'>Over Due Customers</h3>
      <table className='table'>
        <thead>
          <th>#</th>
          <th>Customer name</th>
          <th>Loan name</th>
          <th>Application Id</th>
          <th>Principle Amount</th>
          <th>Interest Amount</th>
          <th>Due Date</th>
        </thead>
        <tbody>
          {tabler}
        </tbody>
      </table>
    </div>
  </div>
);
}

AdminHome.propTypes = {};

AdminHome.defaultProps = {};

export default AdminHome;
