// // // 'use client';

// // // import React, { useState, useEffect, useRef } from "react";
// // // // PERFORMANCE: Replaced react-slick (~50KB) with lightweight SimpleCarousel
// // // import SimpleCarousel from "./SimpleCarousel";

// // // const Portfolio = () => {
// // //   // CLS FIX: Remove isLoaded state - render immediately to prevent layout shift
// // //   // Initialize isMobile immediately to prevent layout shift from filtering
// // //   const [isMobile, setIsMobile] = useState(() => {
// // //     if (typeof window !== 'undefined') {
// // //       return window.innerWidth <= 768;
// // //     }
// // //     return false;
// // //   });

// // //   useEffect(() => {
// // //     // CLS FIX: Removed setIsLoaded - render immediately
// // //     checkMobile();
// // //     window.addEventListener('resize', checkMobile);
    
// // //     return () => {
// // //       window.removeEventListener('resize', checkMobile);
// // //     };
// // //   }, []);

// // //   const checkMobile = () => {
// // //     setIsMobile(window.innerWidth <= 768);
// // //   };

// // //   // PERFORMANCE: Simplified carousel settings for lightweight component
// // //   const carouselProps = {
// // //     slidesToShow: isMobile ? 1 : 3,
// // //     autoplay: !isMobile,
// // //     autoplaySpeed: 3000,
// // //     arrows: !isMobile,
// // //     dots: isMobile,
// // //     infinite: true,
// // //     activeSlideScale: 1.1, // Added scale for active slide
// // //     activeSlideIndex: 1, // Center slide is active (when slidesToShow is 3, index 1 is center)
// // //     responsive: [
// // //       {
// // //         breakpoint: 1024,
// // //         settings: {
// // //           slidesToShow: 2,
// // //           activeSlideIndex: 0, // When 2 slides, first is active
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 768,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           autoplay: false,
// // //           arrows: false,
// // //           dots: true,
// // //           activeSlideIndex: 0, // When 1 slide, it's active
// // //           activeSlideScale: 1.05, // Slightly less scale on mobile
// // //         },
// // //       },
// // //     ],
// // //   };

// // //   const portfolioItems = [
// // //     { id: 1, title: "RGVK", category: "Static", type: "Tourism", image: '/portfolio/rgvk.webp',
// // //       link: "https://rgvkindia.com/", className: "hideOnMd" },
// // //     { id: 2, title: "Car Captain", category: "E-com", type: "E-Commerce", image: '/portfolio/car.webp',
// // //       link: "https://carcaptain.in/", className: "" },
// // //     { id: 3, title: "DTECH", category: "CRM", type: "Civil", image: '/portfolio/dtech.webp',
// // //       link: "https://dtechwale.com/", className: "hideOnMd" },
// // //     { id: 4, title: "RoyalHood", category: "E-com", type: "E-Commerce", image: '/portfolio/royalhood.webp',
// // //       link: "https://royalhood.in/", className: "" },
// // //     { id: 5, title: "ANANTA SAUKHYAM", category: "Health", type: "Wellness", image: '/portfolio/ananta.webp',
// // //       link: "https://anantasaukhyam.com/", className: "hideOnMd" },
// // //     { id: 6, title: "D.I.E.A", category: "CRM", type: "Industrial Association", image: '/portfolio/diea.webp',
// // //       link: "https://diea.in/", className: "hideOnMd" },
// // //     { id: 7, title: "AUTOMET ENGINEERING", category: "Static", type: "Automobile", image: '/portfolio/automet.webp',
// // //       link: "http://www.autometengg.com/", className: "hideOnMd" },
// // //     { id: 8, title: "GIFCO AUTO FILTERS INDIA", category: "Static", type: "Automobile", image: '/portfolio/gifco.webp',
// // //       link: "http://gifcoindia.com/", className: "hideOnMd" },
// // //     { id: 9, title: "Shaw Tech Training Services", category: "LMS", type: "Educational", image: '/portfolio/stts.webp',
// // //       link: "https://sttsonline.com/", className: "hideOnMd" },
// // //     { id: 10, title: "Mech Mold", category: "Static", type: "Industrial", image: '/portfolio/mech.webp',
// // //       link: "https://mechmold.com/", className: "hideOnMd" },
// // //     { id: 13, title: "Terra Clenz", category: "E-com", type: "E-Commerce", image: '/portfolio/terra.webp',
// // //       link: "https://terraclenz.com/", className: "" },
// // //     { id: 14, title: "Cad desk", category: "CRM", type: "CRM", image: '/portfolio/cad.webp',
// // //       link: "https://caddesk.in/", className: "" },
// // //     { id: 15, title: "JBK Academy", category: "CRM", type: "CRM", image: '/portfolio/jbk.webp',
// // //       link: "https://jbkadmin.jbkacademy.in/", className: "" },
// // //     { id: 16, title: "Triicons", category: "CRM", type: "CRM", image: '/portfolio/triicons.webp',
// // //       link: "https://triicons.com/", className: "" },
// // //     { id: 17, title: "City Hospitality Solutions", category: "CRM", type: "CRM", image: '/portfolio/city.webp',
// // //       link: "https://crm.cityhospitalitysolutions.com", className: "" },
// // //     { id: 18, title: "Jyothi Cloud ERP", category: "ERP", type: "ERP", image: '/portfolio/erp.webp',
// // //       link: "https://erp.etpl.ai", className: "" },
// // //     { id: 19, title: "BDM Technology", category: "Static", type: "Educational", image: '/portfolio/bdm.webp',
// // //       link: "https://bdmtech.in/", className: "" },
// // //     { id: 20, title: "Darklick", category: "Static", type: "Product", image: '/portfolio/dark.webp',
// // //       link: "http://darklick.com/", className: "hideOnMd" },
// // //     { id: 21, title: "Lynx industries", category: "Static", type: "Industrial", image: '/portfolio/lynx.webp',
// // //       link: "http://lynxindustries.in/", className: "hideOnMd" },
// // //     { id: 22, title: "P and S Industries", category: "Static", type: "Industrial", image: '/portfolio/ps.webp',
// // //       link: "http://pandsindustries.in", className: "hideOnMd" },
// // //     { id: 23, title: "Sri Engineering", category: "Static", type: "Industrial", image: '/portfolio/srii.webp',
// // //       link: "https://sriengineering.net/", className: "hideOnMd" },
// // //     { id: 24, title: "Sai Shanti Vidya Niketan", category: "Static", type: "Industrial", image: '/portfolio/ssvn.webp',
// // //       link: "http://saishantividyaniketan.in/", className: "hideOnMd" },
// // //     { id: 25, title: "Umang Marketing & Engineering Services", category: "Static", type: "Industrial", image: '/portfolio/umang.webp',
// // //       link: "https://umangmarketing.com/", className: "hideOnMd" },
// // //     { id: 26, title: "Upstreams", category: "Static", type: "Industrial", image: '/portfolio/upst.webp',
// // //       link: "https://upstreamhotels.in/", className: "hideOnMd" },
// // //     { id: 27, title: "Terra Batteries", category: "Static", type: "Ecommerce", image: '/portfolio/terrabat.webp',
// // //       link: "https://terrabatteries.com/", className: "hideOnMd" },
// // //   ];

// // //   // Filter items for mobile view
// // //   const filteredItems = isMobile 
// // //     ? portfolioItems.filter(item => !item.className.includes('hideOnMd'))
// // //     : portfolioItems;

// // //   return (
// // //     <div>
// // //       <section id="projects">
// // //         <div className="container">
// // //           <div className="section-heading d-flex flex-column align-items-center justify-content-center">
// // //             <div className="space50"></div>
// // //             <h2 className="" style={{ fontSize: isMobile ? "26px" : "45px" }}>
// // //               <b>Our Latest Projects</b>
// // //             </h2>
// // //           </div>
// // //         </div>

// // //         <div style={{ overflow: "hidden", padding: isMobile ? "0 5px" : "0", marginTop: "40px" }}>
// // //           <SimpleCarousel {...carouselProps}>
// // //             {filteredItems.map((item) => (
// // //               <div key={item.id} className="portfolio-card">
// // //                 <a href={item.link} target="_blank" rel="noopener noreferrer">
// // //                   <div className="news-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg">
// // //                     <div className="img-wrapper mb-30">
// // //                       {/* CLS guard: fixed dimensions + aspect ratio to reserve space */}
// // //                       <img 
// // //                         src={item.image} 
// // //                         alt={item.title} 
// // //                         width="400" 
// // //                         height="300" 
// // //                         loading="lazy" 
// // //                         decoding="async" 
// // //                         style={{ display: 'block', aspectRatio: '400 / 300' }} 
// // //                       />
// // //                     </div>
// // //                     <div className="content">
// // //                       <h5 className="heading-5 mb-15">{item.title}</h5>
// // //                       <div className="paragraph mb-10">
// // //                         {item.category} | {item.type}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </a>
// // //               </div>
// // //             ))}
// // //           </SimpleCarousel>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default Portfolio

// // 'use client';

// // import React, { useState, useEffect, useRef } from "react";
// // import SimpleCarousel from "./SimpleCarousel";

// // const Portfolio = () => {
// //   const [isMobile, setIsMobile] = useState(() => {
// //     if (typeof window !== 'undefined') {
// //       return window.innerWidth <= 768;
// //     }
// //     return false;
// //   });

// //   useEffect(() => {
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
    
// //     return () => {
// //       window.removeEventListener('resize', checkMobile);
// //     };
// //   }, []);

// //   const checkMobile = () => {
// //     setIsMobile(window.innerWidth <= 768);
// //   };

// //   const carouselProps = {
// //     slidesToShow: isMobile ? 1 : 3,
// //     autoplay: !isMobile,
// //     autoplaySpeed: 3000,
// //     arrows: !isMobile,
// //     dots: isMobile,
// //     infinite: true,
// //     centerMode: !isMobile, // Center mode for desktop
// //     centerPadding: "0px",
// //     activeSlideScale: 1.15, // Increased scale for active slide
// //     activeSlideIndex: 1, // Center slide index for 3 slides
// //     responsive: [
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 2,
// //           centerMode: false,
// //           activeSlideIndex: 0,
// //           activeSlideScale: 1.1,
// //         },
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 1,
// //           autoplay: false,
// //           arrows: false,
// //           dots: true,
// //           centerMode: false,
// //           activeSlideIndex: 0,
// //           activeSlideScale: 1.05,
// //         },
// //       },
// //     ],
// //   };

// //   const portfolioItems = [
// //     { id: 1, title: "RGVK", category: "Static", type: "Tourism", image: '/portfolio/rgvk.webp',
// //       link: "https://rgvkindia.com/", className: "hideOnMd" },
// //     { id: 2, title: "Car Captain", category: "E-com", type: "E-Commerce", image: '/portfolio/car.webp',
// //       link: "https://carcaptain.in/", className: "" },
// //     { id: 3, title: "DTECH", category: "CRM", type: "Civil", image: '/portfolio/dtech.webp',
// //       link: "https://dtechwale.com/", className: "hideOnMd" },
// //     { id: 4, title: "RoyalHood", category: "E-com", type: "E-Commerce", image: '/portfolio/royalhood.webp',
// //       link: "https://royalhood.in/", className: "" },
// //     { id: 5, title: "ANANTA SAUKHYAM", category: "Health", type: "Wellness", image: '/portfolio/ananta.webp',
// //       link: "https://anantasaukhyam.com/", className: "hideOnMd" },
// //     { id: 6, title: "D.I.E.A", category: "CRM", type: "Industrial Association", image: '/portfolio/diea.webp',
// //       link: "https://diea.in/", className: "hideOnMd" },
// //     { id: 7, title: "AUTOMET ENGINEERING", category: "Static", type: "Automobile", image: '/portfolio/automet.webp',
// //       link: "http://www.autometengg.com/", className: "hideOnMd" },
// //     { id: 8, title: "GIFCO AUTO FILTERS INDIA", category: "Static", type: "Automobile", image: '/portfolio/gifco.webp',
// //       link: "http://gifcoindia.com/", className: "hideOnMd" },
// //     { id: 9, title: "Shaw Tech Training Services", category: "LMS", type: "Educational", image: '/portfolio/stts.webp',
// //       link: "https://sttsonline.com/", className: "hideOnMd" },
// //     { id: 10, title: "Mech Mold", category: "Static", type: "Industrial", image: '/portfolio/mech.webp',
// //       link: "https://mechmold.com/", className: "hideOnMd" },
// //     { id: 13, title: "Terra Clenz", category: "E-com", type: "E-Commerce", image: '/portfolio/terra.webp',
// //       link: "https://terraclenz.com/", className: "" },
// //     { id: 14, title: "Cad desk", category: "CRM", type: "CRM", image: '/portfolio/cad.webp',
// //       link: "https://caddesk.in/", className: "" },
// //     { id: 15, title: "JBK Academy", category: "CRM", type: "CRM", image: '/portfolio/jbk.webp',
// //       link: "https://jbkadmin.jbkacademy.in/", className: "" },
// //     { id: 16, title: "Triicons", category: "CRM", type: "CRM", image: '/portfolio/triicons.webp',
// //       link: "https://triicons.com/", className: "" },
// //     { id: 17, title: "City Hospitality Solutions", category: "CRM", type: "CRM", image: '/portfolio/city.webp',
// //       link: "https://crm.cityhospitalitysolutions.com", className: "" },
// //     { id: 18, title: "Jyothi Cloud ERP", category: "ERP", type: "ERP", image: '/portfolio/erp.webp',
// //       link: "https://erp.etpl.ai", className: "" },
// //     { id: 19, title: "BDM Technology", category: "Static", type: "Educational", image: '/portfolio/bdm.webp',
// //       link: "https://bdmtech.in/", className: "" },
// //     { id: 20, title: "Darklick", category: "Static", type: "Product", image: '/portfolio/dark.webp',
// //       link: "http://darklick.com/", className: "hideOnMd" },
// //     { id: 21, title: "Lynx industries", category: "Static", type: "Industrial", image: '/portfolio/lynx.webp',
// //       link: "http://lynxindustries.in/", className: "hideOnMd" },
// //     { id: 22, title: "P and S Industries", category: "Static", type: "Industrial", image: '/portfolio/ps.webp',
// //       link: "http://pandsindustries.in", className: "hideOnMd" },
// //     { id: 23, title: "Sri Engineering", category: "Static", type: "Industrial", image: '/portfolio/srii.webp',
// //       link: "https://sriengineering.net/", className: "hideOnMd" },
// //     { id: 24, title: "Sai Shanti Vidya Niketan", category: "Static", type: "Industrial", image: '/portfolio/ssvn.webp',
// //       link: "http://saishantividyaniketan.in/", className: "hideOnMd" },
// //     { id: 25, title: "Umang Marketing & Engineering Services", category: "Static", type: "Industrial", image: '/portfolio/umang.webp',
// //       link: "https://umangmarketing.com/", className: "hideOnMd" },
// //     { id: 26, title: "Upstreams", category: "Static", type: "Industrial", image: '/portfolio/upst.webp',
// //       link: "https://upstreamhotels.in/", className: "hideOnMd" },
// //     { id: 27, title: "Terra Batteries", category: "Static", type: "Ecommerce", image: '/portfolio/terrabat.webp',
// //       link: "https://terrabatteries.com/", className: "hideOnMd" },
// //   ];

// //   const filteredItems = isMobile 
// //     ? portfolioItems.filter(item => !item.className.includes('hideOnMd'))
// //     : portfolioItems;

// //   return (
// //     <div>
// //       <section id="projects">
// //         <div className="container">
// //           <div className="section-heading d-flex flex-column align-items-center justify-content-center">
// //             <div className="space50"></div>
// //             <h2 className="" style={{ fontSize: isMobile ? "26px" : "45px" }}>
// //               <b>Our Latest Projects</b>
// //             </h2>
// //           </div>
// //         </div>

// //         <div style={{ 
// //           overflow: "hidden", 
// //           padding: isMobile ? "0 5px" : "0 60px", // More padding on desktop for centered effect
// //           marginTop: "40px",
// //           position: "relative"
// //         }}>
// //           <SimpleCarousel {...carouselProps}>
// //             {filteredItems.map((item) => (
// //               <div key={item.id} className="portfolio-card">
// //                 <a href={item.link} target="_blank" rel="noopener noreferrer">
// //                   <div className="news-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg">
// //                     <div className="img-wrapper mb-30">
// //                       <img 
// //                         src={item.image} 
// //                         alt={item.title} 
// //                         width="400" 
// //                         height="300" 
// //                         loading="lazy" 
// //                         decoding="async" 
// //                         style={{ 
// //                           display: 'block', 
// //                           aspectRatio: '400 / 300',
// //                           borderRadius: '12px',
// //                           objectFit: 'cover'
// //                         }} 
// //                       />
// //                     </div>
// //                     <div className="content" style={{ padding: '0 15px' }}>
// //                       <h5 className="heading-5 mb-15" style={{ 
// //                         fontSize: isMobile ? '18px' : '22px',
// //                         fontWeight: '600'
// //                       }}>{item.title}</h5>
// //                       <div className="paragraph mb-10" style={{ 
// //                         fontSize: isMobile ? '14px' : '16px',
// //                         color: '#666',
// //                         marginTop: '1.5rem'
// //                       }}>
// //                         {item.category} | {item.type}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </a>
// //               </div>
// //             ))}
// //           </SimpleCarousel>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Portfolio;

// 'use client';

// import React, { useState, useEffect } from "react";
// import SimpleCarousel from "./SimpleCarousel";

// const Portfolio = () => {
//    const checkMobile = () => {
//     setIsMobile(window.innerWidth <= 768);
//   };

//    const [isMobile, setIsMobile] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return window.innerWidth <= 768;
//     }
//     return false;
//   });

//   useEffect(() => {
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//     };
//   }, []);

 
//   const carouselProps = {
//     slidesToShow: isMobile ? 1 : 3,
//     autoplay: !isMobile,
//     autoplaySpeed: 4000,
//     arrows: false,
//     dots: isMobile,
//     infinite: true,
//     centerMode: !isMobile,
//     centerPadding: "0px",
//     activeSlideScale: 1.5, // CHANGED TO 3
//     activeSlideIndex: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           centerMode: false,
//           activeSlideIndex: 0,
//           activeSlideScale: 2, // CHANGED TO 2.5
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           autoplay: false,
//           arrows: false,
//           dots: true,
//           centerMode: false,
//           activeSlideIndex: 0,
//           activeSlideScale: 1.8, // CHANGED TO 1.8
//         },
//       },
//     ],
//   };

//   const portfolioItems = [
//     { id: 1, title: "RGVK", category: "Static", type: "Tourism", image: '/portfolio/rgvk.webp',
//       link: "https://rgvkindia.com/", className: "hideOnMd" },
//     { id: 2, title: "Car Captain", category: "E-com", type: "E-Commerce", image: '/portfolio/car.webp',
//       link: "https://carcaptain.in/", className: "" },
//     { id: 3, title: "DTECH", category: "CRM", type: "Civil", image: '/portfolio/dtech.webp',
//       link: "https://dtechwale.com/", className: "hideOnMd" },
//     { id: 4, title: "RoyalHood", category: "E-com", type: "E-Commerce", image: '/portfolio/royalhood.webp',
//       link: "https://royalhood.in/", className: "" },
//     { id: 5, title: "ANANTA SAUKHYAM", category: "Health", type: "Wellness", image: '/portfolio/ananta.webp',
//       link: "https://anantasaukhyam.com/", className: "hideOnMd" },
//     { id: 6, title: "D.I.E.A", category: "CRM", type: "Industrial Association", image: '/portfolio/diea.webp',
//       link: "https://diea.in/", className: "hideOnMd" },
//     { id: 7, title: "AUTOMET ENGINEERING", category: "Static", type: "Automobile", image: '/portfolio/automet.webp',
//       link: "http://www.autometengg.com/", className: "hideOnMd" },
//     { id: 8, title: "GIFCO AUTO FILTERS INDIA", category: "Static", type: "Automobile", image: '/portfolio/gifco.webp',
//       link: "http://gifcoindia.com/", className: "hideOnMd" },
//     { id: 9, title: "Shaw Tech Training Services", category: "LMS", type: "Educational", image: '/portfolio/stts.webp',
//       link: "https://sttsonline.com/", className: "hideOnMd" },
//     { id: 10, title: "Mech Mold", category: "Static", type: "Industrial", image: '/portfolio/mech.webp',
//       link: "https://mechmold.com/", className: "hideOnMd" },
//     { id: 13, title: "Terra Clenz", category: "E-com", type: "E-Commerce", image: '/portfolio/terra.webp',
//       link: "https://terraclenz.com/", className: "" },
//     { id: 14, title: "Cad desk", category: "CRM", type: "CRM", image: '/portfolio/cad.webp',
//       link: "https://caddesk.in/", className: "" },
//     { id: 15, title: "JBK Academy", category: "CRM", type: "CRM", image: '/portfolio/jbk.webp',
//       link: "https://jbkadmin.jbkacademy.in/", className: "" },
//     { id: 16, title: "Triicons", category: "CRM", type: "CRM", image: '/portfolio/triicons.webp',
//       link: "https://triicons.com/", className: "" },
//     { id: 17, title: "City Hospitality Solutions", category: "CRM", type: "CRM", image: '/portfolio/city.webp',
//       link: "https://crm.cityhospitalitysolutions.com", className: "" },
//     { id: 18, title: "Jyothi Cloud ERP", category: "ERP", type: "ERP", image: '/portfolio/erp.webp',
//       link: "https://erp.etpl.ai", className: "" },
//     { id: 19, title: "BDM Technology", category: "Static", type: "Educational", image: '/portfolio/bdm.webp',
//       link: "https://bdmtech.in/", className: "" },
//     { id: 20, title: "Darklick", category: "Static", type: "Product", image: '/portfolio/dark.webp',
//       link: "http://darklick.com/", className: "hideOnMd" },
//     { id: 21, title: "Lynx industries", category: "Static", type: "Industrial", image: '/portfolio/lynx.webp',
//       link: "http://lynxindustries.in/", className: "hideOnMd" },
//     { id: 22, title: "P and S Industries", category: "Static", type: "Industrial", image: '/portfolio/ps.webp',
//       link: "http://pandsindustries.in", className: "hideOnMd" },
//     { id: 23, title: "Sri Engineering", category: "Static", type: "Industrial", image: '/portfolio/srii.webp',
//       link: "https://sriengineering.net/", className: "hideOnMd" },
//     { id: 24, title: "Sai Shanti Vidya Niketan", category: "Static", type: "Industrial", image: '/portfolio/ssvn.webp',
//       link: "http://saishantividyaniketan.in/", className: "hideOnMd" },
//     { id: 25, title: "Umang Marketing & Engineering Services", category: "Static", type: "Industrial", image: '/portfolio/umang.webp',
//       link: "https://umangmarketing.com/", className: "hideOnMd" },
//     { id: 26, title: "Upstreams", category: "Static", type: "Industrial", image: '/portfolio/upst.webp',
//       link: "https://upstreamhotels.in/", className: "hideOnMd" },
//     { id: 27, title: "Terra Batteries", category: "Static", type: "Ecommerce", image: '/portfolio/terrabat.webp',
//       link: "https://terrabatteries.com/", className: "hideOnMd" },
//   ];

//   const filteredItems = isMobile 
//     ? portfolioItems.filter(item => !item.className.includes('hideOnMd'))
//     : portfolioItems;

//   return (
//     <div>
//       <section id="projects">
//         <div className="container">
//           <div className="section-heading d-flex flex-column align-items-center justify-content-center">
//             <div className="space50"></div>
//             <h2 className="" style={{ fontSize: isMobile ? "26px" : "45px" }}>
//               <b>Our Latest Projects</b>
//             </h2>
//           </div>
//         </div>

//         <div style={{ 
//           overflow: "hidden", 
//           padding: isMobile ? "0 5px" : "0",
//           marginTop: "40px",
//           position: "relative"
//         }}>
//           <SimpleCarousel {...carouselProps}>
//             {filteredItems.map((item) => (
//               <div key={item.id} className="portfolio-card">
//                 <a href={item.link} target="_blank" rel="noopener noreferrer">
//                   <div className="news-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg">
//                     <div className="img-wrapper mb-30">
//                       <img 
//                         src={item.image} 
//                         alt={item.title} 
//                         width="400" 
//                         height="300" 
//                         loading="lazy" 
//                         decoding="async" 
//                         style={{ 
//                           display: 'block', 
//                           aspectRatio: '400 / 300'
//                         }} 
//                       />
//                     </div>
//                     <div className="content" style={{ padding: '0 15px' }}>
//                       <h5 className="heading-5 mb-15">{item.title}</h5>
//                       <div className="paragraph mb-10" style={{ 
//                         fontSize: isMobile ? '14px' : '16px',
//                         color: '#666',
//                         marginTop: '2rem'
//                       }}>
//                         {item.category} | {item.type}
//                       </div>
//                     </div>
//                   </div>
//                 </a>
//               </div>
//             ))}
//           </SimpleCarousel>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Portfolio;











'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState, useCallback, useRef } from 'react';


const portfolioItems = [
  { id: 1, title: "RGVK", category: "Static", type: "Tourism", image: '/portfolio/rgvk.webp',
    link: "https://rgvkindia.com/", className: "hideOnMd" },
  { id: 2, title: "Car Captain", category: "E-com", type: "E-Commerce", image: '/portfolio/car.webp',
    link: "https://carcaptain.in/", className: "" },
  { id: 3, title: "DTECH", category: "CRM", type: "Civil", image: '/portfolio/dtech.webp',
    link: "https://dtechwale.com/", className: "hideOnMd" },
  { id: 4, title: "RoyalHood", category: "E-com", type: "E-Commerce", image: '/portfolio/royalhood.webp',
    link: "https://royalhood.in/", className: "" },
  { id: 5, title: "ANANTA SAUKHYAM", category: "Health", type: "Wellness", image: '/portfolio/ananta.webp',
    link: "https://anantasaukhyam.com/", className: "hideOnMd" },
  { id: 6, title: "D.I.E.A", category: "CRM", type: "Industrial Association", image: '/portfolio/diea.webp',
    link: "https://diea.in/", className: "hideOnMd" },
  { id: 7, title: "AUTOMET ENGINEERING", category: "Static", type: "Automobile", image: '/portfolio/automet.webp',
    link: "http://www.autometengg.com/", className: "hideOnMd" },
  { id: 8, title: "GIFCO AUTO FILTERS INDIA", category: "Static", type: "Automobile", image: '/portfolio/gifco.webp',
    link: "http://gifcoindia.com/", className: "hideOnMd" },
  { id: 9, title: "Shaw Tech Training Services", category: "LMS", type: "Educational", image: '/portfolio/stts.webp',
    link: "https://sttsonline.com/", className: "hideOnMd" },
  { id: 10, title: "Mech Mold", category: "Static", type: "Industrial", image: '/portfolio/mech.webp',
    link: "https://mechmold.com/", className: "hideOnMd" },
  { id: 13, title: "Terra Clenz", category: "E-com", type: "E-Commerce", image: '/portfolio/terra.webp',
    link: "https://terraclenz.com/", className: "" },
  { id: 14, title: "Cad desk", category: "CRM", type: "CRM", image: '/portfolio/cad.webp',
    link: "https://caddesk.in/", className: "" },
  { id: 15, title: "JBK Academy", category: "CRM", type: "CRM", image: '/portfolio/jbk.webp',
    link: "https://jbkadmin.jbkacademy.in/", className: "" },
  { id: 16, title: "Triicons", category: "CRM", type: "CRM", image: '/portfolio/triicons.webp',
    link: "https://triicons.com/", className: "" },
  { id: 17, title: "City Hospitality Solutions", category: "CRM", type: "CRM", image: '/portfolio/city.webp',
    link: "https://crm.cityhospitalitysolutions.com", className: "" },
  { id: 18, title: "Jyothi Cloud ERP", category: "ERP", type: "ERP", image: '/portfolio/erp.webp',
    link: "https://erp.etpl.ai", className: "" },
  { id: 19, title: "BDM Technology", category: "Static", type: "Educational", image: '/portfolio/bdm.webp',
    link: "https://bdmtech.in/", className: "" },
  { id: 20, title: "Darklick", category: "Static", type: "Product", image: '/portfolio/dark.webp',
    link: "http://darklick.com/", className: "hideOnMd" },
  { id: 21, title: "Lynx industries", category: "Static", type: "Industrial", image: '/portfolio/lynx.webp',
    link: "http://lynxindustries.in/", className: "hideOnMd" },
  { id: 22, title: "P and S Industries", category: "Static", type: "Industrial", image: '/portfolio/ps.webp',
    link: "http://pandsindustries.in", className: "hideOnMd" },
  { id: 23, title: "Sri Engineering", category: "Static", type: "Industrial", image: '/portfolio/srii.webp',
    link: "https://sriengineering.net/", className: "hideOnMd" },
  { id: 24, title: "Sai Shanti Vidya Niketan", category: "Static", type: "Industrial", image: '/portfolio/ssvn.webp',
    link: "http://saishantividyaniketan.in/", className: "hideOnMd" },
  { id: 25, title: "Umang Marketing & Engineering Services", category: "Static", type: "Industrial", image: '/portfolio/umang.webp',
    link: "https://umangmarketing.com/", className: "hideOnMd" },
  { id: 26, title: "Upstreams", category: "Static", type: "Industrial", image: '/portfolio/upst.webp',
    link: "https://upstreamhotels.in/", className: "hideOnMd" },
  { id: 27, title: "Terra Batteries", category: "Static", type: "Ecommerce", image: '/portfolio/terrabat.webp',
    link: "https://terrabatteries.com/", className: "hideOnMd" },
];

export default function PortfolioEmbla() {
  const [isMobile, setIsMobile] = useState(false);
  const autoplayRef = useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false,
      playOnInit: true
    })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    skipSnaps: false,
    breakpoints: {
      '(max-width: 768px)': {
        align: 'center',
        slidesToScroll: 1,
      },
    },
  }, [autoplayRef.current]);

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const filteredItems = isMobile 
    ? portfolioItems.filter(item => !item.className.includes('hideOnMd'))
    : portfolioItems;

  return (
    <div>
      <section id="projects">
        <div className="container">
          <div className="section-heading d-flex flex-column align-items-center justify-content-center">
            <div className="space50"></div>
            <h2 className="" style={{ fontSize: isMobile ? "26px" : "45px" }}>
              <b>Our Latest Projects</b>
            </h2>
          </div>
        </div>

        <div style={{ 
          overflow: "hidden", 
          padding: isMobile ? "0 5px" : "0",
          marginTop: "40px",
          position: "relative"
        }}>
          <div className="embla-container">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {filteredItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  const isAdjacent = index === activeIndex - 1 || index === activeIndex + 1;
                  
                  return (
                    <div
                      key={item.id}
                      className={`embla__slide ${isActive ? 'is-active' : ''} ${isAdjacent ? 'is-adjacent' : ''}`}
                    >
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <div className="news-card position-relative">
                          <div className="img-wrapper mb-30">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              width="400" 
                              height="300" 
                              loading="lazy" 
                              decoding="async" 
                              style={{ 
                                display: 'block', 
                                aspectRatio: '400 / 300'
                              }} 
                            />
                          </div>
                          <div className="content" style={{ padding: '0 15px' }}>
                            <h5 className="heading-5 mb-15">{item.title}</h5>
                            <div className="paragraph mb-10" style={{ 
                              fontSize: isMobile ? '14px' : '16px',
                              color: '#666',
                              marginTop: isMobile ? '1rem' : '2rem'
                            }}>
                              {item.category} | {item.type}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows for Desktop */}
            {!isMobile && (
              <>
                <button 
                  className="embla__button embla__button--prev" 
                  onClick={scrollPrev}
                  aria-label="Previous slide"
                >
                  <span>‹</span>
                </button>
                <button 
                  className="embla__button embla__button--next" 
                  onClick={scrollNext}
                  aria-label="Next slide"
                >
                  <span>›</span>
                </button>
              </>
            )}

            {/* Dots Navigation for Mobile */}
            {isMobile && (
              <div className="embla__dots">
                {filteredItems.map((_, index) => (
                  <button
                    key={index}
                    className={`embla__dot ${index === activeIndex ? 'is-active' : ''}`}
                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .embla-container {
          position: relative;
          width: 100%;
          margin: 0 auto;
          padding: ${isMobile ? '0 4px' : '0 40px'};
        }

        .embla {
          overflow: hidden;
          width: 100%;
        }

        .embla__container {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
          margin-left: -10px;
          gap: ${isMobile ? '20px' : '30px'};
          padding: ${isMobile ? '40px 0' : '60px 0'};
          align-items: center;
        }

        .embla__slide {
          position: relative;
          min-width: ${isMobile ? '70%' : 'calc(100% / 3 - 20px)'};
          padding-left: 10px;
          flex: 0 0 auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.6;
          transform: scale(0.9);
        }

        /* Center Mode for Desktop - Active slide in center */
        .embla__slide.is-active {
          opacity: 1;
          transform: ${isMobile ? 'scale(0.5)' : 'scale(1.2)'};
          z-index: 2;
        }

        /* Adjacent slides */
        .embla__slide.is-adjacent {
          opacity: 0.8;
          transform: scale(0.95);
        }

        /* Non-active slides */
        .embla__slide:not(.is-active):not(.is-adjacent) {
          opacity: 0.4;
          transform: scale(0.85);
        }

        /* Card styling */
        .news-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          height: ${isMobile ? '320px' : '350px'};
          display: flex;
          flex-direction: column;
          border: 1px solid #eaeaea;
        }

        .embla__slide.is-active .news-card {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border-color: #0554f2;
        }

        .img-wrapper {
          width: 100%;
          height: ${isMobile ? '180px' : '200px'};
          overflow: hidden;
          flex-shrink: 0;
        }

        .img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .embla__slide.is-active .img-wrapper img {
          transform: scale(1.03);
        }

        .content {
          padding: ${isMobile ? '15px' : '20px'};
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .content h5 {
          font-size: ${isMobile ? '16px' : '18px'};
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .embla__slide.is-active .content h5 {
          color: #0554f2;
        }

        .content .paragraph {
          color: #666;
          font-size: ${isMobile ? '14px' : '15px'};
          line-height: 1.4;
          margin: 0;
        }

        /* Navigation Arrows */
        .embla__button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          cursor: pointer;
          font-size: 20px;
          color: #333;
          transition: all 0.2s ease;
        }

        .embla__button:hover {
          background: #0554f2;
          color: white;
          box-shadow: 0 4px 15px rgba(5, 84, 242, 0.3);
        }

        .embla__button--prev {
          left: 10px;
        }

        .embla__button--next {
          right: 10px;
        }

        /* Dots Navigation */
        .embla__dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          padding: 10px 0;
        }

        .embla__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #ddd;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s ease;
        }

        .embla__dot.is-active {
          background: #0554f2;
          transform: scale(1.2);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .embla__container {
            gap: 10px;
            padding: 40px 5px;
          }

          .embla__slide {
            min-width: 85%;
          }

          .embla__slide.is-active {
            transform: scale(1.02);
          }

          .news-card {
            height: 300px;
          }

          .img-wrapper {
            height: 160px;
          }

          /* Hide arrows on mobile */
          .embla__button {
            display: none;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .embla__slide {
            min-width: calc(100% / 2 - 15px);
          }
          
          .embla__container {
            gap: 20px;
          }
        }

        @media (min-width: 1200px) {
          .embla-container {
            max-width: 1340px;
            margin: 0 auto;
          }
        }

        /* Hover effects */
        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .embla__slide.is-active .news-card:hover {
          transform: translateY(-5px) scale(1.02);
        }

        /* Pause autoplay on hover */
        .embla:hover :global(.embla__autoplay) {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}