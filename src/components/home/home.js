import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../header/header';
import t1 from '../loans_img/t1.png';
import TypesCard from '../Types_card/Types_card';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const Home = () => {

  const [cards,setCards] = useState()

  const nav_data = useLocation().state

  useEffect(() =>{

    if(nav_data == "yes")
    {
      toast.warning("Add for Loans",{position:"top-center"})
    }
    sessionStorage.setItem("urls","http://192.168.29.108:3001") //http://192.168.29.108:3001  http://localhost:3001

    axios.get(`${sessionStorage.getItem("urls")}/active_loan_types`).then((response) => {
      setCards(response.data.map((data,index) => <TypesCard name={data.loan_name} image={data.image} gist={data.gist} summary = {data.summary} id={data.id} />))
    }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
    console.log(err)})
    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/validate`,{token : sessionStorage.getItem("token")}).then((response) => {
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }

  },[])

  return(<div>

    <Header />
       {cards}
   </div>
);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
