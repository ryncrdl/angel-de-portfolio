import React, { useState, useEffect } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:8080/skills.php");
      setSkills(response.data);
    } catch (error) {
      setError("Failed to load skills data");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Separate skills by type
  const frontendSkills = skills.filter((skill) => skill.type === "frontend");
  const backendSkills = skills.filter((skill) => skill.type === "backend");

  return (
    <section className="skills_area" id="skills">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="main_title">
              <h2>Skills</h2>
              <p>My Technical Level</p>
            </div>
          </div>
        </div>
        <div className="skill_inner">
          {/* Frontend Skills Section */}
          <div className="frontend_skills">
            <h3>Frontend Skills</h3>
            {frontendSkills.map((skill) => (
              <div className="skill_item" key={skill.id}>
                <div className="title">
                  <img src={skill.icon} alt={skill.title} className="icon" />
                  <h4>{skill.title}</h4>
                </div>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
          {/* Backend Skills Section */}
          <div className="backend_skills">
            <h3>Backend Skills</h3>
            {backendSkills.map((skill) => (
              <div className="skill_item" key={skill.id}>
                <div className="title">
                  <img src={skill.icon} alt={skill.title} className="icon" />
                  <h4>{skill.title}</h4>
                </div>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
