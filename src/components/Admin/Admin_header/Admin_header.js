import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const AdminHeader = (props) => {

  const navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem("user") != "Admin")
    {
      navigate("/login", {state:"yes"})
    }
  },[])

  return(<div className='container text-center'>
    <div >
      <h1>{props.title}</h1>
    </div >
    <div style={{cursor:"pointer"}}>
      <span className='m-2' onClick={() => navigate("/admin")}>Home</span>
      <span className='m-2' onClick={() => navigate("/admin/ratings")}>Ratings</span>
      <span className='m-2' onClick={() => navigate("/admin/customers")}>Customers</span>
      <span className='m-2' onClick={() => navigate("/admin/loan_type")}>LoanTypes</span>
      <span className='m-2' onClick={()=> navigate("/admin/category")}>Category</span>
      <span className='m-2'></span><span className='m-2' onClick={() => navigate("/admin/t_and_c")}>Terms and Conditions</span>
      <span style={{float:"right"}} onClick={() => {sessionStorage.removeItem("user")
      navigate("/login")
    }} className='m-2'><i className='fa fa-sign-out' /></span>
      </div>
    <span className='m-2'>

    </span>
  </div>
);
}

AdminHeader.propTypes = {};

AdminHeader.defaultProps = {};

export default AdminHeader;
