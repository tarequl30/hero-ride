import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tickets } from '../Home/Home';
import map from '../Images/map.png'
import './Book.css'

const Book = () => {
    const {ticketId} = useParams();
    const [ticket , setTicket] = useState({})

    useEffect(() => {
         const selectedTicket = tickets.find(ticket => ticket.id === +ticketId)
          setTicket(selectedTicket)
    }, [ticketId])
    console.log(ticket)
    return (
        <>
        <div className="bookingTicket">
            <div className="form">
                <p>Pick from</p>
                <input type="text" placeholder="Pickup Destination"/>
                <br/>
                <p>Drop</p>
                <input type="text" placeholder="Drop Destination"/>
                <button>Search</button>
            </div>
            <div>
                <img src={map} alt="" width="100%" height="85%"/>
            </div>
        </div>
        <div className="extraInfo">
            <h1>Let's book a {ticketId} ticket.</h1>
            <p >Want a <Link to="/home">different ticket?</Link> </p>
        </div>
        </>
    );
};

export default Book;