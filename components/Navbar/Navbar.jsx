'use client';

// import React, { useState, useEffect } from "react";

// import { Link } from "next/link";
// import MobileNav from "./Mobilenav";
// import { TiStar } from "react-icons/ti";
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// import "./Navbar.css";

// const Navbar = ({ isLoggedIn, isAdmin, onLogout }) => {  // Added isLoggedIn prop
//   const [isScrolled, setIsScrolled] = useState(false);
//   const whiteLogo = "/image/excerptwww.png";
//   const blackLogo = "/image/excerptbbb.png";

//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const [showServicesDropdown, setShowServicesDropdown] = useState(false);
//   const [logoImage, setLogoImage] = useState({
//     white: whiteLogo,
//     black: blackLogo,
//     width: 'auto',
//     height: '105px',
//   });
//   const [showLogoutToast, setShowLogoutToast] = useState(false);


//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       if (scrollY > 50) {
//         setIsScrolled(true);
//         setLogoImage({
//           ...logoImage,
//           width: 150,
//           height: 70,
//           marginLeft: 20,
//         });
//       } else {
//         setIsScrolled(false);
//         setLogoImage({
//           ...logoImage,
//           width: 200,
//           height: 70,
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [logoImage]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.services-menu-container')) {
//         setShowServicesDropdown(false);
//         setActiveSubmenu(null);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     setShowLogoutToast(true);
//   };

//   useEffect(() => {
//     if (showLogoutToast) {
//       setTimeout(() => {
//         setShowLogoutToast(false);
//       }, 3000);
//     }
//   }, [showLogoutToast]);

//   const handleSubmenuHover = (submenu) => {
//     setActiveSubmenu(submenu);
//   };

//   const handleSubmenuLeave = () => {
//     setActiveSubmenu(null);
//   };

//   const handleServicesClick = (e) => {
//     e.preventDefault();
//     setShowServicesDropdown(!showServicesDropdown);
//   };

//   const handleServicesMouseEnter = () => {
//     if (window.innerWidth > 768) { // Only on desktop
//       setShowServicesDropdown(true);
//     }
//   };

//   const handleServicesMouseLeave = () => {
//     if (window.innerWidth > 768) { // Only on desktop
//       setShowServicesDropdown(false);
//       setActiveSubmenu(null);
//     }
//   };

//   return (
//     <div>
//       <style>{`
//           li:hover > div { display: block !important; }
// .has-submenu:hover .level-3 { display: block !important; }
// .active-link {
//   color: #0554f2 !important;
//   font-weight: 600;

// }

// @media (max-width: 768px) {
//   .services-dropdown {
//     position: static !important;
//     box-shadow: none !important;
//     border: none !important;
//     width: 100% !important;
//     background-color: #f8f9fa !important;
//     margin-top: 10px !important;
//   }

//   .web-design-submenu {
//     position: static !important;
//     box-shadow: none !important;
//     border: none !important;
//     background-color: #e9ecef !important;
//     margin-left: 20px !important;
//     margin-top: 5px !important;
//   }
// }
//       `}</style>
//       <section id="navbar-1" >
//         <div
//           className={`nav-wrapper ${isScrolled ? "fixed-navbar" : ""}`}
//           style={{ height: "80px" }}
//         >
//           <div className="d-flex align-items-center">
//             <div className={`logo-wrapper ${isScrolled ? "visible" : ""}`}>
//               <div className="logo" style={{ marginTop: "-9px" }}>
//                 {/* <Link href="/">
//                   <Image
//                     src={isScrolled ? logoImage.black : logoImage.white}
//                     width={logoImage.width}
//                     height={logoImage.height}
//                     alt=""
//                     style={{ marginRight: "80px" ,marginLeft:'10px',  marginTop: isScrolled ? "-5px" : "-2px"}}
//                   />
//                 </Link> */}
//                 <Link href="/">
//                   <Image
//                     className={`logo-img ${isScrolled ? "scrolled" : ""}`}
//                     src={isScrolled ? logoImage.black : logoImage.white}
//                     width={logoImage.width}
//                     height={isScrolled ? logoImage.height : "105px"}
//                     alt="logo"
//                   />
//                 </Link>

//               </div>
//             </div>
//             <div
//               className={`nav-content ${isScrolled ? "scrolled-content" : ""}`}
//               style={{ marginLeft: "-80px" }}
//             >
//               <div className="clip-path"></div>
//               <div className="white__background"></div>
//               <nav>
//                 <div className="clip-border">
//                   <div className="options">
//                     <div
//                       className="each-optins-list d-flex align-items-center"
//                       style={{ marginLeft: "-10px" }}
//                     >
//                       <ul className="menus d-flex align-items-center">
//                         <li className="">
//                           <Link href="/" className={pathname === "/" ? "active-link" : ""}>HOME</Link>
//                           <div className="dropdown__menu submenu"></div>
//                         </li>

//                         <li
//                           className="services-menu-container"
//                           style={{
//                             position: "relative",
//                             display: "inline-block",
//                             listStyle: "none",
//                           }}
//                           onMouseEnter={handleServicesMouseEnter}
//                           onMouseLeave={handleServicesMouseLeave}
//                         >
//                           <Link
//                             onClick={handleServicesClick}
//                           >
//                             SERVICES
//                           </Link>
//                           <div
//                             className="services-dropdown"
//                             style={{
//                               position: "absolute",
//                               top: "100%",
//                               left: "0",
//                               backgroundColor: "#fff",
//                               minWidth: "200px",
//                               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                               zIndex: 1000,
//                               width: "300px",
//                               display: showServicesDropdown ? "block" : "none",
//                               padding: "10px 0",
//                               border: "1px solid #eee",
//                             }}
//                           >
//                             {/* Web Design & Development with nested dropdown */}
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                               }}
//                               onMouseEnter={() =>
//                                 handleSubmenuHover("webdesign")
//                               }
//                               onMouseLeave={() => handleSubmenuHover(null)}
//                               onClick={() => setActiveSubmenu(activeSubmenu === "webdesign" ? null : "webdesign")}
//                             >
//                               <div
//                                 style={{
//                                   display: "block",
//                                   padding: "8px 16px",
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 <span
//                                   style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "space-between",
//                                     textDecoration: "none",
//                                     color: "#333",
//                                     fontSize: "15px",
//                                   }}
//                                 >
//                                   Web Design & Development
//                                   <FaChevronRight
//                                     style={{ marginLeft: "13px" }}
//                                   />
//                                 </span>
//                               </div>

//                               <div
//                                 className="web-design-submenu"
//                                 style={{
//                                   position: "absolute",
//                                   top: "0",
//                                   left: "100%",
//                                   backgroundColor: "#fff",
//                                   minWidth: "180px",
//                                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                   zIndex: 1001,
//                                   padding: "10px 0",
//                                   border: "1px solid #eee",
//                                   display: activeSubmenu === "webdesign" ? "block" : "none",
//                                 }}
//                               >
//                                 <Link href="/Staticwebsite" className={pathname === "/Staticwebsite" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Static Websites</Link>
//                                 <Link href="/Dyanamicwebsite" className={pathname === "/Dyanamicwebsite" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Dynamic Websites</Link>
//                                 <Link href="/Customizedwebsites" className={pathname === "/Customizedwebsites" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Customized Websites</Link>
//                               </div>
//                             </div>

//                             <Link href="/Geekychat" className={pathname === "/Geekychat" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s", fontSize: "15px" }}>GeekyChat (WhatsApp Bulk Messaging)</Link>
//                             <Link href="/Erp" className={pathname === "/Erp" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>ERP</Link>
//                             <Link href="/Crm" className={pathname === "/Crm" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>CRM's</Link>
//                             <Link href="/Ecommerce" className={pathname === "/Ecommerce" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>E-commerce</Link>
//                             <Link href="/Elearning" className={pathname === "/Elearning" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>E-learning</Link>
//                             <Link href="/Lms" className={pathname === "/Lms" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>LMS</Link>
//                             <Link href="/Digitalmarketing" className={pathname === "/Digitalmarketing" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>Digital Marketing</Link>
//                             <Link href="/Dataanalytics" className={pathname === "/Dataanalytics" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>Data Analytics & Science</Link>
//                             <Link href="/Mobileapp" className={pathname === "/Mobileapp" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>Mobile Application</Link>
//                             <Link href="/Cybersecurity" className={pathname === "/Cybersecurity" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>Cyber Security</Link>
//                             <Link href="https://trainings.excerptech.com" className={pathname === "https://trainings.excerptech.com" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", transition: "background-color 0.3s" }}>Excerpt Trainings</Link>
//                           </div>
//                         </li>

//                         <li className="menu">
//                           <Link href="/Portfolio" className={pathname === "/Portfolio" ? "active-link" : ""}>PORTFOLIO</Link>
//                         </li>
//                         <li className="menu">
//                           <Link href="/Contact" className={pathname === "/Contact" ? "active-link" : ""}>CONTACT</Link>
//                         </li>
//                         <li className="menu">
//                           <a href="/Careers" style={{ color: "blue" }}>
//                             CAREERS <TiStar className="star blink star-button" />
//                           </a>
//                         </li>

//                         {isAdmin && (
//                           <li className="menu search-option">
//                             <Link
//                               href="/dashboard"
//                               className="get-start-button d-flex align-items-center"
//                               style={{ width: "20px", marginTop: "-1px" }}
//                             >
//                               <b>ADMIN</b>
//                             </Link>
//                           </li>
//                         )}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Fixed: Only one MobileNav with proper props */}
//       <MobileNav isLoggedIn={isLoggedIn} onLogout={onLogout} />

//       {showLogoutToast && <div className="logout-toast">Logout successful</div>}
//     </div>
//   );
// };

// export default Navbar;

'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from "./Mobilenav";
import { TiStar } from "react-icons/ti";
//import { FaPhoneAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Image from 'next/image';
const Navbar = ({ isLoggedIn = false, isAdmin = false, onLogout = () => {} }) => {
  const pathname = usePathname(); // NEXTJS: Use pathname for active link detection
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const whiteLogo = "/image/excerptwww.png";
  const blackLogo = "/image/excerptbbb.png";

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array, listeners attached once

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.services-menu-container')) {
        setShowServicesDropdown(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setShowLogoutToast(true);
    setTimeout(() => {
      setShowLogoutToast(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("isLoggedIn", "false");
        sessionStorage.removeItem("isAdminLoggedIn");
      }
    }, 3000);
  };

  const handleSubmenuHover = (submenu) => {
    setActiveSubmenu(submenu);
  };

  // const handleSubmenuLeave = () => {
  //   setActiveSubmenu(null);
  // };

  const handleServicesClick = (e) => {
    e.preventDefault();
    setShowServicesDropdown(!showServicesDropdown);
  };

  const handleServicesMouseEnter = () => {
    if (window.innerWidth > 768) {
      setShowServicesDropdown(true);
    }
  };

  const handleServicesMouseLeave = () => {
    if (window.innerWidth > 768) {
      setShowServicesDropdown(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <div className={`header-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <style>{`
        /* Hover effects removed for performance - using click handlers instead */
        .active-link {
          color: #0554f2 !important;
          font-weight: 600;
        }

        #topheader {
          background-color: #0554f2;
          color: white;
          position: relative;
          z-index: 10000;
          min-height: 50px;
          height: 50px;
          overflow: hidden;
        }

        #topheader .paragraph.notification {
          padding: 10px 0;
        }

        #topheader a {
          color: white;
          text-decoration: none;
        }

        .header-wrapper {
          width: 100%;
        }

        .header-wrapper.scrolled {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header-wrapper.scrolled #topheader {
          background-color: #0554f2;
          min-height: 50px;
          height: 50px;
        }

        .header-wrapper.scrolled #navbar-1 {
          background-color: white;
        }

        @media (max-width: 768px) {
          .services-dropdown {
            position: static !important;
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            background-color: #f8f9fa !important;
            margin-top: 10px !important;
          }
          
          .web-design-submenu {
            position: static !important;
            box-shadow: none !important;
            border: none !important;
            background-color: #e9ecef !important;
            margin-left: 20px !important;
            margin-top: 5px !important;
          }
        }
      `}</style>

      {/* Top Header Section - Always render to prevent layout shift */}
      <section id="topheader" style={{ minHeight: '40px', height: '50px', position: 'relative', overflow: 'hidden' }}>
        <div 
          className="nav-content" 
          style={{ 
            marginLeft: "400px",
            visibility: isScrolled ? 'hidden' : 'visible',
            opacity: isScrolled ? 0 : 1
          }}
        >
          <div className="paragraph notification" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 100px" }}>
            <span style={{ display: "flex", gap: "30px", alignItems: "center" ,marginTop:"10px"}}>
              <a href="mailto:info@excerptech.com" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <i className="fa-solid fa-envelope"></i>
                <b>info@excerptech.com</b>
              </a>
              <a
                onClick={() => window.gtag_report_conversion && window.gtag_report_conversion('tel:+916364657660')}
                href="tel:+916364657660"
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i className="fa-solid fa-phone"></i>
                <span>+91 63646 57660</span>
              </a>
            </span>
            <span>
              {isLoggedIn ? (
                <a href="#" className="user-account" onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <i className="fa-solid fa-sign-out"></i> Logout
                </a>
              ) : (
                <Link href="/login" className="user-account" style={{ display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "white" ,fontWeight:"bold"}}>
                  <i className="fa-solid fa-user-tie"></i> Login / Register
                </Link>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Main Navbar Section */}
      <section id="navbar-1">
        <div
          className={`nav-wrapper `}
          style={{ height: "80px", minHeight: "80px" }}
        >
          <div style={{marginLeft:"10px"}} className="d-flex align-items-center">
            {/* CLS FIX: Logo wrapper always reserves max height (105px) to prevent layout shift */}
            <div className={`logo-wrapper`} style={{ minHeight: '105px', height: '105px' }}>
              <div className="logo" style={{ marginTop: "-9px", minHeight: '105px', height: '105px', display: 'flex', alignItems: 'center' }}>
                <Link href="/" style={{ zIndex: 100000 }}>
                  {/* CLS FIX: Use transform scale instead of changing height/width to prevent layout shift */}
                  <Image
                    className={`logo-img ${isScrolled ? "scrolled" : ""}`}
                    src={isScrolled ? blackLogo : whiteLogo}
                    width={190}
                    height={80}
                    style={{
                      height: '100px', /* Always max height */
                      width: '200px', /* Always max width */
                      objectFit: 'contain',
                      display: 'block',
                      transform: isScrolled ? 'scale(0.67) translateX(15px)' : 'scale(1)', /* CLS FIX: Use transform instead of size changes */
                      transformOrigin: 'left center',
                      transition: 'transform 0.3s ease'
                    }}
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div
              className={`nav-content `}
              style={{ marginLeft: "-85px" }}
            >
              <div className="clip-path"></div>
              <div style={{marginBottom:"20px"}} className="white__background"></div>
              <nav style={{marginBottom:"20px"}}>
                <div className="clip-border">
                  <div className="options">
                    <div
                      className="each-optins-list d-flex align-items-center"
                      style={{ marginLeft: "-10px" }}
                    >
                      <ul className="menus d-flex align-items-center">
                        <li className="">
                          <Link href="/" className={pathname === "/" ? "active-link" : ""}>HOME</Link>
                          <div className="dropdown__menu submenu"></div>
                        </li>

                        <li
                          className="services-menu-container"
                          style={{
                            position: "relative",
                            display: "inline-block",
                            listStyle: "none",
                          }}
                          onMouseEnter={handleServicesMouseEnter}
                          onMouseLeave={handleServicesMouseLeave}
                        >
                          <button
                            onClick={handleServicesClick}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'inherit',
                              font: 'inherit',
                              cursor: 'pointer',
                              padding: 0,
                              textDecoration: 'none'
                            }}
                          >
                            SERVICES
                          </button>
                          <div
                            className="services-dropdown"
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "0",
                              backgroundColor: "#fff",
                              minWidth: "200px",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              zIndex: 1000,
                              width: "300px",
                              display: showServicesDropdown ? "block" : "none",
                              padding: "10px 0",
                              border: "1px solid #eee",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                              onMouseEnter={() => handleSubmenuHover("webdesign")}
                              onMouseLeave={() => handleSubmenuHover(null)}
                              onClick={() => setActiveSubmenu(activeSubmenu === "webdesign" ? null : "webdesign")}
                            >
                              <div
                                style={{
                                  display: "block",
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                }}
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    textDecoration: "none",
                                    color: "#333",
                                    fontSize: "15px",
                                  }}
                                >
                                  Web Design & Development
                                  <FaChevronRight style={{ marginLeft: "13px" }} />
                                </span>
                              </div>

                              <div
                                className="web-design-submenu"
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  left: "100%",
                                  backgroundColor: "#fff",
                                  minWidth: "180px",
                                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                  zIndex: 1001,
                                  padding: "10px 0",
                                  border: "1px solid #eee",
                                  display: activeSubmenu === "webdesign" ? "block" : "none",
                                }}
                              >
                                <Link href="/Staticwebsite" className={pathname === "/Staticwebsite" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Static Websites</Link>
                                <Link href="/Dyanamicwebsite" className={pathname === "/Dyanamicwebsite" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Dynamic Websites</Link>
                                <Link href="/Customizedwebsites" className={pathname === "/Customizedwebsites" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Customized Websites</Link>
                              </div>
                            </div>

                            <Link href="/Geekychat" className={pathname === "/Geekychat" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333", fontSize: "15px" }}>GeekyChat (WhatsApp Bulk Messaging)</Link>
                            <Link href="/Erp" className={pathname === "/Erp" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>ERP</Link>
                            <Link href="/Crm" className={pathname === "/Crm" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>CRM&apos;s</Link>
                            <Link href="/Ecommerce" className={pathname === "/Ecommerce" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>E-commerce</Link>
                            <Link href="/Elearning" className={pathname === "/Elearning" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>E-learning</Link>
                            <Link href="/Lms" className={pathname === "/Lms" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>LMS</Link>
                            <Link href="/DigitalMarketing" className={pathname === "/DigitalMarketing" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Digital Marketing</Link>
                            <Link href="/Dataanalytics" className={pathname === "/Dataanalytics" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Data Analytics & Science</Link>
                            <Link href="/Mobileapp" className={pathname === "/Mobileapp" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Mobile Application</Link>
                            <Link href="/Cybersecurity" className={pathname === "/Cybersecurity" ? "active-link" : ""} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Cyber Security</Link>
                            <a href="https://trainings.excerptech.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#333" }}>Excerpt Trainings</a>
                          </div>
                        </li>

                        <li className="menu">
                          <Link href="/portfolio" className={pathname === "/portfolio" ? "active-link" : ""}>PORTFOLIO</Link>
                        </li>
                        <li className="menu">
                          <Link href="/contact" className={pathname === "/contact" ? "active-link" : ""}>CONTACT</Link>
                        </li>
                        <li className="menu" style={{marginBottom:"10px"}}>
                          <Link href="/careers" className={pathname === "/careers" ? "active-link" : ""} style={{ color: "blue",marginTop:"-5rem" }}>
                            CAREERS <TiStar className="star blink star-button ml-5" />
                          </Link>
                        </li>

                        {isAdmin && (
                          <li className="menu search-option">
                            <Link
                              href="/dashboard"
                              className="get-start-button d-flex align-items-center"
                              style={{ width: "20px", marginTop: "-1px" }}
                            >
                              <b>ADMIN</b>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <MobileNav isLoggedIn={isLoggedIn} onLogout={onLogout} />

      {showLogoutToast && (
        <div
          className="logout-toast"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
          Logout successful
        </div>
      )}
    </div>
  );
};

export default Navbar;