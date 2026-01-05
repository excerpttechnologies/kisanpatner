'use client';

import React, { useState } from 'react';
import { TiStar } from "react-icons/ti";
import Link from 'next/link';
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const MobileNav = ({ isLoggedIn, onLogout }) => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const [isNavVisible, setNavVisible] = useState(true);
    const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [isWebDesignDropdownOpen, setWebDesignDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleMobileNav = () => {
        setMobileNavOpen(!isMobileNavOpen);
        if (isMobileNavOpen) {
            setServicesDropdownOpen(false);
            setWebDesignDropdownOpen(false);
        }
    };

    const handleNavClick = () => {
        setMobileNavOpen(false);
        setServicesDropdownOpen(false);
        setWebDesignDropdownOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        setMobileNavOpen(false);
        setServicesDropdownOpen(false);
        setWebDesignDropdownOpen(false);
    };

    const handleServicesToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setServicesDropdownOpen(prev => !prev);
    };

    const handleWebDesignToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setWebDesignDropdownOpen(prev => !prev);
    };

    return (
        <div style={{ backgroundColor: "white", position: "relative", zIndex: 1000 }}>
            <div
                className={`mobile-nav-wrapper ${isNavVisible ? 'visible' : ''}`}
                style={{
                    textAlign: 'right',
                    padding: '10px',
                    background: isNavVisible ? 'white' : 'transparent',
                    position: 'relative',
                    zIndex: 1001,
                    height:"auto",
                }}
            >
                {/* Top bar */}
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "1px",
                    position: 'relative',
                    zIndex: 1002,
                    height:"auto",
                }}>
                    <div style={{ textAlign: "left", fontSize: "14px", lineHeight: "1.3" }}>
                        <div>+91 6364657660</div>
                        <div>info@excerptech.com</div>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <button 
                                onClick={handleLogout}
                                style={{ 
                                    background: "#dc3545", 
                                    color: "white", 
                                    border: "none", 
                                    padding: "2px 4px", 
                                    borderRadius: "4px", 
                                    fontSize: "12px", 
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    position: 'relative',
                                    zIndex: 1003
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <button 
                                onClick={() => router.push('/login')}
                                style={{ 
                                    background: "#007bff", 
                                    color: "white", 
                                    border: "none", 
                                    padding: "2px 4px", 
                                    borderRadius: "4px", 
                                    fontSize: "12px", 
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    position: 'relative',
                                    zIndex: 1003
                                }}
                            >
                                Login / Register
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile menu icon */}
                <div
                    className="mobile-nav-icon"
                    style={{ fontSize: '25px', cursor: 'pointer', marginRight: "16px" }}
                    onClick={toggleMobileNav}
                >
                    ☰
                </div>

                <div style={{ backgroundColor: "white",color:"black" }}>
                    {isMobileNavOpen && (
                        <div
                            className="mobile-nav-content"
                            style={{
                                top: '10px',
                                width: "100%",
                                background: "#fff",
                                padding: "15px",
                                boxSizing: "border-box",
                                zIndex: 1000,
                                position: "relative",
                               
                            }}
                        >
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                textAlign: "left",
                                color:"black"
                            }}>
                                <li style={{ marginBottom: "12px" }}>
                                        <Link href="/" style={{ fontSize: "18px",color:"black" }} onClick={handleNavClick}>
                                        <b>HOME</b>
                                    </Link>
                                </li>

                                {/* Services dropdown */}
                                <li style={{ marginBottom: "12px" }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Link href="/services" style={{ fontSize: "18px",color:"black" }} onClick={handleNavClick}>
                                            <b>SERVICES</b>
                                        </Link>
                                        <div
                                            onTouchStart={handleServicesToggle}
                                            onClick={handleServicesToggle}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '10px',
                                                color: '#333'
                                            }}
                                        >
                                            {isServicesDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
                                        </div>
                                    </div>

                                    {isServicesDropdownOpen && (
                                        <div
                                            style={{
                                                marginTop: '8px',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '6px',
                                                padding: '12px',
                                                border: '1px solid #e9ecef'
                                            }}
                                        >
                                            {/* Web Design & Development nested */}
                                            <div style={{ marginBottom: '10px',color:"black" }}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '6px 0'
                                                    }}
                                                >
                                                    <span style={{
                                                        fontSize: "14px",
                                                        color: '#495057',
                                                        fontWeight: '500'
                                                    }}>
                                                        Web Design & Development
                                                    </span>
                                                    <div
                                                        onTouchStart={handleWebDesignToggle}
                                                        onClick={handleWebDesignToggle}
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '6px',
                                                            color: '#333',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        {isWebDesignDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
                                                    </div>
                                                </div>

                                                {isWebDesignDropdownOpen && (
                                                    <div
                                                        style={{
                                                            marginTop: '6px',
                                                            marginLeft: '15px',
                                                            backgroundColor: '#ffffff',
                                                            borderRadius: '4px',
                                                            padding: '8px',
                                                            border: '1px solid #dee2e6',
                                                            color:"black"
                                                        }}
                                                    >
                                                        <Link href="/Staticwebsite" style={{ fontSize: "15px", display: 'block', marginBottom: '18px',color:"black" }} onClick={handleNavClick}>
                                                            Static Websites
                                                        </Link>
                                                        <Link href="/Dyanamicwebsite" style={{ fontSize: "15px", display: 'block', marginBottom: '18px',color:"black" }} onClick={handleNavClick}>
                                                            Dynamic Websites
                                                        </Link>
                                                        <Link href="/Customizedwebsites" style={{ fontSize: "15px", display: 'block',color:"black" }} onClick={handleNavClick}>
                                                            Customized Websites
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Other Services */}
                                            {[
                                                { path: "/Geekychat", name: "GeekyChat (WhatsApp Bulk)" },
                                                { path: "/Erp", name: "ERP" },
                                                { path: "/Crm", name: "CRM's" },
                                                { path: "/Ecommerce", name: "E-commerce" },
                                                { path: "/Elearning", name: "E-learning" },
                                                { path: "/Lms", name: "LMS" },
                                                { path: "/DigitalMarketing", name: "Digital Marketing" },
                                                { path: "/Dataanalytics", name: "Data Analytics & Science" },
                                                { path: "/Mobileapp", name: "Mobile Application" },
                                                { path: "/Cybersecurity", name: "Cyber Security" },
                                                { path: "https://trainings.excerptech.com", name: "Excerpt Trainings" }
                                            ].map((item, i) => {
                                                // Use regular <a> tag for external URLs
                                                const isExternal = item.path.startsWith('http');
                                                const LinkComponent = isExternal ? 'a' : Link;
                                                const linkProps = isExternal 
                                                    ? { href: item.path, target: '_blank', rel: 'noopener noreferrer' }
                                                    : { href: item.path, onClick: handleNavClick };
                                                
                                                return (
                                                    <LinkComponent
                                                        key={i}
                                                        {...linkProps}
                                                        style={{
                                                            fontSize: "14px",
                                                            display: 'block',
                                                            padding: '10px 15px',
                                                            borderRadius: '4px',
                                                            marginBottom: '6px',
                                                            color: 'black',
                                                        }}
                                                    >
                                                        {item.name}
                                                    </LinkComponent>
                                                );
                                            })}
                                        </div>
                                    )}
                                </li>

                                <li style={{ marginBottom: "12px" }}>
                                    <Link href="/portfolio" style={{ fontSize: "18px",color:"black" }} onClick={handleNavClick}>
                                        <b>PORTFOLIO</b>
                                    </Link>
                                </li>
                                <li style={{ marginBottom: "12px" }}>
                                    <Link href="/contact" style={{ fontSize: "18px",color:"black" }} onClick={handleNavClick}>
                                        <b>CONTACT</b>
                                    </Link>
                                </li>
                                
                                {/* ADMIN menu item - only show when logged in */}
                                {isLoggedIn && (
                                    <li style={{ marginBottom: "12px" }}>
                                        <Link href="/dashboard" style={{ fontSize: "18px",color:"black", color: "#007bff" }} onClick={handleNavClick}>
                                            <b>ADMIN</b>
                                        </Link>
                                    </li>
                                )}

                                <li style={{ marginBottom: "12px" }}>
                                    <Link href="/careers" style={{ color: "blue", fontSize: "18px",color:"black" }} onClick={handleNavClick}>
                                        <b>CAREERS </b> 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileNav;