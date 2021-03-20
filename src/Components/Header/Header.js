import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../Images/ht.jpg'

const Header = () => {
    return (
        <div >
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt="" width="100px"/>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <button className="loginBtn"><Link to="/login">Login</Link></button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;