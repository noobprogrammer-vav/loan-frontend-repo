import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/header';


const LoanView = () => {

  const nav_data = useLocation().state

  const [image,setImage] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`http://192.168.29.108:3001/get_specific_loan_types/${nav_data}`).then((response) => {
      if(response.data.length>0){
        let data = response.data[0]
        document.getElementById("name").innerHTML = data.loan_name
        document.getElementById("gist").innerHTML = data.gist
        document.getElementById("summary").innerHTML = data.summary
        document.getElementById("description").innerHTML = data.description
        setImage(`http://192.168.29.108:3001/uploads/${data.image}`)
        
      }
    })
  },[])

  return(<div>
    
    <Header title="Loan View" />
    <div className='container'>
    <h1 id='name' />
    <h5 id='gist' />
    <img id='image' src={image} />
    <p id='summary' />
    <p id='description' />
    <button onClick={() => {navigate("/customer_form",{state:nav_data})}} className='btn btn-sm btn-primary'>Apply</button>
    </div>
  </div>
);
}

LoanView.propTypes = {};

LoanView.defaultProps = {};

export default LoanView;
