import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import festivaImg from '../images/Festiva.png'

function NavBar() {
  return (
    <nav className="navbar_style py-3">
      <ul className="w-25 d-flex flex-row">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">                
            <img src={festivaImg} alt='festiva img'className='w-75'/>
          </Link>
        </li>
      </ul>

      <ul className='set_width d-flex flex-row justify-content-end'>

        <li className="navbar-item fs-2 mx-5 text-nowrap">
          <Link to="/about" className="navbar-link">About Us</Link>
        </li>
        <li className="navbar-item fs-2 mx-5 text-nowrap">
          <Link to="/start" className="navbar-link">Start</Link>
        </li>
      </ul>

    </nav>
  );
}

export default NavBar;


