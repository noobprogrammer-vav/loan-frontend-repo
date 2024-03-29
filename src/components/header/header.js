import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Header = () => {

  const navigate = useNavigate()

  function logouter()
  {
    sessionStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/validate`,{token : sessionStorage.getItem("token")}).then((response) => {
        if(response.data == false)
        {
          navigate("/login",{state:"yesir"})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
  })

 return(
//   <div   >
  
//     <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#083135'}}>
//   <div className="container-fluid">
//             <h4 style={{color:'#D2FF6A'}}><b style={{color:'#43BCC5'}}>LINK</b>loans</h4>
//     <a className="navbar-brand" href="#"></a>
//     <button data-mdb-collapse-init className="navbar-toggler" type="button" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"  >
//       <i className="fas fa-bars"></i>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <a className="nav-link " aria-current="page" href="#" >Home</a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link" href="#">Features</a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link" href="#">Pricing</a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link "
//             >Disabled</a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
//   </div>

  <div className='header text-center'>
    <h3>Loan Link</h3>
    <div style={{cursor:'pointer'}}>
      <span onClick={() => navigate("/")} className='m-3'>Home</span>
      <span onClick={() => navigate("/my_emi")} className='m-3'>My Loans</span>
      <span onClick={() => navigate("/pay_emi")} className='m-3'>Pay EMI</span>
      <span onClick={() => navigate("/my_profile")} className='m-3'>My Profile</span>
      <span onClick={() => navigate("/calculator")} className='m-3'>Loan Calculator</span>
      <span onClick={() => navigate("/contactus")} className='m-3'>Contact Us</span>
      <span style={{float:"right", marginRight:'1%'}} onClick={logouter}><button className='btn btn-sm btn-danger'><i className='fa fa-sign-out' /></button></span>

    </div>
    <br /><br /><br />
  </div>
);
}


Header.propTypes = {};

Header.defaultProps = {};

export default Header;
