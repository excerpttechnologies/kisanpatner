// import React from "react";

// function Homeabout() {
//   const style = {};
//   return (
//     <div className="responsive_aboutus" style={{ marginBottom: "15px" }}>
//       <section className="about-area pb-150s tp-el-section">
//         <div className="container" style={{ maxWidth: "1440px" }}>
//           <div className="row align-items-end">
//             <div className="col-xl-6 col-lg-5" style={{ display: "flex", alignItems: "center" }}>
//               {/* CLS FIX: Removed WOW.js animations to prevent layout shifts */}
//               <div
//                 className="tp-about-thumb"
//                 style={{ width: "100%" }}
//               >
//                 <div className="tp-about-thumb-main overlay-anim w-img tp-thumb-common fix">
//                   <div className="tp-thumb-common-overlay wow"></div>
//                   <Image
//                     decoding="async"
//                     loading="lazy"
//                     src="/images/111.webp"
//                     width="400"
//                     height="500"
//                     alt=""
//                     style={{ display: "block", aspectRatio: "400 / 500" }}
//                   />
//                 </div>
//                 <div className="tp-about-thumb-shape">
//                   <div className="tp-about-thumb-shape-one">
//                     <div className="about-image-1 overlay-anim tp-thumb-common fix">
//                       <div className="tp-thumb-common-overlay wow"></div>
//                       <Image
//                         decoding="async"
//                         loading="lazy"
//                         src="/images/ab2.webp"
//                         width="400"
//                         height="400"
//                         alt=""
//                         style={{ marginTop: "60px", display: "block", aspectRatio: "400 / 400" }}
//                       />
//                     </div>
//                   </div>
//                   <div className="tp-about-thumb-shape-two">
//                     {/* <Image
//                       decoding="async"
//                       loading="lazy"
//                       src="https://data.themeim.com/wp/tecz/wp-content/themes/tecz/assets/img/about/one/about-shape-1.webp"
//                       width="200"
//                       height="200"
//                       alt=""
//                       style={{ display: "block", aspectRatio: "200 / 200" }}
//                     /> */}
//                   </div>
//                 </div>
//                 <div className="tp-about-exprience d-none d-xl-block">
//                   {/* <h5 className="tp-about-exprience-title">25</h5> */}
//                   {/* <p style={{ fontSize: '25px' }} className="paragraph">
//                     <b><br /> </b>
//                   </p> */}
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 col-lg-7" style={{ marginTop: "40px", display: "flex", alignItems: "center" }}>
//               {/* CLS FIX: Removed WOW.js animations to prevent layout shifts */}
//               <div
//                 className="tp-about-wrap ml-20"
//                 style={{ width: "100%", marginTop:"-100px"}}
//               >
//                 <div className="tp-section mb-25">
//                   <h1 style={{ textAlign: "left", marginBottom: "15px" }}>
//                     <b>About us..</b>.
//                   </h1>

//                   <h2 className="tp-section-title" style={{ textAlign: "left", marginBottom: "20px" }}>
//                     Smart Solution For Business
//                   </h2>

//                   <div className="container" style={{ marginLeft: "0", paddingLeft: "0", paddingRight: "0" }}>
//                     <div
//                       className="tp-section-title-wrapper"
//                       style={{ textAlign: "justify", lineHeight: "1.8" }}
//                     >
//                       <p>
//                         <b style={{ fontSize: "17px" }}>
//                           Excerpt Technologies Private Limited
//                         </b>{" "}
//                         <span></span>we redefine the way businesses harness
//                         technology. Backed by a team of professionals with 20+
//                         years of proven expertise in the software industry, we
//                         specialize in building solutions that are not only
//                         powerful but purpose-driven. Our portfolio spans across
//                         AI integrated ERP and CRM platforms, advanced E-Learning
//                         and LMS solutions, dynamic E-Commerce applications,
//                         interactive Power BI dashboards, AI-powered tools, and
//                         niche projects designed to simplify complex business
//                         challenges. Each solution is crafted with precision,
//                         blending innovation, usability, and scalability. What
//                         sets us apart is our ability to translate business needs
//                         into future-ready digital ecosystems that drive
//                         measurable impact. We don’t believe in
//                         one-size-fits-all; instead, we design tailored solutions
//                         that align with every client’s unique vision and goals.
//                       </p>
//                     </div>
//                     <div
//                       className="tp-section-title-wrapper"
//                       style={{ textAlign: "justify" }}
//                     >
//                       <h6 style={style}></h6>
//                       <p style={{lineHeight:1.8}}>
//                         {" "}
//                         <b>Excerpt Technologies Private Limited </b> our mission
//                         is clear—to empower businesses with technology that
//                         works smarter, faster, and better. With integrity,
//                         innovation, and collaboration at our core, we build more
//                         than software—we build success stories.{" "}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Homeabout;
'use client';

import React from "react";
import Image from "next/image";
function Homeabout() {
  return (
    <div className="responsive_aboutus" style={{ marginBottom: "15px" }}>
      <section className="about-area pb-150s tp-el-section">
        <div className="container" style={{ maxWidth: "1440px" }}>
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-5" style={{ display: "flex", alignItems: "center" }}>
              <div className="tp-about-thumb" style={{ width: "100%" }}>
                <div className="tp-about-thumb-main overlay-anim w-img tp-thumb-common fix">
                  <div className="tp-thumb-common-overlay"></div>
                  <Image
                    decoding="async"
                    loading="lazy"
                    src="/images/111.webp"
                    width="400"
                    height="500"
                    alt=""
                    style={{ display: "block", aspectRatio: "400 / 500" }}
                  />
                </div>
                <div className="tp-about-thumb-shape">
                  <div className="tp-about-thumb-shape-one">
                    <div className="about-image-1 overlay-anim tp-thumb-common fix">
                      <div className="tp-thumb-common-overlay"></div>
                      <Image
                        decoding="async"
                        loading="lazy"
                        src="/images/ab2.webp"
                        width="400"
                        height="400"
                        alt=""
                        style={{ marginTop: "60px", display: "block", aspectRatio: "400 / 400" }}
                      />
                    </div>
                  </div>
                 
                </div>
                
              </div>
            </div>
            
            <div className="col-xl-6 col-lg-7" style={{ marginTop: "40px", display: "flex", alignItems: "center" }}>
              <div className="tp-about-wrap ml-20" style={{ width: "100%", marginTop: "-100px" }}>
                <div className="tp-section mb-25">
                  <h1 style={{ 
                    textAlign: "left", 
                    marginBottom: "15px",
                    fontSize: "42px",  // Bigger font size
                    fontWeight: "700"   // Bold
                  }}>
                    About us...
                  </h1>

                  <h2 className="tp-section-title" style={{ textAlign: "left", marginBottom: "20px" }}>
                    Smart Solution For Business
                  </h2>

                  <div className="container" style={{ marginLeft: "0", paddingLeft: "0", paddingRight: "0" }}>
                    <div
                      className="tp-section-title-wrapper"
                      style={{ textAlign: "justify", lineHeight: "1.8" }}
                    >
                      <p>
  <b style={{ fontSize: "17px" }}>
    Excerpt Technologies Private Limited
  </b>{" "}
  <span></span>we redefine the way businesses harness
  technology. Backed by a team of professionals with 20+
  years of proven expertise in the software industry, we
  specialize in building solutions that are not only
  powerful but purpose-driven. Our portfolio spans across
  AI integrated ERP and CRM platforms, advanced E-Learning
  and LMS solutions, dynamic E-Commerce applications,
  interactive Power BI dashboards, AI-powered tools, and
  niche projects designed to simplify complex business
  challenges. Each solution is crafted with precision,
  blending innovation, usability, and scalability. What
  sets us apart is our ability to translate business needs
  into future-ready digital ecosystems that drive
  measurable impact. We don&apos;t believe in
  one-size-fits-all; instead, we design tailored solutions
  that align with every client&apos;s unique vision and goals.
</p>

                    </div>
                    <div
                      className="tp-section-title-wrapper"
                      style={{ textAlign: "justify" }}
                    >
                      <p style={{lineHeight:1.8}}>
                        {" "}
                        <b>Excerpt Technologies Private Limited </b> our mission
                        is clear—to empower businesses with technology that
                        works smarter, faster, and better. With integrity,
                        innovation, and collaboration at our core, we build more
                        than software—we build success stories.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homeabout;