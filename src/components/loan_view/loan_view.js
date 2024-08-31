import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/header';
import { toast } from 'react-toastify';


const LoanView = () => {

  const nav_data = useLocation().state

  const [image,setImage] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/get_specific_loan_types/${nav_data[0]}`).then((response) => {
      if(response.data.length>0){
        let data = response.data[0]
        document.getElementById("name").innerHTML = data.loan_name
        document.getElementById("gist").innerHTML = data.gist
        document.getElementById("summary").innerHTML = data.summary
        document.getElementById("description").innerHTML = data.description
        document.getElementById("t_and_c").innerHTML = data.conditions
        setImage(`${sessionStorage.getItem("urls")}/uploads/${data.image}`) 
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div>
    
    <Header title="Loan View" />
    <button style={{display:nav_data[1] == "no" ? "none" : "block", float:"right", marginRight:"2%"}} onClick={() => {navigate("/customerform",{state:nav_data})}} className='btn btn-sm btn-primary'>Apply</button>
    <div className='container'>
    <h1 id='name' />
    <h5 id='gist' />
    <img id='image' src={image} style={{width:"50%"}} />
    <p id='summary' />
    <p id='description' />
    <div className='container border border-dark'>
      <h1>Terms and Conditions</h1>
      <p id='t_and_c' />
    </div>
    </div>
  </div>
);
}

LoanView.propTypes = {};

LoanView.defaultProps = {};

export default LoanView;
