import React, { useState, useEffect } from "react";
import axios from "axios";

const Works = () => {
  const [portfolioData, setPortfolio] = useState([]);

  // Fetch portfolio data from the server or static JSON
  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("http://localhost:8080/portfolio.php");
      setPortfolio(response.data);
    } catch (error) {
      console.error("Error fetching portfolio", error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <section className="portfolio_area" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main_title text-left">
              <h2>Portfolio</h2>
              <p>Recently Works</p>
            </div>
          </div>
        </div>

        <div className="row portfolio-grid justify-content-center">
          {portfolioData.map((work) => (
            <div className="col-lg-4 col-md-6" key={work.id}>
              <div className="portfolio_box">
                <div className="single_portfolio">
                  <img
                    className="img-fluid w-100"
                    src={`http://localhost:8080/${work.image}`}
                    alt={work.title}
                  />
                  <div className="overlay"></div>
                </div>
                <div className="short_info">
                  <h4>{work.title}</h4>
                  <p>{work.description}</p>
                  <p>
                    <strong>Key Features:</strong> {work.key_features}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
