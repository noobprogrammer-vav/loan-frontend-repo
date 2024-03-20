import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../header/header';
import t1 from '../loans_img/t1.png';
import TypesCard from '../Types_card/Types_card';


const Home = () => {

  const [cards,setCards] = useState()

  useEffect(() =>{

    axios.get("http://192.168.29.108:3001/active_loan_types").then((response) => {
      setCards(response.data.map((data,index) => <TypesCard name={data.loan_name} image={data.image} gist={data.gist} summary = {data.summary} id={data.id} />))
    })
    if(sessionStorage.getItem("token") != null)
    {
      axios.post("http://192.168.29.108:3001/validate",{token : sessionStorage.getItem("token")}).then((response) => {
      })
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
