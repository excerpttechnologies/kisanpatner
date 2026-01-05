'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PDFDocument, rgb } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';
// import QRCode from 'qrcode';
// import NunitoBold from '../fonts/NunitoSans_7pt-Bold.ttf';
// import NunitoBold1 from '../fonts/Sanchez-Regular.ttf'; // Ensure this path is correct

// function CourseStudentList({ students }) {
//     const [courseStudents, setCourseStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedDateMap, setSelectedDateMap] = useState({});
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedYOP, setSelectedYOP] = useState('');
//     const [selectedCollege, setSelectedCollege] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [years, setYears] = useState([]);
//     const [colleges, setColleges] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/courseStudents');
//                 setCourseStudents(response.data);
//                 setLoading(false);

//                 // Extracting unique course names, years of passing, and college names
//                 const uniqueCourses = [...new Set(response.data.map(student => student.course))];
//                 const uniqueYears = [...new Set(response.data.map(student => student.yop))];
//                 const uniqueColleges = [...new Set(response.data.map(student => student.collegeName))];

//                 setCourses(uniqueCourses);
//                 setYears(uniqueYears);
//                 setColleges(uniqueColleges);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//                 setLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

//     const filteredStudents = courseStudents.filter(student => 
//         (selectedCourse ? student.course === selectedCourse : true) &&
//         (selectedYOP ? student.yop === selectedYOP : true) &&
//         (selectedCollege ? student.collegeName === selectedCollege : true)
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PDFDocument, rgb } from 'pdf-lib';
// import fontkit from '@pdf-lib/fontkit';
// import QRCode from 'qrcode';
// import NunitoBold from '../fonts/NunitoSans_7pt-Bold.ttf';
// import NunitoBold1 from '../fonts/Sanchez-Regular.ttf';

// function CourseStudentList({ students }) {
//     const [courseStudents, setCourseStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedDateMap, setSelectedDateMap] = useState({});
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const [selectedYOP, setSelectedYOP] = useState('');
//     const [selectedCollege, setSelectedCollege] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [years, setYears] = useState([]);
//     const [colleges, setColleges] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/courseStudents');
                
//                 console.log('API Response:', response.data);
                
//                 let data = [];
//                 if (Array.isArray(response.data)) {
//                     data = response.data;
//                 } else if (response.data && Array.isArray(response.data.students)) {
//                     data = response.data.students;
//                 } else if (response.data && Array.isArray(response.data.data)) {
//                     data = response.data.data;
//                 }
                
//                 setCourseStudents(data);

//                 if (data.length > 0) {
//                     const uniqueCourses = [...new Set(data.map(student => student.course).filter(Boolean))];
//                     const uniqueYears = [...new Set(data.map(student => student.yop).filter(Boolean))];
//                     const uniqueColleges = [...new Set(data.map(student => student.collegeName).filter(Boolean))];

//                     setCourses(uniqueCourses);
//                     setYears(uniqueYears);
//                     setColleges(uniqueColleges);
//                 }
                
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//                 setCourseStudents([]);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const filteredStudents = Array.isArray(courseStudents) 
//         ? courseStudents.filter(student => 
//             (selectedCourse ? student.course === selectedCourse : true) &&
//             (selectedYOP ? student.yop === selectedYOP : true) &&
//             (selectedCollege ? student.collegeName === selectedCollege : true)
//         )
//         : [];

//     const handleCourseChange = (e) => {
//         setSelectedCourse(e.target.value);
//     };

//     const handleYOPChange = (e) => {
//         setSelectedYOP(e.target.value);
//     };

//     const handleCollegeChange = (e) => {
//         setSelectedCollege(e.target.value);
//     };

//     const handleDateChange = (e, studentName) => {
//         const { value } = e.target;
//         setSelectedDateMap(prevState => ({
//             ...prevState,
//             [studentName]: value,
//         }));
//     };

//     const splitTextIntoLines = (text, maxWidth, font, fontSize) => {
//         const words = text.split(' ');
//         const lines = [];
//         let currentLine = words[0] || '';

//         for (let i = 1; i < words.length; i++) {
//             const word = words[i];
//             const testLine = currentLine + ' ' + word;
//             const testWidth = font.widthOfTextAtSize(testLine, fontSize);

//             if (testWidth <= maxWidth) {
//                 currentLine = testLine;
//             } else {
//                 if (currentLine) lines.push(currentLine);
//                 currentLine = word;
//             }
//         }
//         if (currentLine) lines.push(currentLine);

//         return lines;
//     };

//     const downloadCertificate = async (student) => {
//         const { name, fatherName, course, softwareCovered, regNo, collegeName, from, to, gender } = student;
//         const selectedDate = selectedDateMap[name] || '';
        
//         if (!selectedDate) {
//             alert('Please select a date before downloading the certificate.');
//             return;
//         }

//         try {
//             const existingPdfBytes = await fetch('/cert30.pdf').then(res => res.arrayBuffer());
//             const pdfDoc = await PDFDocument.load(existingPdfBytes);

//             pdfDoc.registerFontkit(fontkit);
//             const fontBytes = await fetch(NunitoBold).then(res => res.arrayBuffer());
//             const customFont = await pdfDoc.embedFont(fontBytes);
            
//             const pages = pdfDoc.getPages();
//             const firstPage = pages[0];
            
//             const fontBytesStudentName = await fetch(NunitoBold1).then(res => res.arrayBuffer());
//             const customFontStudentName = await pdfDoc.embedFont(fontBytesStudentName);

//             const upperCaseStudentName = name ? name.toUpperCase() : '';
//             const upperCasecollegeName = collegeName ? collegeName.toUpperCase() : '';
//             const upperCaseSoftwareCovered = softwareCovered ? softwareCovered.toUpperCase() : '';

//             let title, pronoun, pronoun1, middleText, conclusionText;

//             if (gender === 'Male') {
//                 title = 'Mr.';
//                 pronoun = 'him';
//                 pronoun1 = 'his';
//                 middleText = ` bearing Registration Number: ${regNo}, a student of ${upperCasecollegeName}, has successfully completed an internship course from ${from} to ${to} at EXCERPT TECHNOLOGIES PVT LTD. During his internship, `;
//                 conclusionText = `${pronoun.charAt(0).toUpperCase()}${pronoun1.slice(1)} conduct during ${pronoun1} stay with us was satisfactory. We wish ${pronoun} all the best for ${pronoun1} future endeavors.`;
//             } else if (gender === 'Female') {
//                 title = 'Ms.';
//                 pronoun = 'her';
//                 pronoun1 = 'her';
//                 middleText = ` bearing Registration Number: ${regNo}, a student of ${upperCasecollegeName}, has successfully completed an internship course from ${from} to ${to} at EXCERPT TECHNOLOGIES PVT LTD. During her internship, `;
//                 conclusionText = `${pronoun.charAt(0).toUpperCase()}${pronoun.slice(1)} conduct during ${pronoun} stay with us was satisfactory. We wish ${pronoun} all the best for ${pronoun} future endeavors.`;
//             } else {
//                 console.error('Invalid gender:', gender);
//                 return;
//             }

//             const introText = `This is to certify that `;
//             const nameText = `${title} ${upperCaseStudentName}`;
//             const endingText = ` worked as an Intern in "${softwareCovered}" and gained experience in the following areas:`;

//             const maxWidth = 460;
//             const fontSize = 12;
//             const lineHeight = 23;
//             const lineGap = 5;
//             let yPos = firstPage.getHeight() - 300;

//             const drawTextWithHighlight = (text, isHighlighted, isBold, x, y) => {
//                 const color = isHighlighted ? rgb(1, 1, 1) : rgb(0, 0, 0);
//                 const parts = text.split(/(Mr\.|Ms\.|Miss\.)/);
//                 let currentX = x;

//                 parts.forEach(part => {
//                     const width = customFont.widthOfTextAtSize(part, fontSize);
//                     firstPage.drawText(part, {
//                         x: currentX,
//                         y,
//                         size: fontSize,
//                         font: customFont,
//                         color,
//                     });
//                     currentX += width;
//                 });
//             };

//             let lines = splitTextIntoLines(introText + nameText + middleText + endingText, maxWidth, customFont, fontSize);

//             let currentX = 70;
//             let currentY = yPos;

//             lines.forEach((line, index) => {
//                 drawTextWithHighlight(line, false, true, currentX, currentY - (index * (lineHeight + lineGap)));
//             });

//             currentY -= lines.length * (lineHeight + lineGap) + lineGap;

//             const bulletPointLines = [
//                 "• Research and analysis",
//                 "• Writing Code",
//                 "• Preparing Documentation"
//             ];

//             bulletPointLines.forEach((line, index) => {
//                 firstPage.drawText(line, {
//                     x: 70,
//                     y: currentY - (index * (lineHeight + lineGap)),
//                     size: fontSize,
//                     font: customFont,
//                     color: rgb(0, 0, 0),
//                 });
//             });

//             currentY -= bulletPointLines.length * (lineHeight + lineGap) + lineGap;

//             const conclusionLines = splitTextIntoLines(conclusionText, maxWidth, customFont, fontSize);

//             conclusionLines.forEach((line, index) => {
//                 firstPage.drawText(line, {
//                     x: 70,
//                     y: currentY - (index * (lineHeight + lineGap)),
//                     size: fontSize,
//                     font: customFont,
//                     color: rgb(0, 0, 0),
//                 });
//             });

//             const qrCodeData = `https://www.excerptech.com/certificate1.html?REG_NO=${regNo}`;
//             const qrCodeDataURL = await QRCode.toDataURL(qrCodeData);

//             const base64Data = qrCodeDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
//             const qrCodeImage = await pdfDoc.embedPng(base64Data);

//             const qrCodeWidth = 80;
//             const qrCodeHeight = 80;

//             firstPage.drawImage(qrCodeImage, {
//                 x: 65,
//                 y: 80,
//                 width: qrCodeWidth,
//                 height: qrCodeHeight
//             });

//             const modifiedPdfBytes = await pdfDoc.save();
//             const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
//             const url = window.URL.createObjectURL(blob);
           
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = `Certificate_${name}.pdf`;
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//             document.body.removeChild(a);
//         } catch (error) {
//             console.error('Error generating certificate:', error.message);
//         }
//     };

//     if (loading) {
//         return <div>Loading students...</div>;
//     }

//     return (
//         <div>
//             <div className="filter-container" style={{display:"flex"}}>
//                 <div className="filter">
//                     <label>Courses:</label>
//                     <select value={selectedCourse} onChange={handleCourseChange}>
//                         <option value="">All Courses</option>
//                         {courses.map((course, index) => (
//                             <option key={index} value={course}>{course}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="filter">
//                     <label>Year of Passing:</label>
//                     <select value={selectedYOP} onChange={handleYOPChange}>
//                         <option value="">All Years</option>
//                         {years.map((year, index) => (
//                             <option key={index} value={year}>{year}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="filter">
//                     <label>College Name:</label>
//                     <select value={selectedCollege} onChange={handleCollegeChange}>
//                         <option value="">All Colleges</option>
//                         {colleges.map((college, index) => (
//                             <option key={index} value={college}>{college}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             <div className="card-container">
//                 {filteredStudents.length > 0 ? (
//                     filteredStudents.map((student, index) => (
//                         <div key={index} className="card">
//                             <div>
//                                 <img
//                                     src={`/${student.regNo}.png`}
//                                     alt={`Image of ${student.name}`}
//                                     style={{ width: '100px', height: '100px', borderRadius: "50%" }}
//                                 />
//                                 <div className="info-container">
//                                     <div className="label">Name:</div>
//                                     <h3>{student.name.toUpperCase()}</h3>
//                                     <div className="label">Course:</div>
//                                     <p>{student.course}</p>
//                                     <div className="label">Year of Passing:</div>
//                                     <p>{student.yop}</p>
//                                     <div className="label">Software Covered:</div>
//                                     <p>{student.softwareCovered}</p>
//                                     <div className="label">regNo:</div>
//                                     <p>{student.regNo}</p>
//                                     <div className="label">College Name:</div>
//                                     <p>{student.collegeName}</p>
//                                     <div className="label">From Date:</div>
//                                     <p>{student.from}</p>
//                                     <div className="label">To Date:</div>
//                                     <p>{student.to}</p>
//                                 </div>
//                             </div>
//                             <div className="button-container">
//                                 <input
//                                     type="date"
//                                     value={selectedDateMap[student.name] || ''}
//                                     onChange={(e) => handleDateChange(e, student.name)}
//                                 />
//                                 <a href={`https://excerptech.com/certificate1.html?REG_NO=${student.regNo}`} target="_blank" rel="noopener noreferrer">
//                                     View Certificate
//                                 </a>
//                             </div>
//                             <button onClick={() => downloadCertificate(student)}>Download Certificate</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No students found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default CourseStudentList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import QRCode from 'qrcode';
import NunitoBold from '../fonts/NunitoSans_7pt-Bold.ttf';
import NunitoBold1 from '../fonts/Sanchez-Regular.ttf';

function CourseStudentList({ students }) {
    const [courseStudents, setCourseStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDateMap, setSelectedDateMap] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedYOP, setSelectedYOP] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [courses, setCourses] = useState([]);
    const [years, setYears] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [mounted, setMounted] = useState(false);

    // Fix hydration issues by waiting for client-side mount
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get('http://localhost:8080/api/courseStudents');
                
                console.log('=== API RESPONSE DEBUG ===');
                console.log('Full response:', response);
                console.log('response.data:', response.data);
                console.log('Type:', typeof response.data);
                console.log('Is Array?:', Array.isArray(response.data));
                
                if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                    console.log('Object keys:', Object.keys(response.data));
                    console.log('Object values:', Object.values(response.data));
                }
                
                // Enhanced data extraction with more fallback options
                let data = [];
                
                if (Array.isArray(response.data)) {
                    // Case 1: Direct array
                    data = response.data;
                    console.log('✓ Data is direct array');
                } else if (response.data && typeof response.data === 'object') {
                    // Case 2: Nested in object
                    if (Array.isArray(response.data.students)) {
                        data = response.data.students;
                        console.log('✓ Data found in response.data.students');
                    } else if (Array.isArray(response.data.data)) {
                        data = response.data.data;
                        console.log('✓ Data found in response.data.data');
                    } else if (Array.isArray(response.data.courseStudents)) {
                        data = response.data.courseStudents;
                        console.log('✓ Data found in response.data.courseStudents');
                    } else if (Array.isArray(response.data.result)) {
                        data = response.data.result;
                        console.log('✓ Data found in response.data.result');
                    } else if (Array.isArray(response.data.items)) {
                        data = response.data.items;
                        console.log('✓ Data found in response.data.items');
                    } else {
                        // Try to find any array in the response
                        const keys = Object.keys(response.data);
                        console.log('Searching through keys:', keys);
                        
                        for (const key of keys) {
                            if (Array.isArray(response.data[key])) {
                                data = response.data[key];
                                console.log(`✓ Data found in response.data.${key}`);
                                break;
                            }
                        }
                        
                        // If still no array found, check if response.data itself is a single object
                        if (data.length === 0 && response.data.name) {
                            data = [response.data];
                            console.log('✓ Single object wrapped in array');
                        }
                    }
                } else if (typeof response.data === 'string') {
                    // Case 3: String response (might be JSON)
                    try {
                        const parsed = JSON.parse(response.data);
                        if (Array.isArray(parsed)) {
                            data = parsed;
                            console.log('✓ Parsed string to array');
                        }
                    } catch (e) {
                        console.error('Failed to parse string response:', e);
                    }
                }
                
                console.log('Final extracted data:', data);
                console.log('Data length:', data.length);
                console.log('First item:', data[0]);
                
                // Final validation
                if (!Array.isArray(data)) {
                    console.error('❌ Data is not an array after all attempts:', data);
                    throw new Error(`Invalid data format: expected array but got ${typeof data}`);
                }
                
                if (data.length === 0) {
                    console.warn('⚠️ Empty array received from API');
                }
                
                setCourseStudents(data);

                // Extract unique values for filters
                if (data.length > 0) {
                    const uniqueCourses = [...new Set(
                        data.map(student => student?.course).filter(Boolean)
                    )].sort();
                    
                    const uniqueYears = [...new Set(
                        data.map(student => student?.yop).filter(Boolean)
                    )].sort();
                    
                    const uniqueColleges = [...new Set(
                        data.map(student => student?.collegeName).filter(Boolean)
                    )].sort();

                    setCourses(uniqueCourses);
                    setYears(uniqueYears);
                    setColleges(uniqueColleges);
                    
                    console.log('Filters extracted:', { 
                        courses: uniqueCourses.length, 
                        years: uniqueYears.length, 
                        colleges: uniqueColleges.length 
                    });
                }
                
                setLoading(false);
            } catch (error) {
                console.error('❌ Error fetching data:', error);
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
                
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                    console.error('Response data:', error.response.data);
                }
                
                setError(error.message || 'Failed to fetch student data');
                setCourseStudents([]);
                setLoading(false);
            }
        };

        if (mounted) {
            fetchData();
        }
    }, [mounted]);

    // Safe filtering with null checks
    const filteredStudents = Array.isArray(courseStudents) 
        ? courseStudents.filter(student => {
            if (!student || typeof student !== 'object') {
                console.warn('Invalid student object:', student);
                return false;
            }
            
            const courseMatch = selectedCourse ? student.course === selectedCourse : true;
            const yopMatch = selectedYOP ? student.yop === selectedYOP : true;
            const collegeMatch = selectedCollege ? student.collegeName === selectedCollege : true;
            
            return courseMatch && yopMatch && collegeMatch;
        })
        : [];

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleYOPChange = (e) => {
        setSelectedYOP(e.target.value);
    };

    const handleCollegeChange = (e) => {
        setSelectedCollege(e.target.value);
    };

    const handleDateChange = (e, studentName) => {
        const { value } = e.target;
        setSelectedDateMap(prevState => ({
            ...prevState,
            [studentName]: value,
        }));
    };

    const splitTextIntoLines = (text, maxWidth, font, fontSize) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0] || '';

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + ' ' + word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth <= maxWidth) {
                currentLine = testLine;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);

        return lines;
    };

    const downloadCertificate = async (student) => {
        const { name, fatherName, course, softwareCovered, regNo, collegeName, from, to, gender } = student;
        const selectedDate = selectedDateMap[name] || '';
        
        if (!selectedDate) {
            alert('Please select a date before downloading the certificate.');
            return;
        }

        try {
            const existingPdfBytes = await fetch('/cert30.pdf').then(res => {
                if (!res.ok) throw new Error('Certificate template not found');
                return res.arrayBuffer();
            });
            
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            pdfDoc.registerFontkit(fontkit);
            
            const fontBytes = await fetch(NunitoBold).then(res => res.arrayBuffer());
            const customFont = await pdfDoc.embedFont(fontBytes);
            
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            
            const fontBytesStudentName = await fetch(NunitoBold1).then(res => res.arrayBuffer());
            const customFontStudentName = await pdfDoc.embedFont(fontBytesStudentName);

            const upperCaseStudentName = name ? name.toUpperCase() : '';
            const upperCasecollegeName = collegeName ? collegeName.toUpperCase() : '';
            const upperCaseSoftwareCovered = softwareCovered ? softwareCovered.toUpperCase() : '';

            let title, pronoun, pronoun1, middleText, conclusionText;

            if (gender === 'Male') {
                title = 'Mr.';
                pronoun = 'him';
                pronoun1 = 'his';
                middleText = ` bearing Registration Number: ${regNo}, a student of ${upperCasecollegeName}, has successfully completed an internship course from ${from} to ${to} at EXCERPT TECHNOLOGIES PVT LTD. During his internship, `;
                conclusionText = `${pronoun.charAt(0).toUpperCase()}${pronoun1.slice(1)} conduct during ${pronoun1} stay with us was satisfactory. We wish ${pronoun} all the best for ${pronoun1} future endeavors.`;
            } else if (gender === 'Female') {
                title = 'Ms.';
                pronoun = 'her';
                pronoun1 = 'her';
                middleText = ` bearing Registration Number: ${regNo}, a student of ${upperCasecollegeName}, has successfully completed an internship course from ${from} to ${to} at EXCERPT TECHNOLOGIES PVT LTD. During her internship, `;
                conclusionText = `${pronoun.charAt(0).toUpperCase()}${pronoun.slice(1)} conduct during ${pronoun} stay with us was satisfactory. We wish ${pronoun} all the best for ${pronoun} future endeavors.`;
            } else {
                console.error('Invalid gender:', gender);
                alert('Invalid gender specified for student');
                return;
            }

            const introText = `This is to certify that `;
            const nameText = `${title} ${upperCaseStudentName}`;
            const endingText = ` worked as an Intern in "${softwareCovered}" and gained experience in the following areas:`;

            const maxWidth = 460;
            const fontSize = 12;
            const lineHeight = 23;
            const lineGap = 5;
            let yPos = firstPage.getHeight() - 300;

            const drawTextWithHighlight = (text, isHighlighted, isBold, x, y) => {
                const color = isHighlighted ? rgb(1, 1, 1) : rgb(0, 0, 0);
                const parts = text.split(/(Mr\.|Ms\.|Miss\.)/);
                let currentX = x;

                parts.forEach(part => {
                    const width = customFont.widthOfTextAtSize(part, fontSize);
                    firstPage.drawText(part, {
                        x: currentX,
                        y,
                        size: fontSize,
                        font: customFont,
                        color,
                    });
                    currentX += width;
                });
            };

            let lines = splitTextIntoLines(introText + nameText + middleText + endingText, maxWidth, customFont, fontSize);

            let currentX = 70;
            let currentY = yPos;

            lines.forEach((line, index) => {
                drawTextWithHighlight(line, false, true, currentX, currentY - (index * (lineHeight + lineGap)));
            });

            currentY -= lines.length * (lineHeight + lineGap) + lineGap;

            const bulletPointLines = [
                "• Research and analysis",
                "• Writing Code",
                "• Preparing Documentation"
            ];

            bulletPointLines.forEach((line, index) => {
                firstPage.drawText(line, {
                    x: 70,
                    y: currentY - (index * (lineHeight + lineGap)),
                    size: fontSize,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
            });

            currentY -= bulletPointLines.length * (lineHeight + lineGap) + lineGap;

            const conclusionLines = splitTextIntoLines(conclusionText, maxWidth, customFont, fontSize);

            conclusionLines.forEach((line, index) => {
                firstPage.drawText(line, {
                    x: 70,
                    y: currentY - (index * (lineHeight + lineGap)),
                    size: fontSize,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
            });

            const qrCodeData = `https://www.excerptech.com/certificate1.html?REG_NO=${regNo}`;
            const qrCodeDataURL = await QRCode.toDataURL(qrCodeData);

            const base64Data = qrCodeDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            const qrCodeImage = await pdfDoc.embedPng(base64Data);

            const qrCodeWidth = 80;
            const qrCodeHeight = 80;

            firstPage.drawImage(qrCodeImage, {
                x: 65,
                y: 80,
                width: qrCodeWidth,
                height: qrCodeHeight
            });

            const modifiedPdfBytes = await pdfDoc.save();
            const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
           
            const a = document.createElement('a');
            a.href = url;
            a.download = `Certificate_${name.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error generating certificate:', error);
            alert(`Failed to generate certificate: ${error.message}`);
        }
    };

    // Don't render anything until mounted (prevents hydration mismatch)
    if (!mounted) {
        return null;
    }

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading students...</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Please wait while we fetch the data</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                <h3>Error Loading Data</h3>
                <p style={{ marginBottom: '15px' }}>{error}</p>
                <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                    <p>Check the console for detailed error information.</p>
                    <p>Make sure the API server is running at http://localhost:8080</p>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    style={{ 
                        marginTop: '15px', 
                        padding: '10px 20px', 
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="filter-container" style={{ display: "flex", gap: "20px", marginBottom: "20px", padding: "10px", flexWrap: "wrap" }}>
                <div className="filter">
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Courses:</label>
                    <select value={selectedCourse} onChange={handleCourseChange} style={{ padding: '5px' }}>
                        <option value="">All Courses</option>
                        {courses.map((course, index) => (
                            <option key={index} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
                <div className="filter">
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Year of Passing:</label>
                    <select value={selectedYOP} onChange={handleYOPChange} style={{ padding: '5px' }}>
                        <option value="">All Years</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="filter">
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>College Name:</label>
                    <select value={selectedCollege} onChange={handleCollegeChange} style={{ padding: '5px' }}>
                        <option value="">All Colleges</option>
                        {colleges.map((college, index) => (
                            <option key={index} value={college}>{college}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {courseStudents.length > 0 && (
                <div style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                    <strong>Total Students:</strong> {courseStudents.length} | 
                    <strong> Filtered:</strong> {filteredStudents.length}
                </div>
            )}
            
            <div className="card-container">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                        <div key={student?.regNo || `student-${index}`} className="card">
                            <div>
                                <img
                                    src={`/${student.regNo}.png`}
                                    alt={`${student.name || 'Student'}`}
                                    width="100"
                                    height="100"
                                    style={{ width: '100px', height: '100px', borderRadius: "50%", objectFit: 'cover' }}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                                <div className="info-container">
                                    <div className="label">Name:</div>
                                    <h3>{student?.name?.toUpperCase() || 'N/A'}</h3>
                                    <div className="label">Course:</div>
                                    <p>{student?.course || 'N/A'}</p>
                                    <div className="label">Year of Passing:</div>
                                    <p>{student?.yop || 'N/A'}</p>
                                    <div className="label">Software Covered:</div>
                                    <p>{student?.softwareCovered || 'N/A'}</p>
                                    <div className="label">Reg No:</div>
                                    <p>{student?.regNo || 'N/A'}</p>
                                    <div className="label">College Name:</div>
                                    <p>{student?.collegeName || 'N/A'}</p>
                                    <div className="label">From Date:</div>
                                    <p>{student?.from || 'N/A'}</p>
                                    <div className="label">To Date:</div>
                                    <p>{student?.to || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="button-container" style={{ marginTop: '10px' }}>
                                <input
                                    type="date"
                                    value={selectedDateMap[student.name] || ''}
                                    onChange={(e) => handleDateChange(e, student.name)}
                                    style={{ padding: '5px', marginRight: '10px' }}
                                />
                                <a 
                                    href={`https://excerptech.com/certificate1.html?REG_NO=${student.regNo}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '10px', textDecoration: 'none', color: '#007bff' }}
                                >
                                    View Certificate
                                </a>
                            </div>
                            <button 
                                onClick={() => downloadCertificate(student)}
                                style={{ 
                                    marginTop: '10px', 
                                    padding: '8px 16px', 
                                    cursor: 'pointer',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                            >
                                Download Certificate
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                        <p style={{ fontSize: '16px', color: '#666' }}>
                            {courseStudents.length === 0 
                                ? 'No students available.' 
                                : 'No students found matching the selected filters.'}
                        </p>
                        {courseStudents.length > 0 && (
                            <button 
                                onClick={() => {
                                    setSelectedCourse('');
                                    setSelectedYOP('');
                                    setSelectedCollege('');
                                }}
                                style={{ 
                                    marginTop: '10px', 
                                    padding: '8px 16px', 
                                    cursor: 'pointer',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseStudentList;