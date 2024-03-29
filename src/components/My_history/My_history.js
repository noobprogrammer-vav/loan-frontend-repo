import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/header';
import { toast } from 'react-toastify';


const MyHistory = () => {

  const nav_data = useLocation().state

  const [tabler,setTabler] = useState()
  const [tabler2,setTabler2] = useState()

  const [image,setImage] = useState()
  const [loan_id,setLoan_id] = useState()

  const navigate = useNavigate()

  const resetbtn = useRef(null)

  function rating(e)
  {

    e.preventDefault()

    const formData = {
      token : sessionStorage.getItem("token"),
      loan_id : loan_id,
      description : e.target.description.value,
      ratings : e.target.ratings.value
    }
    axios.post(`${sessionStorage.getItem("urls")}/add_feedback`,formData).then((response) => {
      if(response.data = 1062)
      {
        toast.warning("you have already added your feedback")
      }
      else{
        toast.success("Thank you for your feedback")
      }
      resetbtn.current.click()
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  }

  useEffect(() => {

    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/validate`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data == false)
        {
          navigate("/login",{state:"yes"})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      navigate("/login",{state:"yes"})
    }
    
    axios.get(`${sessionStorage.getItem("urls")}/my_loan/${nav_data}`).then((response) => {
      if(response.data.length>0){
        let data = response.data[0]
        document.getElementById("title").innerHTML = data.loan_name
        setLoan_id(data.loan_id)
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    axios.get(`${sessionStorage.getItem("urls")}/emi_table/${nav_data}`).then((response) => {
      if(response.data.length > 0)
      {
        document.getElementById("description").innerHTML = response.data[0].description
        setTabler(response.data.map((data,index) =>   <tr>
          <td>{index + 1}</td>
          {/* <td>{data.loan_name}</td> */}
          {/* <td>{data.description}</td> */}
          <td>{data.principle}</td>
          <td>{data.amount}</td>
          <td style={{color:data.estatus == 0 ? 'red' : 'green'}}>{data.estatus == 0 ? 'Pending' : 'Paid'}</td>
          <td>{data.due_date}</td>
        </tr>))
      }
      else{
        setTabler("No EMIs paid yet")
      }

    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/get_principle/${nav_data}`).then((response) => {
      if(response.data.lenght > 0)
      {
        let remains = []
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if(remains.length == 0)
          {
            remains.push(parseFloat(element.interest_amount) - parseFloat(element.amount))
          }
          else{
            remains.push(parseFloat(remains[index-1]) - parseFloat(element.amount))
          }
        }
        setTabler2(response.data.map((data,index) =>   <tr>
          <td>{index + 1}</td>
          <td>{data.amount}</td>
          <td>{remains[index]}</td>
          <td>{Date(data.created_at)}</td>
        </tr>))
      }
      else{
        setTabler2("Nothing paid yet")
      }
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[])

  return(<div>
    <Header />
    <br />
    <div className='container'>
      <div className='rate_us m-3 p-3'>
        <center><h3 id='title' />
        <h6 id='description' /></center>
        <br /><br />  

        <form onSubmit={(e) => rating(e)}>
          <div className='row'>
            <div className='col-sm-10'>
              <label>Describe your Experience</label>
              <textarea required className='form-control rounded rounded-5' name='description' />
            </div>
            <div className='col-sm-2'>
              <label>Rate your Experience</label>
              <input required type='number' defaultValue={1} className='form-control rounded rounded-5' name='ratings' />
            </div>
          </div>
          <br />
          <center><button type='submit' className='btn btn-sm btn-success'>Submit</button> <button ref={resetbtn} type='reset' className='btn btn-sm btn-secondary'>Reset</button></center>
        </form>
      </div>
      <div className='row'>
      <div className='col-sm-6'>
        <h4 className='text-center'>Upcoming EMI and history</h4>
        <br />
      <table className='table'>
        <thead>
          <th>#</th>
          <th>Principle amount</th>
          <th>Interest amount</th>
          <th>Status</th>
          <th>Due Date</th>
        </thead>
        <tbody>
          {tabler}
        </tbody>
      </table>
      </div>
      <div className='col-sm-6 border border-dark rounded'>
        <h4 className='text-center'>Principle payment History</h4>
        <br />
      <table className='table'>
        <thead>
          <th>#</th>
          <th>Amount paid</th>
          <th>Remaining amount</th>
          <th>Paid date</th>
        </thead>
        <tbody>
          {tabler2}
        </tbody>
      </table>
      </div>
      </div>
    </div>

  </div>
);
}

MyHistory.propTypes = {};

MyHistory.defaultProps = {};

export default MyHistory;
