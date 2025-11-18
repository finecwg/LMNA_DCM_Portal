import React from "react";

function Funders() {
  const funders = [
    {
      name: "Stanford Cardiovascular Institute",
      logo: "https://med.stanford.edu/mchri/awards/stanford-cvi/_jcr_content/main/panel_builder/panel_0/panel_builder/panel_0/image_279451397.img.620.high.jpg/cvi_horizontal_high_res.jpg",
      link: "https://med.stanford.edu/cvi.html",
    },
    {
      name: "Stanford Medicine",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_DYBwXc7XKNyPosFS152S16tlCrHkd5clw&s",
      link: "https://med.stanford.edu",
    },
    {
      name: "NIH NHLBI",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWz4EMouZGgv4lvwSTjG_JLsmKVnesXB2FUg&s",
      link: "https://www.nhlbi.nih.gov",
    },
  ];

  return (
    <section id="funders" className="section scrollspy">
      <div className="container">
        <h3 className="section-title">Funders</h3>
        <p className="lead-text">
          This research was made possible by generous support from:
        </p>

        <div className="row funders-container">
          {funders.map((funder, index) => (
            <div className="col s12 m4" key={index}>
              <div className="card funder-card">
                <div className="card-content center-align">
                  <a
                    href={funder.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={funder.logo}
                      alt={funder.name}
                      className="responsive-img funder-logo"
                      style={{ maxHeight: "100px", margin: "15px 0" }}
                    />
                  </a>
                  <p className="funder-name">{funder.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Funders;
