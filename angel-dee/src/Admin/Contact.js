import React, { useState, useEffect } from "react";
import axios from "axios";

const Contact = () => {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch contact details from the backend (contact.txt)
  const fetchContent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/contact.php");
      const data = response.data;
      setAddress(data.address || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    } catch (error) {
      setError("Failed to load content.");
    }
  };

  // Save the updated contact details
  const saveContent = async () => {
    if (!address || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/contact.php", {
        address: address,
        email: email,
        phone: phone,
      });
      setMessage(response.data.message || "Content saved successfully.");
      setError("");
    } catch (error) {
      setMessage("");
      setError("Failed to save content.");
    }
  };

  // Fetch content when the component mounts
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="contact-container">
      <h1>Contact Information</h1>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone"
        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>
      <button onClick={saveContent}>Save Changes</button>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Contact;
