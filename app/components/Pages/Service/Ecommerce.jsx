'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";

const Ecommerce = () => {
  return (
    <div>
      <Helmet>
        <title>
          E-commerce - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider
        </title>
        <meta
          name="description"
          content="Excerpt Technologies Private Limited offers comprehensive E-commerce solutions to help businesses establish a strong online presence and drive sales."
        />
      </Helmet>
      
      <section
        style={{
          backgroundImage: "url(/images/e01.webp)",
          backgroundColor: "rgb(255, 255, 255)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="sub-header position-relative"
      >
        <div className="container">
          <div className="page-info">
            <h2 className="heading-2" style={{ color: "white", textAlign: "center" }}>E-commerce</h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>Ecommerce</span>
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
                  src="/images/ecommerce1.webp" 
                  className="img-fluid equal-image" 
                  alt="E-commerce Solutions"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">E-Commerce solutions.</h4>

              <div className="paragraph mb-40">
                An E-Commerce Website is an online platform that allows businesses to sell products or services directly to customers over the internet. It includes product catalogs, shopping carts, secure payment gateways, and order management, providing a convenient and seamless shopping experience. E-commerce websites help businesses expand their reach, boost sales, and manage operations efficiently.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <img
                      src="/images/ecommerce2.webp"
                      className="img-fluid equal-image"
                      alt="E-commerce Features"
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
                      src="/images/ecommerce3.webp"
                      className="img-fluid equal-image"
                      alt="E-commerce Platform"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">E- Commerce Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Website Design – Visual layout</li>
                <li>Product Catalog – Item listing</li>
                <li>Payment Gateway – Secure checkout</li>
                <li>Order Management – Track purchases</li>
                <li>SEO & Marketing – Online visibility</li>
              </ul>

              <div className="service-divider"></div>
            </div>
            
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li className="active">
                    <Link href="/Ecommerce">
                      <div className="d-flex justify-content-between item">
                        <span>E-Commerce</span>
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

export default Ecommerce;