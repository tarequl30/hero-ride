import React from 'react';
import { Link } from 'react-router-dom';
import './Ride.css'

const Ride = (props) => {
    const {title, imgUrl, price, id} = props.ride
    const ticketLayout = {
        background: `url(${imgUrl})`,
        // width: '100%',
        marginLeft: '90px',
        resizeMode : 'cover',
        // height:'20px',
        marginTop: '140px',
        padding: '10px 30px',
        backgroundRepeat: 'no-repeat',
        float: 'left'
    }
    return (
        <div style={ticketLayout} className="ticketLayout">
            
            <h2>{title}</h2>
            {/* <img src={imgUrl} alt="" width="20%"/> */}
            <Link to={`/book/${id}`}> <button>Buy Now</button>  </Link>
            <h3>Price : {price} BDT</h3>

        </div>
    );
};

export default Ride;