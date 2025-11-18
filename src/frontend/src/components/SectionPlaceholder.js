import React from "react";

function SectionPlaceholder({
  id,
  title,
  status,
  summary,
  details = [],
  footnote,
}) {
  return (
    <section id={id} className="section scrollspy section-placeholder">
      <div className="container">
        <h3 className="section-title">{title}</h3>
        <div className="card placeholder-card z-depth-0">
          <div className="card-content">
            {status && <span className="placeholder-status">{status}</span>}
            {summary && <p className="lead-text">{summary}</p>}
            {details.length > 0 && (
              <ul className="placeholder-list">
                {details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {footnote && (
              <p className="placeholder-footnote">{footnote}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionPlaceholder;


