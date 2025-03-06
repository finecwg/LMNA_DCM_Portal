import React, { useEffect } from "react";
import M from "materialize-css";
import logo from "../assets/lmna_dcm_logo.png"; // Create a professional logo

function Header() {
  useEffect(() => {
    // Initialize Materialize components
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    M.ScrollSpy.init(document.querySelectorAll(".scrollspy"));
  }, []);

  return (
    <header>
      <div className="navbar-fixed">
        <nav className="nav-extended">
          <div className="nav-wrapper container">
            <a href="#!" className="brand-logo">
              LMNA-DCM Atlas
            </a>
            <a href="#" data-target="mobile-nav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="#summary">Overview</a>
              </li>
              <li>
                <a href="#data">Data</a>
              </li>
              <li>
                <a href="#visualization">Visualizations</a>
              </li>
              <li>
                <a href="#expression">Gene Expression</a>
              </li>
              <li>
                <a href="#funders">Funders</a>
              </li>
              <li>
                <a href="#team">Team</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-nav">
        <li>
          <a href="#summary">Overview</a>
        </li>
        <li>
          <a href="#data">Data</a>
        </li>
        <li>
          <a href="#visualization">Visualizations</a>
        </li>
        <li>
          <a href="#expression">Gene Expression</a>
        </li>
        <li>
          <a href="#funders">Funders</a>
        </li>
        <li>
          <a href="#team">Team</a>
        </li>
      </ul>

      <div className="section no-pad-bot hero">
        <div className="container">
          <div className="row center">
            <h1 className="header light white-text">LMNA-DCM Atlas</h1>
            <h5 className="header light white-text">
              The first comprehensive spatial and single-cell multi-omics atlas
              of Lamin A/C-related dilated cardiomyopathy
            </h5>
            <a
              href="#summary"
              className="btn-large waves-effect waves-light"
              id="explore-data-btn"
            >
              EXPLORE DATA
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
