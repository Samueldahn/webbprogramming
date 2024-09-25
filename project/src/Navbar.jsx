import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Arvid & Samuel" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link me-3 ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;