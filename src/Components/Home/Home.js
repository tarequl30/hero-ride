import React from 'react';
import './Home.css'
import Ride from '../Ride/Ride';
import image from '../Images/Group 33142.png'

 export const tickets = [
    {
        title: 'One Time Ticket',
        imgUrl: `${image}`,  
        id: 'One Time',
        price: 100
    },
    {
        title: 'One Day Pass',
        imgUrl: `${image}`,   
        id:'One Day',
        price: 500
    },
    {
        title: 'Monthly Pass',
        imgUrl: `${image}`,
        price: 900,
        id:'Monthly',
    },
    {
        title: 'Annual Pass',
        imgUrl: `${image}`,
        price: 1500,
        id:'Annual',
    }
    
]
const Home = () => {
      
    return (
        // 
        <div style={{ backgroundImage: ` url('https://i.ibb.co/9ZMVgJ5/City-Landscape-Background.jpg')` }} className="home">
            <div>
            {
                tickets.map(ride => <Ride  ride={ride}></Ride>)
            }
        </div>
        </div>
    );
};

export default Home;