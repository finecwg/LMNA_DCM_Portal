import React from "react";

function Footer() {
  return (
    <footer className="page-footer teal darken-2">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <p className="white-text">© 2025 LMNA‑DCM Resource Portal</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <a
            className="grey-text text-lighten-3"
            href="https://www.example.com/terms"
          >
            Terms and Conditions
          </a>{" "}
          |{" "}
          <a
            className="grey-text text-lighten-3"
            href="https://www.example.com/privacy"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
