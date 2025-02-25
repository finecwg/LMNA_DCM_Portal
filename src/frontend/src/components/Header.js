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
        <nav className="nav-extended white">
          <div className="nav-wrapper container">
            <a href="#!" className="brand-logo">
              <img src={logo} alt="LMNA-DCM Atlas" height="60" />
            </a>
            <a href="#" data-target="mobile-nav" className="sidenav-trigger">
              <i className="material-icons blue-text">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="#summary" className="blue-text text-darken-4">
                  Overview
                </a>
              </li>
              <li>
                <a href="#data" className="blue-text text-darken-4">
                  Data
                </a>
              </li>
              <li>
                <a href="#visualization" className="blue-text text-darken-4">
                  Visualizations
                </a>
              </li>
              <li>
                <a href="#cellxgene" className="blue-text text-darken-4">
                  Interactive Explorer
                </a>
              </li>
              <li>
                <a href="#publication" className="blue-text text-darken-4">
                  Publication
                </a>
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
          <a href="#cellxgene">Interactive Explorer</a>
        </li>
        <li>
          <a href="#publication">Publication</a>
        </li>
      </ul>

      <div className="section no-pad-bot hero blue darken-4">
        <div className="container">
          <div className="row center">
            <h1 className="header light white-text">LMNA-DCM Atlas</h1>
            <h5 className="header light white-text">
              The first comprehensive spatial and single-cell transcriptomic
              atlas of Lamin A/C-related dilated cardiomyopathy
            </h5>
            <a
              href="#summary"
              className="btn-large waves-effect waves-light white blue-text"
            >
              Explore Data
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
