// 'use client';

// import React, { useState } from 'react';

// const Contact = () => {
//   const [status, setStatus] = useState("Submit");
//   const [showPopup, setShowPopup] = useState(false);

//   const [info, setInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",

//   });

//   const handleChange = (event) => {
//     setInfo({
//       ...info,
//       [event.target.name]: event.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(info);
//     setStatus("Sending...");

//     let response = await fetch(`/api/contact`, {
//       method: "POST",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         Accept: "application/json",
//         //'Content-Type': 'application/json',
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(info),
//       //body: JSON.stringify(details),
//     });
//     //console.log(details);
//     console.log(info);
//     setStatus("Submit");
//     setInfo({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     });

//     // Show popup after successful submission
//     setShowPopup(true);

//     // Hide popup after 2.5 seconds
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 2500);

//     let result = await response.json();
//     //alert(result.status);
//   };

//   return (
//     <div>
//       {/* <div className="space120"></div> */}
//       <div style={{ marginTop: "0px" }}></div>
//       <section id="home__Page--technology" className="homeOne__technology">
//         <div
//           style={{ backgroundImage: `url("/images/home1/technology-expert-form/bg.webp)` }}
//           className="technology_banner"
//         ></div>


//         <div className="container">
//           <div
//             style={{ backgroundImage: `url("/images/home1/technology-expert-form/bg2.webp)` }}
//             className="contact_form"
//           >
//             {/* <div className="space120 "></div> */}
//             <div className="row align-items-center">
//               <div className="col-lg-12 col-xl-5">
//                 <div className="img_wrapper" style={{ textAlign: "center", marginBottom: "20px" }}>
                 
//                   <img
//                     src="/images/home1/technology-expert-form/1.webp"
//                     alt="Contact form illustration"
//                     className="img-fluid"
//                     width="500"
//                     height="600"
//                     loading="lazy"
//                     decoding="async"
//                     style={{ display: 'block', aspectRatio: '500 / 600', margin: '0 auto', maxWidth: '100%' }}
//                   />
//                 </div>
//               </div>
//               <div className="col-xl-7">
//                 <div className="heading-3 mb-20" style={{ textAlign: "left" }}>Contact Us...</div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row homecon">
//                     <div className="col-sm-6">
//                       <input
//                         type="text"
//                         name="name"
//                         pattern="[a-zA-Z\s]+"
//                         id="name"
//                         value={info.name}
//                         onChange={handleChange}
//                         placeholder="Your Name"
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     <div className="col-sm-6">
//                       <input
//                         type="email"
//                         name="email"
//                         pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
//                         id="email"
//                         value={info.email}
//                         onChange={handleChange}
//                         placeholder="Email Address"
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>
//                   <div className="row" style={{ marginTop: "16px" }}>
//                     <div className="col-sm-6">
//                       <input
//                         type="text"
//                         name="phone"
//                         pattern="\d{10}"
//                         title="Please enter a valid phone number with an optional country code"
//                         id="phone"
//                         value={info.phone}
//                         onChange={handleChange}
//                         placeholder="91+"
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                     <div className="col-sm-6">
//                       <input
//                         type="text"
//                         name='subject'
//                         id="subject"
//                         value={info.subject}
//                         onChange={handleChange}
//                         placeholder="Your Subject"
//                         required
//                         style={{ width: "100%" }}
//                       />
//                     </div>
//                   </div>

//                   <textarea 
//                     name="message" 
//                     id="message" 
//                     placeholder="Your Comment" 
//                     value={info.message} 
//                     required
//                     onChange={handleChange}
//                     style={{ width: "100%", marginTop: "16px" }}
//                   ></textarea>

//                   <button className="button-primary-1 mt-25 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg" style={{ width: "30%", marginTop: "20px" }}>
//                     <span>{status}</span>
//                   </button>
//                   <div className="space120"></div>
//                 </form>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Thank You Popup - using visibility to prevent layout shift */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.6)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 9999,
//           visibility: showPopup ? "visible" : "hidden",
//           opacity: showPopup ? 1 : 0,
//           transition: "opacity 0.3s ease, visibility 0.3s ease",
//           pointerEvents: showPopup ? "auto" : "none",
//         }}
//       >
//         <div
//           style={{
//             background: "#fff",
//             padding: "40px 60px",
//             borderRadius: "10px",
//             textAlign: "center",
//             fontSize: "20px",
//             fontWeight: "600",
//             color: "#333",
//           }}
//         >
//           Thank You For Submitting
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;

















'use client';

import React, { useState } from 'react';

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

    try {
      let response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(info),
      });
      
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

      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Submit");
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div>
      <div style={{ marginTop: "0px" }}></div>
      
      <section id="home__Page--technology" className="homeOne__technology">
        {/* Technology Banner */}
        <div
          className="technology_banner"
          style={{ 
            backgroundImage: "url('/images/home1/technology-expert-form/bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            
            width: '100%'
          }}
        ></div>

        <div style={{width:"70%"}} className="container mt-5">
          <div
            className="contact_form"
            style={{ 
              backgroundImage: "url('/images/home1/technology-expert-form/bg2.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '570px',
              borderRadius: '10px',
              padding: '30px',
              marginTop: '-50px',
              position: 'relative',
              zIndex: 1,
              width:"auto"
            }}
          >
            <div className="space120"></div>
            
            <div className="row align-items-center d-flex justify-content-center gap-3">
              {/* Image Section */}
              <div className="col-lg-5 col-xl-5 p-0">
                <div className="img_wrapper" style={{ textAlign: "center", marginBottom: "20px" }}>
                  <img
                    src="/images/home1/technology-expert-form/1.webp"
                    alt="Contact form illustration"
                    className="img-fluid"
                    width="500"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    style={{ 
                      display: 'block', 
                      aspectRatio: '500 / 600', 
                      margin: '0 auto', 
                      maxWidth: '100%',
                      borderRadius: '10px',
                      marginTop:"-14rem",
                     
                    }}
                  />
                </div>
              </div>
              
              {/* Form Section */}
              <div className="col-lg-7 col-xl-6">
                <div className="heading-3 mb-4" style={{ 
                  textAlign: "left", 
                  fontSize: "2rem",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "30px"
                }}>
                  Contact Us...
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="row homecon mb-3">
                    <div className="col-sm-6 mb-3">
                      <input
                        type="text"
                        name="name"
                        pattern="[a-zA-Z\s]+"
                        id="name"
                        value={info.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="form-input"
                        style={{ 
                          width: "100%",
                          padding: "12px 15px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        id="email"
                        value={info.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="form-input"
                        style={{ 
                          width: "100%",
                          padding: "12px 15px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-sm-6 mb-3">
                      <input
                        type="text"
                        name="phone"
                        pattern="\d{10}"
                        title="Please enter a valid phone number with an optional country code"
                        id="phone"
                        value={info.phone}
                        onChange={handleChange}
                        placeholder="Phone Number (10 digits)"
                        required
                        className="form-input"
                        style={{ 
                          width: "100%",
                          padding: "12px 15px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <input
                        type="text"
                        name='subject'
                        id="subject"
                        value={info.subject}
                        onChange={handleChange}
                        placeholder="Your Subject"
                        required
                        className="form-input"
                        style={{ 
                          width: "100%",
                          padding: "12px 15px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                  </div>

                  <textarea 
                    name="message" 
                    id="message" 
                    placeholder="Your Message" 
                    value={info.message} 
                    required
                    onChange={handleChange}
                    className="form-input"
                    rows="5"
                    style={{ 
                      width: "100%", 
                      padding: "12px 15px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      resize: "vertical"
                    }}
                  ></textarea>

                  <button className="button-primary-1  mt-25 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg" style={{ width: "40%", marginTop: "20px" }}>
                    <span>{status}</span>
                  </button>
                </form>
              </div>
            </div>
            
            <div className="space120"></div>
          </div>
        </div>
      </section>

      {/* Thank You Popup */}
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
            fontSize: "24px",
            fontWeight: "600",
            color: "#333",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            animation: showPopup ? "popupAnimation 0.5s ease" : "none"
          }}
        >
          Thank You For Submitting!
        </div>
      </div>

      <style jsx>{`
        @keyframes popupAnimation {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        
        .form-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }
        
        .space120 {
          height: 30px;
        }
        
        @media (max-width: 768px) {
          .col-lg-5, .col-lg-7 {
            width: 100%;
          }
          
          .technology_banner {
            height: 200px !important;
          }
          
          .contact_form {
            margin-top: 0 !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;





