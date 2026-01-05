'use client';

import Link from "next/link";
import React from "react";
const Footer1 = () => {

  const whiteLogo = "/image/excerptwww.png";
  const blackLogo = "/image/excerptbbb.png";
  return (
    <div id="footer ">
      <section
        style={{ backgroundImage: `url("/images/footer/bg.webp), linear-gradient(0deg, #03041c, #03041c)` }}
        id="footer"
      >
        <div className="footer-body" style={{backgroundColor:"black",padding:"40px"}}>
          <div className="container responsive_ele">
            <div  className="row dis g-3 d-flex justify-content-center align-items-center vh-100">
              <div style={{backgroundColor:"white"}} className="col-md-6 col-12 col-xl-3 p-0">
                <div className="about-company" style={{ marginTop: "10px", height: "fit-content"}}>
                  {/* Blue box with white text logo - matching second screenshot */}
                  <div className="logo-wrapper" style={{ 
                    height: "max-content", 
                    minHeight: "100px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                   
                  }}>
                    <Link href="/" style={{ 
                      height: "max-content", 
                      display: "block",
                      width: '100%',
                      textDecoration: 'none'
                    }}>
                      <div style={{
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: '700',
                        fontFamily: 'Verdana, sans-serif',
                        marginBottom: '8px',
                        lineHeight: '1.2'
                      }}>
                      <img
                    className={`logo-img `}
                    src={whiteLogo}
                    width={150}
                    height={50}
                    style={{
                      height: '70px', /* Always max height */
                      width: '160px', /* Always max width */
                      objectFit: 'contain',
                      display: 'block',
                      transformOrigin: 'left center',
                      transition: 'transform 0.3s ease',
                      marginLeft:"2rem"
                    }}
                    alt="logo"
                  />
                      </div>
                      {/* <div style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Verdana, sans-serif',
                        lineHeight: '1.4'
                      }}>
                        Software • Consulting • Staffing • Training
                      </div> */}
                    </Link>
                  </div>

                  <div className="content">
                    <h2 className="heading-3"></h2>

                    <div className="paragraph" style={{ marginTop: '20px' }}>
                      <b style={{ color: "white", fontSize: "16px", textTransform: "uppercase" }}>EXCERPT TECHNOLOGIES PRIVATE LIMITED</b>
                      <br />
                      <span style={{ color: "#999", fontSize: "14px", lineHeight: "1.6" }}>IS A LEADING IT SOLUTIONS AND SERVICES COMPANY ESTABLISHED WITH A SPECIFIC MISSION OF PROVIDING COMPREHENSIVE, TOP OF THE LINE SOLUTIONS.</span>
                    </div>

                    <div className="socials" style={{padding:"10px",marginTop:"10px"}}>
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/Excerptech" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/company/excerptech" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3">
                <div className="wrapper responsive_ey">
                  <h4 className="heading-4">Quick Links</h4>
                  <ul>
                    <br />
                    <li>
                      <a href="/Staticwebsite">Web Design & Development</a>
                    </li>
                   
                    <li>
                      <a href="/Erp">ERP</a>
                    </li>
                  
                    <li>
                      <a href="/Lms">LMS</a>
                    </li>
                   
                    <li>
                      <a href="/Ecommerce">Ecommerce Solutions</a>
                    </li>
                  
                    <li>
                      <a href="/Cybersecurity">Cyber Security</a>
                    </li>
                   
                    <li>
                      <a href="/DigitalMarketing">Digital Marketing</a>
                    </li>
                    
                    <li>
                      <a href="/Privacy">Privacy</a>
                    </li>
                    <br />
                  </ul>
                </div>
              </div>

              <div className="col-md-6 col-xl-3" style={{ marginLeft: "" }}>
                <div className="wrapper" style={{ marginRight: "-10px" }}>
                  <h4 className="heading-4">Contact Us</h4>

                  {/* Phone */}
                  <div className="d-flex contact">
                    <div
                      className="icon-wrapper"
                      onClick={() => window.location.href = "tel:+916364657660"}
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <i className="fa-solid fa-phone"></i>
                      </span>
                    </div>

                    <div className="info">
                      <div className="paragraph">
                        <a href="tel:+916364657660" className="contact-link">+91 63646 57660</a>
                      </div>
                      <div className="paragraph">
                        <a href="tel:+919900502404" className="contact-link">+91 99005 02404</a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="d-flex contact">
                    <div
                      className="icon-wrapper"
                      onClick={() => window.location.href = "mailto:info@excerptech.com"}
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                    </div>

                    <div className="info">
                      <div style={{ marginTop: "10px" }}>
                        <a href="mailto:info@excerptech.com" className="paragraph contact-link">
                          info@excerptech.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="d-flex contact">
                    <div
                      className="icon-wrapper"
                      onClick={() =>
                        window.open(
                          "https://maps.app.goo.gl/pF2qHmpSfrtVySP3A",
                          "_blank"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <i className="fa-solid fa-location-dot"></i>
                      </span>
                    </div>

                    <div className="info">
                      <div className="paragraph">
                        2nd Floor, B133/1, KSSIDC <br />
                        ITI Estate, Whitefield Road,<br />
                        Mahadevpura Post Bangalore, <br />
                        Karnataka-560048
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="divider"></div>

            <div className="footer-bottom">
              <div className="d-flex justify-content-center justify-content-md-between align-items-center">
                <div className="paragraph "  style={{ marginLeft:"150px"}}>
                  <span style={{ textAlign: "center" ,color:"white" }}>© Excerpt Technologies 2025</span>
                  <span style={{ marginLeft: '5px' ,color:"white"}}>All Rights Reserved.</span>
                </div>
                <div className="infos">
                  <ul className="d-none d-md-flex">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer1;
