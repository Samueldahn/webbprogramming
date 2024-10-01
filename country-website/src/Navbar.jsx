import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from "./assets/logo.png";

function Navbar() {
    const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src={logo} alt="Arvid & Samuel"/>
            </Link>
            <div id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/arvid">Arvid</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/samuel">Samuel</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/country-finder">Country-finder</NavLink>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
  );
}

export default Navbar;