import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import axios from 'axios';


const ApplyLoan = () => {

  const navigate = useNavigate()
  const nav_data = useLocation().state

  const [remains,setRemains] = useState(0)



  useEffect(() => {
    if(sessionStorage.getItem("token") == null)
    {
      navigate("/login")
    }
    else{
      axios.post("http://192.168.29.108:3001/get_specific_customer_info",{token : sessionStorage.getItem("token")}).then((response) => {
        document.getElementById("net").value = parseFloat(response.data[0].income) - parseFloat(response.data[0].emi_amount)
      })

      axios.get(`http://192.168.29.108:3001/get_specific_loan_types/${nav_data}`).then((response) => {
        if(response.data.length>0){
          console.log(response.data[0].interest_rate)
          document.getElementById("rate").value = parseInt(response.data[0].interest_rate )
        }
      })
    }

    document.getElementById("applier").style.display = "none"

  },[])

  function checker(e)
  {
    e.preventDefault()
    let p = parseInt(e.target.principle.value)
    let t = parseInt(e.target.years.value)
    let r = parseInt(e.target.rate.value)

    let net = parseInt(e.target.net.value)


    let calc = ((p * t * r)/100)
    setRemains(calc + p)
    if(net > (calc/t))
    {
      document.getElementById("acceptability").innerHTML = "Acceptable"
      document.getElementById("acceptability").style.color = "green"
      document.getElementById("applier").style.display = "block"

    }
    else{
      document.getElementById("acceptability").innerHTML = "Cannot Accept"
      document.getElementById("acceptability").style.color = "red"
      document.getElementById("applier").style.display = "none"

    }
    console.log(calc)
  }

  function submitter()
  {
    const formData = {
      token : sessionStorage.getItem("token"),
      loan_id : nav_data,
      rate : document.getElementById("rate").value,
      principle : document.getElementById("principle").value,
      years : document.getElementById("years").value,
      remaining : remains
    }
    axios.post("http://192.168.29.108:3001/add_application",formData).then((response) => {
    })
  }

  return(<div>
    <Header title="Apply loan" />
    <button className='btn btn-sm btn-outline-primary'>Update Docs</button>
    <div className='container'>
      <h3>Check </h3>
      <form onSubmit={(e) => checker(e)}>
        <label>Interest Percentage</label>
        <input readOnly type='number' className='form-control rounded rounded-5' name='rate' id='rate' />
        <label>Net Income</label>
        <input readOnly type='number' className='form-control rounded rounded-5' name='net' id='net' />
        <label>Availing Amount</label>
        <input required type='number' className='form-control rounded rounded-5' name='principle' id='principle' />
        <label>Years</label>
        <input required type='number' className='form-control rounded rounded-5' name='years' id='years' />
        <button className='btn btn-sm btn-success' type='submit'>Submit</button>
      </form>
      <h3 id='acceptability'></h3>
      <button id='applier' onClick={() => submitter()} className='btn btn-sm btn-primary'>Apply</button>
    </div>

  </div>
);
}

ApplyLoan.propTypes = {};

ApplyLoan.defaultProps = {};

export default ApplyLoan;
