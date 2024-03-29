import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import axios from 'axios';
import { toast } from 'react-toastify';


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
      axios.post(`${sessionStorage.getItem("urls")}/my_loans`,{token : sessionStorage.getItem("token") }).then((response0) => {
        let arr = response0.data.map((data,index) => data.loan_id)
        if(arr.includes(nav_data[0]))
        {
          navigate("/my_emi")
        }
        else{
          axios.post(`${sessionStorage.getItem("urls")}/get_specific_customer_info`,{token : sessionStorage.getItem("token")}).then((response) => {
            console.log(parseFloat(response.data[0].emi_amount))
            document.getElementById("net").value = parseFloat(response.data[0].income) - parseFloat(response.data[0].emi_amount)
            document.getElementById("y_int").innerHTML = (parseFloat(response.data[0].income) - parseFloat(response.data[0].emi_amount))/12

          }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})
    
          axios.get(`${sessionStorage.getItem("urls")}/get_specific_loan_types/${nav_data[0]}`).then((response) => {
            if(response.data.length>0){
              console.log(response.data[0].interest_rate)
              document.getElementById("rate").value = parseFloat(response.data[0].interest_rate )
            }
          }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
          console.log(err)})

          document.getElementById("applier").style.display = "none"

        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})

    }
  },[])

  function checker(e)
  {
    e.preventDefault()
    let p = parseFloat(e.target.principle.value)
    let t = parseFloat(e.target.years.value)
    let r = parseFloat(e.target.rate.value)

    let net = parseFloat(e.target.net.value)

    let monthly_rate = (r/12)/100
    let monthly_emi = Math.ceil((p * monthly_rate * ((1 + monthly_rate)**(t*12)))/((1 + monthly_rate)**(t*12)-1))

    setRemains(monthly_emi * 12 * t)
    document.getElementById("m_int").innerHTML = monthly_emi
    document.getElementById("t_int").innerHTML = monthly_emi * t * 12
    if((net/12) > monthly_emi)
    {
      document.getElementById("acceptability").innerHTML = "Acceptable"
      document.getElementById("acceptability").style.color = "green"
      document.getElementById("applier").style.display = "block"
      document.getElementById("description").style.display = "block"
      document.getElementById("applier2").style.display = "block"

    }
    else{
      document.getElementById("acceptability").innerHTML = "Cannot Accept"
      document.getElementById("acceptability").style.color = "red"
      document.getElementById("applier").style.display = "block"
      document.getElementById("description").style.display = "none"
      document.getElementById("applier2").style.display = "none"



    }

  }

  function submitter()
  {
    const formData = {
      token : sessionStorage.getItem("token"),
      loan_id : nav_data[0],
      rate : document.getElementById("rate").value,
      principle : document.getElementById("principle").value,
      years : document.getElementById("years").value,
      remaining : remains,
      description : document.getElementById("description").value
    }

    if(formData.description.length != 0)
    {
      axios.post(`${sessionStorage.getItem("urls")}/add_application`,formData).then((response) => {
        toast.success("Applied",{position:"top-center"})
        navigate("/my_emi")
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      toast.warning("Add some Description",{position:"top-center"})
    }

  }


  return(<div>
    <Header title="Apply loan" />
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6'>
          <h3>Check </h3>
          <form onSubmit={(e) => checker(e)}>
            <label>Availing Amount</label>
            <input required type='number' className='form-control rounded rounded-5' name='principle' id='principle' />
            <label>Years</label>
            <input required type='number' className='form-control rounded rounded-5' name='years' id='years' />
            <label>Interest Percentage</label>
            <input readOnly type='number' className='form-control rounded rounded-5' name='rate' id='rate' />
            <label>Net Income</label>
            <input readOnly type='text' className='form-control rounded rounded-5' name='net' id='net' />
            <button className='btn btn-sm btn-success' type='submit'>Submit</button>
          </form>
          <div id='applier'>
          <h3 id='acceptability'></h3>
            <input placeholder='Add description' className='form-control rounded rounded-5' name='description' id='description' />
            <button id='applier2' onClick={() => submitter()} className='btn btn-sm btn-primary'>Apply</button>
          </div>
        </div>
        <div className='col-sm-6 p-5'>
          <h5>Your Approx monthly income: <span id='y_int'></span></h5>
          <h5>Monthly Interest: <span id='m_int'>0</span></h5>
          <h5>Total Amount to be Paid: <span id='t_int'>0</span></h5>
          
        </div>
      </div>
    </div>

  </div>
);
}

ApplyLoan.propTypes = {};

ApplyLoan.defaultProps = {};

export default ApplyLoan;
