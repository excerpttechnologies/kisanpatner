'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const CrmSystems = () => {
  return (
    <div>
      <Helmet>
        <title>CRM Systems - EXCERPT TECHNOLOGIES PRIVATE LIMITED</title>
        <meta
          name="description"
          content="Discover our CRM systems to enhance customer relationships and drive business growth."
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
              CRM Systems
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>CRM Systems</span>
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
                  src="/service/crm12.webp" 
                  className="img-fluid equal-image" 
                  alt="CRM Systems"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">CRM Systems</h4>

              <div className="paragraph mb-40">
                A CRM (Customer Relationship Management) system is a software platform that helps businesses manage and analyze interactions with current and potential customers. It centralizes customer information, tracks sales, marketing campaigns, and support activities, and helps improve customer relationships, retention, and business growth.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/service/crm11.webp"
                      className="img-fluid equal-image"
                      alt="CRM Features"
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
                      src="/service/crm13.webp" 
                      className="img-fluid equal-image" 
                      alt="CRM Solutions"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">CRM Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Contact Management: Store and organize customer data.</li>
                <li>Sales Tracking: Monitor leads, deals, and sales pipeline.</li>
                <li>Marketing Automation: Run campaigns and track responses.</li>
                <li>Customer Support: Manage tickets and service requests.</li>
                <li>Analytics & Reporting: Gain insights to improve decisions.</li>
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
                    <Link href="/Crm">
                      <div className="d-flex justify-content-between item">
                        <span>CRM Systems</span>
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

export default CrmSystems;