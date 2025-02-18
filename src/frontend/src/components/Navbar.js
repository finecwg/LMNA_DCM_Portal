import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            LMNA-DCM Portal
          </Link>
          <a href="#" data-target="mobile-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="#summary">Summary</a>
            </li>
            <li>
              <a href="#data">Data</a>
            </li>
            <li>
              <a href="#publication">Publication</a>
            </li>
            <li>
              <Link to="/funders">Funders</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#summary">Summary</a>
        </li>
        <li>
          <a href="#data">Data</a>
        </li>
        <li>
          <a href="#publication">Publication</a>
        </li>
        <li>
          <Link to="/funders">Funders</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
