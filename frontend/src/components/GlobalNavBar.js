
import React from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import festivaImg from '../images/Festiva.png'
import { Sling as Hamburger} from 'hamburger-react'
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import '../css/ProfileMenu.css';
import { logout , isLoggedIn} from "../actions/currentUser.js"
import '../dist/output.css';

const GlobalNavBar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const backgrounds = {
    '/': '#8CD9E4',
    '/pickgame': '#f7c6d1', 
    '/waitToPlayGame': '#B4E091',
    '/start':'#fbe28f',
    '/creategame':'#8CD9E4',
    '/quizGameLibrary':'#d1bcf0',
    '/ForgotPasswordPage':'#7fbdff'
    }

    const logoutOrStartLink = () => {
        if (isLoggedIn() !== true) {
            return (
                // <ul>
                    <li className="navbar-item fs-2 mx-5 text-nowrap" style={{justifySelf: 'end'}}>
                        <Link to="/start" className="navbar-link">Start</Link>
                    </li>
                // {/* </ul> */}
            )
        } else {
            return (
                <ul style={{justifySelf: 'end'}}>
                    <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <Link to="/quizGameLibrary" className="navbar-link">Play A Game</Link>
                    </li>
                    <li className="navbar-item fs-2 mx-5 text-nowrap">
                        <ProfileDropdown/>
                    </li>
                </ul>
            )
        }
    }
    return (
        <nav style={{backgroundColor: backgrounds[location.pathname]}} className={"navbar_style align-middle py-3 justify-content-between"}>

            <ul className="w-50 d-flex flex-row justify-content-start">
            <li className="navbar-item">
                <Link to="/" className="navbar-link">                
                <img src={festivaImg} alt='festiva img' className="w-75 justify-content-start"/>
                </Link>
            </li>
            </ul>
            <ul style={{justifySelf: 'end'}}>
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
                    {logoutOrStartLink()}
                </ul>
            }
            </div>
        </nav>
    );
}

export default GlobalNavBar;
