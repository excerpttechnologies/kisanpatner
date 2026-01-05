'use client';


// import React, { useState, useEffect } from 'react';

// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// import '../PopupScroll/Popupfrom.css';

// const ContactForm = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [userClosed, setUserClosed] = useState(false);

//   const [status, setStatus] = useState("Submit");

//   const [info, setInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInfo({
//       ...info,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let response = await fetch(`/api/contact`, {
//         method: "POST",
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           Accept: "application/json",
//           "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify(info),
//       });
//       setStatus("Submitted");
//       setInfo({ name: "", email: "", phone: "", subject: "", message: "" });
//       let result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0 && !userClosed) {
//         setShowPopup(true);
//       }
//     };

//     if (!userClosed) {
//       window.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [userClosed]);

//   const handleClose = () => {
//     setShowPopup(false);
//     setUserClosed(true);
//   };

//   return (
//     <>
//       <div className={`overlay ${showPopup ? 'show' : ''}`}></div>
//       <div className={`contact-form-popup ${showPopup ? 'show' : ''}`}>
//         <div className="contact-form-container">
//           <button className="close-button" onClick={handleClose}>
//             &times;
//           </button>
//           <div className="form-content">
//             <div className="form-left">
//               <h2 style={{textAlign:'center'}}>Contact Us</h2>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   name="name"
//                   value={info.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   name="email"
//                   value={info.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   name="phone"
//                   value={info.phone}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="subject"
//                   id="subject"
//                   value={info.subject}
//                   onChange={handleChange}
//                   placeholder="Your Subject"
//                   required
//                 />
//                 <textarea
//                   placeholder="Your Message"
//                   name="message"
//                   onChange={handleChange}
//                   value={info.message}
//                   required
//                 ></textarea>
//                 <button type="submit">{status}</button>
//               </form>
//             </div>
//             <div className="form-right">
//               <<Image src="/images/pop.webp" alt="Nature" />
//               <div className="social-icons">
//                 <h2 style={{color:'black',backgroundColor:"transparent"}}>Follow us on</h2>
//                 <a href="https://www.facebook.com/Excerptech" target="_blank" rel="noopener noreferrer" className='bg-black'><FaFacebook /></a>
//                 <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//                 <a href="https://www.linkedin.com/company/excerptech" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactForm;





import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
const ContactForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userClosed, setUserClosed] = useState(false);
  const [status, setStatus] = useState("Submit");

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(info),
      });
      setStatus("Submitted");
      setInfo({ name: "", email: "", phone: "", subject: "", message: "" });
      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const hasPopupShown = localStorage.getItem('hasPopupShown');

    if (!hasPopupShown) {
      const handleScroll = () => {
        if (window.scrollY > 0 && !userClosed) {
          setShowPopup(true);
          localStorage.setItem('hasPopupShown', 'true');
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [userClosed]);

  const handleClose = () => {
    setShowPopup(false);
    setUserClosed(true);
  };

  return (
    <>
      <div className={`overlay ${showPopup ? 'show' : ''}`}></div>
      <div className={`contact-form-popup ${showPopup ? 'show' : ''}`}>
        <div className="contact-form-container">
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          <div className="form-content">
            <div className="form-left">
              <h2 style={{textAlign:'center'}}>Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={info.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={info.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={info.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={info.subject}
                  onChange={handleChange}
                  placeholder="Your Subject"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  name="message"
                  onChange={handleChange}
                  value={info.message}
                  required
                ></textarea>
                <button type="submit">{status}</button>
              </form>
            </div>
            <div className="form-right">
              <Image src="/images/pop.webp" alt="Nature" width="400" height="400" loading="lazy" decoding="async" style={{ display: 'block' }} />
              <div className="social-icons">
                <h2 style={{color:'black',backgroundColor:"transparent"}}>Follow us on</h2>
                <a href="https://www.facebook.com/Excerptech" target="_blank" rel="noopener noreferrer" className='bg-black'><FaFacebook /></a>
                <a href="https://www.instagram.com/excerpt_technologies/?igsh=Z3k5OXozNDIzZHps" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://www.linkedin.com/company/excerptech" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;

