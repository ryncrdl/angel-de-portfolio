import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/dashboard/experience">Experience</Link>
          </li>
          <li>
            <Link to="/dashboard/skills">Skills</Link>
          </li>
          <li>
            <Link to="/dashboard/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard/contact">Contact</Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
