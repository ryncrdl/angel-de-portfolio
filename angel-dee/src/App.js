import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./css/style.css";
import "./css/font-awesome.min.css";
import "./css/magnific-popup.css";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Login";
import Home from "./Admin/Home";
import Portfolio from "./Admin/Portfolio";
import Experience from "./Admin/Experience";
import Skills from "./Admin/Skills";
import About from "./Admin/About";
import Contact from "./Admin/Contact";

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoad(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {load ? (
        <LoadingScreen />
      ) : (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="experience" element={<Experience />} />
                <Route path="skills" element={<Skills />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </Router>
        </>
      )}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
