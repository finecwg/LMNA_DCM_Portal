import React from "react";

function Funders() {
  return (
    <section id="funders" className="section scrollspy">
      <div className="container">
        <h3>Funders</h3>
        <div className="row">
          <div className="col s12 m4">
            <a
              href="https://example.com/funder1"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="images/funder1.png"
                alt="Funder 1"
                className="responsive-img"
              />
            </a>
          </div>
          <div className="col s12 m4">
            <a
              href="https://example.com/funder2"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="images/funder2.png"
                alt="Funder 2"
                className="responsive-img"
              />
            </a>
          </div>
          <div className="col s12 m4">
            <a
              href="https://example.com/funder3"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="images/funder3.png"
                alt="Funder 3"
                className="responsive-img"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Funders;
