import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const isOpen = open ? "" : "collapse";
  const [activeLink, setActiveLink] = useState("");
  const [scroll, setScroll] = useState(false);

  // const onScroll = ()=>{
  // //  const style = {
  // //  }
  // }

  window.onscroll = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setActiveLink(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleItemClick = (hash) => {
    setActiveLink(hash);
    setOpen(false);
  };

  return (
    <header
      className="header_area"
      style={
        scroll
          ? { boxShadow: "0.1rem 0rem 0.2rem rgba(0,0,0,0.2" }
          : { boxShadow: "none" }
      }
    >
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand logo_h" href="/">
              Angel Dee
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
            >
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`${isOpen} navbar-collapse offset`}
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav justify-content-end">
                <li
                  className={`nav-item ${
                    activeLink === "home" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#home"
                    onClick={() => handleItemClick("home")}
                  >
                    Home
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    activeLink === "portfolio" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#portfolio"
                    onClick={() => handleItemClick("portfolio")}
                  >
                    Portfolio
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    activeLink === "qualification" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#qualification"
                    onClick={() => handleItemClick("qualification")}
                  >
                    Qualification
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    activeLink === "skills" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#skills"
                    onClick={() => handleItemClick("skills")}
                  >
                    Skills
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    activeLink === "about" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#about"
                    onClick={() => handleItemClick("about")}
                  >
                    About
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    activeLink === "contact" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link"
                    href="#contact"
                    onClick={() => handleItemClick("contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
