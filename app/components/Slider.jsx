// 'use client';

// // import React, { useState, useEffect } from 'react';
// // import './Slider.css'

// // function Slider() {
// //   const slides = [
// //     {
// //       image: '/images/home1/slider/s1.webp',
// //       caption: 'Breaking Boundaries, One Innovation At a Time.',
// //     },
// //     {
// //       image: '/images/home1/slider/s2.webp',
// //       caption: 'Where Ideas Ignite And Dreams Take Flight',
// //     },
// //     {
// //       image: '/images/home1/slider/s3.webp',
// //       caption: 'A Triumphant Three Years Of Software ',
// //     },
// //     {
// //       image: '/Trainingimage/img.webp',
// //       caption: '  IT Corporate Training ',
// //     },
// //     {
// //       image: '/Trainingimage/sm.webp',
// //       caption: '  ',
// //     },
// //   ];

// //   const [currentSlide, setCurrentSlide] = useState(0);

// //   useEffect(() => {
// //     const intervalId = setInterval(() => {
// //       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
// //     }, 4000); 

// //     return () => clearInterval(intervalId);
// //   }, [slides.length]);

// //   return (
// //     <div>
// //       <section id="hero">
// //         <div className="hero-1-slide" style={{ height: '100px' }}>
// //           <div className="slide-wrapper" >
// //             {slides.map((slide, index) => (
// //               <div
// //   key={index}
// //   className="slider-image slide-card"
// //   style={{
// //     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
// //                       url(${slide.image})`,
// //     display: index === currentSlide ? 'block' : 'none',
// //     backgroundSize: 'cover',
// //     backgroundRepeat: 'no-repeat',
// //     height: '600px',
// //     width: '100%',
// //     animation: 'slideAnimation 5s forwards',
// //     animationDirection: 'alternate', 
// //   }}
// // >

// //                 <div className="slide__card--wrapper">

// //                   <h2 className="heading-2 mb-25" style={{ animation: 'textAnimation 1s forwards',color:"white" }}>{slide.caption}</h2>
// //                   <h1 style={{ animation: 'textAnimation 1s forwards' }}>IT Solutions</h1>
// //                   <div className="heading-7 mb-30" style={{ animation: 'textAnimation 1s forwards',color:"white" }}>
// //                     Innovative Solutions, Seamless Experiences.
// //                   </div>
// //                   <a href="/Excerptitservices" className="button-primary-1" style={{ animation: 'textAnimation 1s forwards' }}>
// //                     <span>Read More</span>
// //                   </a>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <img className="curve-overlay" style={{ marginTop: '100px', height: "60px" }} src="/images/home1/c1.webp" alt="" />
// //           <div className="overlay-wrapper">
// //             <div className="left-overlay"></div>
// //             <div className="right-overlay"></div>
// //           </div>
// //         </div>

// //         <div className="hero-contact d-flex">
// //           <ul className="d-flex phone-email">
// //             <li className="paragraph-3">
// //               <span>
// //                 <i className="fa-solid fa-envelope"></i>
// //               </span>
// //               <a href="mailto:info@excerptech.com">info@excerptech.com</a>
// //             </li>
// //             <li className="paragraph-3">
// //               <span>
// //                 <i className="fa-solid fa-phone"></i> 
// //                 <a href='tel:+916364657660'> +91 63646 57660</a>
// //               </span>
// //             </li>
// //             <li className="paragraph-3" style={{ marginRight: "-42px" }}></li>
// //           </ul>
// //           <ul className="d-flex social">
// //             <li>
// //               <a href="https://www.facebook.com/Excerptechnology/" target="_blank">
// //                 <i className="fa-brands fa-facebook-f"></i>
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank">
// //                 <i className="fa-brands fa-instagram"></i>
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://www.linkedin.com/company/excerptech" target="_blank">
// //                 <i className="fa-brands fa-linkedin-in"></i>
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // export default Slider;


// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'next/link';
// // import './Slider.css';
// // import { memo } from 'react'

// // function Slider() {
// //   const slides = [
// //     {
// //       image: '/images/home1/slider/s1.webp',
// //       caption: 'Breaking Boundaries, One Innovation At a Time.',
// //     },
// //     {
// //       image: '/images/home1/slider/s2.webp',
// //       caption: 'Where Ideas Ignite And Dreams Take Flight',
// //     },
// //     {
// //       image: '/images/home1/slider/s3.webp',
// //       caption: 'A Triumphant Three Years Of Software',
// //     },
// //     {
// //       image: '/Trainingimage/img.webp',
// //       caption: 'IT Corporate Training',
// //     },
// //     {
// //       image: '/Trainingimage/sm.webp',
// //       caption: '',
// //     },
// //   ];

// //   const [currentSlide, setCurrentSlide] = useState(0);

// //   useEffect(() => {
// //     const intervalId = setInterval(() => {
// //       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
// //     }, 4000);

// //     return () => clearInterval(intervalId);
// //   }, [slides.length]);

// //   const getSlideHeightClass = () => {
// //     if (window.innerWidth <= 480) return 'height-200';
// //     if (window.innerWidth <= 768) return 'height-300';
// //     return 'height-600';
// //   };

// //   return (
// //     <div>
// //       <section id="hero">
// //         <div className="hero-1-slide">
// //           <div className="slide-wrapper">
// //             {slides.map((slide, index) => (
// //               <div
// //                 key={index}
// //                 className={`slide-image slide-card ${getSlideHeightClass()}`}
// //                 style={{
// //                   backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${slide.image})`,
// //                   display: index === currentSlide ? 'block' : 'none',
// //                 }}
// //               >
// //                 <div className="slide__card--wrapper">
// //                   <h2 className="heading-2 mb-25" style={{ color: 'white' }}>{slide.caption}</h2>
// //                   <h1>IT Solutions</h1>
// //                   <div className="heading-7 mb-30" style={{ color: 'white' }}>
// //                     Innovative Solutions, Seamless Experiences.
// //                   </div>
// //                   {slide.caption === 'IT Corporate Training' ? (
// //                     <Link href="/Excerptitservices" className="button-primary-1">
// //                       <span>Read More</span>
// //                     </Link>
// //                   ) : (
// //                     <Link href="/portfolio" className="button-primary-1">
// //                       <span>Read More</span>
// //                     </Link>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <img className="curve-overlay" style={{ marginTop: '100px', height: '60px' }} src="/images/home1/c1.webp" alt="" />
// //           <div className="overlay-wrapper">
// //             <div className="left-overlay"></div>
// //             <div className="right-overlay"></div>
// //           </div>
// //         </div>

// //         <div className="hero-contact d-flex">
// //           <ul className="d-flex phone-email">
// //             <li className="paragraph-3">
// //               <span>
// //                 <i className="fa-solid fa-envelope"></i>
// //               </span>
// //               <a href="mailto:info@excerptech.com">info@excerptech.com</a>
// //             </li>
// //             <li className="paragraph-3">
// //               <span>
// //                 <i className="fa-solid fa-phone"></i>
// //                 <a href="tel:+916364657660"> +91 63646 57660</a>
// //               </span>
// //             </li>
// //           </ul>
// //           <ul className="d-flex social">
// //             <li>
// //               <a href="https://www.facebook.com/Excerptechnology/" target="_blank" rel="noopener noreferrer">
// //                 <i className="fa-brands fa-facebook-f"></i>
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank" rel="noopener noreferrer">
// //                 <i className="fa-brands fa-instagram"></i>
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://www.linkedin.com/company/excerptech" target="_blank" rel="noopener noreferrer">
// //                 <i className="fa-brands fa-linkedin-in"></i>
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // export default Slider;

// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import { Link } from 'next/link';
// // import './Slider.css';

// // // Preload critical images
// // const preloadImages = (imageSrcs) => {
// //   imageSrcs.forEach(src => {
// //     const img = new Image();
// //     img.src = src;
// //   });
// // };

// // const Slider = React.memo(() => {
// //   const slides = useMemo(() => [
// //     {
// //       image: '/images/home1/slider/s1.webp',
// //       caption: 'Breaking Boundaries, One Innovation At a Time.',
// //     },
// //     {
// //       image: '/images/home1/slider/s2.webp',
// //       caption: 'Where Ideas Ignite And Dreams Take Flight',
// //     },
// //     {
// //       image: '/images/home1/slider/s3.webp',
// //       caption: 'A Triumphant Three Years Of Software',
// //     },
// //     {
// //       image: '/Trainingimage/img.webp',
// //       caption: 'IT Corporate Training',
// //     },
// //     {
// //       image: '/Trainingimage/sm.webp',
// //       caption: '',
// //     },
// //   ], []);

// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const [screenSize, setScreenSize] = useState('desktop');

// //   // Optimized screen size detection
// //   const updateScreenSize = useCallback(() => {
// //     const width = window.innerWidth;
// //     if (width <= 480) setScreenSize('mobile');
// //     else if (width <= 768) setScreenSize('tablet');
// //     else setScreenSize('desktop');
// //   }, []);

// //   // Get height class based on screen size
// //   const getSlideHeightClass = useCallback(() => {
// //     switch (screenSize) {
// //       case 'mobile': return 'height-200';
// //       case 'tablet': return 'height-300';
// //       default: return 'height-600';
// //     }
// //   }, [screenSize]);

// //   // Preload images and set up resize listener
// //   useEffect(() => {
// //     // Preload first image immediately, others after a delay
// //     const firstImage = new Image();
// //     firstImage.onload = () => setIsLoaded(true);
// //     firstImage.src = slides[0].image;

// //     // Preload remaining images after a short delay
// //     setTimeout(() => {
// //       preloadImages(slides.slice(1).map(slide => slide.image));
// //     }, 100);

// //     // Screen size listener with debounce
// //     let resizeTimer;
// //     const handleResize = () => {
// //       clearTimeout(resizeTimer);
// //       resizeTimer = setTimeout(updateScreenSize, 150);
// //     };

// //     updateScreenSize(); // Initial call
// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //       clearTimeout(resizeTimer);
// //     };
// //   }, [slides, updateScreenSize]);

// //   // Auto-slide effect
// //   useEffect(() => {
// //     if (!isLoaded) return;

// //     const intervalId = setInterval(() => {
// //       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
// //     }, 4000);

// //     return () => clearInterval(intervalId);
// //   }, [slides.length, isLoaded]);

// //   // Loading skeleton
// //   if (!isLoaded) {
// //     return (
// //       <div className="slider-skeleton">
// //         <div className={`slide-skeleton ${getSlideHeightClass()}`}>
// //           <div className="skeleton-content">
// //             <div className="skeleton-title"></div>
// //             <div className="skeleton-subtitle"></div>
// //             <div className="skeleton-button"></div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <section id="hero">
// //         <div className="hero-1-slide">
// //           <div className="slide-wrapper">
// //             {slides.map((slide, index) => {
// //               const isActive = index === currentSlide;
// //               const isNext = index === (currentSlide + 1) % slides.length;

// //               return (
// //                 <div
// //                   key={index}
// //                   className={`slide-image slide-card ${getSlideHeightClass()}`}
// //                   style={{
// //                     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${slide.image})`,
// //                     display: isActive ? 'block' : 'none',
// //                     // Preload next slide
// //                     ...(isNext && { backgroundImage: `url(${slide.image})` }),
// //                   }}
// //                 >
// //                   {isActive && (
// //                     <div className="slide__card--wrapper">
// //                       <h2 className="heading-2 mb-25" style={{ color: 'white' }}>
// //                         {slide.caption}
// //                       </h2>
// //                       <h1>IT Solutions</h1>
// //                       <div className="heading-7 mb-30" style={{ color: 'white' }}>
// //                         Innovative Solutions, Seamless Experiences.
// //                       </div>
// //                       {slide.caption === 'IT Corporate Training' ? (
// //                         <Link 
// //                           href="/Excerptitservices" 
// //                           className="button-primary-1"
// //                           aria-label="Learn more about IT Corporate Training"
// //                         >
// //                           <span>Read More</span>
// //                         </Link>
// //                       ) : (
// //                         <Link 
// //                           href="/portfolio" 
// //                           className="button-primary-1"
// //                           aria-label="View our portfolio"
// //                         >
// //                           <span>Read More</span>
// //                         </Link>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* Optimized curve overlay with lazy loading */}
// //           <img 
// //             className="curve-overlay" 
// //             style={{ marginTop: '100px', height: '60px' }} 
// //             src="/images/home1/c1.webp" 
// //             alt=""
// //             loading="lazy"
// //             decoding="async"
// //           />

// //           <div className="overlay-wrapper">
// //             <div className="left-overlay"></div>
// //             <div className="right-overlay"></div>
// //           </div>
// //         </div>

// //         <div className="hero-contact d-flex">
// //           <ul className="d-flex phone-email">
// //             <li className="paragraph-3">
// //               <span>
// //                 <i className="fa-solid fa-envelope" aria-hidden="true"></i>
// //               </span>
// //               <a href="mailto:info@excerptech.com" aria-label="Email us">
// //                 info@excerptech.com
// //               </a>
// //             </li>
// //             <li className="paragraph-3">
// //               <span>
// //                 <i className="fa-solid fa-phone" aria-hidden="true"></i>
// //                 <a href="tel:+916364657660" aria-label="Call us"> +91 63646 57660</a>
// //               </span>
// //             </li>
// //           </ul>
// //           <ul className="d-flex social">
// //             <li>
// //               <a 
// //                 href="https://www.facebook.com/Excerptechnology/" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer"
// //                 aria-label="Visit our Facebook page"
// //               >
// //                 <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
// //               </a>
// //             </li>
// //             <li>
// //               <a 
// //                 href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer"
// //                 aria-label="Visit our Instagram page"
// //               >
// //                 <i className="fa-brands fa-instagram" aria-hidden="true"></i>
// //               </a>
// //             </li>
// //             <li>
// //               <a 
// //                 href="https://www.linkedin.com/company/excerptech" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer"
// //                 aria-label="Visit our LinkedIn page"
// //               >
// //                 <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // });

// // Slider.displayName = 'Slider';

// // export default Slider;
// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import Link from 'next/link';

// const Slider = React.memo(() => {
//   const slides = useMemo(() => [
//     {
//       image: '/images/home1/slider/s3.webp',
//       caption: 'A Triumphant Three Years Of Software',
//       useGradient: false,
//     },
//     {
//       image: '/images/home1/slider/s1.webp',
//       caption: 'Breaking Boundaries, One Innovation At a Time.',
//       useGradient: false,
//     },
//     {
//       image: '/images/home1/slider/s2.webp',
//       caption: 'Where Ideas Ignite And Dreams Take Flight',
//       useGradient: false,
//     },
//     {
//       image: '/Trainingimage/sm.webp',
//       caption: 'Breaking Boundaries, One Innovation At a Time.',
//       useGradient: false,
//     },
//   ], []);

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 4000);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, [slides.length]);

//   return (
//     <div className="slider-container">
//       <style jsx>{`
//         /* Mobile-first responsive styles */
//         .slider-container {
//           width: 100%;
//           position: relative;
//         }

//         #hero {
//           background-color: black;
//           width: 100%;
//           overflow: hidden;
//         }

//         .hero-1-slide {
//           width: 100%;
//           position: relative;
//         }

//         /* Responsive height for slider */
//         @media (min-width: 1200px) {
//           .hero-1-slide {
//             height: 88vh;
//             min-height: 600px;
//           }
//         }

//         @media (min-width: 992px) and (max-width: 1199px) {
//           .hero-1-slide {
//             height: 75vh;
//             min-height: 500px;
//           }
//         }

//         @media (min-width: 768px) and (max-width: 991px) {
//           .hero-1-slide {
//             height: 65vh;
//             min-height: 450px;
//           }
//         }

//         @media (min-width: 576px) and (max-width: 767px) {
//           .hero-1-slide {
//             height: 55vh;
//             min-height: 380px;
//           }
//         }

//         @media (max-width: 575px) {
//           .hero-1-slide {
//             height: 50vh;
//             min-height: 350px;
//           }
//         }

//         @media (max-width: 480px) {
//           .hero-1-slide {
//             height: 45vh;
//             min-height: 300px;
//           }
//         }

//         @media (max-width: 360px) {
//           .hero-1-slide {
//             height: 40vh;
//             min-height: 280px;
//           }
//         }

//         .slide-wrapper {
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }

//         .slide-image {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//           transition: opacity 0.8s ease-in-out;
//         }

//         /* Responsive text sizes */
//         .slide-caption-desktop {
//           font-size: 48px;
//           line-height: 1.2;
//         }

//         .slide-caption-tablet {
//           font-size: 32px;
//           line-height: 1.2;
//         }

//         .slide-caption-mobile {
//           font-size: 24px;
//           line-height: 1.3;
//         }

//         .slide-subtitle-desktop {
//           font-size: 36px;
//         }

//         .slide-subtitle-tablet {
//           font-size: 28px;
//         }

//         .slide-subtitle-mobile {
//           font-size: 22px;
//         }

//         .slide-description-desktop {
//           font-size: 18px;
//         }

//         .slide-description-tablet {
//           font-size: 16px;
//         }

//         .slide-description-mobile {
//           font-size: 14px;
//         }

//         /* Button responsive styles */
//         .slider-button {
//           width: 190px;
//           height: 60px;
//         }

//         @media (max-width: 768px) {
//           .slider-button {
//             width: 160px;
//             height: 50px;
//             font-size: 16px;
//           }
//         }

//         @media (max-width: 480px) {
//           .slider-button {
//             width: 140px;
//             height: 45px;
//             font-size: 14px;
//             margin-top: 20px;
//           }
//         }

//         /* Two-column layout for desktop, single column for mobile */
//         .slide-content-wrapper {
//           display: flex;
//           width: 100%;
//           height: 100%;
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 0 40px;
//           align-items: center;
//           gap: 60px;
//         }

//         @media (max-width: 992px) {
//           .slide-content-wrapper {
//             flex-direction: column;
//             padding: 0 30px;
//             gap: 30px;
//             justify-content: center;
//             text-align: center;
//           }
//         }

//         @media (max-width: 768px) {
//           .slide-content-wrapper {
//             padding: 0 20px;
//             gap: 20px;
//           }
//         }

//         @media (max-width: 480px) {
//           .slide-content-wrapper {
//             padding: 0 15px;
//             gap: 15px;
//           }
//         }

//         .slide-text-content {
//           flex: 1;
//         }

//         @media (max-width: 992px) {
//           .slide-text-content {
//             width: 100%;
//             max-width: 600px;
//           }
//         }

//         .slide-image-content {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         @media (max-width: 992px) {
//           .slide-image-content {
//             width: 100%;
//             max-width: 400px;
//           }
//         }

//         /* Single slide layout */
//         .single-slide-content {
//           position: absolute;
//           z-index: 1;
//           padding-left: 10vw;
//           top: 50%;
//           transform: translateY(-50%);
//         }

//         @media (max-width: 992px) {
//           .single-slide-content {
//             padding-left: 5vw;
//             padding-right: 5vw;
//             text-align: center;
//             width: 90%;
//           }
//         }

//         @media (max-width: 768px) {
//           .single-slide-content {
//             padding-left: 20px;
//             padding-right: 20px;
//             width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .single-slide-content {
//             padding-left: 15px;
//             padding-right: 15px;
//           }
//         }

//         /* Curve overlay responsive */
//         .curve-overlay {
//           position: absolute;
//           bottom: -10px;
//           left: 0;
//           width: 100%;
//           height: 60px;
//         }

//         @media (max-width: 768px) {
//           .curve-overlay {
//             height: 40px;
//           }
//         }

//         @media (max-width: 480px) {
//           .curve-overlay {
//             height: 30px;
//           }
//         }

//         /* Hero contact responsive */
//         .hero-contact {
//           display: none; /* Hide on mobile as it takes space */
//         }

//         @media (min-width: 1200px) {
//           .hero-contact {
//             display: block;
//             right: -210px;
//             top: 256px;
//             position: absolute;
//             color: white;
//             z-index: 11;
//             rotate: -90deg;
//           }
//         }

//         /* Background image cover fix */
//         .bg-image-cover {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center;
//         }

//         /* Gradient background */
//         .gradient-bg {
//           background: linear-gradient(135deg, #03041c 0%, #1a1a2e 50%, #0f0f1e 100%);
//         }

//         /* Dark overlay */
//         .dark-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.55);
//         }

//         /* Ensure images don't overflow */
//         .contain-image {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//         }

//         /* Hide right image on mobile for gradient slide */
//         @media (max-width: 992px) {
//           .slide-image-content {
//             display: none;
//           }
          
//           .slide-text-content {
//             flex: none;
//             width: 100%;
//           }
//         }
//       `}</style>

//       <section id="hero">
//         <div className="hero-1-slide">
//           <div className="slide-wrapper">
//             {slides.map((slide, index) => {
//               const isActive = index === currentSlide;
//               // Always show first slide (index 0) when component mounts
//               const shouldShow = index === 0 || isActive;

//               return (
//                 <div
//                   key={index}
//                   className="slide-image"
//                   style={{
//                     visibility: shouldShow ? 'visible' : 'hidden',
//                     opacity: shouldShow ? 1 : 0,
//                     backgroundColor: slide.useGradient ? '#03041c' : '#1a1a1a',
//                     zIndex: 100
//                   }}
//                   role="img"
//                   aria-label={slide.caption || 'Slider image'}
//                   aria-hidden={!shouldShow}
//                 >
//                   {/* Gradient background or image background */}
//                   {slide.useGradient ? (
//                     <div className="gradient-bg" style={{ width: '100%', height: '100%' }} />
//                   ) : (
//                     <>
//                       <img
//                         src={slide.image}
//                         alt={slide.caption || 'Slider image'}
//                         className="bg-image-cover"
//                         loading={index === 0 ? 'eager' : 'lazy'}
//                       />
//                       <div className="dark-overlay" />
//                     </>
//                   )}

//                   {/* Content */}
//                   {slide.useGradient ? (
//                     // Two-column layout for gradient slide
//                     <div className="slide-content-wrapper">
//                       <div 
//                         className="slide-text-content"
//                         style={{
//                           visibility: shouldShow ? 'visible' : 'hidden',
//                           opacity: shouldShow ? 1 : 0,
//                           transition: 'opacity 0.3s ease',
//                         }}
//                       >
//                         <h2 className="heading-1 mb-25 slide-caption-desktop" style={{ color: 'white', fontWeight: '700' }}>
//                           {slide.caption}
//                         </h2>
//                         <h1 className="slide-subtitle-desktop" style={{ color: 'white', fontWeight: '600', marginBottom: '20px' }}>
//                           IT Solutions
//                         </h1>
//                         <div className="heading-6 mb-30 slide-description-desktop" style={{ color: 'white', lineHeight: '1.6' }}>
//                           Innovative Solutions, Seamless Experiences.
//                         </div>
//                         <Link
//                           href="/portfolio"
//                           className="button-primary-1 slider-button transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
//                           aria-label="View our portfolio"
//                         >
//                           <span>Read More</span>
//                         </Link>
//                       </div>
                      
//                       <div 
//                         className="slide-image-content"
//                         style={{
//                           visibility: shouldShow ? 'visible' : 'hidden',
//                           opacity: shouldShow ? 1 : 0,
//                           transition: 'opacity 0.3s ease',
//                         }}
//                       >
//                         <img
//                           src={slide.rightImage || slide.image}
//                           alt="Growth and innovation"
//                           className="contain-image"
//                           loading={index === 0 ? 'eager' : 'lazy'}
//                           style={{
//                             maxWidth: '600px',
//                             opacity: 0.8
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     // Single column layout for other slides
//                     <div 
//                       className="single-slide-content"
//                       style={{
//                         visibility: shouldShow ? 'visible' : 'hidden',
//                         opacity: shouldShow ? 1 : 0,
//                         transition: 'opacity 0.3s ease',
//                       }}
//                     >
//                       <h2 className="heading-2 mb-25 slide-caption-desktop" style={{ color: 'white' }}>
//                         {slide.caption}
//                       </h2>
//                       <h1 className="slide-subtitle-desktop" style={{color:"white"}}>IT Solutions</h1>
//                       <div className="heading-7 mb-30 slide-description-desktop" style={{ color: 'white' }}>
//                         Innovative Solutions, Seamless Experiences.
//                       </div>
//                       {slide.caption === 'IT Corporate Training' ? (
//                         <Link
//                           href="/Excerptitservices"
//                           className="button-primary-1 slider-button transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
//                           aria-label="Learn more about IT Corporate Training"
//                         >
//                           <span>Read More</span>
//                         </Link>
//                       ) : (
//                         <Link
//                           href="/portfolio"
//                           className="button-primary-1 slider-button transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
//                           aria-label="View our portfolio"
//                         >
//                           <span>Read More</span>
//                         </Link>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Curve overlay */}
//           <picture>
//             <img
//               className="curve-overlay"
//               src="/images/home1/c1.webp"
//               alt=""
//               loading="lazy"
//             />
//           </picture>

//           {/* Overlay wrappers */}
//           <div className="overlay-wrapper">
//             <div className="left-overlay"></div>
//             <div className="right-overlay"></div>
//           </div>
//         </div>

//         {/* Hero contact - hidden on mobile */}
//         <div className="hero-contact d-flex">
//           <ul className="d-flex phone-email">
//             <li className="paragraph-3">
//               <span>
//                 <i className="fa-solid fa-envelope" aria-hidden="true"></i>
//               </span>
//               <a href="mailto:info@excerptech.com" aria-label="Email us">
//                 info@excerptech.com
//               </a>
//             </li>
//             <li className="paragraph-3">
//               <span>
//                 <i className="fa-solid fa-phone" aria-hidden="true"></i>
//               </span>
//               <a href="tel:+916364657660" aria-label="Call us">
//                 +91 63646 57660
//               </a>
//             </li>
//             <li>
//               <a
//                 href="https://www.facebook.com/Excerptechnology/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Visit our Facebook page"
//               >
//                 <i className="fa-brands fa-facebook-f"></i>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Visit our Instagram page"
//               >
//                 <i className="fa-brands fa-instagram" aria-hidden="true"></i>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="https://www.linkedin.com/company/excerptech"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Visit our LinkedIn page"
//               >
//                 <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
//               </a>
//             </li>
//           </ul>
//           <ul className="d-flex social">
//             {/* Social icons if needed */}
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// });

// Slider.displayName = 'Slider';

// export default Slider;














'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';

const Slider = React.memo(() => {
  const slides = useMemo(() => [
    {
      image: '/images/home1/slider/s3.webp',
      caption: 'A Triumphant Three Years Of Software',
      useGradient: false,
    },
    {
      image: '/images/home1/slider/s1.webp',
      caption: 'Breaking Boundaries, One Innovation At a Time.',
      useGradient: false,
    },
    {
      image: '/images/home1/slider/s2.webp',
      caption: 'Where Ideas Ignite And Dreams Take Flight',
      useGradient: false,
    },
    {
      image: '/Trainingimage/sm.webp',
      caption: 'Breaking Boundaries, One Innovation At a Time.',
      useGradient: false,
    },
  ], []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [slides.length]);

  return (
    <div className="slider-container">
      <style jsx>{`
        /* Mobile-first responsive styles */
        .slider-container {
          width: 100%;
          position: relative;
        }

        #hero {
          background-color: black;
          width: 100%;
          overflow: hidden;
        }

        .hero-1-slide {
          width: 100%;
          position: relative;
        }

        /* Responsive height for slider */
        @media (min-width: 1200px) {
          .hero-1-slide {
            height: 88vh;
            min-height: 600px;
          }
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .hero-1-slide {
            height: 75vh;
            min-height: 500px;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .hero-1-slide {
            height: 65vh;
            min-height: 450px;
          }
        }

        @media (min-width: 576px) and (max-width: 767px) {
          .hero-1-slide {
            height: 55vh;
            min-height: 380px;
          }
        }

        @media (max-width: 575px) {
          .hero-1-slide {
            height: 50vh;
            min-height: 350px;
          }
        }

        @media (max-width: 480px) {
          .hero-1-slide {
            height: 45vh;
            min-height: 300px;
          }
        }

        @media (max-width: 360px) {
          .hero-1-slide {
            height: 40vh;
            min-height: 280px;
          }
        }

        .slide-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transition: opacity 0.8s ease-in-out;
        }

        /* Responsive text sizes */
        .slide-caption-desktop {
          font-size: 48px;
          line-height: 1.2;
        }

        .slide-caption-tablet {
          font-size: 32px;
          line-height: 1.2;
        }

        .slide-caption-mobile {
          font-size: 24px;
          line-height: 1.3;
        }

        .slide-subtitle-desktop {
          font-size: 36px;
        }

        .slide-subtitle-tablet {
          font-size: 28px;
        }

        .slide-subtitle-mobile {
          font-size: 22px;
        }

        .slide-description-desktop {
          font-size: 18px;
        }

        .slide-description-tablet {
          font-size: 16px;
        }

        .slide-description-mobile {
          font-size: 14px;
        }

        /* Button responsive styles */
        .slider-button {
          width: 190px;
          height: 60px;
        }

        @media (max-width: 768px) {
          .slider-button {
            width: 160px;
            height: 50px;
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .slider-button {
            width: 140px;
            height: 45px;
            font-size: 14px;
            margin-top: 20px;
          }
        }

        /* Two-column layout for desktop, single column for mobile */
        .slide-content-wrapper {
          display: flex;
          width: 100%;
          height: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          align-items: center;
          gap: 60px;
        }

        @media (max-width: 992px) {
          .slide-content-wrapper {
            flex-direction: column;
            padding: 0 30px;
            gap: 30px;
            justify-content: center;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .slide-content-wrapper {
            padding: 0 20px;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .slide-content-wrapper {
            padding: 0 15px;
            gap: 15px;
          }
        }

        .slide-text-content {
          flex: 1;
        }

        @media (max-width: 992px) {
          .slide-text-content {
            width: 100%;
            max-width: 600px;
          }
        }

        .slide-image-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 992px) {
          .slide-image-content {
            width: 100%;
            max-width: 400px;
          }
        }

        /* Single slide layout */
        .single-slide-content {
          position: absolute;
          z-index: 1;
          padding-left: 10vw;
          top: 50%;
          transform: translateY(-50%);
        }

        @media (max-width: 992px) {
          .single-slide-content {
            padding-left: 5vw;
            padding-right: 5vw;
            text-align: center;
            width: 90%;
          }
        }

        @media (max-width: 768px) {
          .single-slide-content {
            padding-left: 20px;
            padding-right: 20px;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .single-slide-content {
            padding-left: 15px;
            padding-right: 15px;
          }
        }

        /* Curve overlay responsive */
        .curve-overlay {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 60px;
        }

        @media (max-width: 768px) {
          .curve-overlay {
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .curve-overlay {
            height: 30px;
          }
        }

        /* Hero contact responsive */
        .hero-contact {
          display: none; /* Hide on mobile as it takes space */
        }

        @media (min-width: 1200px) {
          .hero-contact {
            display: block;
            right: -210px;
            top: 256px;
            position: absolute;
            color: white;
            z-index: 11;
            rotate: -90deg;
          }
        }

        /* Background image cover fix */
        .bg-image-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Gradient background */
        .gradient-bg {
          background: linear-gradient(135deg, #03041c 0%, #1a1a2e 50%, #0f0f1e 100%);
        }

        /* Dark overlay */
        .dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.55);
        }

        /* Ensure images don't overflow */
        .contain-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Hide right image on mobile for gradient slide */
        @media (max-width: 992px) {
          .slide-image-content {
            display: none;
          }
          
          .slide-text-content {
            flex: none;
            width: 100%;
          }
        }
      `}</style>

      <section id="hero">
        <div className="hero-1-slide">
          <div className="slide-wrapper">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              // Always show first slide (index 0) when component mounts
              const shouldShow = index === 0 || isActive;

              return (
                <div
                  key={index}
                  className="slide-image"
                  style={{
                    visibility: shouldShow ? 'visible' : 'hidden',
                    opacity: shouldShow ? 1 : 0,
                    backgroundColor: slide.useGradient ? '#03041c' : '#1a1a1a',
                    zIndex: 100
                  }}
                  role="img"
                  aria-label={slide.caption || 'Slider image'}
                  aria-hidden={!shouldShow}
                >
                  {/* Gradient background or image background */}
                  {slide.useGradient ? (
                    <div className="gradient-bg" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    <>
                      <img
                        src={slide.image}
                        alt={slide.caption || 'Slider image'}
                        className="bg-image-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="dark-overlay" />
                    </>
                  )}

                  {/* Content */}
                  {slide.useGradient ? (
                    // Two-column layout for gradient slide
                    <div className="slide-content-wrapper">
                      <div 
                        className="slide-text-content"
                        style={{
                          visibility: shouldShow ? 'visible' : 'hidden',
                          opacity: shouldShow ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        <h2 className="heading-1 mb-25 slide-caption-desktop" style={{ color: 'white', fontWeight: '700' }}>
                          {slide.caption}
                        </h2>
                        <h1 className="slide-subtitle-desktop" style={{ color: 'white', fontWeight: '600', marginBottom: '20px' }}>
                          IT Solutions
                        </h1>
                        <div className="heading-6 mb-30 slide-description-desktop" style={{ color: 'white', lineHeight: '1.6' }}>
                          Innovative Solutions, Seamless Experiences.
                        </div>
                        <Link
                          href="/portfolio"
                          className="button-primary-1 slider-button transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                          aria-label="View our portfolio"
                        >
                          <span>Read More</span>
                        </Link>
                      </div>
                      
                      <div 
                        className="slide-image-content"
                        style={{
                          visibility: shouldShow ? 'visible' : 'hidden',
                          opacity: shouldShow ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        <img
                          src={slide.rightImage || slide.image}
                          alt="Growth and innovation"
                          className="contain-image"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          style={{
                            maxWidth: '600px',
                            opacity: 0.8
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    // Single column layout for other slides
                    <div 
                      className="single-slide-content"
                      style={{
                        visibility: shouldShow ? 'visible' : 'hidden',
                        opacity: shouldShow ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <h2 className="heading-2 mb-25 slide-caption-desktop" style={{ color: 'white' }}>
                        {slide.caption}
                      </h2>
                      <h1 className="slide-subtitle-desktop" style={{color:"white"}}>IT Solutions</h1>
                      <div className="heading-7 mb-30 slide-description-desktop" style={{ color: 'white' }}>
                        Innovative Solutions, Seamless Experiences.
                      </div>
                      {slide.caption === 'IT Corporate Training' ? (
                        <Link
                          href="/Excerptitservices"
                          className="button-primary-1 slider-button transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                          aria-label="Learn more about IT Corporate Training"
                        >
                          <span>Read More</span>
                        </Link>
                      ) : (
                        <Link
                          href="/portfolio"
                          className="button-primary-1 slider-button transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                          aria-label="View our portfolio"
                        >
                          <span>Read More</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Curve overlay */}
          <picture>
            <img
              className="curve-overlay"
              style={{ 
                position: 'absolute', /* CLS guard: absolute positioning doesn't affect layout */
                bottom: '-10px', /* Use bottom instead of marginTop */
                left: 0,
                height: '60px', 
                width: '100%',
                minHeight: '60px',
                display: 'block',
                aspectRatio: '1920 / 60',
                zIndex:100 /* CLS guard: Explicit aspect ratio */
              }}
              src="/images/home1/c1.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width="1920"
              height="60"
            />
          </picture>

          {/* Overlay wrappers */}
          <div className="overlay-wrapper">
            <div className="left-overlay"></div>
            <div className="right-overlay"></div>
          </div>
        </div>

        {/* Hero contact - hidden on mobile */}
        <div className="hero-contact d-flex">
          <ul className="d-flex phone-email">
            <li className="paragraph-3">
              <span>
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </span>
              <a href="mailto:info@excerptech.com" aria-label="Email us">
                info@excerptech.com
              </a>
            </li>
            <li className="paragraph-3">
              <span>
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
              </span>
              <a href="tel:+916364657660" aria-label="Call us">
                +91 63646 57660
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/Excerptechnology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/excerptech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
              >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
          <ul className="d-flex social">
            {/* Social icons if needed */}
          </ul>
        </div>
      </section>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;