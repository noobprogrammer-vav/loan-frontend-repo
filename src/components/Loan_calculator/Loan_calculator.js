import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';


const LoanCalculator = () => {

  function calc(e)
  {
    e.preventDefault()
    let p = parseFloat(e.target.principle.value)
    let r = parseFloat(e.target.rate.value)
    let t = parseFloat(e.target.years.value)

    let monthly_rate = (r/12)/100
    let monthly_emi = (p * monthly_rate * ((1 + monthly_rate)**(t*12)))/((1 + monthly_rate)**(t*12)-1)


    document.getElementById("showme").style.display = "block"
    document.getElementById("t_int").innerHTML = Math.ceil((monthly_emi * 12*t) - p)
    document.getElementById("t_amt").innerHTML = Math.ceil((monthly_emi * 12*t))
    document.getElementById("m_int").innerHTML = Math.ceil(monthly_emi)
  }

  return(<div>
    <Header />
        <div className='container'>
          <h3>Calculator</h3>
          <form onSubmit={(e) => calc(e)}>
            <label>Availing Amount</label>
            <input required type='number' className='form-control rounded rounded-5' name='principle' id='principle' />
            <label>Interest Percentage</label>
            <input required type='text' className='form-control rounded rounded-5' name='rate' id='rate' />
            <label>Years</label>
            <input required type='number' className='form-control rounded rounded-5' name='years' id='years' />
            <br />
            <button className='btn btn-sm btn-success' type='submit'>Submit</button>
          </form>
          <br/>
          <div id='showme' className='row' style={{display:"none"}}>
            <div className='col-sm-6'>
              <h5>Total Amount = <span id='t_amt' /></h5>
              <h5>Total Interest = <span id='t_int' /></h5>
            </div>
            <div className='col-sm-6'><h5>Monthly Interest = <span id='m_int' /></h5></div>
          </div>
        </div>
  </div>
);
}

LoanCalculator.propTypes = {};

LoanCalculator.defaultProps = {};

export default LoanCalculator;
