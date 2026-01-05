'use client';

import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to handle scroll event
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;

        // Show the button when the user scrolls down 200 pixels
        if (scrollTop > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="scroll-to-top-wrapper">
                    <button className="scroll-to-top-btn" onClick={scrollToTop}>
                        <i className="fa fa-arrow-up"></i>
                    </button>
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;
