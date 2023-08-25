import React from "react";
import Logo from "../asssets/NOVA logo-long.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="leftSide">
        <Link to="/">
          <img src={Logo} alt="logo"></img>
        </Link>
        <ul>
          <li>
            <Link to="/" className="linkStyle">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="linkStyle">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="linkStyle">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="rightSide">
        <ul>
          <li>
            <Link to="/login" className="linkStyle">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="linkStyle">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
