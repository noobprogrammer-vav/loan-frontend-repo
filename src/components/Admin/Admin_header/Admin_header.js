import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const AdminHeader = (props) => {

  const navigate = useNavigate()

  return(<div className='container text-center'>
    <div >
      <h1>{props.title}</h1>
    </div >
    <div style={{cursor:"pointer"}}><span >Home </span><span>Ratings  </span><span>Customers    </span><span onClick={() => navigate("/admin/loan_type")}>LoanTypes</span><span onClick={()=> navigate("/admin/category")}>Category</span><span></span><span></span><span></span></div>
    <span>

    </span>
  </div>
);
}

AdminHeader.propTypes = {};

AdminHeader.defaultProps = {};

export default AdminHeader;
