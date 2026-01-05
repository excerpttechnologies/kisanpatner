'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const Uiux = () => {
  return (
    <div>
      <Helmet>
        <title>
          UI/UX Design - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider
        </title>
        <meta
          name="description"
          content="Excerpt Technologies Private Limited specializes in UI/UX design, creating user-centered interfaces that enhance user experience and engagement."
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
            <h2 className="heading-2" style={{ color: 'white', textAlign: 'center' }}>UI UX</h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>UIUX</span>
            </h6>
          </div>
        </div>
      </section>

      <section id="service-details" className="service-details">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-8 mb-40">
              <div className="img-wrapper mb-25 equal-image-wrapper" style={{ height: '500px' }}>
                <Image 
                  src="/images/w01.webp" 
                  className="img-fluid equal-image" 
                  alt="UI/UX Design" 
                  width={800} 
                  height={500} 
                  loading="lazy" 
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">UI/UX Design</h4>

              <div className="paragraph mb-40">
                UI/UX Design focuses on creating user-centered interfaces that enhance user experience and engagement. We combine aesthetics with functionality to design intuitive, visually appealing digital products that meet user needs and business goals.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/images/web2.webp"
                      className="img-fluid equal-image"
                      alt="UI/UX Design Features"
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
                      src="/images/web3.webp" 
                      className="img-fluid equal-image" 
                      alt="UI/UX Design Solutions"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">UI/UX Design Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>User Research – Understand user needs</li>
                <li>Wireframing & Prototyping – Design concepts</li>
                <li>Visual Design – Aesthetic interfaces</li>
                <li>User Testing – Experience validation</li>
                <li>Design Systems – Consistent patterns</li>
              </ul>

              <div className="service-divider"></div>
            </div>
            
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li className="active">
                    <Link href="/Uiux">
                      <div className="d-flex justify-content-between item">
                        <span>UI/UX Design</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
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

export default Uiux;