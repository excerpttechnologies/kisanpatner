'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const Mobileapp = () => {
  return (
    <div>
      <Helmet>
        <title>
          Mobile Application Development - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider
        </title>
        <meta
          name="description"
          content="Excerpt Technologies Private Limited offers expert Mobile Application Development services, creating custom iOS and Android apps that prioritize performance, usability, and innovation."
        />
      </Helmet>
      
      <section
        style={{
          backgroundImage: "url(/images/m01.webp)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
        className="sub-header position-relative"
      >
        <div className="container">
          <div className="page-info">
            <h2 className="heading-2" style={{color:'white',textAlign:'center'}}>Mobile Application</h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>Mobile Application</span>
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
                  src="/images/mb2.png" 
                  className="img-fluid equal-image" 
                  alt="Mobile Application Development"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">Mobile Application Development</h4>

              <div className="paragraph mb-40">
                We excel in crafting custom mobile apps for iOS and Android,
                prioritizing performance, usability, and innovation. Our
                experienced team ensures your app meets business needs while
                delivering exceptional user experiences, from concept to
                deployment.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/images/mb1.webp"
                      className="img-fluid equal-image"
                      alt="Mobile App Features"
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
                      src="/images/mb3.webp" 
                      className="img-fluid equal-image" 
                      alt="Mobile App Solutions"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">Manage designing Solutions</h4>

              <div className="paragraph mb-40">
                Collaborating closely with you, our team crafts
                intuitive interfaces and engaging experiences. We prioritize
                user-centric designs, ensuring functionality and aesthetics
                seamlessly merge for your app success.
              </div>

              <div className="service-divider"></div>
            </div>
            
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li className="active">
                    <Link href="/Mobileapp">
                      <div className="d-flex justify-content-between item">
                        <span>Mobile Application Development</span>
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
                    <Link href="/Cybersecurity">
                      <div className="d-flex justify-content-between item">
                        <span>CyberSecurity</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/DigitalMarketing">
                      <div className="d-flex justify-content-between item">
                        <span>DigitalMarketing</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Seo">
                      <div className="d-flex justify-content-between item">
                        <span>SEOAnalytics</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Dataanalytics">
                      <div className="d-flex justify-content-between item">
                        <span>DataAnalytics</span>
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

export default Mobileapp;