import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
                        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                    </li>
                    <li>
                        <Link className={`nav-link ${location.pathname === '/arvid' ? 'active' : ''}`} to="/arvid">Arvid</Link>
                    </li>
                    <li>
                        <Link className={`nav-link ${location.pathname === '/samuel' ? 'active' : ''}`} to="/samuel">Samuel</Link>
                    </li>
                    <li>
                        <Link className={`nav-link ${location.pathname === '/country-finder' ? 'active' : ''}`} to="/country-finder">Country-finder</Link>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
  );
}

export default Navbar;