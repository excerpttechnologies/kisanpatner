'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";

const DigitalMarketing = () => {
  return (
    <div>
      <Helmet>
        <title>
          Digital Marketing - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider
        </title>
        <meta
          name="description"
          content="Excerpt Technologies Private Limited provides expert Digital Marketing services to enhance your online presence, drive traffic, and boost conversions through tailored strategies."
        />
      </Helmet>
      
      <section
        style={{
          backgroundImage: "url(/images/dm01.webp)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
        className="sub-header position-relative"
      >
        <div className="container">
          <div className="page-info">
            <h2 className="heading-2" style={{color:'white',textAlign:'center'}}>Digital Marketing</h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>Digital Marketing</span>
            </h6>
          </div>
        </div>
      </section>

      <section id="service-details" className="service-details">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-8 mb-40">
              <div className="img-wrapper mb-25 equal-image-wrapper" style={{ height: '400px' }}>
                <img 
                  src="/images/dg.webp" 
                  className="img-fluid equal-image" 
                  alt="Digital Marketing Solutions"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">Digital Marketing Solutions</h4>

              <div className="paragraph mb-40">
                Digital Marketing helps businesses connect with the right audience online, boost visibility, and drive sales through targeted strategies. It&#39;s
 the art of promoting brands online using SEO, social media, ads, and more to grow faster in the digital world.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <img
                      src="/images/dg2.webp"
                      className="img-fluid equal-image"
                      alt="Digital Marketing Services"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <img 
                      src="/images/dg3.webp" 
                      className="img-fluid equal-image" 
                      alt="Marketing Strategies"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">Digital Marketing Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Google Ads – Paid search campaigns</li>
                <li>Meta Ads – Social media ads</li>
                <li>SEO – Organic traffic growth</li>
                <li>WhatsApp Bulk Messaging – Instant mass outreach</li>
                <li>Social Media Marketing – Brand engagement online</li>
                <li>WhatsApp E-commerce – Chat-based selling</li>
                <li>Website Development – Custom site design</li>
              </ul>

              <div className="service-divider"></div>
            </div>
            
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li className="active">
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

export default DigitalMarketing;