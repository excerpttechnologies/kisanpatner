// 'use client';

// // Lightweight carousel replacement for react-slick (saves ~50KB)
// import React, { useState, useEffect, useRef } from 'react';

// const SimpleCarousel = ({ 
//   children, 
//   slidesToShow = 3, 
//   autoplay = true, 
//   autoplaySpeed = 3000,
//   arrows = true,
//   dots = false,
//   infinite = true,
//   responsive = []
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [slidesToShowState, setSlidesToShowState] = useState(slidesToShow);
//   const intervalRef = useRef(null);
//   const childrenArray = React.Children.toArray(children);
//   const totalSlides = childrenArray.length;

//   // Handle responsive breakpoints
//   useEffect(() => {
//     const updateSlidesToShow = () => {
//       if (!responsive.length) return;
      
//       const width = window.innerWidth;
//       const breakpoint = responsive.find(bp => width <= bp.breakpoint);
//       if (breakpoint) {
//         setSlidesToShowState(breakpoint.settings?.slidesToShow || slidesToShow);
//       } else {
//         setSlidesToShowState(slidesToShow);
//       }
//     };

//     updateSlidesToShow();
//     window.addEventListener('resize', updateSlidesToShow);
//     return () => window.removeEventListener('resize', updateSlidesToShow);
//   }, [responsive, slidesToShow]);

//   // Autoplay
//   useEffect(() => {
//     if (!autoplay || totalSlides <= slidesToShowState) return;

//     intervalRef.current = setInterval(() => {
//       setCurrentIndex(prev => {
//         if (infinite) {
//           return (prev + 1) % (totalSlides - slidesToShowState + 1);
//         }
//         return prev < totalSlides - slidesToShowState ? prev + 1 : 0;
//       });
//     }, autoplaySpeed);

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [autoplay, autoplaySpeed, infinite, totalSlides, slidesToShowState]);

//   const goToSlide = (index) => {
//     if (infinite) {
//       setCurrentIndex(index % (totalSlides - slidesToShowState + 1));
//     } else {
//       setCurrentIndex(Math.max(0, Math.min(index, totalSlides - slidesToShowState)));
//     }
//   };

//   // const nextSlide = () => {
//   //   if (infinite) {
//   //     setCurrentIndex((prev) => (prev + 1) % (totalSlides - slidesToShowState + 1));
//   //   } else {
//   //     setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - slidesToShowState));
//   //   }
//   // };

//   // const prevSlide = () => {
//   //   if (infinite) {
//   //     setCurrentIndex((prev) => (prev - 1 + (totalSlides - slidesToShowState + 1)) % (totalSlides - slidesToShowState + 1));
//   //   } else {
//   //     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   //   }
//   // };

//   const translateX = -(currentIndex * (100 / slidesToShowState));

//   return (
//     <div className="simple-carousel" style={{ position: 'relative', overflow: 'hidden' }}>
//       <div 
//         className="simple-carousel-track"
//         style={{
//           display: 'flex',
//           transition: 'transform 0.5s ease',
//           transform: `translateX(${translateX}%)`,
//         }}
//       >
//         {childrenArray.map((child, index) => (
//           <div
//             key={index}
//             className="simple-carousel-slide"
//             style={{
//               minWidth: `${100 / slidesToShowState}%`,
//               flexShrink: 0,
//               padding: '0 10px',
//             }}
//           >
//             {child}
//           </div>
//         ))}
//       </div>

     

//       {dots && (
//         <div
//           className="simple-carousel-dots"
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '10px',
//             marginTop: '20px',
//           }}
//         >
//           {Array.from({ length: totalSlides - slidesToShowState + 1 }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               style={{
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 border: 'none',
//                 background: index === currentIndex ? '#000' : '#ccc',
//                 cursor: 'pointer',
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SimpleCarousel;

'use client';

import React, { useState, useEffect, useRef } from 'react';

const SimpleCarousel = ({ 
  children, 
  slidesToShow = 3, 
  autoplay = true, 
  autoplaySpeed = 3000,
  //arrows = false,
  dots = false,
  infinite = true,
  centerMode = false,
  centerPadding = "0px",
  activeSlideScale = 2, // Changed from 2 to 1.5 for better visibility
  activeSlideIndex = 1,
  responsive = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShowState, setSlidesToShowState] = useState(slidesToShow);
  const [centerModeState, setCenterModeState] = useState(centerMode);
  const [activeSlideScaleState, setActiveSlideScaleState] = useState(activeSlideScale);
  const [activeSlideIndexState, setActiveSlideIndexState] = useState(activeSlideIndex);
  const intervalRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  // Handle responsive breakpoints
  useEffect(() => {
    const updateSettings = () => {
      if (!responsive.length) return;
      
      const width = window.innerWidth;
      const breakpoint = responsive.find(bp => width <= bp.breakpoint);
      if (breakpoint) {
        setSlidesToShowState(breakpoint.settings?.slidesToShow || slidesToShow);
        setCenterModeState(breakpoint.settings?.centerMode ?? centerMode);
        setActiveSlideScaleState(breakpoint.settings?.activeSlideScale || activeSlideScale);
        setActiveSlideIndexState(breakpoint.settings?.activeSlideIndex ?? activeSlideIndex);
      } else {
        setSlidesToShowState(slidesToShow);
        setCenterModeState(centerMode);
        setActiveSlideScaleState(activeSlideScale);
        setActiveSlideIndexState(activeSlideIndex);
      }
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, [responsive, slidesToShow, centerMode, activeSlideScale, activeSlideIndex]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || totalSlides <= slidesToShowState) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (infinite) {
          return (prev + 1) % (totalSlides - slidesToShowState + 1);
        }
        return prev < totalSlides - slidesToShowState ? prev + 1 : 0;
      });
    }, autoplaySpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, autoplaySpeed, infinite, totalSlides, slidesToShowState]);

  const goToSlide = (index) => {
    if (infinite) {
      setCurrentIndex(index % (totalSlides - slidesToShowState + 1));
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - slidesToShowState)));
    }
  };

  // Calculate which slide is active based on center mode
  const getActiveSlideIndex = () => {
    if (centerModeState && slidesToShowState > 1) {
      return currentIndex + activeSlideIndexState;
    }
    return null;
  };

  const activeIndex = getActiveSlideIndex();
  const translateX = -(currentIndex * (100 / slidesToShowState));

  return (
    <div className="simple-carousel" style={{ 
      position: 'relative', 
      overflow: 'visible', // Changed from 'hidden' to 'visible' to see enlarged slide
      padding: centerModeState ? `0 ${centerPadding}` : '0',
    }}>
      <div 
        className="simple-carousel-track"
        style={{
          display: 'flex',
          alignItems: 'center', // Align items vertically
          transition: 'transform 0.5s ease',
          transform: `translateX(${translateX}%)`,
        }}
      >
        {childrenArray.map((child, index) => {
          const isActive = centerModeState && slidesToShowState > 1 
            ? index === activeIndex
            : false;
          
          const scale = isActive ? activeSlideScaleState : 0.9; // Non-active slides smaller
          const zIndex = isActive ? 10 : 1;
          const opacity = isActive ? 1 : 0.7; // Non-active slides more transparent

          return (
            <div
              key={index}
              className="simple-carousel-slide"
              style={{
                minWidth: `${100 / slidesToShowState}%`,
                flexShrink: 0,
                padding: isActive ? '40px 10px' : '60px 10px', // More padding for active slide
                transition: 'all 0.5s ease',
                transform: `scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                filter: isActive ? 'none' : 'brightness(0.9)', // Darken non-active slides
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {dots && (
        <div
          className="simple-carousel-dots"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '40px', // More margin to accommodate larger slides
          }}
        >
          {Array.from({ length: totalSlides - slidesToShowState + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? '#000' : '#ccc',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;