import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentEditor = () => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  // Fetch content from the backend
  const fetchContent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/about.php");
      setContent(response.data.content || "");
    } catch (error) {
      setMessage("Failed to load content.");
    }
  };

  // Save content to the backend
  const saveContent = async () => {
    try {
      const response = await axios.post("http://localhost:8080/about.php", {
        content: content,
      });
      setMessage(response.data.message || "Content saved successfully.");
    } catch (error) {
      setMessage("Failed to save content.");
    }
  };

  // Fetch content on component mount
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1>Edit Content</h1>
      <textarea
        style={{ width: "100%", height: "200px", marginBottom: "10px" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={saveContent}
      >
        Save Changes
      </button>
      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
      )}
    </div>
  );
};

export default ContentEditor;
