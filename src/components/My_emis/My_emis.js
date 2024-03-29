import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import EmisCard from '../Emis_card/Emis_card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const MyEmis = () => {

  const [cards,setCards] = useState()

  const navigate = useNavigate()


  useEffect(() => {
    if(sessionStorage.getItem("token") != null)
    {
      axios.post(`${sessionStorage.getItem("urls")}/my_loans`,{token : sessionStorage.getItem("token") }).then((response) => {
        if(response.data.length > 0)
        {
          setCards(response.data.map((data,index) => <EmisCard name={data.loan_name} image={data.image} gist={data.gist} summary = {data.summary} aid={data.aid} id={data.loan_id} status={data.astatus} />))
        }
        else{
          navigate("/",{state:"yes"})
        }
      }).catch((err) => {toast.error("Internal Server error",{position:"top-center"}) 
      console.log(err)})
    }
    else{
      navigate("/login",{state : "yes"})
    }

  },[])

  return(<div>
    <Header />
    <div className='container'>
      {cards}
    </div>
  </div>
);
}

MyEmis.propTypes = {};

MyEmis.defaultProps = {};

export default MyEmis;
