'use client';

import React, { useState } from 'react';
import Image from 'next/image';
const Contact = () => {
  const [status, setStatus] = useState("Submit");
  const [showPopup, setShowPopup] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",

  });

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    setStatus("Sending...");

    let response = await fetch(`/api/contact`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        //'Content-Type': 'application/json',
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(info),
      //body: JSON.stringify(details),
    });
    //console.log(details);
    console.log(info);
    setStatus("Submit");
    setInfo({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Show popup after successful submission
    setShowPopup(true);

    // Hide popup after 2.5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);

    //let result = await response.json();
    //alert(result.status);
  };

  return (
    <div>
      {/* <div className="space120"></div> */}
      <div style={{ marginTop: "0px" }}></div>
      <section id="home__Page--technology" className="homeOne__technology">
        <div
          style={{ backgroundImage: `url("/images/home1/technology-expert-form/bg.webp)` }}
          className="technology_banner"
        ></div>


        <div className="container">
          <div
            style={{ backgroundImage: `url("/images/home1/technology-expert-form/bg2.webp)` }}
            className="contact_form"
          >
            {/* <div className="space120 "></div> */}
            <div className="row align-items-center">
              <div className="col-lg-12 col-xl-5">
                <div className="img_wrapper" style={{ textAlign: "center", marginBottom: "20px" }}>
                 
                  <Image
                    src="/images/home1/technology-expert-form/1.webp"
                    alt="Contact form illustration"
                    className="img-fluid"
                    width="500"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    style={{ display: 'block', aspectRatio: '500 / 600', margin: '0 auto', maxWidth: '100%' }}
                  />
                </div>
              </div>
              <div className="col-xl-7">
                <div className="heading-3 mb-20" style={{ textAlign: "left" }}>Contact Us...</div>
                <form onSubmit={handleSubmit}>
                  <div className="row homecon">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="name"
                        pattern="[a-zA-Z\s]+"
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
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        id="email"
                        value={info.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "16px" }}>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="phone"
                        pattern="\d{10}"
                        title="Please enter a valid phone number with an optional country code"
                        id="phone"
                        value={info.phone}
                        onChange={handleChange}
                        placeholder="91+"
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name='subject'
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
                    value={info.message} 
                    required
                    onChange={handleChange}
                    style={{ width: "100%", marginTop: "16px" }}
                  ></textarea>

                  <button className="button-primary-1 mt-25 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg" style={{ width: "100%", marginTop: "20px" }}>
                    <span>{status}</span>
                  </button>
                  <div className="space120"></div>
                </form>
              </div>
            </div>

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
    </div>
  );
}

export default Contact;