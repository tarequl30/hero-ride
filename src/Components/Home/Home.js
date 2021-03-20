import React from 'react';
import './Home.css'
import Ride from '../Ride/Ride';
import home from '../Images/homebg1.jpg'
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
        // imgUrl: `https://i.ibb.co/Jy3MWPy/Group-33143.png`,   
        id:'One Day',
        price: 500
    },
    {
        title: 'Monthly Pass',
        imgUrl: `${image}`,
        // imgUrl: `https://i.ibb.co/Vwwk4yt/Group-33144.png`,
        price: 900,
        id:'Monthly',
    },
    {
        title: 'Annual Pass',
        imgUrl: `${image}`,
        // imgUrl: `https://i.ibb.co/ZKFB3Xg/Group-33145.png`,
        price: 1500,
        id:'Annual',
    }
    
]
const Home = () => {
      
    return (
        // 
        <div style={{ backgroundImage: ` url(${home})` }} className="home">
            <div>
            {
                tickets.map(ride => <Ride  ride={ride}></Ride>)
            }
        </div>
        </div>
    );
};

export default Home;