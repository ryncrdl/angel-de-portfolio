import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    key_features: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch portfolio items
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Image is required.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("key_features", formData.key_features);

    // Only append the image if it is new
    let image = formData.image;
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (isEditing) {
        // Perform the PUT request with the form data and include the id
        const response = await axios.put(
          `http://localhost:8080/portfolio.php?id=${formData.id}`, // Pass id in query
          JSON.stringify({
            id: formData.id,
            title: formData.title,
            description: formData.description,
            key_features: formData.key_features,
            // Send the old image path if no new image is selected
            image: image
              ? `uploads/${formData.image.name}`
              : portfolio.find((item) => item.id === formData.id).image,
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // Perform POST request for adding a new portfolio item
        await axios.post("http://localhost:8080/portfolio.php", form);
      }

      fetchPortfolio();
      setFormData({
        id: null,
        title: "",
        description: "",
        key_features: "",
        image: null,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/portfolio.php?id=${id}`
      );
      console.log("Item deleted:", response.data);
      fetchPortfolio(); // Refresh the portfolio list after deletion
    } catch (error) {
      console.error(
        "Error deleting item",
        error.response?.data || error.message
      );
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      key_features: "",
      image: null,
    });
    setIsEditing(false);
  };

  return (
    <div className="portfolio">
      <h1>My Portfolio</h1>
      <form onSubmit={handleSubmit} className="portfolio-form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Key Features"
          value={formData.key_features}
          onChange={(e) =>
            setFormData({ ...formData, key_features: e.target.value })
          }
          required
        />

        <input
          type="file"
          style={{ visibility: isEditing ? "hidden" : "visible" }}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        <button type="submit">{isEditing ? "Update" : "Add"}</button>
        {isEditing && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Key Features</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => (
            <tr key={item.id}>
              <td>
                {item.image && (
                  <img
                    src={`http://localhost:8080/${item.image}`}
                    alt={item.title}
                  />
                )}
              </td>
              <td style={{ color: "#000" }}>{item.title}</td>
              <td style={{ color: "#000" }}>{item.description}</td>
              <td style={{ color: "#000" }}>{item.key_features}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
