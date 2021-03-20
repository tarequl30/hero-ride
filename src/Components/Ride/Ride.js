import React from 'react';
import './Ride.css'

const Ride = (props) => {
    const {title, imgUrl, price} = props.ride
    return (
        <div className="ticketLayout">
            <h3>{title}</h3>
            <img src={imgUrl} alt="" width="70%"/>
            <button>Buy Now</button>
            <h3>Price {price}</h3>

        </div>
    );
};

export default Ride;