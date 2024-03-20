import React from 'react';
import PropTypes from 'prop-types';
import customerform from '../loans_img/customer_form_inPixio.png';
import Footer from '../footer/footer';

const CustomerForm = () => {

  function occupational(e)
  {
    if(e == 0)
    {
      document.getElementById("others").style.display = "block"
    }
    else{
      document.getElementById("others").style.display = "none"
    }
  }

  return(<div>
    <h2 className='text-center'>Welecome!</h2><br></br>
    <h4 className='text-center'>Fill Your Details here.</h4>
    <div className='conatiner ' style={{marginTop:'5%'}}>
      <div className='row'>
        <div className='col-sm-6'>
        <div className='customerform' >
              <form>
                <div className='row'>
                  <div className='col-sm-6'>
                  <label>Income ID</label>
              <select className='form-control rounded rounded-5' name='income_id' type='number' >
                <option>--Select--</option>
                {/* <option>{income}</option> */}</select><br></br>
                <label>Occupation ID</label>
              <select defaultValue={"none"} onChange={(e) => occupational(e.target.value)} className='form-control rounded rounded-5' name='occupation_id' type='number'>
                <option value={"none"}>--Select--</option>
                {/* <option>{occupation}</option> */}</select><br></br>
                <input className='form-control rounded rounded-5' placeholder='write your occupation id' name='others' style={{display:"none"}} id='others' />
              <label>Aadhar Number</label>
              <input className='form-control rounded rounded-5' name='aadhar_no' type='number' placeholder='Aadhar number'></input><br></br>
              <label>PAN Number</label>
              <input className='form-control rounded rounded-5' name='pan_no' type='number' placeholder='Pan number'></input><br></br>
                  </div>
                  <div className='col-sm-6'>
                  <label>EMI Amount</label>
              <input className='form-control rounded rounded-5' name='emi_amount' type='number' placeholder='Emi amount'></input><br></br>
              <label>Aadhar card</label>
              <input type='file' className='form-control rounded rounded-5' placeholder='Adhar Card' name='aadhar_card'></input><br></br>
              <label>PAN Card</label>
              <input type='file'className='form-control rounded rounded-5' placeholder='PAN Card' name='pan_card'></input><br></br>
                  </div>
              <button className='btn btn-success' style={{height:'fit-content',width:'fit-content',marginLeft:'45%'}} type='submit'>Submit</button>
                
                </div>
                </form> 
            </div>
            </div>
        <div className='col-sm-6 text-center'>
          <img src={customerform} style={{height:'100%'}}/>
        </div>
      </div>
    </div>
<Footer/>
  </div>
);
}

CustomerForm.propTypes = {};

CustomerForm.defaultProps = {};

export default CustomerForm;
