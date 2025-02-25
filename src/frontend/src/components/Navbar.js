import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-extended teal darken-2">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          LMNA‑DCM Portal
        </Link>
        <a href="#" data-target="mobile-nav" className="sidenav-trigger">
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
            <a href="#funders">Funders</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
        </ul>
      </div>
      <div className="nav-content container">
        <ul className="tabs tabs-transparent">
          <li className="tab">
            <a href="#summary" className="active">
              Summary
            </a>
          </li>
          <li className="tab">
            <a href="#data">Data</a>
          </li>
          <li className="tab">
            <a href="#publication">Publication</a>
          </li>
          <li className="tab">
            <a href="#funders">Funders</a>
          </li>
          <li className="tab">
            <a href="#team">Team</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
