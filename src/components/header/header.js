import React from 'react';
import PropTypes from 'prop-types';


const Header = () => {

 return(
  <div   >
  
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#083135'}}>
  <div className="container-fluid">
            <h4 style={{color:'#D2FF6A'}}><b style={{color:'#43BCC5'}}>LINK</b>loans</h4>
    <a className="navbar-brand" href="#"></a>
    <button data-mdb-collapse-init className="navbar-toggler" type="button" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"  >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#" >Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link "
            >Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
);
}


Header.propTypes = {};

Header.defaultProps = {};

export default Header;
