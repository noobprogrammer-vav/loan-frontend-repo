import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../components/loans_img/logo.png';



const Footer = () => {

  useEffect(() => {
    sessionStorage.setItem("urls","http://192.168.29.108:3001") //http://192.168.29.108:3001  http://localhost:3001
  },[])

  return(<div>
<footer className="footer">
  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <h4 style={{color:'#D2FF6A'}}><b style={{color:'#43BCC5'}}>LINK</b>loans</h4>
          </h6>

          <p>
            <a href="#!" className="text-reset">About</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Services</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Team</a>
          </p>
          <p>
            <a href="#!" className="text-reset">FAQ</a>
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Services
          </h6>
          <p>
            <a href="#!" className="text-reset">Business Loan</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Personal Loan</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Mortgage Loan</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Education Loan</a>
          </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Support
          </h6>
          <p>
            <a href="#!" className="text-reset">Support</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Terms and Condition</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Contact</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Privacy Policy</a>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">Contact info</h6>
          <p style={{color:'#84989A'}}>Make Appointment</p>
          <p><b>(+021) 245 538 / (+021) 245 528</b></p>
          <p style={{color:'#84989A'}}> Need Help?Email us</p>
          <p><b>support@domain.com</b></p>
        </div>
      </div>
    </div>
  </section>
<hr></hr>
  <div className="text-center p-4" >
     Banking & Business Loan
  </div>
</footer>
  </div>
);
  }

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
