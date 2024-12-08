import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
const Contact = () => {
  const form = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [address, setAddress] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Fetch contact details from the backend (contact.txt)
  const fetchContent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/contact.php");
      const data = response.data;
      setAddress(data.address || "");
      setDisplayEmail(data.email || "");
      setPhone(data.phone || "");
    } catch (error) {
      setError("Failed to load content.");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const clearInput = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: displayEmail,
      from_name: name,
      from_email: email,
      message: message,
      subject: subject,
    };

    emailjs
      .send(
        "service_3rpfdxz",
        "template_921w08y",
        templateParams,
        "GinUa7A0aJAknxp5M"
      )
      .then(
        () => {
          alert("Email Submitted");
          clearInput();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="contact_area section_gap" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="contact_info">
              <div className="info_item">
                <i className="lnr lnr-home"></i>
                <h6>Address</h6>
                <p>{address}</p>
              </div>
              <div className="info_item">
                <i className="lnr lnr-phone-handset"></i>
                <h6>Contact No</h6>
                <p>{phone}</p>
              </div>
              <div className="info_item">
                <i className="lnr lnr-envelope"></i>
                <h6>Email</h6>
                <p>{displayEmail}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <form
              className="row contact_form"
              ref={form}
              onSubmit={handleSubmit}
            >
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="user_email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.currentTarget.value)}
                    placeholder="Enter Subject"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows="1"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    placeholder="Enter Message"
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 text-right">
                <button type="submit" value="submit" className="primary_btn">
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
