import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const QualificationExperiences = () => {
  const [experiences, setExperience] = useState([]);
  const [error, setError] = useState("");
  AOS.init({
    delay: 500,
    duration: 1000,
    offset: 120,
    mirror: false,
    anchorPlacement: "top-bottom",
  });

  const fetchExperience = async () => {
    try {
      const response = await axios.get("http://localhost:8080/experience.php");
      setExperience(response.data);
    } catch (error) {
      setError("Failed to load experience data");
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <div className="progress-journey flex transition-all">
      <ul className="journey-description">
        {experiences.map((experience, index) => (
          <li key={index} data-aos="fade-right" className="mb-4">
            <h2 className="text-md">{experience.title}</h2>
            <h5 className="f-gray">| {experience.company}</h5>
            {experience.location && (
              <span className="text-sm f-gray d-block">
                | {experience.location}
              </span>
            )}
            <span className="text-sm f-gray d-block">| {experience.type}</span>
            <span className="text-sm f-gray">| {experience.dates}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QualificationExperiences;
