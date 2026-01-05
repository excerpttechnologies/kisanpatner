'use client';

import React from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
const Webdesign = () => {
  return (
    <div>
      <Helmet>
        <title>
          Web Design & Development | E-commerce Solutions | Excerpt Technologies
        </title>
        <meta
          name="description"
          content="Discover top-tier Web Design and Development, along with cutting-edge E-commerce Solutions at Excerpt Technologies. Our expert team delivers customized, responsive websites and powerful online stores to enhance your digital footprint. Get in touch to transform your business today!"
        />
        <meta
          name="keywords"
          content="software solutions website, best website developers in bengaluru, best website developers for small business, ecommerce website developers, ecommerce website developers in bangalore, ecommerce website developers near me, website design & development services, website developers"
        />
      </Helmet>
      
      <section
        style={{
          backgroundImage: "url(/images/w01.webp)",
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
              Web Design & Development
            </h2>
            <h6 className="heading-6">
              <Link href="/">Home</Link> / <span>Web Design</span>
            </h6>
          </div>
        </div>
      </section>

      <div className="space120"></div>

      <section id="service-details" className="service-details">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-8 mb-40">
              <div className="img-wrapper mb-25 equal-image-wrapper" style={{ height: '400px' }}>
                <Image 
                  src="/images/web1.webp" 
                  className="img-fluid equal-image" 
                  alt="Web Design & Development"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h4 className="heading-4 mb-25">Web Design & Development</h4>

              <div className="paragraph mb-40">
                Web Design and Development involves creating and building visually appealing, functional websites tailored to meet business needs. Our expert team combines creativity with technical expertise to deliver responsive, user-friendly websites that enhance your online presence and drive business growth.
              </div>

              <div className="row g-4 mb-25">
                <div className="col-md-6">
                  <div className="img-wrapper equal-image-wrapper">
                    <Image
                      src="/images/web2.webp"
                      className="img-fluid equal-image"
                      alt="Web Design Features"
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
                      alt="Web Development Solutions"
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              
              <h4 className="heading-3 mb-25">Web Design & Development Services</h4>

              <ul
                className="paragraph mb-40"
                style={{ listStyleType: "disc", paddingLeft: "20px" }}
              >
                <li>Website Design – Visual layout</li>
                <li>Responsive Development – Mobile-friendly</li>
                <li>CMS Integration – Easy content management</li>
                <li>E-commerce Solutions – Online store setup</li>
                <li>SEO Optimization – Search visibility</li>
              </ul>

              <div className="service-divider"></div>
            </div>
            
            <div className="col-md-4">
              <div className="service">
                <h4 className="heading-3">Services</h4>

                <div className="underline"></div>

                <ul className="service-list">
                  <li className="active">
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

      <div className="space120"></div>
      
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

export default Webdesign;