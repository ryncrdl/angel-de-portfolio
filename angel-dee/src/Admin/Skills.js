import React, { useEffect, useState } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    id: null,
    title: "",
    icon: "",
    type: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put("http://localhost:8080/skills.php", form);
        alert("Skill updated successfully");
      } else {
        await axios.post("http://localhost:8080/skills.php", form);
        alert("Skill added successfully");
      }
      setForm({ id: null, title: "", type: "", icon: "", description: "" });
      setIsEditing(false);
      fetchSkills();
    } catch (error) {
      alert("Error saving skill: " + error.message);
    }
  };

  const handleEdit = (skill) => {
    setForm(skill);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete("http://localhost:8080/skills.php", {
          data: { id },
        });
        alert("Skill deleted successfully");
        fetchSkills();
      } catch (error) {
        alert("Error deleting skill: " + error.message);
      }
    }
  };

  return (
    <section>
      <div className="container">
        <div className="main_title">
          <h2>Skills</h2>
          <p>My Technical Level</p>
        </div>
        <div className="skill_form">
          <form onSubmit={handleAddOrUpdate}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="icon"
              placeholder="Icon URL"
              value={form.icon}
              onChange={handleInputChange}
            />
            <select name="type" value={form.type} onChange={handleInputChange}>
              <option value="frontend">Front End</option>
              <option value="backend">Back End</option>
            </select>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
              required
            />
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
          </form>
        </div>
        <div className="skill_inner">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Icon</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>
                    <h4 style={{ color: "#000" }}>{skill.title}</h4>
                  </td>
                  <td>
                    <h4 style={{ color: "#000" }}>{skill.type}</h4>
                  </td>
                  <td>
                    <img src={skill.icon} alt={skill.title} className="icon" />
                  </td>
                  <td>{skill.description}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(skill)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(skill.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Skills;
