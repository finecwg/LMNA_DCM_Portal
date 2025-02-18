import React from "react";

function Team() {
  return (
    <section id="team" className="section scrollspy">
      <div className="container">
        <h3>Team</h3>
        <div className="row">
          <div className="col s12 m3 center">
            <img
              src="images/team_member1.png"
              alt="Team Member 1"
              className="circle responsive-img"
            />
            <p>Dr. A</p>
          </div>
          <div className="col s12 m3 center">
            <img
              src="images/team_member2.png"
              alt="Team Member 2"
              className="circle responsive-img"
            />
            <p>Dr. B</p>
          </div>
          <div className="col s12 m3 center">
            <img
              src="images/team_member3.png"
              alt="Team Member 3"
              className="circle responsive-img"
            />
            <p>Dr. C</p>
          </div>
          <div className="col s12 m3 center">
            <img
              src="images/team_member4.png"
              alt="Team Member 4"
              className="circle responsive-img"
            />
            <p>Dr. D</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
