import React from "react";

import Nav from "../components/Nav";
import Home from "./Home";
import Skills from "./Skills";
import Works from "./Works";
import About from "./About";
import Qualification from "./Qualification";
import Contact from "./Contact";
import Footer from "./Footer";

function Index() {
  return (
    <>
      <Nav />
      <Home />
      <About />
      <Qualification />
      <Skills />
      <Works />
      <Contact />
      <Footer />
    </>
  );
}

export default Index;
