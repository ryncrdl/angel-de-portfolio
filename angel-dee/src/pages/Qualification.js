import React from "react";
// import "../css/qualification.css"
import QualificationEducations from "../components/QualificationEducations";
import QualificationExperiences from "../components/QualificationExperiences";
import { useState } from "react";

const Qualification = () => {
  const [change, setChange] = useState(true);
  const content = change ? (
    <QualificationExperiences />
  ) : (
    <QualificationEducations />
  );

  return (
    <section style={{ background: "#000" }} id="qualification">
      <div className="qualification">
        <h1 className="text-center mb-4">Qualification</h1>
        <nav className="btns-container">
          <button
            className={change ? "active" : ""}
            onClick={() => setChange(true)}
          >
            Experience
          </button>
          {/* <button
          className={!change ? "active" : ""}
          onClick={() => setChange(false)}
        >
          Education
        </button> */}
        </nav>
        {content}
      </div>
    </section>
  );
};

export default Qualification;
