'use client';

// import React, { useState, useEffect } from 'react';
// import { Link } from 'next/link';

// import { Helmet } from "react-helmet";
// const Portfolio = () => {
//     const [activeTab, setActiveTab] = useState('All');
//     const [showAll, setShowAll] = useState(false);
//     const [currentSlide, setCurrentSlide] = useState(0);

//     // Portfolio data with categories
//     const portfolioItems = [
//         {
//             id: 1,
//             title: "RGVK",
//             category: "Static",
//             type: "Tourism",
//             image: '/portfolio/rgvk.webp",
//             link: "https://rgvkindia.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 2,
//             title: "Car Captain",
//             category: "E-com",
//             type: "E-Commerce",
//             image: '/portfolio/car.webp",
//             link: "https://carcaptain.in/",
//             className: ""
//         },
//         {
//             id: 3,
//             title: "DTECH",
//             category: "CRM",
//             type: "Civil",
//             image: '/portfolio/dtech.webp",
//             link: "https://dtechwale.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 4,
//             title: "RoyalHood",
//             category: "E-com",
//             type: "E-Commerce",
//             image: '/portfolio/royalhood.webp",
//             link: "https://royalhood.in/",
//             className: ""
//         },
//         {
//             id: 5,
//             title: "ANANTA SAUKHYAM",
//             category: "Health",
//             type: "Wellness",
//             image: '/portfolio/ananta.webp",
//             link: "https://anantasaukhyam.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 6,
//             // title: "DYAVASANDRA INDUSTRIAL ESTATE ASSOCIATION",
//             title: "DIEA",
//             category: "CRM",
//             type: "Industrial Association",
//             image: '/portfolio/diea.webp",
//             link: "",
//             className: "hideOnMd"
//         },
//         {
//             id: 7,
//             title: "AUTOMET ENGINEERING",
//             category: "Static",
//             type: "Automobile",
//             image: '/portfolio/automet.webp",
//             link: "http://www.autometengg.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 8,
//             title: "GIFCO AUTO FILTERS INDIA",
//             category: "Static",
//             type: "Automobile",
//             image: '/portfolio/gifco.webp",
//             link: "http://gifcoindia.com/",
//             className: "hideOnMd"
//         },

//         {
//             id: 9,
//             title: "Shaw Tech Training Services",
//             category: "LMS",
//             type: "Educational",
//             image: "/portfolio/stts.webp",
//             link: "https://sttsonline.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 10,
//             title: "Mech Mold",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/mech.webp",
//             link: "https://mechmold.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 11,
//             title: "IT DESK MAHADEVPURA",
//             category: "LMS",
//             type: "Educational",
//             image: "/images/p5.webp",
//             link: "https://itdeskmahadevpura.com/",
//             className: ""
//         },
//         {
//             id: 12,
//             title: "CAD DESK MAHADEVPURA",
//             category: "LMS",
//             type: "Educational",
//             image: '/images/p4.webp",
//             link: "http://caddeskmahadevpura.com/",
//             className: ""
//         },

//         {
//             id: 13,
//             title: "Terra Clenz",
//             category: "E-com",
//             type: "E-Commerce",
//             image: "/portfolio/terra.webp",
//             link: "https://terraclenz.com/",
//             className: ""
//         },

//         {
//             id: 14,
//             title: "Cad desk",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/cad.webp",
//             link: "https://caddesk.in/",
//             className: ""
//         },
//         {
//             id: 15,
//             title: "JBK Academy",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/jbk.webp",
//             link: "https://jbkadmin.jbkacademy.in/",
//             className: ""
//         },
//         {
//             id: 16,
//             title: "Triicons",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/triicons.webp",
//             link: "https://triicons.com/",
//             className: ""
//         },
//         {
//             id: 17,
//             title: "City Hospitality Solutions",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/city.webp",
//             link: "https://crm.cityhospitalitysolutions.com",
//             className: ""
//         },
//         {
//             id: 18,
//             title: "Jyothi Cloud ERP",
//             category: "ERP",
//             type: "ERP",
//             image: "/portfolio/erp.webp",
//             link: "https://erp.etpl.ai",
//             className: ""
//         },
//         {
//             id: 19,
//             title: "BDM Technology",
//             category: "Static",
//             type: "Educational",
//             image: "/portfolio/bdm.webp",
//             link: "https://bdmtech.in/",
//             className: ""
//         },
//         {
//             id: 20,
//             title: "Darklick",
//             category: "Static",
//             type: "Product",
//             image: "/portfolio/dark.webp",
//             link: "http://darklick.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 21,
//             title: "Lynx industries",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/lynx.webp",
//             link: "http://lynxindustries.in/",
//             className: "hideOnMd"
//         },


//         {
//             id: 22,
//             title: "P and S Industries",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/ps.webp",
//             link: "http://pandsindustries.in",
//             className: "hideOnMd"
//         },
//         {
//             id: 23,
//             title: " Sri Engineering",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/srii.webp",
//             link: "https://sriengineering.net/",
//             className: "hideOnMd"
//         },
//         {
//             id: 24,
//             title: "Sai Shanti Vidya Niketan",
//             category: "Static",
//             type: "Educational",
//             image: "/portfolio/ssvn.webp",
//             link: "http://saishantividyaniketan.in/",
//             className: "hideOnMd"
//         },
//         {
//             id: 25,
//             title: "Umang Marketing & Engineering Services",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/umang.webp",
//             link: "https://umangmarketing.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 26,
//             title: "Upstreams",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/upst.webp",
//             link: "https://upstreamhotels.in/",
//             className: "hideOnMd"
//         },


//         {
//             id: 27,
//             title: "Terra Batteries",
//             category: "Static",
//             type: "Ecommerce",
//             image: "/portfolio/terrabat.webp",
//             link: "https://terrabatteries.com/",
//             className: "hideOnMd"
//         },

//     ];

//     // Slider images - using first 8 portfolio items for the slider
//     const sliderImages = portfolioItems.slice(0, 8);

//     // Auto-slide effect
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//         }, 4000); // Change slide every 4 seconds

//         return () => clearInterval(timer);
//     }, [sliderImages.length]);

//     // Get unique categories
//     const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];

//     // Filter items based on active tab
//     const filteredItems = activeTab === 'All'
//         ? portfolioItems
//         : portfolioItems.filter(item => item.category === activeTab);

//     // Determine how many items to show
//     const initialItemCount = 6;
//     const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, initialItemCount);
//     const hasMoreItems = filteredItems.length > initialItemCount;

//     const renderPortfolioCard = (item) => {
//         const CardContent = () => (
//             <div className={`news-card position-relative ${item.id === 2 ? 'news-card-dyavasandra' : ''}`}
//                 style={item.id === 2 ? { height: "330px" } : {}}>
//                 <div className="img-wrapper mb-30">
//                     <Image src={item.image} alt={item.title} />
//                 </div>
//                 <div className="content">
//                     {item.id === 2 || item.id === 7 || item.id === 8 || item.id === 9 || item.id === 11 || item.id === 12 || item.id === 13 ? (
//                         <h5 className="heading-5">{item.title}</h5>
//                     ) : (
//                         <h5 className="heading-5 ">{item.title}</h5>
//                     )}
//                     <div className="paragraph mb-25">{item.type}</div>
//                 </div>
//                 <div className="circle-1 position-absolute"></div>
//                 <div className="circle-2 position-absolute"></div>
//             </div>
//         );

//         return (
//             <div key={item.id} className={`col-md-6 col-lg-4 ${item.className}`}>
//                 {item.link ? (
//                     item.link.startsWith('http') ? (
//                         <Link to={item.link} className="link-to-external-website" target='_blank'>
//                             <CardContent />
//                         </Link>
//                     ) : (
//                         <Link href={item.link} target='_blank'>
//                             <CardContent />
//                         </Link>
//                     )
//                 ) : (
//                     <Link href="">
//                         <CardContent />
//                     </Link>
//                 )}
//             </div>
//         );
//     };

//     const handleReadMore = () => {
//         setShowAll(!showAll);
//     };

//     const goToSlide = (index) => {
//         setCurrentSlide(index);
//     };

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
//     };

//     return (
//         <>
//             <style jsx>{`
//                 .portfolio-slider {
//                     position: relative;
//                     width: 100%;
//                     height: 580px;
//                     overflow: hidden;
//                     border-radius: 15px;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//                 }

//                 .slider-container {
//                     position: relative;
//                     width: 100%;
//                     height: 100%;
//                     display: flex;
//                     transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//                     transform: translateX(-${currentSlide * 100}%);
//                 }

//                 .slide {
//                     min-width: 100%;
//                     height: 100%;
//                     position: relative;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                 }

//                 .slide-image {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     transition: transform 0.3s ease;
//                 }

//                 .slide-overlay {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     background: linear-gradient(45deg, rgba(0, 17, 255, 0.8), rgba(0, 17, 255, 0.4));
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                     align-items: center;
//                     color: white;
//                     text-align: center;
//                     padding: 20px;
//                     opacity: 0;
//                     transition: opacity 0.3s ease;
//                 }

//                 .slide:hover .slide-overlay {
//                     opacity: 1;
//                 }

//                 .slide:hover .slide-image {
//                     transform: scale(1.05);
//                 }

//                 .slide-title {
//                     font-size: 2.5rem;
//                     font-weight: bold;
//                     margin-bottom: 10px;
//                     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//                 }

//                 .slide-type {
//                     font-size: 1.2rem;
//                     font-weight: 300;
//                     opacity: 0.9;
//                 }

//                 .slider-nav {
//                     position: absolute;
//                     top: 50%;
//                     transform: translateY(-50%);
//                     background: rgba(255, 255, 255, 0.9);
//                     border: none;
//                     border-radius: 50%;
//                     width: 50px;
//                     height: 50px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     z-index: 10;
//                     font-size: 20px;
//                     color: #0011ffff;
//                 }

//                 .slider-nav:hover {
//                     background: #0011ffff;
//                     color: white;
//                     transform: translateY(-50%) scale(1.1);
//                 }

//                 .slider-nav.prev {
//                     left: 20px;
//                 }

//                 .slider-nav.next {
//                     right: 20px;
//                 }

//                 .slider-dots {
//                     position: absolute;
//                     bottom: 20px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     display: flex;
//                     gap: 12px;
//                     z-index: 10;
//                 }

//                 .dot {
//                     width: 12px;
//                     height: 12px;
//                     border-radius: 50%;
//                     background: rgba(255, 255, 255, 0.5);
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     border: 2px solid transparent;
//                 }

//                 .dot.active {
//                     background: white;
//                     transform: scale(1.2);
//                     border-color: #0011ffff;
//                 }

//                 .dot:hover {
//                     background: rgba(255, 255, 255, 0.8);
//                     transform: scale(1.1);
//                 }

//                 .slider-progress {
//                     position: absolute;
//                     bottom: 0;
//                     left: 0;
//                     height: 4px;
//                     background: #0011ffff;
//                     transition: width 4s linear;
//                     z-index: 10;
//                     width: ${((currentSlide + 1) / sliderImages.length) * 100}%;
//                 }

//                 /* Mobile-specific improvements */
//                 @media (max-width: 768px) {
//                     .portfolio-slider {
//                         height: 280px;
//                         margin-bottom: 30px;
//                         border-radius: 10px;
//                     }

//                     .slide-title {
//                         font-size: 1.4rem;
//                         line-height: 1.2;
//                         margin-bottom: 8px;
//                     }

//                     .slide-type {
//                         font-size: 0.9rem;
//                     }

//                     .slider-nav {
//                         width: 35px;
//                         height: 35px;
//                         font-size: 16px;
//                     }

//                     .slider-nav.prev {
//                         left: 8px;
//                     }

//                     .slider-nav.next {
//                         right: 8px;
//                     }

//                     .slider-dots {
//                         bottom: 15px;
//                         gap: 8px;
//                     }

//                     .dot {
//                         width: 10px;
//                         height: 10px;
//                     }

//                     .slide-overlay {
//                         padding: 15px;
//                     }

//                     /* Tab navigation mobile styles */
//                     .portfolio-tabs {
//                         margin-top: -50px !important;
//                         margin-bottom: 30px !important;
//                         overflow-x: auto;
//                         padding-bottom: 10px;
//                     }

//                     .tab-wrapper {
//                         min-width: 10px;
//                         gap: 5px;
//                         padding: 0 15px;
//                     }

//                     .tab-btn {
//                         padding: 10px 18px ;
//                         margin: 0 3px ;
//                         font-size: 13px ;
//                         min-width: 10px ;
//                         white-space: nowrap;
//                         border-radius: 20px !important;
//                         flex-shrink: 0;
//                     }

//                     /* Portfolio cards mobile optimization */
//                     .col-md-6.col-lg-4 {
//                         margin-bottom: 20px;
//                     }

//                     .news-card {
//                         margin-bottom: 15px;
//                     }

//                     .news-card .img-wrapper {
//                         margin-bottom: 20px;
//                     }

//                     .news-card .heading-5 {
//                         font-size: 1.1rem !important;
//                         line-height: 1.3;
//                         margin-bottom: 10px !important;
//                     }

//                     .news-card .paragraph {
//                         font-size: 0.9rem;
//                         margin-bottom: 15px !important;
//                     }

//                     /* Newsletter section mobile */
//                     .newsletter-Wrapper {
//                         padding: 30px 15px !important;
//                         text-align: center;
//                     }

//                     .newsletter-Wrapper .text h3 {
//                         font-size: 1.3rem !important;
//                         margin-bottom: 10px;
//                     }

//                     .newsletter-Wrapper .text p {
//                         font-size: 0.9rem !important;
//                         margin-bottom: 20px;
//                     }

//                     .email-wrapper {
//                         flex-direction: column !important;
//                         gap: 15px;
//                     }

//                     .email-wrapper input {
//                         width: 100% !important;
//                         margin-bottom: 10px;
//                         padding: 12px 15px;
//                         border-radius: 25px;
//                         font-size: 14px;
//                     }

//                     .subscribe-btn {
//                         width: 100% !important;
//                         padding: 12px 20px !important;
//                         border-radius: 25px !important;
//                         font-size: 14px !important;
//                     }

//                     /* Read More button mobile */
//                     .d-flex.justify-content-center.mt-50 {
//                         margin-top: 30px !important;
//                         padding: 0 15px;
//                     }

//                     .d-flex.justify-content-center.mt-50 button {
//                         width: 100% !important;
//                         max-width: 250px;
//                         padding: 12px 25px !important;
//                         font-size: 14px !important;
//                         border-radius: 25px !important;
//                     }

//                     /* Page header mobile */
//                     .sub-header .page-info h2 {
//                         font-size: 1.8rem !important;
//                         margin-bottom: 10px;
//                     }

//                     .sub-header .page-info h6 {
//                         font-size: 0.9rem !important;
//                     }

//                     .sub-header .page-info {
//                         padding: 20px 0;
//                     }

//                     /* Hide elements on mobile that have hideOnMd class */
//                     .hideOnMd {
//                         display: none !important;
//                     }
//                 }

//                 @media (max-width: 480px) {
//                     .portfolio-slider {
//                         height: 220px;
//                         margin-bottom: 25px;
//                     }

//                     .slide-title {
//                         font-size: 1.2rem;
//                     }

//                     .slide-type {
//                         font-size: 0.8rem;
//                     }

//                     .tab-btn {
//                         padding: 8px 15px !important;
//                         font-size: 12px !important;
//                         min-width: 80px !important;
//                     }

//                     .news-card .heading-5 {
//                         font-size: 1rem !important;
//                     }

//                     .newsletter-Wrapper .text h3 {
//                         font-size: 1.1rem !important;
//                     }
//                 }

//                 @keyframes slideIn {
//                     from {
//                         opacity: 0;
//                         transform: translateY(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }

//                 .slide-content {
//                     animation: slideIn 0.6s ease-out;
//                 }
                    
//             `}</style>
//             <Helmet>
//                 <title>
//                     Portfolio - EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider
//                 </title>
//                 <meta
//                     name="description"
//                     content="Welcome to Excerpt Technologies Private Limited. We specialize in Web Design & Development, E-commerce Solutions, Data Analytics, and BI Report Generation."
//                 />
//             </Helmet>

//             <div>
//                 <section style={{
//                     backgroundImage: "url("/images/00.webp)",
//                     backgroundColor: "rgb(255, 255, 255)",

//                 }}
//                     className="sub-header position-relative">
//                     <div className="container">
//                         <div className="page-info ">
//                             <h2 className="heading-2" style={{ color: "white", textAlign: "center" }}>Our Portfolio</h2>
//                             <h6 className="heading-6">
//                                 <Link href="/">Home</Link> / <Link href="#">Portfolio</Link>
//                             </h6>
//                         </div>
//                     </div>
//                 </section>

//                 <section id="projects">
//                     <div className="container">
//                         {/* <div className="section-heading d-flex flex-column align-items-center justify-content-center">
//                             <div className="space120"></div>
//                             <h2 className="heading-2 mb-20">Our Latest Projects</h2>
//                             <div className="paragraph"></div>
//                         </div> */}


//                         <div className="portfolio-slider">
//                             <div className="slider-container">
//                                 {sliderImages.map((item, index) => (
//                                     <div key={item.id} className="slide">
//                                         <Image
//                                             src={item.image}
//                                             alt={item.title}
//                                             className="slide-image"
//                                         />
//                                         <div className="slide-overlay">
//                                             <div className="slide-content">
//                                                 <h3 className="slide-title">{item.title}</h3>
//                                                 <p className="slide-type">{item.type}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Navigation Buttons */}
//                             <button className="slider-nav prev" onClick={prevSlide}>
//                                 &#8249;
//                             </button>
//                             <button className="slider-nav next" onClick={nextSlide}>
//                                 &#8250;
//                             </button>

//                             {/* Dots Indicator */}
//                             <div className="slider-dots">
//                                 {sliderImages.map((_, index) => (
//                                     <span
//                                         key={index}
//                                         className={`dot ${index === currentSlide ? 'active' : ''}`}
//                                         onClick={() => goToSlide(index)}
//                                     />
//                                 ))}
//                             </div>

//                             {/* Progress Bar */}
//                             {/* <div className="slider-progress" /> */}
//                         </div>

//                         {/* Tab Navigation */}
//                         <div className="portfolio-tabs d-flex ">
//                             <div className="tab-wrapper d-flex">
//                                 {categories.map((category) => (
//                                     <button
//                                         key={category}
//                                         className={`tab-btn ${activeTab === category ? 'active' : ''}`}
//                                         onClick={() => {
//                                             setActiveTab(category);
//                                             setShowAll(false); // Reset to show limited items when switching tabs
//                                         }}
//                                         style={{
//                                             padding: '12px 24px',
//                                             margin: '5px 8px',
//                                             border: 'none',
//                                             borderRadius: '25px',
//                                             backgroundColor: activeTab === category ? '#0011ffff' : 'transparent',
//                                             color: activeTab === category ? 'white' : '#333',
//                                             cursor: 'pointer',
//                                             fontWeight: '500',
//                                             transition: 'all 0.3s ease',
//                                             fontSize: '16px',
//                                             textTransform: 'uppercase',
//                                             letterSpacing: '1px',
//                                             minWidth: '120px',
//                                             whiteSpace: 'nowrap'
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             if (activeTab !== category) {
//                                                 e.target.style.backgroundColor = '#f8f9fa';
//                                                 e.target.style.color = '#0011ffff';
//                                             }
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             if (activeTab !== category) {
//                                                 e.target.style.backgroundColor = 'transparent';
//                                                 e.target.style.color = '#333';
//                                             }
//                                         }}
//                                     >
//                                         {category}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <section id="latest-news" className="home__latest--news">
//                         <div className="container">
//                             <div className="row">
//                                 {itemsToShow.map(item => renderPortfolioCard(item))}
//                             </div>

//                             {/* Read More / Show Less Button */}
//                             {hasMoreItems && (
//                                 <div className="d-flex justify-content-center mt-50">
//                                     <button
//                                         onClick={handleReadMore}
//                                         style={{
//                                             padding: '15px 30px',
//                                             border: '2px solid #0011ffff',
//                                             borderRadius: '30px',
//                                             backgroundColor: showAll ? '#0011ffff' : 'transparent',
//                                             color: showAll ? 'white' : '#0011ffff',
//                                             cursor: 'pointer',
//                                             fontWeight: '600',
//                                             fontSize: '16px',
//                                             textTransform: 'uppercase',
//                                             letterSpacing: '1px',
//                                             transition: 'all 0.3s ease',
//                                             minWidth: '180px'
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             if (!showAll) {
//                                                 e.target.style.backgroundColor = '#0011ffff';
//                                                 e.target.style.color = 'white';
//                                             }
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             if (!showAll) {
//                                                 e.target.style.backgroundColor = 'transparent';
//                                                 e.target.style.color = '#0011ffff';
//                                             }
//                                         }}
//                                     >
//                                         {showAll ? 'Show Less' : 'Read More'}
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </section>

//                     <div className="space50"></div>
//                 </section>

//                 <section
//                     style={{
//                         backgroundImage: "url("/images/Newimage/digital-marketing-banner1.webp)",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         backgroundSize: "cover",
//                     }}
//                     id="newsletter"
//                     className="portfolio__newsletter"
//                 >
//                     <style>{`
//     .popup-box {
//       position: fixed;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       background: #fff;
//       color: #333;
//       padding: 20px 30px;
//       border-radius: 8px;
//       font-size: 18px;
//       font-weight: 500;
//       box-shadow: 0 4px 10px rgba(0,0,0,0.25);
//       z-index: 9999;
//       animation: fadeInOut 2.5s ease forwards;
//     }
//     @keyframes fadeInOut {
//       0% { opacity: 0; transform: translate(-50%, -60%); }
//       10% { opacity: 1; transform: translate(-50%, -50%); }
//       90% { opacity: 1; transform: translate(-50%, -50%); }
//       100% { opacity: 0; transform: translate(-50%, -40%); }
//     }
//   `}</style>

//                     <div className="container newsletter-Wrapper">
//                         <div className="text">
//                             <h3>Join to Our Team For More Info</h3>
//                             <p>Excerpt Technologies PVT LTD</p>
//                         </div>

//                         {/* <form
//                             className="form"
//                             onSubmit={(e) => {
//                                 e.preventDefault();
//                                 const popup = document.createElement("div");
//                                 popup.className = "popup-box";
//                                 popup.innerText = "✅ Thank you for submitting!";
//                                 document.body.appendChild(popup);

//                                 setTimeout(() => {
//                                     popup.remove();
//                                 }, 2500);
//                             }}
//                         >
//                             <div className="email-wrapper">
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     placeholder="Enter your email"
//                                     required
//                                 />
//                                 <button type="submit" className="subscribe-btn">
//                                     <span>Reach Us</span>
//                                 </button>
//                             </div>
//                         </form> */}
//                     </div>
//                 </section>


//                 <div className="space50"></div>
//             </div>
//         </>
//     )
// }

// export default Portfolio;



// import React, { useState, useEffect, useRef } from 'react';

// const Portfolio = () => {
//     const [activeTab, setActiveTab] = useState('All');
//     const [showAll, setShowAll] = useState(false);
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [touchStart, setTouchStart] = useState(0);
//     const [touchEnd, setTouchEnd] = useState(0);
//     const sliderRef = useRef(null);

//     // Portfolio data with categories
//     const portfolioItems = [
//         {
//             id: 1,
//             title: "RGVK",
//             category: "Static",
//             type: "Tourism",
//             image: '/portfolio/rgvk.webp",
//             link: "https://rgvkindia.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 2,
//             title: "Car Captain",
//             category: "E-com",
//             type: "E-Commerce",
//             image: '/portfolio/car.webp",
//             link: "https://carcaptain.in/",
//             className: ""
//         },
//         {
//             id: 3,
//             title: "DTECH",
//             category: "CRM",
//             type: "Civil",
//             image: '/portfolio/dtech.webp",
//             link: "https://dtechwale.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 4,
//             title: "RoyalHood",
//             category: "E-com",
//             type: "E-Commerce",
//             image: '/portfolio/royalhood.webp",
//             link: "https://royalhood.in/",
//             className: ""
//         },
//         {
//             id: 5,
//             title: "ANANTA SAUKHYAM",
//             category: "Health",
//             type: "Wellness",
//             image: '/portfolio/ananta.webp",
//             link: "https://anantasaukhyam.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 6,
//             title: "DIEA",
//             category: "CRM",
//             type: "Industrial Association",
//             image: '/portfolio/diea.webp",
//             link: "",
//             className: "hideOnMd"
//         },
//         {
//             id: 7,
//             title: "AUTOMET ENGINEERING",
//             category: "Static",
//             type: "Automobile",
//             image: '/portfolio/automet.webp",
//             link: "http://www.autometengg.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 8,
//             title: "GIFCO AUTO FILTERS INDIA",
//             category: "Static",
//             type: "Automobile",
//             image: '/portfolio/gifco.webp",
//             link: "http://gifcoindia.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 9,
//             title: "Shaw Tech Training Services",
//             category: "LMS",
//             type: "Educational",
//             image: "/portfolio/stts.webp",
//             link: "https://sttsonline.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 10,
//             title: "Mech Mold",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/mech.webp",
//             link: "https://mechmold.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 11,
//             title: "IT DESK MAHADEVPURA",
//             category: "LMS",
//             type: "Educational",
//             image: "/images/p5.webp",
//             link: "https://itdeskmahadevpura.com/",
//             className: ""
//         },
//         {
//             id: 12,
//             title: "CAD DESK MAHADEVPURA",
//             category: "LMS",
//             type: "Educational",
//             image: '/images/p4.webp",
//             link: "http://caddeskmahadevpura.com/",
//             className: ""
//         },
//         {
//             id: 13,
//             title: "Terra Clenz",
//             category: "E-com",
//             type: "E-Commerce",
//             image: "/portfolio/terra.webp",
//             link: "https://terraclenz.com/",
//             className: ""
//         },
//         {
//             id: 14,
//             title: "Cad desk",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/cad.webp",
//             link: "https://caddesk.in/",
//             className: ""
//         },
//         {
//             id: 15,
//             title: "JBK Academy",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/jbk.webp",
//             link: "https://jbkadmin.jbkacademy.in/",
//             className: ""
//         },
//         {
//             id: 16,
//             title: "Triicons",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/triicons.webp",
//             link: "https://triicons.com/",
//             className: ""
//         },
//         {
//             id: 17,
//             title: "City Hospitality Solutions",
//             category: "CRM",
//             type: "CRM",
//             image: "/portfolio/city.webp",
//             link: "https://crm.cityhospitalitysolutions.com",
//             className: ""
//         },
//         {
//             id: 18,
//             title: "Jyothi Cloud ERP",
//             category: "ERP",
//             type: "ERP",
//             image: "/portfolio/erp.webp",
//             link: "https://erp.etpl.ai",
//             className: ""
//         },
//         {
//             id: 19,
//             title: "BDM Technology",
//             category: "Static",
//             type: "Educational",
//             image: "/portfolio/bdm.webp",
//             link: "https://bdmtech.in/",
//             className: ""
//         },
//         {
//             id: 20,
//             title: "Darklick",
//             category: "Static",
//             type: "Product",
//             image: "/portfolio/dark.webp",
//             link: "http://darklick.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 21,
//             title: "Lynx industries",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/lynx.webp",
//             link: "http://lynxindustries.in/",
//             className: "hideOnMd"
//         },
//         {
//             id: 22,
//             title: "P and S Industries",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/ps.webp",
//             link: "http://pandsindustries.in",
//             className: "hideOnMd"
//         },
//         {
//             id: 23,
//             title: " Sri Engineering",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/srii.webp",
//             link: "https://sriengineering.net/",
//             className: "hideOnMd"
//         },
//         {
//             id: 24,
//             title: "Sai Shanti Vidya Niketan",
//             category: "Static",
//             type: "Educational",
//             image: "/portfolio/ssvn.webp",
//             link: "http://saishantividyaniketan.in/",
//             className: "hideOnMd"
//         },
//         {
//             id: 25,
//             title: "Umang Marketing & Engineering Services",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/umang.webp",
//             link: "https://umangmarketing.com/",
//             className: "hideOnMd"
//         },
//         {
//             id: 26,
//             title: "Upstreams",
//             category: "Static",
//             type: "Industrial",
//             image: "/portfolio/upst.webp",
//             link: "https://upstreamhotels.in/",
//             className: "hideOnMd"
//         },
//         {
//             id: 27,
//             title: "Terra Batteries",
//             category: "Static",
//             type: "Ecommerce",
//             image: "/portfolio/terrabat.webp",
//             link: "https://terrabatteries.com/",
//             className: "hideOnMd"
//         },
//     ];

//     // Slider images - using first 8 portfolio items for the slider
//     const sliderImages = portfolioItems.slice(0, 8);

//     // Touch handlers for mobile swipe
//     const handleTouchStart = (e) => {
//         setTouchStart(e.targetTouches[0].clientX);
//     };

//     const handleTouchMove = (e) => {
//         setTouchEnd(e.targetTouches[0].clientX);
//     };

//     const handleTouchEnd = () => {
//         if (!touchStart || !touchEnd) return;
        
//         const distance = touchStart - touchEnd;
//         const isLeftSwipe = distance > 50;
//         const isRightSwipe = distance < -50;

//         if (isLeftSwipe) {
//             nextSlide();
//         }
//         if (isRightSwipe) {
//             prevSlide();
//         }

//         // Reset
//         setTouchStart(0);
//         setTouchEnd(0);
//     };

//     // Auto-slide effect
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//         }, 4000);

//         return () => clearInterval(timer);
//     }, [sliderImages.length]);

//     // Get unique categories
//     const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];

//     // Filter items based on active tab
//     const filteredItems = activeTab === 'All'
//         ? portfolioItems
//         : portfolioItems.filter(item => item.category === activeTab);

//     // Determine how many items to show
//     const initialItemCount = 6;
//     const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, initialItemCount);
//     const hasMoreItems = filteredItems.length > initialItemCount;

//     const renderPortfolioCard = (item) => {
//         const CardContent = () => (
//             <div className={`news-card position-relative ${item.id === 2 ? 'news-card-dyavasandra' : ''}`}
//                 style={item.id === 2 ? { height: "330px" } : {}}>
//                 <div className="img-wrapper mb-30">
//                     <Image src={item.image} alt={item.title} />
//                 </div>
//                 <div className="content">
//                     <h5 className="heading-5">{item.title}</h5>
//                     <div className="paragraph mb-25">{item.type}</div>
//                 </div>
//                 <div className="circle-1 position-absolute"></div>
//                 <div className="circle-2 position-absolute"></div>
//             </div>
//         );

//         return (
//             <div key={item.id} className={`col-md-6 col-lg-4 ${item.className}`}>
//                 {item.link ? (
//                     <Link href={item.link} className="link-to-external-website" target='_blank' rel="noopener noreferrer">
//                         <CardContent />
//                     </Link>
//                 ) : (
//                     <div>
//                         <CardContent />
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     const handleReadMore = () => {
//         setShowAll(!showAll);
//     };

//     const goToSlide = (index) => {
//         setCurrentSlide(index);
//     };

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
//     };

//     return (
//         <>
//             <style>{`
//                 .portfolio-slider {
//                     position: relative;
//                     width: 100%;
//                     height: 580px;
//                     overflow: hidden;
//                     border-radius: 15px;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//                     touch-action: pan-y pinch-zoom;
//                 }

//                 .slider-container {
//                     position: relative;
//                     width: 100%;
//                     height: 100%;
//                     display: flex;
//                     transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//                     transform: translateX(-${currentSlide * 100}%);
//                 }

//                 .slide {
//                     min-width: 100%;
//                     height: 100%;
//                     position: relative;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                 }

//                 .slide-image {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     transition: transform 0.3s ease;
//                     user-select: none;
//                     -webkit-user-drag: none;
//                 }

//                 .slide-overlay {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     background: linear-gradient(45deg, rgba(0, 17, 255, 0.8), rgba(0, 17, 255, 0.4));
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                     align-items: center;
//                     color: white;
//                     text-align: center;
//                     padding: 20px;
//                     opacity: 0;
//                     transition: opacity 0.3s ease;
//                 }

//                 .slide:hover .slide-overlay {
//                     opacity: 1;
//                 }

//                 .slide:hover .slide-image {
//                     transform: scale(1.05);
//                 }

//                 .slide-title {
//                     font-size: 2.5rem;
//                     font-weight: bold;
//                     margin-bottom: 10px;
//                     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//                 }

//                 .slide-type {
//                     font-size: 1.2rem;
//                     font-weight: 300;
//                     opacity: 0.9;
//                 }

//                 .slider-nav {
//                     position: absolute;
//                     top: 50%;
//                     transform: translateY(-50%);
//                     background: rgba(255, 255, 255, 0.9);
//                     border: none;
//                     border-radius: 50%;
//                     width: 50px;
//                     height: 50px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     z-index: 10;
//                     font-size: 20px;
//                     color: #0011ffff;
//                 }

//                 .slider-nav:hover {
//                     background: #0011ffff;
//                     color: white;
//                     transform: translateY(-50%) scale(1.1);
//                 }

//                 .slider-nav:active {
//                     transform: translateY(-50%) scale(0.95);
//                 }

//                 .slider-nav.prev {
//                     left: 20px;
//                 }

//                 .slider-nav.next {
//                     right: 20px;
//                 }

//                 .slider-dots {
//                     position: absolute;
//                     bottom: 20px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     display: flex;
//                     gap: 12px;
//                     z-index: 10;
//                 }

//                 .dot {
//                     width: 12px;
//                     height: 12px;
//                     border-radius: 50%;
//                     background: rgba(255, 255, 255, 0.5);
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     border: 2px solid transparent;
//                 }

//                 .dot.active {
//                     background: white;
//                     transform: scale(1.2);
//                     border-color: #0011ffff;
//                 }

//                 .dot:hover {
//                     background: rgba(255, 255, 255, 0.8);
//                     transform: scale(1.1);
//                 }

//                 /* Mobile-specific improvements */
//                 @media (max-width: 768px) {
//                     .portfolio-slider {
//                         height: 280px;
//                         margin-bottom: 30px;
//                         border-radius: 10px;
//                     }

//                     .slide-title {
//                         font-size: 1.4rem;
//                         line-height: 1.2;
//                         margin-bottom: 8px;
//                     }

//                     .slide-type {
//                         font-size: 0.9rem;
//                     }

//                     .slider-nav {
//                         width: 40px;
//                         height: 40px;
//                         font-size: 18px;
//                         background: rgba(255, 255, 255, 0.95);
//                     }

//                     .slider-nav.prev {
//                         left: 10px;
//                     }

//                     .slider-nav.next {
//                         right: 10px;
//                     }

//                     .slider-dots {
//                         bottom: 12px;
//                         gap: 8px;
//                     }

//                     .dot {
//                         width: 10px;
//                         height: 10px;
//                     }

//                     .slide-overlay {
//                         padding: 15px;
//                         opacity: 0.3;
//                     }

//                     .portfolio-tabs {
//                         margin-top: -50px !important;
//                         margin-bottom: 30px !important;
//                         overflow-x: auto;
//                         padding-bottom: 10px;
//                         -webkit-overflow-scrolling: touch;
//                     }

//                     .tab-wrapper {
//                         min-width: 10px;
//                         gap: 5px;
//                         padding: 0 15px;
//                     }

//                     .tab-btn {
//                         padding: 10px 18px !important;
//                         margin: 0 3px !important;
//                         font-size: 13px !important;
//                         min-width: 10px !important;
//                         white-space: nowrap;
//                         border-radius: 20px !important;
//                         flex-shrink: 0;
//                     }

//                     .col-md-6.col-lg-4 {
//                         margin-bottom: 20px;
//                     }

//                     .news-card {
//                         margin-bottom: 15px;
//                     }

//                     .news-card .img-wrapper {
//                         margin-bottom: 20px;
//                     }

//                     .news-card .heading-5 {
//                         font-size: 1.1rem !important;
//                         line-height: 1.3;
//                         margin-bottom: 10px !important;
//                     }

//                     .news-card .paragraph {
//                         font-size: 0.9rem;
//                         margin-bottom: 15px !important;
//                     }

//                     .hideOnMd {
//                         display: none !important;
//                     }
//                 }

//                 @media (max-width: 480px) {
//                     .portfolio-slider {
//                         height: 220px;
//                         margin-bottom: 25px;
//                     }

//                     .slide-title {
//                         font-size: 1.2rem;
//                     }

//                     .slide-type {
//                         font-size: 0.8rem;
//                     }

//                     .slider-nav {
//                         width: 35px;
//                         height: 35px;
//                         font-size: 16px;
//                     }

//                     .slider-nav.prev {
//                         left: 8px;
//                     }

//                     .slider-nav.next {
//                         right: 8px;
//                     }

//                     .tab-btn {
//                         padding: 8px 15px !important;
//                         font-size: 12px !important;
//                         min-width: 80px !important;
//                     }

//                     .news-card .heading-5 {
//                         font-size: 1rem !important;
//                     }
//                 }

//                 @keyframes slideIn {
//                     from {
//                         opacity: 0;
//                         transform: translateY(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }

//                 .slide-content {
//                     animation: slideIn 0.6s ease-out;
//                 }
//             `}</style>

//             <div>
//                 <section style={{
//                     backgroundImage: "url("/images/00.webp)",
//                     backgroundColor: "rgb(255, 255, 255)",
//                 }}
//                     className="sub-header position-relative">
//                     <div className="container">
//                         <div className="page-info ">
//                             <h2 className="heading-2" style={{ color: "white", textAlign: "center" }}>Our Portfolio</h2>
//                             <h6 className="heading-6">
//                                 <Link href="/">Home</Link> / <Link href="#">Portfolio</Link>
//                             </h6>
//                         </div>
//                     </div>
//                 </section>

//                 <section id="projects">
//                     <div className="container">
//                         <div 
//                             className="portfolio-slider"
//                             ref={sliderRef}
//                             onTouchStart={handleTouchStart}
//                             onTouchMove={handleTouchMove}
//                             onTouchEnd={handleTouchEnd}
//                         >
//                             <div className="slider-container">
//                                 {sliderImages.map((item) => (
//                                     <div key={item.id} className="slide">
//                                         <Image
//                                             src={item.image}
//                                             alt={item.title}
//                                             className="slide-image"
//                                             draggable="false"
//                                         />
//                                         <div className="slide-overlay">
//                                             <div className="slide-content">
//                                                 <h3 className="slide-title">{item.title}</h3>
//                                                 <p className="slide-type">{item.type}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
//                                 &#8249;
//                             </button>
//                             <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
//                                 &#8250;
//                             </button>

//                             <div className="slider-dots">
//                                 {sliderImages.map((_, index) => (
//                                     <span
//                                         key={index}
//                                         className={`dot ${index === currentSlide ? 'active' : ''}`}
//                                         onClick={() => goToSlide(index)}
//                                         role="button"
//                                         aria-label={`Go to slide ${index + 1}`}
//                                     />
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="portfolio-tabs d-flex ">
//                             <div className="tab-wrapper d-flex">
//                                 {categories.map((category) => (
//                                     <button
//                                         key={category}
//                                         className={`tab-btn ${activeTab === category ? 'active' : ''}`}
//                                         onClick={() => {
//                                             setActiveTab(category);
//                                             setShowAll(false);
//                                         }}
//                                         style={{
//                                             padding: '12px 24px',
//                                             margin: '5px 8px',
//                                             border: 'none',
//                                             borderRadius: '25px',
//                                             backgroundColor: activeTab === category ? '#0011ffff' : 'transparent',
//                                             color: activeTab === category ? 'white' : '#333',
//                                             cursor: 'pointer',
//                                             fontWeight: '500',
//                                             transition: 'all 0.3s ease',
//                                             fontSize: '16px',
//                                             textTransform: 'uppercase',
//                                             letterSpacing: '1px',
//                                             minWidth: '120px',
//                                             whiteSpace: 'nowrap'
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             if (activeTab !== category) {
//                                                 e.target.style.backgroundColor = '#f8f9fa';
//                                                 e.target.style.color = '#0011ffff';
//                                             }
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             if (activeTab !== category) {
//                                                 e.target.style.backgroundColor = 'transparent';
//                                                 e.target.style.color = '#333';
//                                             }
//                                         }}
//                                     >
//                                         {category}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <section id="latest-news" className="home__latest--news">
//                         <div className="container">
//                             <div className="row">
//                                 {itemsToShow.map(item => renderPortfolioCard(item))}
//                             </div>

//                             {hasMoreItems && (
//                                 <div className="d-flex justify-content-center mt-50">
//                                     <button
//                                         onClick={handleReadMore}
//                                         style={{
//                                             padding: '15px 30px',
//                                             border: '2px solid #0011ffff',
//                                             borderRadius: '30px',
//                                             backgroundColor: showAll ? '#0011ffff' : 'transparent',
//                                             color: showAll ? 'white' : '#0011ffff',
//                                             cursor: 'pointer',
//                                             fontWeight: '600',
//                                             fontSize: '16px',
//                                             textTransform: 'uppercase',
//                                             letterSpacing: '1px',
//                                             transition: 'all 0.3s ease',
//                                             minWidth: '180px'
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             if (!showAll) {
//                                                 e.target.style.backgroundColor = '#0011ffff';
//                                                 e.target.style.color = 'white';
//                                             }
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             if (!showAll) {
//                                                 e.target.style.backgroundColor = 'transparent';
//                                                 e.target.style.color = '#0011ffff';
//                                             }
//                                         }}
//                                     >
//                                         {showAll ? 'Show Less' : 'Read More'}
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </section>

//                     <div className="space50"></div>
//                 </section>

//                 <section
//                     style={{
//                         backgroundImage: "url("/images/Newimage/digital-marketing-banner1.webp)",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         backgroundSize: "cover",
//                     }}
//                     id="newsletter"
//                     className="portfolio__newsletter"
//                 >
//                     <div className="container newsletter-Wrapper">
//                         <div className="text">
//                             <h3>Join to Our Team For More Info</h3>
//                             <p>Excerpt Technologies PVT LTD</p>
//                         </div>
//                     </div>
//                 </section>

//                 <div className="space50"></div>
//             </div>
//         </>
//     );
// };

// export default Portfolio;


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [showAll, setShowAll] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Portfolio data with categories
    const portfolioItems = [
        {
            id: 1,
            title: "RGVK",
            category: "Static",
            type: "Tourism",
            image: "/portfolio/rgvk.webp",
            link: "https://rgvkindia.com/",
            className: "hideOnMd"
        },
        {
            id: 2,
            title: "Car Captain",
            category: "E-com",
            type: "E-Commerce",
            image: "/portfolio/car.webp",
            link: "https://carcaptain.in/",
            className: ""
        },
        {
            id: 3,
            title: "DTECH",
            category: "CRM",
            type: "Civil",
            image: "/portfolio/dtech.webp",
            link: "https://dtechwale.com/",
            className: "hideOnMd"
        },
        {
            id: 4,
            title: "RoyalHood",
            category: "E-com",
            type: "E-Commerce",
            image: "/portfolio/royalhood.webp",
            link: "https://royalhood.in/",
            className: ""
        },
        {
            id: 5,
            title: "ANANTA SAUKHYAM",
            category: "Health",
            type: "Wellness",
            image: "/portfolio/ananta.webp",
            link: "https://anantasaukhyam.com/",
            className: "hideOnMd"
        },
        {
            id: 6,
            title: "DIEA",
            category: "CRM",
            type: "Industrial Association",
            image: "/portfolio/diea.webp",
            link: "",
            className: "hideOnMd"
        },
        {
            id: 7,
            title: "AUTOMET ENGINEERING",
            category: "Static",
            type: "Automobile",
            image: "/portfolio/automet.webp",
            link: "http://www.autometengg.com/",
            className: "hideOnMd"
        },
        {
            id: 8,
            title: "GIFCO AUTO FILTERS",
            category: "Static",
            type: "Automobile",
            image: "/portfolio/gifco.webp",
            link: "http://gifcoindia.com/",
            className: "hideOnMd"
        },
        {
            id: 9,
            title: "Shaw Tech Training Services",
            category: "LMS",
            type: "Educational",
            image: "/portfolio/stts.webp",
            link: "https://sttsonline.com/",
            className: "hideOnMd"
        },
        {
            id: 10,
            title: "Mech Mold",
            category: "Static",
            type: "Industrial",
            image: "/portfolio/mech.webp",
            link: "https://mechmold.com/",
            className: "hideOnMd"
        },
        {
            id: 11,
            title: "IT DESK MAHADEVPURA",
            category: "LMS",
            type: "Educational",
            image: "/images/p5.webp",
            link: "https://itdeskmahadevpura.com/",
            className: ""
        },
        {
            id: 12,
            title: "CAD DESK MAHADEVPURA",
            category: "LMS",
            type: "Educational",
            image: "/images/p4.webp",
            link: "http://caddeskmahadevpura.com/",
            className: ""
        },
        {
            id: 13,
            title: "Terra Clenz",
            category: "E-com",
            type: "E-Commerce",
            image: "/portfolio/terra.webp",
            link: "https://terraclenz.com/",
            className: ""
        },
        {
            id: 14,
            title: "Cad desk",
            category: "CRM",
            type: "CRM",
            image: "/portfolio/cad.webp",
            link: "https://caddesk.in/",
            className: ""
        },
        {
            id: 15,
            title: "JBK Academy",
            category: "CRM",
            type: "CRM",
            image: "/portfolio/jbk.webp",
            link: "https://jbkadmin.jbkacademy.in/",
            className: ""
        },
        {
            id: 16,
            title: "Triicons",
            category: "CRM",
            type: "CRM",
            image: "/portfolio/triicons.webp",
            link: "https://triicons.com/",
            className: ""
        },
        {
            id: 17,
            title: "City Hospitality Solutions",
            category: "CRM",
            type: "CRM",
            image: "/portfolio/city.webp",
            link: "https://crm.cityhospitalitysolutions.com",
            className: ""
        },
        {
            id: 18,
            title: "Jyothi Cloud ERP",
            category: "ERP",
            type: "ERP",
            image: "/portfolio/erp.webp",
            link: "https://erp.etpl.ai",
            className: ""
        },
        {
            id: 19,
            title: "BDM Technology",
            category: "Static",
            type: "Educational",
            image: "/portfolio/bdm.webp",
            link: "https://bdmtech.in/",
            className: ""
        },
        {
            id: 20,
            title: "Darklick",
            category: "Static",
            type: "Product",
            image: "/portfolio/dark.webp",
            link: "http://darklick.com/",
            className: "hideOnMd"
        },
        {
            id: 21,
            title: "Lynx industries",
            category: "Static",
            type: "Industrial",
            image: "/portfolio/lynx.webp",
            link: "http://lynxindustries.in/",
            className: "hideOnMd"
        },
        {
            id: 22,
            title: "P and S Industries",
            category: "Static",
            type: "Industrial",
            image: "/portfolio/ps.webp",
            link: "http://pandsindustries.in",
            className: "hideOnMd"
        },
        {
            id: 23,
            title: " Sri Engineering",
            category: "Static",
            type: "Industrial",
            image: "/portfolio/srii.webp",
            link: "https://sriengineering.net/",
            className: "hideOnMd"
        },
        {
            id: 24,
            title: "Sai Shanti Vidya Niketan",
            category: "Static",
            type: "Educational",
            image: "/portfolio/ssvn.webp",
            link: "http://saishantividyaniketan.in/",
            className: "hideOnMd"
        },
        {
            id: 25,
            title: "Umang Marketing & Engineering Services",
            category: "Static",
            type: "Industrial",
            image: "/portfolio/umang.webp",
            link: "https://umangmarketing.com/",
            className: "hideOnMd"
        },
        {
            id: 26,
            title: "Upstreams",
            category: "Static",
            type: "Industrial",
            image: "/portfolio/upst.webp",
            link: "https://upstreamhotels.in/",
            className: "hideOnMd"
        },
        {
            id: 27,
            title: "Terra Batteries",
            category: "Static",
            type: "Ecommerce",
            image: "/portfolio/terrabat.webp",
            link: "https://terrabatteries.com/",
            className: "hideOnMd"
        },
    ];

    // Slider images - using first 8 portfolio items for the slider
    const sliderImages = portfolioItems.slice(0, 8);

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [sliderImages.length]);

    // Get unique categories
    const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];

    // Filter items based on active tab
    const filteredItems = activeTab === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeTab);

    // Determine how many items to show
    const initialItemCount = 6;
    const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, initialItemCount);
    const hasMoreItems = filteredItems.length > initialItemCount;

    const renderPortfolioCard = (item) => {
        const CardContent = () => (
            <div className={`news-card position-relative ${item.id === 2 ? 'news-card-dyavasandra' : ''}`}
                style={item.id === 2 ? { height: "330px" } : {}}>
                <div className="img-wrapper mb-30">
                    {/* CLS guard: fixed dimensions + display block to reserve space */}
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      width="400" 
                      height="300" 
                      loading="lazy" 
                      decoding="async"
                      style={{ display: 'block', aspectRatio: '400 / 300' }}
                    />
                </div>
                <div className="content">
                    <h5 className="heading-5">{item.title}</h5>
                    <div className="paragraph mb-25">{item.type}</div>
                </div>
                <div className="circle-1 position-absolute"></div>
                <div className="circle-2 position-absolute"></div>
            </div>
        );

        return (
            <div key={item.id} className={`col-md-6 col-lg-4 ${item.className}`}>
                {item.link ? (
                    <Link href={item.link} className="link-to-external-website" target='_blank' rel="noopener noreferrer">
                        <CardContent />
                    </Link>
                ) : (
                    <div>
                        <CardContent />
                    </div>
                )}
            </div>
        );
    };

    const handleReadMore = () => {
        setShowAll(!showAll);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    return (
        <div>
            <style>{`
                .simple-slider-ram {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    height: 580px;
                    overflow: hidden;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    background: #e9ecef;
                }

                .simple-slides-wrapper-ram {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .simple-single-slide-ram {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                }

                .simple-single-slide-ram.active-slide-ram {
                    opacity: 1;
                    z-index: 1;
                }

                .simple-slide-img-ram {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .simple-nav-btn-ram {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.95);
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    font-size: 24px;
                    color: #0011ff;
                    font-weight: bold;
                    transition: all 0.3s;
                }

                .simple-nav-btn-ram:hover {
                    background: #0011ff;
                    color: white;
                    transform: translateY(-50%) scale(1.1);
                }

                .simple-nav-btn-ram.left-ram {
                    left: 20px;
                }

                .simple-nav-btn-ram.right-ram {
                    right: 20px;
                }

                .simple-dots-wrapper-ram {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 12px;
                    z-index: 10;
                }

                .simple-dot-ram {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    transition: all 0.3s;
                    border: 2px solid rgba(0, 17, 255, 0.3);
                }

                .simple-dot-ram.dot-active-ram {
                    background: #0011ff;
                    transform: scale(1.3);
                    border-color: #0011ff;
                }

                @media (max-width: 768px) {
                    .simple-slider-ram {
                        height: 300px;
                        margin-bottom: 30px;
                    }

                    .simple-slide-img-ram {
                        object-fit: contain;
                        padding: 20px;
                    }

                    .simple-nav-btn-ram {
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }

                    .simple-nav-btn-ram.left-ram {
                        left: 10px;
                    }

                    .simple-nav-btn-ram.right-ram {
                        right: 10px;
                    }

                    .simple-dots-wrapper-ram {
                        bottom: 10px;
                        gap: 8px;
                    }

                    .simple-dot-ram {
                        width: 10px;
                        height: 10px;
                    }

                    .portfolio-tabs-ram {
                        margin-top: 20px !important;
                        margin-bottom: 30px !important;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                    }

                    .tab-wrapper-ram {
                        display: flex;
                        gap: 8px;
                        padding: 0 15px;
                    }

                    .tab-btn-ram {
                        padding: 10px 18px !important;
                        font-size: 13px !important;
                        white-space: nowrap;
                        flex-shrink: 0;
                    }

                    .hideOnMd {
                        display: none !important;
                    }
                }

                @media (max-width: 480px) {
                    .simple-slider-ram {
                        height: 250px;
                    }

                    .simple-nav-btn-ram {
                        width: 35px;
                        height: 35px;
                        font-size: 18px;
                    }

                    .simple-nav-btn-ram.left-ram {
                        left: 8px;
                    }

                    .simple-nav-btn-ram.right-ram {
                        right: 8px;
                    }
                }
            `}</style>

            <section style={{
                backgroundImage: `url("/images/00.webp")`,
                backgroundColor: "rgb(255, 255, 255)",
            }}
                className="sub-header position-relative">
                <div className="container">
                    <div className="page-info ">
                        <h2 className="heading-2" style={{ color: "white", textAlign: "center" }}>Our Portfolio</h2>
                        <h6 className="heading-6">
                            <Link href="/">Home</Link> / <Link href="#">Portfolio</Link>
                        </h6>
                    </div>
                </div>
            </section>

            <section id="projects">
                <div className="container">
                    <div className="simple-slider-ram">
                        <div className="simple-slides-wrapper-ram">
                            {sliderImages.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`simple-single-slide-ram ${index === currentSlide ? 'active-slide-ram' : ''}`}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        className="simple-slide-img-ram"
                                        width="1200"
                                        height="580"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </div>

                        <button className="simple-nav-btn-ram left-ram" onClick={prevSlide}>
                            ‹
                        </button>
                        <button className="simple-nav-btn-ram right-ram" onClick={nextSlide}>
                            ›
                        </button>

                        <div className="simple-dots-wrapper-ram">
                            {sliderImages.map((_, index) => (
                                <span
                                    key={index}
                                    className={`simple-dot-ram ${index === currentSlide ? 'dot-active-ram' : ''}`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="portfolio-tabs-ram d-flex">
                        <div className="tab-wrapper-ram d-flex">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`tab-btn-ram ${activeTab === category ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTab(category);
                                        setShowAll(false);
                                    }}
                                    style={{
                                        padding: '12px 24px',
                                        margin: '5px 8px',
                                        border: 'none',
                                        borderRadius: '25px',
                                        backgroundColor: activeTab === category ? '#0011ffff' : 'transparent',
                                        color: activeTab === category ? 'white' : '#333',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease',
                                        fontSize: '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        minWidth: '120px',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (activeTab !== category) {
                                            e.target.style.backgroundColor = '#f8f9fa';
                                            e.target.style.color = '#0011ffff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeTab !== category) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#333';
                                        }
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <section id="latest-news" className="home__latest--news">
                    <div className="container">
                        <div className="row">
                            {itemsToShow.map(item => renderPortfolioCard(item))}
                        </div>

                        {hasMoreItems && (
                            <div className="d-flex justify-content-center mt-50">
                                <button
                                    onClick={handleReadMore}
                                    style={{
                                        padding: '15px 30px',
                                        border: '2px solid #0011ffff',
                                        borderRadius: '30px',
                                        backgroundColor: showAll ? '#0011ffff' : 'transparent',
                                        color: showAll ? 'white' : '#0011ffff',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        transition: 'all 0.3s ease',
                                        minWidth: '180px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!showAll) {
                                            e.target.style.backgroundColor = '#0011ffff';
                                            e.target.style.color = 'white';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!showAll) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#0011ffff';
                                        }
                                    }}
                                >
                                    {showAll ? 'Show Less' : 'Read More'}
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                <div className="space50"></div>
            </section>

            <section
                style={{
                    backgroundImage: `url("/images/Newimage/digital-marketing-banner1.webp")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                id="newsletter"
                className="portfolio__newsletter"
            >
                <div className="container newsletter-Wrapper">
                    <div className="text">
                        <h3>Join to Our Team For More Info</h3>
                        <p>Excerpt Technologies PVT LTD</p>
                    </div>
                </div>
            </section>

            <div className="space50"></div>
        </div>
    );
};

export default Portfolio;