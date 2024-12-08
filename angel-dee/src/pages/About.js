import React, { useEffect, useState } from "react";
import TogaPicture from "../assets/my-picture.jpg";
import axios from "axios";

const About = () => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  // Fetch content from the backend
  const fetchContent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/about.php");
      setContent(response.data.content || "");
      console.log(content);
    } catch (error) {
      setMessage("Failed to load content.");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <section className="about_area section_gap" id="about">
      <div className="container">
        <div className="row justify-content-start align-items-center">
          <div className="col-lg-5">
            <div className="about_img">
              <img src={TogaPicture} alt="Graduation Picture" />
            </div>
          </div>

          <div className="offset-lg-1 col-lg-5">
            <div className="main_title text-left">
              <h2>About me</h2>
              <p style={{ color: "white" }}>{content}</p>
              <a
                className="primary_btn"
                href="https://drive.google.com/uc?id=1Xm6ezvQkfGAr0eJU4DDgw1GIk110v8m0&export=download"
                rel="noreferrer"
                target="_blank"
              >
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
