'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const GeekyChat = () => {
  return (
    <div>
      <Helmet>
        <title>
          GeekyChat - EXCERPT TECHNOLOGIES PRIVATE LIMITED
        </title>
        <meta
          name="description"
          content="Send WhatsApp bulk messages easily with GeekyChat by Excerpt Technologies. Our WhatsApp marketing tool helps businesses engage customers instantly, manage campaigns, and improve reach efficiently."
        />
        <meta
          name="keywords"
          content="whatsapp bulk messaging, whatsapp marketing tool, whatsapp automation software, geekychat app, bulk whatsapp sender, whatsapp campaign tool"
        />
      </Helmet>
      
      {/* Hero Section */}
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
              GeekyChat
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>GeekyChat</span>
            </h6>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section id="service-details" className="service-details">
        <div className="container">
          <div className="row g-4">
            {/* Left Content */}
            <div className="col-md-8 mb-40">
              <div className="img-wrapper mb-25 equal-image-wrapper" style={{ height: '400px' }}>
                <Image
                  src="/images/wa6.png"
                  className="img-fluid equal-image"
                  alt="GeekyChat WhatsApp Bulk Messaging"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">
                WhatsApp Bulk Messaging with GeekyChat
              </h4>

              <div className="paragraph mb-40">
                GeekyChat is a powerful WhatsApp bulk messaging tool that helps businesses send messages to multiple contacts simultaneously, improving marketing reach, customer engagement, and communication efficiency. It supports personalized messaging, scheduled campaigns, and analytics, making it easier to connect with customers and drive business growth.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/images/wa7.png"
                      className="img-fluid equal-image"
                      alt="Bulk Messaging Feature"
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
                      src="/portfolio/geeky3.webp"
                      className="img-fluid equal-image"
                      alt="GeekyChat Dashboard"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              
              <h4 className="heading-3 mb-25">Geeky Chat Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Analytics & Reporting – Campaign insights</li>
                <li>Contact Management – Organized lists</li>
                <li>Personalized Messages – Customized texts</li>
                <li>Message Scheduling – Timed campaigns</li>
                <li>Bulk Messaging – Mass communication</li>
              </ul>

              <div className="service-divider"></div>
            </div>

            {/* Right Sidebar */}
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li className="active">
                    <Link href="/Geekychat">
                      <div className="d-flex justify-content-between item">
                        <span>GeekyChat</span>
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
                    <Link href="/Mobileapp">
                      <div className="d-flex justify-content-between item">
                        <span>MobileApplication</span>
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
                </ul>
              </div>
              <div className="squre-banner">
                <h2 className="heading-3">Boost Customer Engagement with GeekyChat</h2>
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

      <div className="space120"></div>
    </div>
  );
};

export default GeekyChat;