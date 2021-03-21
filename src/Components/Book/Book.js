import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { tickets } from '../Home/Home';
import map from '../Images/map.png'
import image from '../Images/tickets.png'
import './Book.css'

const Book = () => {
    const {ticketId} = useParams();
    const [ticket , setTicket] = useState({})
    const  [showDetail, setShowDetail] = useState(false)
  
    useEffect(() => {
         const selectedTicket = tickets.find(ticket => ticket.id === +ticketId)
          setTicket(selectedTicket)
    }, [ticketId])
    console.log(ticket)
    return (
    <>
        <div className="bookingTicket">
            {
                showDetail ? <div className="ticketDetail">
                    <div className="destination">
                        <h2>Dhaka</h2>
                        <p>-----></p>
                        <h2>Sylhet</h2>
                    </div>
                    <div className="ticketPrice">
                        <h5><img src={image} alt="" width="30px"></img>Ticket {ticketId} $76</h5>
                    </div>
                    <div className="ticketPrice">
                       <h5><img src={image} alt="" width="30px"></img>Ticket {ticketId} $96</h5>   
                    </div>
                    <div className="ticketPrice">
                         <h5><img src={image} alt="" width="30px"></img>Ticket {ticketId} $86</h5>
                    </div>
                    <br/>
                <button className="searchBtn" onClick={() => setShowDetail(false)}>Go Back</button>
                </div> : <div className="form">
                <p>Pick from</p>
                  <input type="text" placeholder="Dhaka"/>
                <br/>
                <p>Drop</p>
                   <input type="text" placeholder='Sylhet'/>
                <button className="searchBtn" onClick={() => setShowDetail(true)}>Search</button>  
            </div>
            }
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