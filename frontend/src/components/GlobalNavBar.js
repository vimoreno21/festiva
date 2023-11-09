
import React from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import festivaImg from '../images/Festiva.png'
import { Sling as Hamburger} from 'hamburger-react'
import { useState } from 'react';
import { logout , isLoggedIn} from "../actions/currentUser.js"
import Profile from './profile';
import profilePic from '../images/profile.jpeg';
import '../css/ProfileMenu.css';

const GlobalNavBar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const backgrounds = {
    '/': '#8CD9E4',
    '/pickgame': '#f7c6d1', 
    '/waitToPlayGame': '#B4E091'
    }

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout()
        navigate('/');
    }

    const logoutOrStartLink = () => {
        if (isLoggedIn() != true) {
            return (
                <ul>
                    <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <Link to="/about" className="navbar-link">About Us</Link>
                    </li>
                    <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <Link to="/start" className="navbar-link">Start</Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <Link to="/about" className="navbar-link">About Us</Link>
                    </li>
                    <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <Profile src={profilePic}/> 
                    </li>
                    {/* <div className="app__profile-menu">
                        <Profile src={profilePic} />
                    </div> */}
                    {/* <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <Link to="/" className="navbar-link" onClick={handleLogoutClick}>Log Out</Link>
                    </li> */}
                </ul>
            )
        }
    }
    return (
        <nav style={{backgroundColor: backgrounds[location.pathname]}} className={"navbar_style align-middle py-3 "}>

            <ul className="w-75 d-flex flex-row justify-content-start">
            <li className="navbar-item">
                <Link to="/" className="navbar-link">                
                <img src={festivaImg} alt='festiva img' className='w-75'/>
                </Link>
            </li>
            </ul>

            <ul className='d-none d-md-block d-flex flex-row set_width text-nowrap'>
                {/* <li className="navbar-item fs-2 mx-5 text-nowrap">
                    <Link to="/start" className="navbar-link">Start</Link>
                </li> */}
                {logoutOrStartLink()}
            </ul>

            <div className="d-md-none position-relative">
            <Hamburger 
                toggled={open} 
                toggle={setOpen} 
                size={30}
                className='position-fixed'
            />
            {
                open &&

                <ul className="position-fixed bg-nav rounded text-center list-unstyled p-1 set_z">
                    <li className='py-4 px-2'>
                        <Link to="/about" className='text-dark navbar-link'>About Us</Link>
                    </li>
                    {logoutOrStartLink()}
                </ul>
            }
            </div>
        </nav>
    );
}

export default GlobalNavBar;