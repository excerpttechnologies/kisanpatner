'use client';

import { useState, useEffect } from 'react';
import { Download, FileDown, Filter, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import fontkit from '@pdf-lib/fontkit';
const API_URL = '/api';
import { PDFDocument, rgb } from 'pdf-lib';
import Dashboard from '../Pages/Dashboard/Dashboard';
// Function to generate certificate PDF bytes
async function generateCertificateBytes(student) {
    try {
        // Load the existing PDF template
        const existingPdfBytes = await fetch('/IVCERTIFICATE.pdf').then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Register fontkit for custom fonts
        pdfDoc.registerFontkit(fontkit);

        // Load custom fonts
        const nameFontBytes = await fetch("/fonts/Sanchez-Regular.ttf").then((res) =>
            // const nameFontBytes = await fetch("/fonts/AnastasiaScript.ttf").then((res) =>
            res.arrayBuffer()
        );
        const mainContentFontBytes = await fetch("/fonts/TeXGyreTermes_2.ttf").then((res) =>
            res.arrayBuffer()
        );
        const regularFontBytes = await fetch("/fonts/TeXGyreTermes.ttf").then((res) =>
            res.arrayBuffer()
        );

        const nameFont = await pdfDoc.embedFont(nameFontBytes);
        const mainContentFont = await pdfDoc.embedFont(mainContentFontBytes);
        const regularFont = await pdfDoc.embedFont(regularFontBytes);

        // Get the first page
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        // Define colors
        const primaryColor = rgb(4 / 255, 39 / 255, 99 / 255);
        const secondaryColor = rgb(102 / 255, 16 / 255, 242 / 255);
        const darkGray = rgb(51 / 255, 51 / 255, 51 / 255);
        const mediumGray = rgb(102 / 255, 102 / 255, 102 / 255);

        // Student name
        firstPage.drawText(student.name, {
            x: width / 2 - (nameFont.widthOfTextAtSize(student.name, 48) / 2),
            y: height - 280,
            size: 48,
            color: rgb(0 / 255, 0 / 255, 0 / 255),
            // maxWidth: 500,
            textAlign: 'center',
            font: nameFont,
        });

        // Format visit date
        const visitDate = new Date(student.date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        // Determine gender pronoun
        const pronoun = student.gender?.toLowerCase() === 'male' ? 'He' : student.gender?.toLowerCase() === 'female' ? 'She' : 'He/She';
        const pronounLower = student.gender?.toLowerCase() === 'male' ? 'his' : student.gender?.toLowerCase() === 'female' ? 'her' : 'his/her';

        // Split certificate text into lines
        // Draw the first part in bold (mainContentFont), rest in regular
        const line1Part1 = `${pronoun} has undergone Industrial Visit at `;
        const line1Part2 = `Excerpt Technologies Pvt Ltd. `;
        const line1Part3 = `${pronoun} gained the `;

        // Calculate X for centering the whole line
        const totalLine1 = line1Part1 + line1Part2;
        const textWidth1Part1 = mainContentFont.widthOfTextAtSize(line1Part1, 12);
        const textWidth1Part2 = regularFont.widthOfTextAtSize(line1Part2, 12);
        const totalTextWidth1 = textWidth1Part1 + textWidth1Part2;
        const line1X = (width - totalTextWidth1) / 2;

        // Draw bold part
        firstPage.drawText(line1Part1, {
            x: line1X - 110,
            y: height - 330,
            size: 15,
            color: darkGray,
            font: regularFont,
        });
        // Draw regular part right after
        firstPage.drawText(line1Part2, {
            x: line1X + textWidth1Part1 - 70,
            y: height - 330,
            size: 16,
            color: rgb(0 / 255, 0 / 255, 0 / 255),
            font: mainContentFont,
        });
        // Draw the last part of line 1
        firstPage.drawText(line1Part3, {
            x: line1X + totalTextWidth1 - 10,
            y: height - 330,
            size: 15,
            color: darkGray,
            font: regularFont,
        });
        const line2 = `knowledge on Trending Software Technologies in partial fulfillment of the award of the Engineering.`;
        const line4 = `Presented this on ${visitDate}.`;
        const line6 = `${pronounLower.charAt(0).toUpperCase() + pronounLower.slice(1)} conduct and performance was good during the Industrial Visit.`;

        // Calculate starting Y position
        const lineHeight = 20;
        let currentY = height - 330;

        // Draw each line centered
        // firstPage.drawText(line1, {
        //     x: width / 2 - 350,
        //     y: currentY,
        //     size: 13,
        //     color: darkGray,
        //     font: regularFont,
        //     textAlign: 'center',
        // });
        currentY -= lineHeight;

        firstPage.drawText(line2, {
            x: width / 2 - 300,
            y: currentY,
            size: 15,
            color: darkGray,
            font: regularFont,
            textAlign: 'center',
        });
        currentY -= lineHeight;

        firstPage.drawText(line4, {
            x: width / 2 - 150,
            y: currentY,
            size: 16,
            color: darkGray,
            font: mainContentFont,
            textAlign: 'center',
        });
        currentY -= lineHeight;

        firstPage.drawText(line6, {
            x: width / 2 - 220,
            y: currentY,
            size: 16,
            color: darkGray,
            font: regularFont,
            textAlign: 'center',
        });
        const logoBytes = await fetch('/image/1.png').then(res => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoBytes);
        firstPage.drawImage(logoImage, {
            x: width - 750, // Adjust for right alignment
            y: height - 550, // Adjust vertical position as per your template
            width: 150,
            height: 70,
        });
        // Return PDF bytes instead of downloading
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;

    } catch (error) {
        console.error('Error generating certificate:', error);
        throw error;
    }
}

// Updated frontend function for single downloads
async function generateCertificateFrontend(student) {
    try {
        const pdfBytes = await generateCertificateBytes(student);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Generate filename
        const fileName = `certificate_${student.name.replace(/\s+/g, '_')}.pdf`;

        // Show preview in new tab/window
        window.open(url, '_blank');

        // Download the PDF
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 100);

    } catch (error) {
        console.error('Error generating certificate:', error);
    }
}

// Updated bulk certificates function with filters
async function generateBulkCertificatesZip(students, filters = {}) {
    try {
        const { default: JSZip } = await import('jszip');

        let filteredStudents = [...students];

        // Apply filters
        if (filters.collegeName && filters.collegeName.trim()) {
            filteredStudents = filteredStudents.filter(s =>
                s.collegeName?.toLowerCase().includes(filters.collegeName.toLowerCase())
            );
        }

        if (filters.date && filters.date.trim()) {
            filteredStudents = filteredStudents.filter(s =>
                s.date === filters.date
            );
        }

        if (filteredStudents.length === 0) {
            alert('No students match the selected filters');
            return;
        }

        const zip = new JSZip();

        // Generate certificates for each filtered student
        for (const student of filteredStudents) {
            const pdfBytes = await generateCertificateBytes(student);
            zip.file(`certificate_${student.name.replace(/\s+/g, '_')}.pdf`, pdfBytes);
        }

        // Generate ZIP and download
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `certificates_${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 100);

        console.log(`Bulk certificates ZIP downloaded successfully (${filteredStudents.length} students)`);
    } catch (error) {
        console.error('Error generating bulk certificates ZIP:', error);
        alert(`Error: ${error.message}`);
    }
}

function Indvisit() {
    const [students, setStudents] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ collegeName: '', date: '' });
    const [uniqueColleges, setUniqueColleges] = useState([]);
    const [uniqueDates, setUniqueDates] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        // Extract unique colleges and dates
        const colleges = [...new Set(students.map(s => s.collegeName).filter(Boolean))];
        const dates = [...new Set(students.map(s => s.date).filter(Boolean))].sort().reverse();
        setUniqueColleges(colleges);
        setUniqueDates(dates);
    }, [students]);

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${API_URL}/indstudents`);
            const data = await res.json();
            setStudents(data);
        } catch (err) {
            console.error('Error fetching students:', err);
        }
    };

    const downloadTemplate = () => {
        const today = new Date().toISOString().split('T')[0]; // e.g., "2025-11-07"

        // Demo student data
        const template = [
            {
                'Date': today,
                'Name': 'Rahul Sharma',
                'Father Name': 'Suresh Sharma',
                'Mobile Number': '9876543210',
                'College Name': 'ABC Institute of Technology',
                'Gender': 'Male'
            },
            {
                'Date': today,
                'Name': 'Priya Singh',
                'Father Name': 'Rajesh Singh',
                'Mobile Number': '9876501234',
                'College Name': 'XYZ College of Engineering',
                'Gender': 'Female'
            },
            {
                'Date': today,
                'Name': 'Amit Kumar',
                'Father Name': 'Mahesh Kumar',
                'Mobile Number': '9998877665',
                'College Name': 'LMN Polytechnic College',
                'Gender': 'Male'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, 'student_template.xlsx');
    };


    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = [
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv'
            ];
            if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                setSelectedFile(file);
                setMessage({ text: '', type: '' });
            } else {
                setMessage({ text: 'Please select a valid CSV or Excel file', type: 'error' });
                setSelectedFile(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage({ text: 'Please select a file first', type: 'error' });
            return;
        }

        setUploading(true);
        setMessage({ text: '', type: '' });

        try {
            const fileData = await selectedFile.arrayBuffer();
            const workbook = XLSX.read(fileData);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const formattedData = jsonData.map(row => ({
                date: row.Date || new Date().toISOString().split('T')[0],
                name: row.Name || row.name,
                fatherName: row['Father Name'] || row.fatherName || row['father name'],
                mobileNumber: String(row['Mobile Number'] || row.mobileNumber || row['mobile number']),
                collegeName: row['College Name'] || row.collegeName || row['college name'],
                gender: row.Gender || row.gender
            }));

            const res = await fetch(`${API_URL}/indstudents/bulk`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ students: formattedData })
            });

            const result = await res.json();

            if (res.ok) {
                setMessage({ text: `Successfully uploaded ${result.count} students`, type: 'success' });
                setSelectedFile(null);
                fetchStudents();
            } else {
                setMessage({ text: result.error || 'Upload failed', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Error processing file: ' + err.message, type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const downloadCertificate = async (studentId, studentName) => {
        try {
            console.log("Downloading certificate for student ID:", studentId);
            const res = await fetch(`${API_URL}/indcertificate/${studentId}`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate_${studentName.replace(/\s+/g, '_')}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setMessage({ text: 'Error downloading certificate', type: 'error' });
        }
    };

    const resetFilters = () => {
        setFilters({ collegeName: '', date: '' });
    };

    const getFilteredStudentsCount = () => {
        let count = students.length;
        if (filters.collegeName) {
            count = students.filter(s => s.collegeName?.toLowerCase().includes(filters.collegeName.toLowerCase())).length;
        }
        if (filters.date) {
            count = students.filter(s => s.date === filters.date).length;
        }
        if (filters.collegeName && filters.date) {
            count = students.filter(s =>
                s.collegeName?.toLowerCase().includes(filters.collegeName.toLowerCase()) &&
                s.date === filters.date
            ).length;
        }
        return count;
    };

    return (
        <div>
            <div className="row">
            <Dashboard />
            <div className="col-10">
        <div className="container">
            <header className="header">
                <h1>Industrial Visit Certificate</h1>
            </header>

            <div className="upload-section">
                <div className="card">
                    <h2>Upload Student Data</h2>
                    <div className="row">
                        <button onClick={downloadTemplate} className="btn btn-secondary col-2">
                            <FileDown size={20} />
                            Download Template
                        </button>

                        <div className="file-input-wrapper col-6 ">
                            <input
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileSelect}
                                id="file-input"
                                className="file-input"
                            />
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            className="btn btn-primary col-2"
                        >
                            {uploading ? 'Uploading...' : 'Upload Students'}
                        </button></div>
                </div>
            </div>

            <div className="students-section">
                <div className="card">
                    <div className="section-header">

                        {students.length > 0 && (
                            <div className="header-actions">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="btn btn-secondary"
                                >
                                    <Filter size={20} />
                                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                                </button>
                                <button
                                    onClick={() => generateBulkCertificatesZip(students, filters)}
                                    className="btn btn-primary"
                                >
                                    <Download size={20} />
                                    Download Certificates
                                </button>
                            </div>
                        )}
                    </div>

                    {showFilters && (
                        <div className="filters-section">
                            <div className="filter-group">
                                <label htmlFor="college-filter">College Name</label>
                                <select
                                    id="college-filter"
                                    value={filters.collegeName}
                                    onChange={(e) => setFilters({ ...filters, collegeName: e.target.value })}
                                >
                                    <option value="">All Colleges</option>
                                    {uniqueColleges.map(college => (
                                        <option key={college} value={college}>
                                            {college}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="date-filter">Visit Date</label>
                                <select
                                    id="date-filter"
                                    value={filters.date}
                                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                >
                                    <option value="">All Dates</option>
                                    {uniqueDates.map(date => (
                                        <option key={date} value={date}>
                                            {new Date(date).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button onClick={resetFilters} className="btn btn-secondary">
                                <X size={20} />
                                Reset Filters
                            </button>
                        </div>
                    )}
                    {students.length > 0 && (
                        <div className="table-wrapper table-responsive">
                            <table className='table table-sm table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>College</th>
                                        <th>Gender</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students
                                        .filter(student => {
                                            let match = true;
                                            if (filters.collegeName) {
                                                match = match && student.collegeName?.toLowerCase().includes(filters.collegeName.toLowerCase());
                                            }
                                            if (filters.date) {
                                                match = match && student.date === filters.date;
                                            }
                                            return match;
                                        })
                                        .map((student) => (
                                            <tr key={student.id}>
                                                <td>{student.date}</td>
                                                <td>{student.name}</td>
                                                <td>{student.fatherName}</td>
                                                <td>{student.mobileNumber}</td>
                                                <td>{student.collegeName}</td>
                                                <td>{student.gender}</td>
                                                <td>
                                                    <button
                                                        onClick={() => generateCertificateFrontend(student)}
                                                        className="btn-small"
                                                    >
                                                        <Download size={16} />
                                                        Download
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>)}
                </div>
            </div>

            <style>{`
                .header-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .filters-section {
                    display: flex;
                    gap: 15px;
                    align-items: flex-end;
                    margin-bottom: 20px;
                    padding: 15px;
                    background-color: #f5f5f5;
                    border-radius: 8px;
                    flex-wrap: wrap;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    flex: 1;
                    min-width: 200px;
                }

                .filter-group label {
                    font-weight: 600;
                    color: #333;
                    font-size: 14px;
                }

                .filter-group select {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                    background-color: white;
                    cursor: pointer;
                }

                .filter-group select:focus {
                    outline: none;
                    border-color: #042763;
                    box-shadow: 0 0 0 3px rgba(4, 39, 99, 0.1);
                }
            `}</style>
        </div>
        </div>
        </div>
        </div>
    );
}

export default Indvisit;