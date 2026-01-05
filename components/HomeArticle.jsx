// // 'use client';

// // import React, { useState, useEffect, useRef } from "react";
// // // PERFORMANCE: Replaced react-slick (~50KB) with lightweight SimpleCarousel
// // import SimpleCarousel from "./SimpleCarousel";

// // const Portfolio = () => {
// //   // CLS FIX: Remove isLoaded state - render immediately to prevent layout shift
// //   // Initialize isMobile immediately to prevent layout shift from filtering
// //   const [isMobile, setIsMobile] = useState(() => {
// //     if (typeof window !== 'undefined') {
// //       return window.innerWidth <= 768;
// //     }
// //     return false;
// //   });

// //   useEffect(() => {
// //     // CLS FIX: Removed setIsLoaded - render immediately
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
    
// //     return () => {
// //       window.removeEventListener('resize', checkMobile);
// //     };
// //   }, []);

// //   const checkMobile = () => {
// //     setIsMobile(window.innerWidth <= 768);
// //   };

// //   // PERFORMANCE: Simplified carousel settings for lightweight component
// //   const carouselProps = {
// //     slidesToShow: isMobile ? 1 : 3,
// //     autoplay: !isMobile,
// //     autoplaySpeed: 3000,
// //     arrows: !isMobile,
// //     dots: isMobile,
// //     infinite: true,
// //     activeSlideScale: 1.1, // Added scale for active slide
// //     activeSlideIndex: 1, // Center slide is active (when slidesToShow is 3, index 1 is center)
// //     responsive: [
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 2,
// //           activeSlideIndex: 0, // When 2 slides, first is active
// //         },
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 1,
// //           autoplay: false,
// //           arrows: false,
// //           dots: true,
// //           activeSlideIndex: 0, // When 1 slide, it's active
// //           activeSlideScale: 1.05, // Slightly less scale on mobile
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

// //   // Filter items for mobile view
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

// //         <div style={{ overflow: "hidden", padding: isMobile ? "0 5px" : "0", marginTop: "40px" }}>
// //           <SimpleCarousel {...carouselProps}>
// //             {filteredItems.map((item) => (
// //               <div key={item.id} className="portfolio-card">
// //                 <a href={item.link} target="_blank" rel="noopener noreferrer">
// //                   <div className="news-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg">
// //                     <div className="img-wrapper mb-30">
// //                       {/* CLS guard: fixed dimensions + aspect ratio to reserve space */}
// //                       <Image 
// //                         src={item.image} 
// //                         alt={item.title} 
// //                         width="400" 
// //                         height="300" 
// //                         loading="lazy" 
// //                         decoding="async" 
// //                         style={{ display: 'block', aspectRatio: '400 / 300' }} 
// //                       />
// //                     </div>
// //                     <div className="content">
// //                       <h5 className="heading-5 mb-15">{item.title}</h5>
// //                       <div className="paragraph mb-10">
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

// // export default Portfolio

// 'use client';

// import React, { useState, useEffect, useRef } from "react";
// import SimpleCarousel from "./SimpleCarousel";

// const Portfolio = () => {
//   const [isMobile, setIsMobile] = useState(() => {
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

//   const checkMobile = () => {
//     setIsMobile(window.innerWidth <= 768);
//   };

//   const carouselProps = {
//     slidesToShow: isMobile ? 1 : 3,
//     autoplay: !isMobile,
//     autoplaySpeed: 3000,
//     arrows: !isMobile,
//     dots: isMobile,
//     infinite: true,
//     centerMode: !isMobile, // Center mode for desktop
//     centerPadding: "0px",
//     activeSlideScale: 1.15, // Increased scale for active slide
//     activeSlideIndex: 1, // Center slide index for 3 slides
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           centerMode: false,
//           activeSlideIndex: 0,
//           activeSlideScale: 1.1,
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
//           activeSlideScale: 1.05,
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
//           padding: isMobile ? "0 5px" : "0 60px", // More padding on desktop for centered effect
//           marginTop: "40px",
//           position: "relative"
//         }}>
//           <SimpleCarousel {...carouselProps}>
//             {filteredItems.map((item) => (
//               <div key={item.id} className="portfolio-card">
//                 <a href={item.link} target="_blank" rel="noopener noreferrer">
//                   <div className="news-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg">
//                     <div className="img-wrapper mb-30">
//                       <Image 
//                         src={item.image} 
//                         alt={item.title} 
//                         width="400" 
//                         height="300" 
//                         loading="lazy" 
//                         decoding="async" 
//                         style={{ 
//                           display: 'block', 
//                           aspectRatio: '400 / 300',
//                           borderRadius: '12px',
//                           objectFit: 'cover'
//                         }} 
//                       />
//                     </div>
//                     <div className="content" style={{ padding: '0 15px' }}>
//                       <h5 className="heading-5 mb-15" style={{ 
//                         fontSize: isMobile ? '18px' : '22px',
//                         fontWeight: '600'
//                       }}>{item.title}</h5>
//                       <div className="paragraph mb-10" style={{ 
//                         fontSize: isMobile ? '14px' : '16px',
//                         color: '#666',
//                         marginTop: '1.5rem'
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

import React, { useState, useEffect } from "react";
import SimpleCarousel from "./SimpleCarousel";
import Image from "next/image";

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const carouselProps = {
    slidesToShow: isMobile ? 1 : 3,
    autoplay: !isMobile,
    autoplaySpeed: 4000,
    arrows: false,
    dots: isMobile,
    infinite: true,
    centerMode: !isMobile,
    centerPadding: "0px",
    activeSlideScale: 1.5,
    activeSlideIndex: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          activeSlideIndex: 0,
          activeSlideScale: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          autoplay: false,
          arrows: false,
          dots: true,
          centerMode: false,
          activeSlideIndex: 0,
          activeSlideScale: 1.8,
        },
      },
    ],
  };

  // 🔹 rest of your code stays EXACTLY the same

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
          <SimpleCarousel {...carouselProps}>
            {filteredItems.map((item) => (
              <div key={item.id} className="portfolio-card">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="news-card position-relative transition-all duration-150 ease-in-out hover:shadow-lg">
                    <div className="img-wrapper mb-30">
                      <Image 
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
                        marginTop: '2rem'
                      }}>
                        {item.category} | {item.type}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </SimpleCarousel>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;