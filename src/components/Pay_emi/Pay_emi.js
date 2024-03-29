import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PayEmi = () => {

  const [applications,setApplications] = useState()
  const [remaining, setRemaining] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/filter_my_loans`,{token: sessionStorage.getItem("token"), filter : 2}).then((response) => {
        setApplications(response.data.map((data,index) => <option value={[data.aid,data.loan_id]}>{data.ades}</option>))
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      navigate("/login",{state : "yes"})
    }
  },[])

  function amount_calc(e)
  {
    if(parseFloat(e) > parseFloat(document.getElementById("remaining_amount").innerHTML))
    {
      document.getElementById("pamount").value = ''
      toast.warning(`Only ${document.getElementById("remaining_amount").innerHTML} remaining`)
    }
  }
  
  function application_changed(e)
  {
    if(e != "none")
    {
      axios.get(`${sessionStorage.getItem("urls")}/emi_table/${e.split(',')[0]}`).then((response) => {
        console.log(new Date().getMonth() + 1)
        let dates = []
        let ids = []
        let amounts = []
        
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if (parseInt(element.due_date.split('-')[1]) <= parseInt(new Date().getMonth() + 1) && parseInt(element.due_date.split('-')[2]) <= parseInt(new Date().getFullYear()) && element.estatus == 0)
          {
            dates.push(element.due_date)
            ids.push(element.eid)
            amounts.push(element.amount)
          }
        }
        setRemaining(dates.map((data,index) => <option value={ids[index]}>{data}</option>))
        document.getElementById("amount").value = amounts[0]
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }

    // axios.get(`${sessionStorage.getItem("urls")}/my_loan/${e.split(',')[0]}`).then((response) => {
    //   setRemaining(response.data[0].remaining)
    // })


  }

  function application_changed2(e)
  {
    if(e != "none")
    {
      axios.get(`${sessionStorage.getItem("urls")}/my_loan/${e.split(',')[0]}`).then((response) => {
        document.getElementById("remaining_amount").innerHTML = response.data[0].remaining
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }




  }

  function submitter(e)
  {
    e.preventDefault()
    axios.get(`${sessionStorage.getItem("urls")}/pay_emi/${e.target.eid.value}`).then((response) => {
      axios.post(`${sessionStorage.getItem("urls")}/reducer`,{id : e.target.application_id.value.split(",")[0], amount : e.target.amount.value}).then((response) => {
        toast.success("Amount Paid",{position:"top-center"})
        window.location.reload(true)
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

  }

  function principlesubmitter(e)
  {
    e.preventDefault()
    axios.get(`${sessionStorage.getItem("urls")}/remaining_emi/${e.target.application_id.value.split(",")[0]}`).then((response2) => {
      let new_emi = ((parseFloat(document.getElementById("remaining_amount").innerHTML) - parseFloat(e.target.pamount.value))/(response2.data.length))
      console.log(new_emi, response2.data.length)
    })

    // axios.post(`${sessionStorage.getItem("urls")}/pay_principle`,{token : sessionStorage.getItem("token"), application_id : e.target.application_id.value.split(",")[0], amount : e.target.pamount.value, loan_id : e.target.application_id.value.split(",")[1]}).then((response) => {
    //   axios.post(`${sessionStorage.getItem("urls")}/reducer`,{id : e.target.application_id.value.split(",")[0], amount : e.target.pamount.value}).then((response1) => {
    //     axios.get(`${sessionStorage.getItem("urls")}/remaining_emi/${e.target.application_id.value.split(",")[0]}`).then((response2) => {
    //       let new_emi = (parseFloat(document.getElementById("remaining_amount").innerHTML) - parseFloat(e.target.pamount.value))/response2.data.length
    //       axios.post(`${sessionStorage.getItem("urls")}/emi_reducer`,{id : e.target.application_id.value.split(",")[0], amount : parseInt(new_emi)}).then((response2) => {
    //         toast.success("Amount Paid",{position:"top-center"})
    //         window.location.reload(true)
    //       })
    //     })
    //   })
    // })
  }

  return(<div className='container'>
    <Header />
    <div className='row'>
      <div className='col-sm-6'>
        <h4>Pay EMI</h4>
        <hr />
        <form className='container' onSubmit={(e) => submitter(e)}>
          <label>Select Loan</label>
          <select onChange={(e) => application_changed(e.target.value)} defaultValue={"none"} className='form-control rounded rounded-5' name='application_id' >
            <option value={"none"}>--Select--</option>
            {applications}
          </select>
          <br />
          <label>Select Date</label>
          <select defaultValue={"none"} className='form-control rounded rounded-5' name='eid' >
            <option value={"none"}>--Select--</option>
            {remaining}
          </select>
          <br />
          <label>Paying Amount</label>
          <input readOnly type='number' id='amount' className='form-control rounded rounded-5' name='amount' />
          <br />
          <center><button className='btn btn-sm btn-success' type='submit'>Submit</button> <button className='btn btn-sm btn-secondary' type='reset'>Reset</button></center>
        </form>
      </div>
{/*       <div className='col-sm-6'>
        <h4>Pay Principle</h4>
        <hr />
        <form onSubmit={(e) => principlesubmitter(e)}>
        <label>Select Loan</label>
          <select onChange={(e) => application_changed2(e.target.value)} defaultValue={"none"} className='form-control rounded rounded-5' name='application_id' >
            <option value={"none"}>--Select--</option>
            {applications}
          </select>
          <br />
          <br />
          <h5>Remaining amount : <span id='remaining_amount' /></h5>
          <br />
          <label>Paying Amount</label>
          <input onChange={(e) => amount_calc(e.target.value)} type='number' id='pamount' className='form-control rounded rounded-5' name='pamount' />
          <br />
          <center><button className='btn btn-sm btn-success' type='submit'>Submit</button> <button className='btn btn-sm btn-secondary' type='reset'>Reset</button></center>

        </form>
      </div> */}
    </div>
  </div>
);
}

PayEmi.propTypes = {};

PayEmi.defaultProps = {};

export default PayEmi;
