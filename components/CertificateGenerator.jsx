'use client';

import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import QRCode from 'qrcode';
//import { TextAlignment } from 'pdf-lib';
import PropTypes from 'prop-types'; // Import PropTypes

import Image from 'next/image';

function CertificateGenerator({ firstName, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, coursecertificatr, Gender, Role, To, From,
  department,
  qualification }) {
  console.log("Received props:", {
    firstName, CollegeName, FATHER_NAME, REG_NO, coursename, certificate_type, yop, Gender, Role,
    department, To, From,
    qualification
  });
  const defaultImage = '/image/default.png';

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle undefined or empty values
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [year, month, day] = dateString.split("-");
    return `${parseInt(day)}-${months[parseInt(month) - 1]}-${year}`;
  };

  // Convert the To and From dates
  const formattedFromDate = formatDate(From);
  const formattedToDate = formatDate(To);
  const getImageSource = (regNo) => {
    return `/image/${regNo}.jpg`; // Assuming the image file format is .jpg
  };

  const [qrCodeValue, setQrCodeValue] = useState('');

  //const fullurl = `https://www.excerptech.com/certificate.html?REG_NO=${REG_NO}`;

  // const handleViewCertificate = () => {
  //   const fullurl = `http://localhost:3000/certificate.html?REG_NO=${REG_NO}`;
  //   setQrCodeValue(fullurl);
  // }
  console.log(qrCodeValue);

  const capitalize = (str, lower = false) => {
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );
  };


  // const getLines = (text, maxWidth, font, fontSize) => {
  //   const paragraphs = text.split('\n'); // Split text into paragraphs
  //   let lines = [];
  //   let y = 400; // Initial y-position

  //   paragraphs.forEach((paragraph) => {
  //     const words = paragraph.split(' ');
  //     let currentLine = '';

  //     for (let word of words) {
  //       const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
  //       if (width > maxWidth) {
  //         lines.push(currentLine.trim());
  //         currentLine = word;
  //       } else {
  //         currentLine += ' ' + word;
  //       }
  //     }

  //     if (currentLine !== '') {
  //       lines.push(currentLine.trim());
  //     }
  //   });

  //   return { lines, y };
  // };

  const handleGenerateCertificate = async () => {
    const trimmedName = firstName ? firstName.trim() : '';

    if (trimmedName !== '' && certificate_type !== '' && qualification !== '') {
      try {
        // Template selection logic (unchanged)
        let templatePath = '';
        if (qualification.toUpperCase() === 'BE') {
          if (certificate_type.toLowerCase() === 'internship') {
            templatePath = "/BEINTERNSHIP.pdf";
          } else if (certificate_type.toLowerCase() === 'project') {
            templatePath = "/BEPROJECT.pdf";
          }
        } else if (qualification.toUpperCase() === 'DIPLOMA') {
          if (certificate_type.toLowerCase() === 'internship') {
            templatePath = "/DIPLOMAINTERNSHIP.pdf";
          } else if (certificate_type.toLowerCase() === 'project') {
            templatePath = "/DIPLOMAPROJECT.pdf";
          }
        }

        const existingPdfBytes = await fetch(templatePath).then((res) =>
          res.arrayBuffer()
        );

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);

        // Load fonts
        const nameFontBytes = await fetch("/fonts/Sanchez-Regular.ttf").then((res) =>
          res.arrayBuffer()
        );
        // const mainContentFontBytes = await fetch("/fonts/NunitoSans_10pt-Bold.ttf").then((res) =>
        //   res.arrayBuffer()
        // );
        const regularFontBytes = await fetch("/fonts/NunitoSans_7pt_SemiExpanded-SemiBold.ttf").then((res) =>
          res.arrayBuffer()
        );

        const nameFont = await pdfDoc.embedFont(nameFontBytes);
        //const mainContentFont = await pdfDoc.embedFont(mainContentFontBytes);
        const regularFont = await pdfDoc.embedFont(regularFontBytes);

        const firstPage = pdfDoc.getPages()[0];
        const { width: pageWidth, height: pageHeight } = firstPage.getSize();

        // ========== DYNAMIC LOGO CONFIGURATION FOR EACH CERTIFICATE ==========
        const LOGO_PATH = '/image/1.png'; // Path to logo in public folder

        // Logo configuration for each certificate type
        const logoConfigs = {
          BEINTERNSHIP: {
            width: 150,
            height: 80,
            x: 'center', // Center horizontally
            y: 'top', // Position from top
            topMargin: 10,
            rightMargin: 0
          },
          BEPROJECT: {
            width: 180,
            height: 70,
            x: 'right', // Right side
            y: 'top', // Position from top
            topMargin: 20,
            rightMargin: 30
          },
          DIPLOMAINTERNSHIP: {
            width: 150,
            height: 60,
            x: 'center', // Left side
            y: 'top', // Position from top
            topMargin: 20,
            rightMargin: 0,
            leftMargin: 0
          },
          DIPLOMAPROJECT: {
            width: 160,
            height: 70,
            x: 'center', // Center horizontally
            y: 'top', // Position from top
            topMargin: 50,
            rightMargin: 0
          },
          IVCERTIFICATE: {
            width: 170,
            height: 75,
            x: 'right', // Right side corner
            y: 'top', // Position from top
            topMargin: 20,
            rightMargin: 40
          },
          IVCERTIFICATE1: {
            width: 180,
            height: 70,
            x: 'left', // Left side corner
            y: 'top', // Position from top
            topMargin: 25,
            rightMargin: 0,
            leftMargin: 40
          },
          IVCERTIFICATE3: {
            width: 210,
            height: 95,
            x: 'center', // Center
            y: 'top', // Position from top
            topMargin: 10,
            rightMargin: 0
          },
          cert30: {
            width: 180,
            height: 80,
            x: 'right', // Right side
            y: 'top', // Position from top
            topMargin: 35,
            rightMargin: 45
          }
        };

        // Get current template key for logo config
        const templateKey = qualification.toUpperCase() +
          (certificate_type ? certificate_type.toUpperCase() : '');

        // Fallback to a default config if specific template not found
        const logoConfig = logoConfigs[templateKey] || {
          width: 200,
          height: 90,
          x: 'center',
          y: 'top',
          topMargin: 20,
          rightMargin: 0
        };

        // Calculate logo position based on configuration
        let logoX;
        let logoY = pageHeight - logoConfig.height - logoConfig.topMargin;

        switch (logoConfig.x) {
          case 'center':
            logoX = (pageWidth - logoConfig.width) / 2;
            break;
          case 'right':
            logoX = pageWidth - logoConfig.width - logoConfig.rightMargin;
            break;
          case 'left':
            logoX = logoConfig.leftMargin || 50;
            break;
          default:
            logoX = (pageWidth - logoConfig.width) / 2;
        }

        // Fetch and embed logo
        try {
          const logoBytes = await fetch(LOGO_PATH).then(res => res.arrayBuffer());

          // Detect if PNG, JPG, or WebP and embed accordingly
          let logoImage;
          const logoExt = LOGO_PATH.toLowerCase();

          if (logoExt.endsWith('.png')) {
            logoImage = await pdfDoc.embedPng(logoBytes);
          } else if (logoExt.endsWith('.jpg') || logoExt.endsWith('.jpeg')) {
            logoImage = await pdfDoc.embedJpg(logoBytes);
          } else if (logoExt.endsWith('.webp')) {
            // WebP needs to be converted to PNG first
            const blob = new Blob([logoBytes], { type: 'image/webp' });
            const bitmap = await createImageBitmap(blob);
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bitmap, 0, 0);

            const pngDataUrl = canvas.toDataURL('image/png');
            const pngBytes = Uint8Array.from(atob(pngDataUrl.split('base64,')[1]), c => c.charCodeAt(0));
            logoImage = await pdfDoc.embedPng(pngBytes);
          } else {
            // Default to PNG if extension is unclear
            logoImage = await pdfDoc.embedPng(logoBytes);
          }

          // Draw the logo at calculated position
          firstPage.drawImage(logoImage, {
            x: logoX,
            y: logoY,
            width: logoConfig.width,
            height: logoConfig.height,
          });
        } catch (logoError) {
          console.warn('Could not load logo, continuing without it:', logoError);
          // Certificate generation continues even if logo fails
        }
        // ================================================

        // Template-specific positioning configuration (your existing config)
        const templateConfig = {
          BE: {
            internship: {
              name: {
                x: 'center',
                y: 340,
                fontSize: 34
              },
              content: {
                x: 110,
                y: 305,
                fontSize: 13.5,
                maxWidth: 650,
                rightMargin: 110,
                lineSpacing: 22
              },
              qrCode: {
                x: 295,
                y: 77,
                width: 80,
                height: 70
              }
            },
            project: {
              name: {
                x: 'center',
                y: 370,
                fontSize: 30
              },
              content: {
                x: 130,
                y: 330,
                fontSize: 14,
                maxWidth: 650,
                rightMargin: 130,
                lineSpacing: 22
              },
              qrCode: {
                x: 290,
                y: 50,
                width: 100,
                height: 90
              }
            }
          },
          DIPLOMA: {
            internship: {
              name: {
                x: 'center',
                y: 360,
                fontSize: 32
              },
              content: {
                x: 160,
                y: 325,
                fontSize: 13,
                maxWidth: 620,
                rightMargin: 160,
                lineSpacing: 22
              },
              qrCode: {
                x: 390,
                y: 110,
                width: 80,
                height: 80
              }
            },
            project: {
              name: {
                x: 'center',
                y: 330,
                fontSize: 30
              },
              content: {
                x: 140,
                y: 290,
                fontSize: 13,
                maxWidth: 620,
                rightMargin: 140,
                lineSpacing: 22
              },
              qrCode: {
                x: 370,
                y: 90,
                width: 75,
                height: 70
              }
            }
          }
        };

        // Get configuration for current template
        const config = templateConfig[qualification.toUpperCase()][certificate_type.toLowerCase()];

        // Draw name
        const displayName = capitalize(trimmedName);
        const nameWidth = nameFont.widthOfTextAtSize(displayName, config.name.fontSize);
        const nameX = config.name.x === 'center' ? (pageWidth - nameWidth) / 2 : config.name.x;

        firstPage.drawText(displayName, {
          x: nameX,
          y: config.name.y,
          size: config.name.fontSize,
          font: nameFont,
          color: rgb(0, 0, 0),
        });

        // Generate additional content based on template type with proper spacing
        let additionalContent = '';
        if (certificate_type.toLowerCase() === 'internship') {
          additionalContent = Gender === 'MALE' ?
            `This is to certify that student from "${CollegeName}" has completed their internship work from ${formattedFromDate} to ${formattedToDate} at Excerpt Technologies Private Limited.\n\nHe has successfully & satisfactorily completed assigned project work. During his tenure as a "${Role}" we found him sincere, hardworking, and result-oriented.\n\nWe wish him great success in all of his future endeavors.` :
            `This is to certify that student from "${CollegeName}" has completed their internship work from ${formattedFromDate} to ${formattedToDate} at Excerpt Technologies Private Limited.\n\nShe has successfully & satisfactorily completed assigned project work. During her tenure as a "${Role}" we found her sincere, hardworking, and result-oriented.\n\nWe wish her great success in all of her future endeavors.`;
        } else if (certificate_type.toLowerCase() === 'project') {
          additionalContent = Gender === 'MALE' ?
            `This is to certify that student from ${CollegeName} has completed their project work from ${formattedFromDate} to ${formattedToDate} at Excerpt Technologies Private Limited.\n\nHe has successfully & satisfactorily completed assigned project work. During his tenure as a ${Role} we found him sincere, hardworking, and result-oriented.\n\nWe wish him great success in all of his future endeavors.` :
            `This is to certify that student from ${CollegeName} has completed their project work from ${formattedFromDate} to ${formattedToDate} at Excerpt Technologies Private Limited.\n\nShe has successfully & satisfactorily completed assigned project work. During her tenure as a ${Role} we found her sincere, hardworking, and result-oriented.\n\nWe wish her great success in all of her future endeavors.`;
        }

        // Improved text drawing functions
        const drawProperlySpacedText = (text, x, y, fontSize, font) => {
          firstPage.drawText(text, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
        };

        const wrapAndDrawText = (text, x, y, maxWidth, fontSize, font, lineSpacing) => {
          const words = text.split(' ');
          let line = '';
          let currentY = y + 5;

          for (let i = 0; i < words.length; i++) {
            const wordToAdd = line === '' ? words[i] : ' ' + words[i];
            const testLine = line + wordToAdd;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth > maxWidth && line !== '') {
              drawProperlySpacedText(line, x, currentY, fontSize, font);
              line = words[i];
              currentY -= lineSpacing;
            } else {
              line = testLine;
            }
          }

          if (line) {
            drawProperlySpacedText(line, x, currentY, fontSize, font);
          }

          return currentY;
        };

        // Process each paragraph with improved spacing
        if (additionalContent !== '') {
          const contentParagraphs = additionalContent.split('\n');
          let currentY = config.content.y - 10;
          const lineSpacing = config.content.lineSpacing || 20;
          const paragraphSpacing = 10;

          for (const paragraph of contentParagraphs) {
            if (paragraph.trim() === '') {
              currentY -= paragraphSpacing;
              continue;
            }

            currentY = wrapAndDrawText(
              paragraph,
              config.content.x,
              currentY,
              config.content.maxWidth,
              config.content.fontSize,
              regularFont,
              lineSpacing
            );

            currentY -= paragraphSpacing;
          }
        }

        // Generate and draw QR code
        const linkURL = `https://www.excerptech.com/certificate.html?REG_NO=${REG_NO}`;
        setQrCodeValue(linkURL);

        const qrCodeOptions = {
          color: { dark: '#000' },
          errorCorrectionLevel: 'H',
          width: 200,
          type: 'png',
          transparent: true,
        };

        const qrCodeURL = await QRCode.toDataURL(linkURL, qrCodeOptions);
        const qrCodeImageBytes = Uint8Array.from(atob(qrCodeURL.split('base64,')[1]), c => c.charCodeAt(0));
        const qrCodeImage = await pdfDoc.embedPng(qrCodeImageBytes);

        firstPage.drawImage(qrCodeImage, {
          x: config.qrCode.x,
          y: config.qrCode.y,
          width: config.qrCode.width,
          height: config.qrCode.height,
        });

        // Save and download
        // const pdfBytes = await pdfDoc.save();
        // const file = new File(
        //   [pdfBytes],
        //   "Certificate.pdf",
        //   {
        //     type: "application/pdf;charset=utf-8",
        //   }
        // );

        // saveAs(file);
        const pdfBytes = await pdfDoc.save();
        const file = new File(
          [pdfBytes],
          "Certificate.pdf",
          {
            type: "application/pdf;charset=utf-8",
          }
        );


        if (typeof window !== 'undefined') {
          const fileSaver = await import('file-saver');
          fileSaver.default(file);
        }
      } catch (error) {
        console.error('Error generating or downloading certificate:', error);
        alert('Error generating or downloading certificate. Please try again later.');
      }
    } else {
      alert('Please enter a name, select a qualification, and select a certificate type.');
    }
  };




















  return (

    <>
      <div className="card shadow">
        <div style={{ textAlign: "justify" }}>
          {/* CLS guard: fixed dimensions to reserve space */}
          <Image 
            className='image' 
            src={getImageSource(REG_NO) || defaultImage} 
            alt="Student" 
            width="200"
            height="200"
            style={{ display: 'block', aspectRatio: '1 / 1' }}
            loading="lazy"
            decoding="async"
          />
          <br />
          <br />
          <p><span className="detail-label">NAME:</span> {firstName}</p>
          <p><span className="detail-label">REG_NO:</span> {REG_NO}</p>
          <p><span className="detail-label">FATHER_NAME:</span> {FATHER_NAME}</p>
          <p><span className="detail-label">COURSETITLE:</span> {coursename}</p>
          <p><span className="detail-label">COOLEGENAME:</span> {CollegeName}</p>
          <p><span className="detail-label">CERTIFICATION:</span> {certificate_type}</p>
          <p><span className="detail-label">YOP:</span> {yop}</p>
          <p><span className="detail-label">COURSECERTIFICATION:</span> {coursecertificatr}</p>
          <p><span className="detail-label">GENDER:</span> {Gender}</p>
          <p><span className="detail-label">Role:</span> {Role}</p>

        </div>
        <div>
          <button onClick={handleGenerateCertificate} style={{ marginLeft: "-9px", width: "200px", marginTop: "10px" }}>Get Certificate</button>
          <a style={{ marginLeft: "180px" }} href={`https://www.excerptech.com/certificate.html?REG_NO=${REG_NO}`} target="_blank" rel="noopener noreferrer">View Certificate</a>
        </div>
      </div>

    </>
  );
}

CertificateGenerator.propTypes = {
  firstName: PropTypes.string.isRequired,
  REG_NO: PropTypes.string.isRequired,
  FATHER_NAME: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
  CollegeName: PropTypes.string.isRequired,
  Course_Title: PropTypes.string.isRequired,


  certificate_type: PropTypes.string.isRequired,
  yop: PropTypes.string.isRequired
};

export default CertificateGenerator;
