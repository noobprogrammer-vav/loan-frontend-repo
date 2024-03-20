import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const TypesCard = (props) => {
  const navigate = useNavigate()

 return( <div>
    <div className='row cardcontainer'>
        <div className='typecard rounded rounded-5'>
         <div className='row ' >
        <div className='col-sm-3'>
        <img src={`http://192.168.29.108:3001/uploads/${props.image}`} style={{height:'50%',width:'100%'}}/>
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
          <button className='btn btn-success visit'>visit more</button><br></br><br></br>
          <button className='btn btn-outline-success' onClick={()=>navigate('/loanview',{state:props.id})}>Read more</button><br></br><br></br>
         <p style={{fontSize:'smaller'}}> * Terms & Conditions apply</p>
        </div>
    </div>
        </div>

      </div>
    </div>
);
 }

TypesCard.propTypes = {};

TypesCard.defaultProps = {};

export default TypesCard;
