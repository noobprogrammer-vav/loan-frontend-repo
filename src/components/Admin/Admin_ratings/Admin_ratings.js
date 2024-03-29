import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AdminHeader from '../Admin_header/Admin_header';
import { toast } from 'react-toastify';


const AdminRatings = () => {

  const [tabler,setTabler] = useState()

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/all_ratings`).then((response) => {
      setTabler(response.data.map((data,index) =>   <tr>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.loan_name}</td>
        <td>{data.description}</td>
        <td>{data.ratings}</td>
        <td>{Date(data.created_at).toLocaleString("en-US",{month:"short",year:"numeric",time:"numeric"})}</td>
      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div>
    <AdminHeader title="Ratings" />
    <div className='container'>
    <table className='table'>
      <thead>
        <th>#</th>
        <th>Customer name</th>
        <th>Loan name</th>
        <th>Description</th>
        <th>Rating</th>
        <th>Posted On</th>
      </thead>
      <tbody>
        {tabler}
      </tbody>
    </table>
    </div>
  </div>
);
}

AdminRatings.propTypes = {};

AdminRatings.defaultProps = {};

export default AdminRatings;
