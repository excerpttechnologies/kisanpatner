'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const Elearning = () => {
  return (
    <div>
      <Helmet>
        <title>E-Learning Solutions - EXCERPT TECHNOLOGIES PRIVATE LIMITED</title>
        <meta
          name="description"
          content="Explore our E-Learning solutions to enhance your educational offerings."
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
              E-Learning Solutions
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>E-Learning</span>
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
                  src="/service/el12.webp" 
                  className="img-fluid equal-image" 
                  alt="E-Learning Solutions"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">E-Learning</h4>

              <div className="paragraph mb-40">
                An E-Learning Website is a digital platform designed to deliver educational content and online courses to learners anywhere, anytime. It includes interactive lessons, multimedia content, quizzes, and progress tracking, helping institutions and businesses provide engaging learning experiences and monitor performance effectively. Such platforms enhance knowledge retention and streamline online education.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/service/el11.webp"
                      className="img-fluid equal-image"
                      alt="E-Learning Features"
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
                      src="/service/el13.webp"
                      className="img-fluid equal-image"
                      alt="E-Learning Platform"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">E-Learning Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Website Design – Visual layout</li>
                <li>Analytics & Reporting – Progress insights</li>
                <li>Assessment Tools – Quizzes & tests</li>
                <li>User Management – Learner tracking</li>
                <li>Course Integration – Online lessons</li>
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
                  <li>
                    <Link href="/Seo">
                      <div className="d-flex justify-content-between item">
                        <span>SEO Analytics</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="active">
                    <Link href="/Elearning">
                      <div className="d-flex justify-content-between item">
                        <span>E-Learning</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="squre-banner">
                <h2 className="heading-3">
                  Learn anywhere, anytime with our E-Learning solutions
                </h2>
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

export default Elearning;