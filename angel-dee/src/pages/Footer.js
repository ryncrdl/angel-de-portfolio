import React from "react";

const Footer = () => {
  return (
    <footer className="footer_area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="footer_top flex-column">
              <div className="footer_social">
                <a href="#home">
                  <img src="img/logo.png" alt="" />
                </a>
                <h4>Follow Me</h4>
              </div>
              <div className="footer_top flex-column">
                <div className="footer_social" style={{ margin: "2rem 0rem" }}>
                  <a
                    href="https://www.facebook.com/eynjeldg?mibextid=ZbWKwL"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/angel-de-guzman-874879295"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/eynjeldg"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row footer_bottom justify-content-center">
          <p className="col-lg-8 col-sm-12 footer-text">
            Angel Dee &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
