import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import festivaImg from '../images/Festiva.png'
import { useNavigate , useLocation} from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown';
import { logout , isLoggedIn} from "../actions/currentUser.js"
import { Sling as Hamburger} from 'hamburger-react'

const GlobalNavBar2 = () => {
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Start",
        "About",
        "Pick Game",
        "Log Out",
    ];

    const backgrounds = {
    '/': '#8CD9E4',
    '/pickgame': '#f7c6d1', 
    '/waitToPlayGame': '#B4E091',
    '/start':'#fbe28f',
    '/about':'#ffa4a4',
    '/creategame':'#8CD9E4',
    '/quizGameLibrary':'#d1bcf0',
    '/ForgotPasswordPage':'#7fbdff'
    }

    const startOrProfile = () => {
        if (isLoggedIn() !== true) {
          return (
            <NavbarItem >
               <Link href="/start" className="navbar-link">Start</Link>
            </NavbarItem>
          ); 
        } else {
          return (
            <NavbarItem className="navbar-item fs-2 mx-5 text-nowrap">
              <ProfileDropdown/>
            </NavbarItem>
          );
        }
    }

    const logoutOrStartBar = () => {
      if (isLoggedIn() !== true) {
        return (
          <NavbarContent>
            <NavbarItem className="navbar-item fs-2 mx-5 text-nowrap">
                <Link href="/about" className="navbar-link">About Us</Link>
            </NavbarItem>
          </NavbarContent>
        )
    } else {
        return (
          <NavbarContent>
            <NavbarItem className="navbar-item fs-2 mx-5 text-nowrap">
              <Link href="/about" className="navbar-link">About Us</Link>
            </NavbarItem>
            <NavbarItem className="navbar-item fs-2 mx-5 text-nowrap">
              <Link href="/pickgame" className="navbar-link">Play A Game</Link>
            </NavbarItem>
          </NavbarContent>
        )
      }
    }

  return (
    // <div style={{backgroundColor: backgrounds[location.pathname]}}>
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
            <Link>
                <img src={festivaImg} alt='festiva img' className="w-75 justify-content-start"/>
            </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {logoutOrStartBar()}
      </NavbarContent>
             

      <NavbarContent justify="end">
        {startOrProfile()}
      </NavbarContent>


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>
    // </div>
  );
}

export default GlobalNavBar2;
