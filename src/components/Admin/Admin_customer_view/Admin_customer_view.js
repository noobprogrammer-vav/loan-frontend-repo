import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../Admin_header/Admin_header';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminCustomerView = () => {

  const nav_data = useLocation().state

  const navigate = useNavigate()

  const[ myform,setMyform] = useState()

  const [tabler,setTabler] = useState()

  const [reloader,setReloader] = useState(true)

  function statused(e,id,years,principle,rate,cid,lid)
  {
    axios.post(`${sessionStorage.getItem("urls")}/update_application_status`,{status : e, app_id : id}).then((response) => {
      toast.success("Modified",{position:"top-center"})
      setReloader(!reloader)
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    if(e == 2)
    {
      axios.get(`${sessionStorage.getItem("urls")}/emi_table/${id}`).then((response) => {
        if(response.data.length == 0)
        {
          let dates = []
          let this_month = parseInt(new Date().getMonth() + 1)
          let this_year = parseInt(new Date().getFullYear())
    
          for (let i = 1; i < 12*years; i++) {
            if((this_month + 1) > 12)
            {
              this_month = 0
              this_year += 1
            }
            this_month += 1
            dates.push(`1-${this_month}-${this_year}`)
          }   

          let monthly_rate = (rate/12)/100
          let monthly_emi = (principle * monthly_rate * ((1 + monthly_rate)**(years*12)))/((1 + monthly_rate)**(years*12)-1)

          for (let index = 0; index < dates.length; index++) {
            axios.post(`${sessionStorage.getItem("urls")}/add_emi`,{customer_id : cid, loan_id : lid, application_id : id, amount : Math.ceil(monthly_emi), date : `${dates[index]}`}).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
            console.log(err)})
          }
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }

  }
  

  useEffect(() => {
    axios.get(`${sessionStorage.getItem("urls")}/customer_info/${nav_data}`).then((response) => {
      if(response.data.length > 0)
      {
        let data = response.data[0]

        setMyform(
          <div>
          <div className='row'>
            <div className='col-sm-6'>
              <label>Present Address</label>
              <textarea readOnly required value={data.present_address} className='form-control rounded rounded-5' name='present_address' /><br />
            </div>
            <div className='col-sm-6'>
              <label>Permanent Address</label>
              <textarea readOnly required value={data.permanent_address} className='form-control rounded rounded-5' name='permanent_address' /><br />
            </div>
            <div className='col-sm-6'>
              <label>Profile Photo</label>
              <button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.photo}`} target="_blank"><i className='fa fa-download' /></a></button>       
            </div>
            <div className='col-sm-6'>
              <label>Date of Birth</label>
              <input readOnly value={`${new Date(data.birthday).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-')}`} type='text' className='form-control rounded rounded-5' name='dob' /><br />
            </div>
            <div className='col-sm-6'>
              <label>Income</label>
              <input readOnly value={data.income} type='number' className='form-control rounded rounded-5' name='income' /><br />
            </div>
            <div className='col-sm-6'>
              <label>Occupation</label>
              <input readOnly value={data.occupation_name} type='text' className='form-control rounded rounded-5'/><br />
              <input readOnly value={data.occupation} className='form-control rounded rounded-5' placeholder='Enter your Occupation' name='occupation' id='others' /><br />
            </div>
            <div className='col-sm-6'>
              <label>EMI amount</label>
              <input readOnly value={data.emi_amount} className='form-control rounded rounded-5' name='emi' type='number'></input><br />
            </div>
            <div className='col-sm-6'>
              <label>Income Statement</label>
              <button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.income_statement}`} target="_blank"><i className='fa fa-download' /></a></button>     
            </div>
            <div className='col-sm-6'>
              <label>Aadhar Number</label>
              <input readOnly value={data.aadhar_no} className='form-control rounded rounded-5' name='aadhar_no' type='number' placeholder='Aadhar number'></input><br />
            </div>
            <div className='col-sm-6'>
              <label>Aadhar Document</label>
              <button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.aadhar_doc}`} target="_blank"><i className='fa fa-download' /></a></button>         
            </div>
            <div className='col-sm-6'>
              <label>PAN Number</label>
              <input readOnly value={data.pan_no} className='form-control rounded rounded-5' name='pan_no' type='number' placeholder='PAN number'></input><br />
            </div>
            <div className='col-sm-6'>
              <label>PAN Document</label>
              <button className='btn btn-sm btn-outline-secondary' type='button'><a href={`${sessionStorage.getItem("urls")}/uploads/${data.pan_doc}`} target="_blank"><i className='fa fa-download' /></a></button>
            </div>
          </div>
        </div>
        )
      }

    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})

    axios.get(`${sessionStorage.getItem("urls")}/customer_loans/${nav_data}`).then((response) => {
      setTabler(response.data.map((data,index) => <tr>
        <td>{index + 1}</td>
        <td>{data.loan_name}</td>
        <td>{data.principle}</td>
        <td>{data.interest_rate}</td>
        <td>{data.remaining}</td>
        <td>{data.years}</td>
        {/* style={{backgroundColor:data.status == 0 ? 'red' : data.status == 1 ? 'yellow' : data.status == 2 ? 'green' : 'grey'}} */}
        <td style={{backgroundColor:data.status == 0 ? 'red' : data.status == 1 ? 'yellow' : data.status == 2 ? 'green' : 'grey'}}>{data.status == 0 ? 'Rejected' : data.status == 1 ? 'Pending' : data.status == 2 ? 'Approved' : 'Completed'} 
        <select className='m-1 p-1' onChange={(e) => statused(e.target.value, data.id,data.years, data.principle,data.interest_rate,nav_data,data.loan_id)} defaultValue={data.status}>
          <option value={0}>Reject</option>
          <option value={1}>Hold</option>
          <option value={2}>Approve</option>
          <option value={3}>Complete</option>
        </select></td> 
        <td onClick={() => navigate("/admin/customer/loans",{state : [nav_data, data.id]})}><i className='fa fa-eye btn btn-sm btn-outline-success' /></td>

      </tr>))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
  },[reloader])

  return(<div>
    <AdminHeader title="Customer View" />
    <div className='container'>
      {myform}
      <br />
      <div className='text-center'>
        <h3>User Loans</h3><br />
        <table className='table '>
          <thead>
            <th>#</th>
            <th>Loan Name</th>
            <th>Principle Amount</th>
            <th>Interest Rate</th>
            <th>Remaining Amount</th>
            <th>Time Period</th>
            <th>Status</th>
            <th>View</th>
          </thead>
          <tbody>
            {tabler}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

AdminCustomerView.propTypes = {};

AdminCustomerView.defaultdata = {};

export default AdminCustomerView;
