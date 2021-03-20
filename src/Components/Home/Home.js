import React from 'react';
import './Home.css'
import bg from '../Images/Group 33142.png'
import bg1 from '../Images/Group 33143.png'
import bg2 from '../Images/Group 33144.png'
import bg3 from '../Images/Group 33145.png'
import Ride from '../Ride/Ride';
import home from '../Images/homebg1.jpg'

const Home = () => {
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }
    const tickets = [
        {
            title: 'One Time Ticket',
            imgUrl: `${bg}`,
            ticketType: 'Single',
            price: 100
        },
        {
            title: 'One Day Pass',
            imgUrl: `${bg1}`,
            ticketType: 'Single',
            price: 500
        },
        {
            title: 'Monthly Pass',
            imgUrl: `${bg2}`,
            ticketType: 'Single',
            price: 900
        },
        {
            title: 'Annual Pass',
            imgUrl: `${bg3}`,
            ticketType: 'Single',
            price: 1500
        }
        
    ]
    return (
        <div style={{ backgroundImage: ` url(${home})` }} className="home">
            <div style={style}>
           
            {
                tickets.map(ride => <Ride  ride={ride}></Ride>)
            }
        </div>
        </div>
    );
};

export default Home;