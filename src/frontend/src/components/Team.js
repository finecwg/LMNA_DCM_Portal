import React from "react";

function Team() {
  const teams = [
    {
      name: "Joseph Wu Lab",
      logo: "https://med.stanford.edu/mchri/awards/stanford-cvi/_jcr_content/main/panel_builder/panel_0/panel_builder/panel_0/image_279451397.img.620.high.jpg/cvi_horizontal_high_res.jpg",
      link: "https://med.stanford.edu/wulab.html",
    },
  ];

  return (
    <section id="team" className="section scrollspy">
      <div className="container">
        <h3 className="section-title">Team</h3>
        <p className="lead-text">The LMNA-DCM Atlas was developed by:</p>

        <div className="row team-container">
          {teams.map((team, index) => (
            <div className="col s12 m6 offset-m3" key={index}>
              <div className="card team-card">
                <div className="card-content center-align">
                  <a href={team.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="responsive-img team-logo"
                      style={{ maxHeight: "100px", margin: "3px 0" }}
                    />
                  </a>
                  <h5 className="team-name">{team.name}</h5>
                  <p>Stanford University School of Medicine</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
