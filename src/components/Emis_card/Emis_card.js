import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';



const EmisCard = (props) => {

  const navigate = useNavigate()


  return(
<div>
    <div className='row cardcontainer'>
        <div className='typecard rounded rounded-5'>
         <div className='row ' >
        <div className='col-sm-3'>
        <img src={`${sessionStorage.getItem("urls")}/uploads/${props.image}`} style={{height:'50%',width:'100%'}}/>
         <br></br>
        </div>
        <div className='col-sm-6'>
          <h5>{props.name}</h5><br></br>
          <p>{props.gist}</p><br></br>
          <hr></hr><br></br>
          <br></br>
          <span dangerouslySetInnerHTML={{__html : props.summary}} />
        </div>
        <div className='col-sm-3'><br></br>
        <div className='row'>
          <div className='col-sm-6'>
            <h5><span className='m-1 p-1 rounded' style={{backgroundColor:props.status == 0 ? 'red' : props.status == 1 ? 'yellow' : props.status == 2 ? 'green' : 'grey'}}>{props.status == 0 ? 'Rejected' : props.status == 1 ? 'Pending' : props.status == 2 ? 'Approved' : 'Completed'}</span></h5>
          </div>
          <div className='col-sm-6'>
            <button onClick={() => navigate("/my_history",{state:props.aid})} className='btn btn-success visit'>My History</button><br></br><br></br>
            <button className='btn btn-outline-success' onClick={()=>navigate('/loanview',{state:[props.id,"no"]})}>Read more</button><br></br><br></br>
            <p style={{fontSize:'smaller'}}> * Terms & Conditions apply</p>
          </div>

        </div>
        </div>
    </div>
        </div>

      </div>
    </div>
);
  }

EmisCard.propTypes = {};

EmisCard.defaultProps = {};

export default EmisCard;
