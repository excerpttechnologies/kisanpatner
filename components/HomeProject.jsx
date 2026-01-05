'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Project() {
  const router = useRouter();

  return (
    <div style={{  }}>
      <div className="space90 "></div>
      <div
        style={{ backgroundImage: `url("/images/home1/exclusive-service/bg.webp)` }}
        className="ex-service-cards"
      >
        <div id="projects" className="home__projects">
          <div className="container">
            <div className="section-heading d-flex flex-column align-items-center justify-content-center">
              <h1 className="heading-2">
                Our Services
              </h1>
            </div>
          </div>

          {/* Row 1 */}
          <div className="container" style={{ marginTop: "20px", maxWidth: "1340px" }}>
            <div className="project-slider row">
              {/* Project Card 1 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Webdesign")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/images/home1/projects/2.webp" alt="Web Design & Development" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6" style={{ marginLeft: "70px" }}>
                      Web Design & Development
                    </h6>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Erp")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/service/erp21.webp" alt="ERP Solutions" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6">ERP</h6>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Ecommerce")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/images/home1/projects/e.jfif" alt="Ecommerce Solutions" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6">Ecommerce Solutions</h6>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Lms")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/service/lms.webp" alt="LMS Solutions" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6">LMS</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="container" style={{ maxWidth: "1340px" }}>
            <div className="project-slider row">
              {/* Project Card 5 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/DigitalMarketing")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/images/home1/projects/5.webp" alt="Digital Marketing" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6">Digital Marketing</h6>
                  </div>
                </div>
              </div>

              {/* Project Card 6 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Cybersecurity")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/images/home1/projects/4.webp" alt="Cyber Security" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6">Cyber Security</h6>
                  </div>
                </div>
              </div>

              {/* Project Card 7 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Dataanalytics")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/images/home1/projects/7.webp" alt="Data Analytics & Science" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6" style={{ marginLeft: "20px" }}>
                      Data Analytics & Science
                    </h6>
                  </div>
                </div>
              </div>

              {/* Project Card 8 */}
              <div className="col-lg-3 mb-4">
                <div
                  className="project-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg"
                  onClick={() => router.push("/Mobileapp")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <Image src="/images/home1/projects/3.webp" alt="Mobile App Development" width="400" height="300" loading="lazy" decoding="async" style={{ display: 'block' }} />
                  </div>
                  <div className="info d-flex flex-column align-items-center justify-content-center">
                    <h6 className="heading-6" style={{ marginLeft: "70px" }}>
                      Mobile App Development
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Project;
