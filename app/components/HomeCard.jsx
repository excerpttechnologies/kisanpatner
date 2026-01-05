import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

function HomeCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  const router = useRouter();

    const cards = [
    {
      img: "brochure/ai_chatbot.webp",
      title: "AI Chatbot Services",
      link: "/webdesign",
    },
    {
      img: "brochure/crm.webp",
      title: "CRM Solutions",
      link: "/Crm",
    },
    {
      img: "brochure/digital.webp",
      title: "Digital Marketing",
      link: "/DigitalMarketing",
    },
    {
      img: "brochure/dyanamic.webp",
      title: "Dynamic Website",
      link: "/Dyanamicwebsite",
    },
    {
      img: "brochure/e-comm.webp",
      title: "E-commerce Solutions",
      link: "/Ecommerce",
    },
    {
      img: "brochure/e-learning.webp",
      title: "E-learning Solutions",
      link: "/Elearning",
    },
    {
      img: "brochure/erp.webp",
      title: "ERP Solutions",
      link: "/Erp",
    },
    {
      img: "brochure/geeky.webp",
      title: "WhatsApp Bulk Messaging",
      link: "/Geekychat",
    },
    {
      img: "brochure/lms-1.webp",
      title: "LMS Solutions",
      link: "/Lms",
    },
    {
      img: "brochure/powerbi.webp",
      title: "Power BI Solutions",
      link: "/Dataanalytics",
    },
    {
      img: "brochure/static_web.webp",
      title: "Static Website",
      link: "/Staticwebsite",
    },
    {
      img: "brochure/wt-ecom.webp",
      title: "WhatsApp E-commerce Solution",
      link: "/WhatsappEcommerce",
    },
  ];

  const totalCards = cards.length;
  const extendedCards = [...cards, ...cards];

  const autoSlide = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(autoSlide, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (currentIndex === totalCards) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
          startAutoSlide();
        }, 50);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalCards]);

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex(prevIndex => prevIndex + 1);
    setTimeout(startAutoSlide, 3000);
  };

  const handlePrev = () => {
    stopAutoSlide();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setIsTransitioning(false);
      setCurrentIndex(totalCards);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(totalCards - 1);
      }, 50);
    }
    setTimeout(startAutoSlide, 3000);
  };

  const handleImageClick = (link) => {
    router.push(link);
  };

  return (
    <div>
      <div style={{ backgroundImage: `url(images/home1/exclusive-service/bg.webp)` }} className="homecard-ex-service-cards">
        <section id="service" className="homecard-service">
          <div className="homecard-container">
            <div className="homecard-slider-container">
              <div
                className="homecard-slider-track"
                style={{
                  transform: `translateX(-${currentIndex * 25}%)`,
                  transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
                }}
              >
                {extendedCards.map((card, i) => (
                  <div className="homecard-card" key={i}>
                    <div className="homecard-service-card">
                      <div 
                        className="homecard-card-image" 
                        onClick={() => handleImageClick(card.link)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Image 
                          src={`/${card.img}`} 
                          alt={card.title}
                          width={300} 
                          height={200}
                          loading="lazy"
                          style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                        />
                      </div>
                      <div className="homecard-card-content">
                        <h5>{card.title}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="homecard-slider-controls">
              <button className="homecard-slider-button" onClick={handlePrev}>
                <FaChevronLeft />
              </button>
              <button className="homecard-slider-button" onClick={handleNext}>
                <FaChevronRight />
              </button>
            </div>

            <div className="homecard-space120"></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomeCard;