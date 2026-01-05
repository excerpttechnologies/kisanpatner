// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CertificateGenerator from './CertificateGenerator';

// function Certificate() {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [selectedCollegeName, setSelectedCollegeName] = useState('');
//   const [selectedYOP, setSelectedYOP] = useState('');
//   const [selectedQualification, setSelectedQualification] = useState('');
//   const [selectedCertificationType, setSelectedCertificationType] = useState('');
//   const [collegeNames, setCollegeNames] = useState([]);
//   const [yopList, setYOPList] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [selectedRegNo, setSelectedRegNo] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/students');
//       setStudents(response.data);
//       console.log("Fetched students:", response.data);

//       // Extract unique values
//       const uniqueCollegeNames = [...new Set(response.data.map(student => student.college_name))];
//       const uniqueYOPs = [...new Set(response.data.map(student => student.yop))];

//       setCollegeNames(uniqueCollegeNames);
//       setYOPList(uniqueYOPs);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     filterStudents(
//       selectedCollegeName,
//       selectedYOP,
//       searchText,
//       selectedRegNo,
//       selectedQualification,
//       selectedCertificationType
//     );
//   }, [
//     students,
//     selectedCollegeName,
//     selectedYOP,
//     searchText,
//     selectedRegNo,
//     selectedQualification,
//     selectedCertificationType
//   ]);
//   console.log("Filtered students:", filteredStudents);
//   const handleCollegeChange = (e) => setSelectedCollegeName(e.target.value);
//   const handleYOPChange = (e) => setSelectedYOP(e.target.value);
//   const handleSearchChange = (e) => setSearchText(e.target.value);
//   const handleRegNoChange = (e) => setSelectedRegNo(e.target.value);
//   const handleQualificationChange = (e) => setSelectedQualification(e.target.value);
//   const handleCertificationTypeChange = (e) => setSelectedCertificationType(e.target.value);

//   const filterStudents = (collegeName, yop, searchText, regNo, qualification, certificationType) => {
//     let filtered = [...students];

//     if (collegeName) {
//       filtered = filtered.filter(student =>
//         student.college_name?.toLowerCase() === collegeName.toLowerCase()
//       );
//     }

//     if (yop) {
//       filtered = filtered.filter(student => student.yop === yop);
//     }

//     // Fixed qualification filter
//     if (qualification) {
//       filtered = filtered.filter(student => {
//         const studentQual = student.qualification?.toLowerCase() || '';
//         return studentQual === qualification.toLowerCase();
//       });
//     }

//     // Fixed certificate type filter
//     if (certificationType) {
//       filtered = filtered.filter(student => {
//         // Check both CERTIFICATION and certificate_type fields
//         const certType = (student.CERTIFICATION || student.certificate_type || '').toLowerCase();
//         return certType === certificationType.toLowerCase();
//       });
//     }

//     if (searchText) {
//       const searchLowerCase = searchText.toLowerCase();
//       filtered = filtered.filter(student =>
//         student.NAME?.toLowerCase().includes(searchLowerCase) ||
//         student.REG_NO?.toLowerCase().includes(searchLowerCase) ||
//         student.FATHER_NAME?.toLowerCase().includes(searchLowerCase) ||
//         (student.COURSETITLE || student.coursename || '')?.toLowerCase().includes(searchLowerCase)
//       );
//     }

//     if (regNo) {
//       filtered = filtered.filter(student => student.REG_NO === regNo);
//     }

//     // Sort by name
//     filtered.sort((a, b) => (a.NAME || '').localeCompare(b.NAME || ''));
//     setFilteredStudents(filtered);
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 6; // adjust as needed (3 per row = 6 for 2 rows)

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   // Determine which students to show on this page
//   const startIndex = (currentPage - 1) * studentsPerPage;
//   const currentStudents = filteredStudents.slice(
//     startIndex,
//     startIndex + studentsPerPage
//   );
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" }); // optional scroll to top
//     }
//   };
//   const getPageNumbers = () => {
//     const pages = [];

//     if (totalPages <= 5) {
//       // Show all pages if total pages <= 5
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       // Always show first and last page
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, 4, "...", totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
//       }
//     }

//     return pages;
//   };
//   return (
//     <div className='col-9'>
//       <section className="sub-header position-relative " style={{ height: "10vh" }}>
//         <div className="container d-flex justify-content-between align-items-center">
//           <h2 className="heading-2 w-20">Certificate</h2>
//           <h6 className="heading-6 w-80 text-end">
//             <a href="/dashboard">dashboard</a>
//           </h6>
//         </div>
//       </section>

//       <div className="container">
//         <div className="row g-3">
//           <div className="col-md-2">
//             <select
//               className="form-select"
//               value={selectedCollegeName}
//               onChange={handleCollegeChange}
//             >
//               <option value="">College Name</option>
//               {collegeNames.map((collegeName, index) => (
//                 <option key={index} value={collegeName}>{collegeName}</option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-2">
//             <select
//               className="form-select"
//               value={selectedYOP}
//               onChange={handleYOPChange}
//             >
//               <option value="">YOP</option>
//               {yopList.map((yop, index) => (
//                 <option key={index} value={yop}>{yop}</option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-2">
//             <select
//               className="form-select"
//               value={selectedQualification}
//               onChange={handleQualificationChange}
//             >
//               <option value="">Qualification</option>
//               <option value="BE">BE</option>
//               <option value="Diploma">Diploma</option>
//             </select>
//           </div>

//           <div className="col-md-2">
//             <select
//               className="form-select"
//               value={selectedCertificationType}
//               onChange={handleCertificationTypeChange}
//             >
//               <option value="">Certificate Type</option>
//               <option value="INTERNSHIP">Internship</option>
//               <option value="PROJECT">Project</option>
//             </select>
//           </div>

//           <div className="col-md-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search..."
//               value={searchText}
//               onChange={handleSearchChange}
//             />
//           </div>

//           <div className="col-md-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter REG_NO..."
//               value={selectedRegNo}
//               onChange={handleRegNoChange}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         {currentStudents.map((student, index) => (
//           <div key={index} className="col-xl-4 col-md-4 col-sm-6 col-lg-4 mb-4">
//             <CertificateGenerator
//               firstName={student.NAME || "N/A"}
//               Gender={student.GENDER || "N/A"}
//               CollegeName={student.college_name || "N/A"}
//               FATHER_NAME={student.FATHER_NAME || "N/A"}
//               REG_NO={student.REG_NO || "N/A"}
//               coursename={student.COURSETITLE || student.coursename || "N/A"}
//               certificate_type={
//                 student.CERTIFICATION || student.certificate_type || "N/A"
//               }
//               qualification={student.qualification || "Not Available"}
//               department={student.department || "Not Available"}
//               yop={student.yop || "N/A"}
//               coursecertificatr={
//                 student.COURSECERTIFICATION ||
//                 student.Course_Certificate_Type ||
//                 "N/A"
//               }
//               Role={student.Role || "N/A"}
//               From={student.From || "N/A"}
//               To={student.To || "N/A"}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap">
//           <button
//             style={{maxWidth:"100px"}}
//             className="btn btn-secondary mx-2"
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             ◀ Prev
//           </button>

//           {getPageNumbers().map((page, index) =>
//             page === "..." ? (
//               <span key={index} className="mx-2 text-muted">
//                 ...
//               </span>
//             ) : (
//               <button
//                 key={index}
//                 style={{maxWidth:"3vw"}}
//                 className={`btn btn-sm mx-1 ${currentPage === page ? "btn-primary" : "btn-outline-primary"
//                   }`}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </button>
//             )
//           )}

//           <button
//           style={{maxWidth:"100px"}}
//             className="btn btn-secondary mx-2"
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next ▶
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Certificate;











//UPDATED BY SAGAR








'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CertificateGenerator from './CertificateGenerator';

function Certificate() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCollegeName, setSelectedCollegeName] = useState('');
  const [selectedYOP, setSelectedYOP] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');
  const [selectedCertificationType, setSelectedCertificationType] = useState('');
  const [collegeNames, setCollegeNames] = useState([]);
  const [yopList, setYOPList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRegNo, setSelectedRegNo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/students');
        setStudents(response.data);
        console.log("Fetched students:", response.data);

        // Extract unique values
        const uniqueCollegeNames = [...new Set(response.data.map(student => student.college_name))];
        const uniqueYOPs = [...new Set(response.data.map(student => student.yop))];

        setCollegeNames(uniqueCollegeNames);
        setYOPList(uniqueYOPs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter students whenever dependencies change
  useEffect(() => {
    const filterStudents = (
      collegeName,
      yop,
      searchText,
      regNo,
      qualification,
      certificationType
    ) => {
      let filtered = [...students];

      if (collegeName) {
        filtered = filtered.filter(student =>
          student.college_name?.toLowerCase() === collegeName.toLowerCase()
        );
      }

      if (yop) {
        filtered = filtered.filter(student => student.yop === yop);
      }

      if (qualification) {
        filtered = filtered.filter(student => {
          const studentQual = student.qualification?.toLowerCase() || '';
          return studentQual === qualification.toLowerCase();
        });
      }

      if (certificationType) {
        filtered = filtered.filter(student => {
          const certType = (student.CERTIFICATION || student.certificate_type || '').toLowerCase();
          return certType === certificationType.toLowerCase();
        });
      }

      if (searchText) {
        const searchLowerCase = searchText.toLowerCase();
        filtered = filtered.filter(student =>
          student.NAME?.toLowerCase().includes(searchLowerCase) ||
          student.REG_NO?.toLowerCase().includes(searchLowerCase) ||
          student.FATHER_NAME?.toLowerCase().includes(searchLowerCase) ||
          (student.COURSETITLE || student.coursename || '')?.toLowerCase().includes(searchLowerCase)
        );
      }

      if (regNo) {
        filtered = filtered.filter(student => student.REG_NO === regNo);
      }

      filtered.sort((a, b) => (a.NAME || '').localeCompare(b.NAME || ''));
      setFilteredStudents(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    };

    filterStudents(
      selectedCollegeName,
      selectedYOP,
      searchText,
      selectedRegNo,
      selectedQualification,
      selectedCertificationType
    );
  }, [
    students,
    selectedCollegeName,
    selectedYOP,
    searchText,
    selectedRegNo,
    selectedQualification,
    selectedCertificationType
  ]);

  console.log("Filtered students:", filteredStudents);

  const handleCollegeChange = (e) => setSelectedCollegeName(e.target.value);
  const handleYOPChange = (e) => setSelectedYOP(e.target.value);
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleRegNoChange = (e) => setSelectedRegNo(e.target.value);
  const handleQualificationChange = (e) => setSelectedQualification(e.target.value);
  const handleCertificationTypeChange = (e) => setSelectedCertificationType(e.target.value);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Determine which students to show on this page
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className='col-9'>
      <section className="sub-header position-relative" style={{ height: "10vh" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="heading-2 w-20">Certificate</h2>
          <h6 className="heading-6 w-80 text-end">
            <a href="/dashboard" className="text-decoration-none text-dark">Dashboard</a>
          </h6>
        </div>
      </section>

      {/* Filter Controls */}
      <div className="container mt-4">
        <div className="row g-3">
          <div className="col-md-2">
            <select
              className="form-select form-select-sm"
              value={selectedCollegeName}
              onChange={handleCollegeChange}
            >
              <option value="">College Name</option>
              {collegeNames.map((collegeName, index) => (
                <option key={index} value={collegeName}>{collegeName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-select form-select-sm"
              value={selectedYOP}
              onChange={handleYOPChange}
            >
              <option value="">Year of Passing</option>
              {yopList.map((yop, index) => (
                <option key={index} value={yop}>{yop}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-select form-select-sm"
              value={selectedQualification}
              onChange={handleQualificationChange}
            >
              <option value="">Qualification</option>
              <option value="BE">BE</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-select form-select-sm"
              value={selectedCertificationType}
              onChange={handleCertificationTypeChange}
            >
              <option value="">Certificate Type</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="PROJECT">Project</option>
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search by name, course..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter REG_NO"
              value={selectedRegNo}
              onChange={handleRegNoChange}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small">
                Showing {startIndex + 1} to {Math.min(startIndex + studentsPerPage, filteredStudents.length)} of {filteredStudents.length} results
              </span>
              {filteredStudents.length > 0 && (
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setSelectedCollegeName('');
                    setSelectedYOP('');
                    setSelectedQualification('');
                    setSelectedCertificationType('');
                    setSearchText('');
                    setSelectedRegNo('');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="container mt-4">
        <div className="row">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <div key={index} className="col-xl-4 col-md-4 col-sm-6 col-lg-4 mb-4">
                <CertificateGenerator
                  firstName={student.NAME || "N/A"}
                  Gender={student.GENDER || "N/A"}
                  CollegeName={student.college_name || "N/A"}
                  FATHER_NAME={student.FATHER_NAME || "N/A"}
                  REG_NO={student.REG_NO || "N/A"}
                  coursename={student.COURSETITLE || student.coursename || "N/A"}
                  certificate_type={
                    student.CERTIFICATION || student.certificate_type || "N/A"
                  }
                  qualification={student.qualification || "Not Available"}
                  department={student.department || "Not Available"}
                  yop={student.yop || "N/A"}
                  coursecertificatr={
                    student.COURSECERTIFICATION ||
                    student.Course_Certificate_Type ||
                    "N/A"
                  }
                  Role={student.Role || "N/A"}
                  From={student.From || "N/A"}
                  To={student.To || "N/A"}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                No students found matching your criteria.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="container mt-4">
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
            <button
              className="btn btn-outline-secondary btn-sm px-3"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ◀ Prev
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-muted">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline-primary"}`}
                  style={{ minWidth: "40px" }}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className="btn btn-outline-secondary btn-sm px-3"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next ▶
            </button>
          </div>
          
          {/* Page Info */}
          <div className="text-center mt-2">
            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificate;