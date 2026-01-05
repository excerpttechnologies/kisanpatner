'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const LmsSystems = () => {
  return (
    <div>
      <Helmet>
        <title>LMS Solutions - EXCERPT TECHNOLOGIES PRIVATE LIMITED</title>
        <meta
          name="description"
          content="Explore our LMS solutions to enhance your training and educational programs."
        />
      </Helmet>
      
      <section
        style={{
          backgroundImage: "url(/images/banners1se1.webp)",
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
              LMS Solutions
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>LMS</span>
            </h6>
          </div>
        </div>
      </section>

      <section id="service-details" className="service-details">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-8 mb-40">
              <div className="img-wrapper mb-25 equal-image-wrapper" style={{ height: '400px' }}>
                <Image 
                  src="/service/lms11.png" 
                  className="img-fluid equal-image" 
                  alt="LMS Solutions"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">Learning Management System (LMS)</h4>

              <div className="paragraph mb-40">
                A Learning Management System (LMS) is a digital platform that delivers, tracks, and manages educational or training programs online. It allows organizations to create courses, monitor learner progress, and assess performance efficiently. LMS systems enhance learning experiences, improve knowledge retention, and streamline training processes for employees, students, or customers.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/service/lms12.webp"
                      className="img-fluid equal-image"
                      alt="LMS Features"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image 
                      src="/service/lms13.webp" 
                      className="img-fluid equal-image" 
                      alt="LMS Platform"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">LMS Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Course Creation – Content development</li>
                <li>User Management – Learner tracking</li>
                <li>Assessments & Tests – Performance evaluation</li>
                <li>Reporting & Analytics – Progress insights</li>
                <li>Integration & Support – System setup</li>
              </ul>

              <div className="service-divider"></div>
            </div>
            
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li>
                    <Link href="/Webdesign">
                      <div className="d-flex justify-content-between item">
                        <span>Web Design and Development</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Mobileapp">
                      <div className="d-flex justify-content-between item">
                        <span>Mobile Application</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Ecommerce">
                      <div className="d-flex justify-content-between item">
                        <span>Ecommerce</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/DigitalMarketing">
                      <div className="d-flex justify-content-between item">
                        <span>Digital Marketing</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="active">
                    <Link href="/Lms">
                      <div className="d-flex justify-content-between item">
                        <span>LMS Solutions</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="squre-banner">
                <h2 className="heading-3">Easy solutions to your tech problem</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        /* Equal Image Wrapper Styles */
        .equal-image-wrapper {
          width: 100%;
          height: 300px;
          overflow: hidden;
          border-radius: 8px;
          position: relative;
        }
        
        .equal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        
        .equal-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default LmsSystems;