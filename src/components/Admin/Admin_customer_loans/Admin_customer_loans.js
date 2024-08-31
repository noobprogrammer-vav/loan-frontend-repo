import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../Admin_header/Admin_header';
import { toast } from 'react-toastify';


const AdminCustomerLoans = () => {

  const [tabler,setTabler] = useState()
  const nav_data = useLocation().state

  const [reloader,setReloader] = useState(true)

  function changer(id,opt)
  {
    axios.post(`${sessionStorage.getItem("urls")}/update_stats`,{id : id, status : opt}).then((response) => {
      toast.success("Updated",{position:"top-center"})
      setReloader(!reloader)
    })
  }


  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/emi_table/${nav_data[1]}`).then((response) => {
      setTabler(response.data.map((data,index) =>   <tr>
          <td>{index + 1}</td>
          {/* <td>{data.loan_name}</td> */}
          {/* <td>{data.description}</td> */}
          <td>{data.principle}</td>
          <td>{data.amount}</td>
          <td style={{color:data.estatus == 2 ? 'red' : data.estatus == 1 ? 'green' : 'orange'}}>{data.estatus == 2 ? 'Overdue' : data.estatus == 1 ? 'Paid' : 'Pending'}</td>
          <td>{data.due_date}</td>
          <td><button onClick={() => changer(data.eid,1)} className='btn btn-sm btn-outline-success'>Paid</button> <button onClick={() => changer(data.eid,2)} className='btn btn-sm btn-outline-danger'>Overdue</button> <button onClick={() => changer(data.eid,0)} className='btn btn-sm btn-outline-warning'>Pending</button></td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[reloader])

  return(<div>
    <AdminHeader title="Customer Emis" />
    <div className='container'>
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Principle amount</th>
        <th>Interest amount</th>
        <th>Status</th>
        <th>Due Date</th>
        <th>Action</th>
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
