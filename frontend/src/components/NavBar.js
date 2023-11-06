import React from "react";
import { Link, resolvePath } from "react-router-dom"; // Import Link from react-router-dom
import festivaImg from "../images/Festiva.png";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const backgrounds = {
    "/": "#8CD9E4",
    "/pickgame": "#f7c6d1",
    "/waitToPlayGame": "#B4E091",
    "/questionDisplay": "#fdefbd",
  };

  return (
    <nav
      style={{ backgroundColor: backgrounds[location.pathname] }}
      className={"navbar_style align-middle py-3 "}
    >
      <ul className="w-75 d-flex flex-row justify-content-start">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <img src={festivaImg} alt="festiva img" className="w-75" />
          </Link>
        </li>
      </ul>

      <ul className="d-none d-md-block d-flex flex-row set_width text-nowrap">
        <li className="navbar-item fs-2 mx-5 text-nowrap">
          <Link to="/about" className="navbar-link">
            About Us
          </Link>
        </li>
        <li className="navbar-item fs-2 mx-5 text-nowrap">
          <Link to="/start" className="navbar-link">
            Start
          </Link>
        </li>
      </ul>

      <div className="d-md-none position-relative">
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={30}
          className="position-fixed"
        />
        {open && (
          <ul className="position-fixed bg-nav rounded text-center list-unstyled p-1 set_z">
            <li className="py-4 px-2">
              <Link to="/about" className="text-dark navbar-link">
                About Us
              </Link>
            </li>
            <li className="py-4 px-2">
              <Link to="/start" className="text-dark navbar-link">
                Start
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
