import React, { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [error, setError] = useState("");
  const [newExperience, setNewExperience] = useState({
    id: null,
    title: "",
    company: "",
    address: "",
    type: "",
    dates: "",
  });

  // Fetch experience data from PHP backend
  const fetchExperience = async () => {
    try {
      const response = await axios.get("http://localhost:8080/experience.php");
      setExperience(response.data);
    } catch (error) {
      setError("Failed to load experience data");
    }
  };

  // Load experience data when component mounts
  useEffect(() => {
    fetchExperience();
  }, []);

  // Handle form submission for new experience
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newExperience.id === null) {
        // Create new experience
        const response = await axios.post(
          "http://localhost:8080/experience.php",
          newExperience
        );
        alert(response.data.message);
      } else {
        // Update existing experience
        const response = await axios.put(
          "http://localhost:8080/experience.php",
          newExperience
        );
        alert(response.data.message);
      }
      fetchExperience(); // Reload the experience data after successful save
      resetForm(); // Reset the form
    } catch (error) {
      alert("Failed to save experience");
    }
  };

  // Handle deletion of an experience
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const response = await axios.delete(
          "http://localhost:8080/experience.php",
          {
            data: { id },
          }
        );
        alert(response.data.message);
        fetchExperience(); // Reload the experience data after deletion
      } catch (error) {
        alert("Failed to delete experience");
      }
    }
  };

  // Handle edit of an experience
  const handleEdit = (exp) => {
    setNewExperience(exp); // Pre-fill the form with the selected experience
  };

  // Reset the form for adding new experience
  const resetForm = () => {
    setNewExperience({
      id: null,
      title: "",
      company: "",
      address: "",
      type: "",
      dates: "",
    });
  };

  return (
    <div className="experience-container">
      <h1>My Experience</h1>
      {error && <div className="error">{error}</div>}

      {/* Experience Table */}
      <table className="experience-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Address</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experience.length > 0 ? (
            experience.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.title}</td>
                <td>{exp.company}</td>
                <td>{exp.address || "N/A"}</td>
                <td>{exp.type}</td>
                <td>{exp.dates}</td>
                <td className="btns">
                  <button onClick={() => handleEdit(exp)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No experience found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Experience Form */}
      <h2>
        {newExperience.id === null ? "Add New Experience" : "Edit Experience"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newExperience.title}
          onChange={(e) =>
            setNewExperience({ ...newExperience, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) =>
            setNewExperience({ ...newExperience, company: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={newExperience.address}
          onChange={(e) =>
            setNewExperience({ ...newExperience, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Type"
          value={newExperience.type}
          onChange={(e) =>
            setNewExperience({ ...newExperience, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Dates"
          value={newExperience.dates}
          onChange={(e) =>
            setNewExperience({ ...newExperience, dates: e.target.value })
          }
        />
        <button type="submit">
          {newExperience.id === null ? "Add Experience" : "Update Experience"}
        </button>
      </form>
    </div>
  );
};

export default Experience;
