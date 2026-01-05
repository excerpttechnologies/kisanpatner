'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const DynamicWebsites = () => {
  return (
    <div>
      <Helmet>
        <title>Dynamic Websites - EXCERPT TECHNOLOGIES PRIVATE LIMITED</title>
        <meta
          name="description"
          content="Explore our dynamic website solutions for a more interactive online presence."
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
              Dynamic Websites
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>Dynamic Websites</span>
            </h6>
          </div>
        </div>
      </section>

      <section id="service-details" className="service-details">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-8 mb-10">
              <div className="img-wrapper mb-25 equal-image-wrapper" style={{ height: '400px' }}>
                <Image
                  src="/images/Dynamic-Website.png"
                  className="img-fluid equal-image"
                  alt="Dynamic Websites"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">Dynamic Websites</h4>

              <div className="paragraph mb-40">
                A Dynamic Website is an interactive website where content changes based on user interactions or real-time data. Unlike static websites, it allows for features like user logins, forms, e-commerce functionality, and personalized content, providing a more engaging and responsive experience for visitors. Dynamic websites are ideal for businesses that require frequent updates and interactive features.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/portfolio/car.png"
                      className="img-fluid equal-image"
                      alt="Dynamic Example"
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
                      src="/portfolio/jbk.webp"
                      className="img-fluid equal-image"
                      alt="Dynamic Example"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <h4 className="heading-3 mb-25">Dynamic Website Services</h4>

              <ul className="paragraph mb-40" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Maintenance & Support – Updates & fixes</li>
                <li>Interactive Features – Forms & login</li>
                <li>Database Integration – Data storage</li>
                <li>Content Management – Update content</li>
                <li>Website Design – Visual layout</li>
              </ul>

              <div className="service-divider"></div>
            </div>
            
            <div className="d-md-block col-md-4">
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
                        <span>MobileApplication</span>
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
                        <span>DigitalMarketing</span>
                        <div className="icon">
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="active">
                    <Link href="/Dyanamicwebsite">
                      <div className="d-flex justify-content-between item">
                        <span>Dynamic Websites</span>
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
        
        /* First image wrapper special height */
        .img-wrapper.mb-25.equal-image-wrapper:first-child {
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default DynamicWebsites;