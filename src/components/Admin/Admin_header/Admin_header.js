import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const AdminHeader = (props) => {

  const navigate = useNavigate()

  return(<div className='container text-center'>
    <div >
      <h1>{props.title}</h1>
    </div >
    <div style={{cursor:"pointer"}}><span className='m-2' onClick={() => navigate("/admin")}>Home</span><span className='m-2'>Ratings</span><span className='m-2'>Customers</span><span className='m-2' onClick={() => navigate("/admin/loan_type")}>LoanTypes</span><span className='m-2' onClick={()=> navigate("/admin/category")}>Category</span><span className='m-2'></span><span className='m-2' onClick={() => navigate("/admin/t_and_c")}>Terms and Conditions</span><span className='m-2'></span></div>
    <span className='m-2'>

    </span>
  </div>
);
}

AdminHeader.propTypes = {};

AdminHeader.defaultProps = {};

export default AdminHeader;
