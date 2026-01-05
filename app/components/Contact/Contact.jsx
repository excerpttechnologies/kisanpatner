'use client';

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import ReactGA from "react-ga4";
const Contact = () => {
  const [status, setStatus] = useState("Submit");

  const initialFormState = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    }),
    []
  );

  const [info, setInfo] = useState(initialFormState);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      ReactGA.event({
        category: "contact us",
        action: "Submit button click",
        value: 1,
      });

      // Set status to "Submitting..." immediately
      setStatus("Submitting...");

      try {
        let response = await fetch(`/api/contact`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(info),
        });
        
        let result = await response.json();
        
        if (response.ok && result.status === 'Message Sent') {
          // After successful submission
          setStatus("Submitted");
          setInfo(initialFormState);

          // Show popup
          setShowPopup(true);

          // Hide popup after 2.5 seconds and reset button
          setTimeout(() => {
            setShowPopup(false);
            setStatus("Submit"); // Reset button
          }, 2500);
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Reset status to "Submit" in case of error
        setStatus("Submit");
        alert("Failed to send message. Please try again.");
      }
    },
    [info, initialFormState]
  );

  const mapIframe = useMemo(
    () => (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5670664396944!2d77.69618407356857!3d12.999519314268583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11e5beced50b%3A0x6dfbb6145c02cc8b!2sExcerpt%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1705125132851!5m2!1sen!2sin"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    ),
    []
  );

  return (
    <main id="contact__us">

      {/* Banner Section */}
      <section
        style={{
          backgroundImage: "url(/images/contact-us-banner1.webp)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
        className="sub-header position-relative"
      >
        <div className="container">
          <div className="page-info">
            <h2
              className="heading-2"
              style={{ color: "white", textAlign: "center" }}
            >
              Contact Us
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <a href="#">Contact</a>
            </h6>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className="get-in-touch">
        <h2 className="get-in-touch-title1" style={{textAlign:'center'}}>Get In Touch</h2>
        <div className="get-in-touch-cards">
          {/* Address */}
          <div className="contact-card transition-all duration-150 ease-in-out hover:shadow-lg">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Address</h3>
            <p>
              B133/1, 2nd Floor, KSSIDC ITI Estate, Whitefield Main Rd, <br />
              Mahadevapura, Bengaluru, Karnataka 560048
            </p>
          </div>

          {/* Phone */}
          <div className="contact-card transition-all duration-150 ease-in-out hover:shadow-lg">
            <div className="contact-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Phone Number</h3>
            <p>
              <a href="tel:+916364657660">+91 63646 57660</a>
              <br />
              <a href="tel:+919900502404">+91 99005 02404</a>
            </p>
          </div>

          {/* Email */}
          <div className="contact-card transition-all duration-150 ease-in-out hover:shadow-lg">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Send us mail</h3>
            <p>
              <a href="mailto:info@excerptech.com">info@excerptech.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="container" style={{ padding: "40px 15px" }}>
        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <div className="contact__form" style={{ padding: "30px" }}>
              <div className="contact__form--header mb-20" style={{ textAlign: "left" }}>
                Have any Question On Mind!
              </div>
              <div className="contact__form--desc" style={{ textAlign: "left", marginBottom: "25px" }}>
                Your email address will not be published. Required fields are
                marked
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-4 mt-25">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={info.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={info.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-sm-6">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={info.phone}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow only digits
                        if (/^\d*$/.test(value)) {
                          // Restrict to 10 digits
                          if (value.length <= 10) {
                            handleChange(e); // update state normally
                          } else {
                            alert("⚠️ Phone number cannot exceed 10 digits");
                          }
                        }
                      }}
                      placeholder="+91"
                      maxLength="10"
                      required
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={info.subject}
                      onChange={handleChange}
                      placeholder="Your Subject"
                      required
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                <textarea
                  name="message"
                  id="message"
                  placeholder="Your Comment"
                  required
                  value={info.message}
                  onChange={handleChange}
                  style={{ width: "100%", marginTop: "16px" }}
                ></textarea>

                <button className="button-primary-1 mt-25 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg" style={{ width: "30%", marginTop: "20px" }}>
                  <span>{status}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5 mb-40">
            <div className="contact__map" style={{ height: "100%", minHeight: "400px" }}>{mapIframe}</div>
          </div>
        </div>
      </section>

      {/* Thank You Popup - using visibility to prevent layout shift */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          visibility: showPopup ? "visible" : "hidden",
          opacity: showPopup ? 1 : 0,
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          pointerEvents: showPopup ? "auto" : "none",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px 60px",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Thank You For Submitting
        </div>
      </div>
    </main>
  );
};

export default Contact;