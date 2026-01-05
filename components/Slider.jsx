'use client';

// import React, { useState, useEffect } from 'react';
// import './Slider.css'

// function Slider() {
//   const slides = [
//     {
//       image: '/images/home1/slider/s1.webp',
//       caption: 'Breaking Boundaries, One Innovation At a Time.',
//     },
//     {
//       image: '/images/home1/slider/s2.webp',
//       caption: 'Where Ideas Ignite And Dreams Take Flight',
//     },
//     {
//       image: '/images/home1/slider/s3.webp',
//       caption: 'A Triumphant Three Years Of Software ',
//     },
//     {
//       image: '/Trainingimage/img.webp',
//       caption: '  IT Corporate Training ',
//     },
//     {
//       image: '/Trainingimage/sm.webp',
//       caption: '  ',
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 4000); 

//     return () => clearInterval(intervalId);
//   }, [slides.length]);

//   return (
//     <div>
//       <section id="hero">
//         <div className="hero-1-slide" style={{ height: '100px' }}>
//           <div className="slide-wrapper" >
//             {slides.map((slide, index) => (
//               <div
//   key={index}
//   className="slider-image slide-card"
//   style={{
//     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
//                       url(${slide.image})`,
//     display: index === currentSlide ? 'block' : 'none',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     height: '600px',
//     width: '100%',
//     animation: 'slideAnimation 5s forwards',
//     animationDirection: 'alternate', 
//   }}
// >

//                 <div className="slide__card--wrapper">

//                   <h2 className="heading-2 mb-25" style={{ animation: 'textAnimation 1s forwards',color:"white" }}>{slide.caption}</h2>
//                   <h1 style={{ animation: 'textAnimation 1s forwards' }}>IT Solutions</h1>
//                   <div className="heading-7 mb-30" style={{ animation: 'textAnimation 1s forwards',color:"white" }}>
//                     Innovative Solutions, Seamless Experiences.
//                   </div>
//                   <a href="/Excerptitservices" className="button-primary-1" style={{ animation: 'textAnimation 1s forwards' }}>
//                     <span>Read More</span>
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <Image className="curve-overlay" style={{ marginTop: '100px', height: "60px" }} src="/images/home1/c1.webp" alt="" />
//           <div className="overlay-wrapper">
//             <div className="left-overlay"></div>
//             <div className="right-overlay"></div>
//           </div>
//         </div>

//         <div className="hero-contact d-flex">
//           <ul className="d-flex phone-email">
//             <li className="paragraph-3">
//               <span>
//                 <i className="fa-solid fa-envelope"></i>
//               </span>
//               <a href="mailto:info@excerptech.com">info@excerptech.com</a>
//             </li>
//             <li className="paragraph-3">
//               <span>
//                 <i className="fa-solid fa-phone"></i> 
//                 <a href='tel:+916364657660'> +91 63646 57660</a>
//               </span>
//             </li>
//             <li className="paragraph-3" style={{ marginRight: "-42px" }}></li>
//           </ul>
//           <ul className="d-flex social">
//             <li>
//               <a href="https://www.facebook.com/Excerptechnology/" target="_blank">
//                 <i className="fa-brands fa-facebook-f"></i>
//               </a>
//             </li>
//             <li>
//               <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank">
//                 <i className="fa-brands fa-instagram"></i>
//               </a>
//             </li>
//             <li>
//               <a href="https://www.linkedin.com/company/excerptech" target="_blank">
//                 <i className="fa-brands fa-linkedin-in"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Slider;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'next/link';
// import './Slider.css';
// import { memo } from 'react'

// function Slider() {
//   const slides = [
//     {
//       image: '/images/home1/slider/s1.webp',
//       caption: 'Breaking Boundaries, One Innovation At a Time.',
//     },
//     {
//       image: '/images/home1/slider/s2.webp',
//       caption: 'Where Ideas Ignite And Dreams Take Flight',
//     },
//     {
//       image: '/images/home1/slider/s3.webp',
//       caption: 'A Triumphant Three Years Of Software',
//     },
//     {
//       image: '/Trainingimage/img.webp',
//       caption: 'IT Corporate Training',
//     },
//     {
//       image: '/Trainingimage/sm.webp',
//       caption: '',
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(intervalId);
//   }, [slides.length]);

//   const getSlideHeightClass = () => {
//     if (window.innerWidth <= 480) return 'height-200';
//     if (window.innerWidth <= 768) return 'height-300';
//     return 'height-600';
//   };

//   return (
//     <div>
//       <section id="hero">
//         <div className="hero-1-slide">
//           <div className="slide-wrapper">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`slide-image slide-card ${getSlideHeightClass()}`}
//                 style={{
//                   backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${slide.image})`,
//                   display: index === currentSlide ? 'block' : 'none',
//                 }}
//               >
//                 <div className="slide__card--wrapper">
//                   <h2 className="heading-2 mb-25" style={{ color: 'white' }}>{slide.caption}</h2>
//                   <h1>IT Solutions</h1>
//                   <div className="heading-7 mb-30" style={{ color: 'white' }}>
//                     Innovative Solutions, Seamless Experiences.
//                   </div>
//                   {slide.caption === 'IT Corporate Training' ? (
//                     <Link href="/Excerptitservices" className="button-primary-1">
//                       <span>Read More</span>
//                     </Link>
//                   ) : (
//                     <Link href="/portfolio" className="button-primary-1">
//                       <span>Read More</span>
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <Image className="curve-overlay" style={{ marginTop: '100px', height: '60px' }} src="/images/home1/c1.webp" alt="" />
//           <div className="overlay-wrapper">
//             <div className="left-overlay"></div>
//             <div className="right-overlay"></div>
//           </div>
//         </div>

//         <div className="hero-contact d-flex">
//           <ul className="d-flex phone-email">
//             <li className="paragraph-3">
//               <span>
//                 <i className="fa-solid fa-envelope"></i>
//               </span>
//               <a href="mailto:info@excerptech.com">info@excerptech.com</a>
//             </li>
//             <li className="paragraph-3">
//               <span>
//                 <i className="fa-solid fa-phone"></i>
//                 <a href="tel:+916364657660"> +91 63646 57660</a>
//               </span>
//             </li>
//           </ul>
//           <ul className="d-flex social">
//             <li>
//               <a href="https://www.facebook.com/Excerptechnology/" target="_blank" rel="noopener noreferrer">
//                 <i className="fa-brands fa-facebook-f"></i>
//               </a>
//             </li>
//             <li>
//               <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank" rel="noopener noreferrer">
//                 <i className="fa-brands fa-instagram"></i>
//               </a>
//             </li>
//             <li>
//               <a href="https://www.linkedin.com/company/excerptech" target="_blank" rel="noopener noreferrer">
//                 <i className="fa-brands fa-linkedin-in"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Slider;

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Link } from 'next/link';
// import './Slider.css';

// // Preload critical images
// const preloadImages = (imageSrcs) => {
//   imageSrcs.forEach(src => {
//     const img = new Image();
//     img.src = src;
//   });
// };

// const Slider = React.memo(() => {
//   const slides = useMemo(() => [
//     {
//       image: '/images/home1/slider/s1.webp',
//       caption: 'Breaking Boundaries, One Innovation At a Time.',
//     },
//     {
//       image: '/images/home1/slider/s2.webp',
//       caption: 'Where Ideas Ignite And Dreams Take Flight',
//     },
//     {
//       image: '/images/home1/slider/s3.webp',
//       caption: 'A Triumphant Three Years Of Software',
//     },
//     {
//       image: '/Trainingimage/img.webp',
//       caption: 'IT Corporate Training',
//     },
//     {
//       image: '/Trainingimage/sm.webp',
//       caption: '',
//     },
//   ], []);

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [screenSize, setScreenSize] = useState('desktop');

//   // Optimized screen size detection
//   const updateScreenSize = useCallback(() => {
//     const width = window.innerWidth;
//     if (width <= 480) setScreenSize('mobile');
//     else if (width <= 768) setScreenSize('tablet');
//     else setScreenSize('desktop');
//   }, []);

//   // Get height class based on screen size
//   const getSlideHeightClass = useCallback(() => {
//     switch (screenSize) {
//       case 'mobile': return 'height-200';
//       case 'tablet': return 'height-300';
//       default: return 'height-600';
//     }
//   }, [screenSize]);

//   // Preload images and set up resize listener
//   useEffect(() => {
//     // Preload first image immediately, others after a delay
//     const firstImage = new Image();
//     firstImage.onload = () => setIsLoaded(true);
//     firstImage.src = slides[0].image;

//     // Preload remaining images after a short delay
//     setTimeout(() => {
//       preloadImages(slides.slice(1).map(slide => slide.image));
//     }, 100);

//     // Screen size listener with debounce
//     let resizeTimer;
//     const handleResize = () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(updateScreenSize, 150);
//     };

//     updateScreenSize(); // Initial call
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       clearTimeout(resizeTimer);
//     };
//   }, [slides, updateScreenSize]);

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isLoaded) return;

//     const intervalId = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(intervalId);
//   }, [slides.length, isLoaded]);

//   // Loading skeleton
//   if (!isLoaded) {
//     return (
//       <div className="slider-skeleton">
//         <div className={`slide-skeleton ${getSlideHeightClass()}`}>
//           <div className="skeleton-content">
//             <div className="skeleton-title"></div>
//             <div className="skeleton-subtitle"></div>
//             <div className="skeleton-button"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <section id="hero">
//         <div className="hero-1-slide">
//           <div className="slide-wrapper">
//             {slides.map((slide, index) => {
//               const isActive = index === currentSlide;
//               const isNext = index === (currentSlide + 1) % slides.length;

//               return (
//                 <div
//                   key={index}
//                   className={`slide-image slide-card ${getSlideHeightClass()}`}
//                   style={{
//                     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${slide.image})`,
//                     display: isActive ? 'block' : 'none',
//                     // Preload next slide
//                     ...(isNext && { backgroundImage: `url(${slide.image})` }),
//                   }}
//                 >
//                   {isActive && (
//                     <div className="slide__card--wrapper">
//                       <h2 className="heading-2 mb-25" style={{ color: 'white' }}>
//                         {slide.caption}
//                       </h2>
//                       <h1>IT Solutions</h1>
//                       <div className="heading-7 mb-30" style={{ color: 'white' }}>
//                         Innovative Solutions, Seamless Experiences.
//                       </div>
//                       {slide.caption === 'IT Corporate Training' ? (
//                         <Link 
//                           href="/Excerptitservices" 
//                           className="button-primary-1"
//                           aria-label="Learn more about IT Corporate Training"
//                         >
//                           <span>Read More</span>
//                         </Link>
//                       ) : (
//                         <Link 
//                           href="/portfolio" 
//                           className="button-primary-1"
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

//           {/* Optimized curve overlay with lazy loading */}
//           <Image 
//             className="curve-overlay" 
//             style={{ marginTop: '100px', height: '60px' }} 
//             src="/images/home1/c1.webp" 
//             alt=""
//             loading="lazy"
//             decoding="async"
//           />

//           <div className="overlay-wrapper">
//             <div className="left-overlay"></div>
//             <div className="right-overlay"></div>
//           </div>
//         </div>

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
//                 <a href="tel:+916364657660" aria-label="Call us"> +91 63646 57660</a>
//               </span>
//             </li>
//           </ul>
//           <ul className="d-flex social">
//             <li>
//               <a 
//                 href="https://www.facebook.com/Excerptechnology/" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 aria-label="Visit our Facebook page"
//               >
//                 <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
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
//         </div>
//       </section>
//     </div>
//   );
// });

// Slider.displayName = 'Slider';

// export default Slider;

'use client';

import React, { useState, useEffect,  useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// CLS FIX: Removed image preloader - using img tags with explicit dimensions now

const Slider = React.memo(() => {
  const slides = useMemo(() => [
    {
      image: '/images/home1/slider/s3.webp',
      caption: 'A Triumphant Three Years Of Software',
      rightImage: '/images/home1/slider/s3.webp', // Hand with arrows image
      useGradient: true, // Use dark gradient background
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
      caption: '',
      useGradient: false,
    },
  ], []);

  const [currentSlide, setCurrentSlide] = useState(0);
  // CLS FIX: Remove isLoaded state - render immediately to prevent layout shift
  // CLS FIX: Remove imageCache - using img tags with explicit dimensions now
  // CLS FIX: Remove JS-based screen size detection to prevent SSR/client mismatch
  // Use CSS media queries instead - default to desktop (88vh) which works for all

  const intervalRef = useRef(null);
  // CLS FIX: Removed screen size detection - CSS handles responsive heights via media queries

  // CLS FIX: Removed image preloading logic - using img tags with explicit dimensions now
  // Images will load naturally with browser's native loading

  // CLS FIX: Removed resize handler - CSS handles responsive heights

  // CLS FIX: Auto-slide effect - removed isLoaded check, start immediately
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

  // Remove loading skeleton to prevent layout shift - render immediately with reserved space

  return (
    <div>
      <section id="hero">
        {/* CLS guard: stable hero height - always reserve 88vh */}
        <div className="hero-1-slide" style={{ minHeight: '88vh', height: '88vh' }}>
          {/* CLS guard: slide wrapper always reserves space */}
          <div className="slide-wrapper" style={{ minHeight: '88vh', height: '88vh' }}>
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              // CLS FIX: Removed isImageCached check - using img tags with explicit dimensions now

              return (
                <div
                  key={index}
                  className="slide-image slide-card"
                  style={{
                    backgroundColor: slide.useGradient ? '#03041c' : '#1a1a1a', /* Dark blue gradient for first slide */
                    backgroundImage: slide.useGradient 
                      ? 'linear-gradient(135deg, #03041c 0%, #1a1a2e 50%, #0f0f1e 100%)' 
                      : 'none',
                    visibility: isActive ? 'visible' : 'hidden',
                    opacity: isActive ? 1 : 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    minHeight: '88vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  role="img"
                  aria-label={slide.caption || 'Slider image'}
                  aria-hidden={!isActive}
                >
                  {/* Background image only if not using gradient */}
                  {!slide.useGradient && (
                    <Image
                      src={slide.image}
                      alt={slide.caption || 'Slider image'}
                      width="1920"
                      height="1080"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        aspectRatio: '16 / 9'
                      }}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding={index === 0 ? 'sync' : 'async'}
                    />
                  )}
                  
                  {/* Dark overlay only for non-gradient slides */}
                  {!slide.useGradient && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.55)',
                      pointerEvents: 'none'
                    }} />
                  )}

                  {/* Two-column layout for gradient slide */}
                  {slide.useGradient ? (
                    <div style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      maxWidth: '1400px',
                      margin: '0 auto',
                      padding: '0 40px',
                      alignItems: 'center',
                      gap: '60px',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {/* Left side - Text content */}
                      <div 
                        className="slide__card--wrapper"
                        style={{
                          flex: '1',
                          visibility: isActive ? 'visible' : 'hidden',
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                          minWidth: '500px'
                        }}
                      >
                        <h2 className="heading-2 mb-25" style={{ color: 'white', fontSize: '48px', fontWeight: '700' }}>
                          {slide.caption}
                        </h2>
                        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '600', marginBottom: '20px' }}>IT Solutions</h1>
                        <div className="heading-7 mb-30" style={{ color: 'white', fontSize: '18px', lineHeight: '1.6' }}>
                          Innovative Solutions, Seamless Experiences.
                        </div>
                        <Link
                          href="/portfolio"
                          className="button-primary-1 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                          aria-label="View our portfolio"
                        >
                          <span>Read More</span>
                        </Link>
                      </div>
                      
                      {/* Right side - Hand with arrows image */}
                      <div style={{
                        flex: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        visibility: isActive ? 'visible' : 'hidden',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        position: 'relative',
                        height: '100%'
                      }}>
                        <Image
                          src={slide.rightImage || slide.image}
                          alt="Growth and innovation"
                          width="600"
                          height="600"
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '600px',
                            objectFit: 'contain',
                            display: 'block',
                            aspectRatio: '1 / 1',
                            opacity: 0.8
                          }}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding={index === 0 ? 'sync' : 'async'}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Single column layout for other slides */
                    <div 
                      className="slide__card--wrapper"
                      style={{
                        visibility: isActive ? 'visible' : 'hidden',
                        opacity: isActive ? 1 : 0,
                        position: 'absolute',
                        zIndex: 1,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <h2 className="heading-2 mb-25" style={{ color: 'white' }}>
                        {slide.caption}
                      </h2>
                      <h1>IT Solutions</h1>
                      <div className="heading-7 mb-30" style={{ color: 'white' }}>
                        Innovative Solutions, Seamless Experiences.
                      </div>
                      {slide.caption === 'IT Corporate Training' ? (
                        <Link
                          href="/Excerptitservices"
                          className="button-primary-1 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                          aria-label="Learn more about IT Corporate Training"
                        >
                          <span>Read More</span>
                        </Link>
                      ) : (
                        <Link
                          href="/portfolio"
                          className="button-primary-1 transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-lg"
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

          {/* CLS guard: Curve overlay positioned absolutely - doesn't affect layout flow */}
          <picture>
            <Image
              className="curve-overlay"
              style={{ 
                position: 'absolute', /* CLS guard: absolute positioning doesn't affect layout */
                bottom: '-10px', /* Use bottom instead of marginTop */
                left: 0,
                height: '60px', 
                width: '100%',
                minHeight: '60px',
                display: 'block',
                aspectRatio: '1920 / 60' /* CLS guard: Explicit aspect ratio */
              }}
              src="/images/home1/c1.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width="1920"
              height="60"
            />
          </picture>

          <div className="overlay-wrapper">
            <div className="left-overlay"></div>
            <div className="right-overlay"></div>
          </div>
        </div>

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

          </ul>
        </div>
      </section>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;