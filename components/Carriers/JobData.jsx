'use client';

// import React, { useState, useEffect } from "react";

// const JobData = () => {
//   const [jobData, setJobData] = useState([]);

//   useEffect(() => {
//     fetch("/api/jobdata")
//       .then((response) => response.json())
//       .then((data) => setJobData(data))

//       .catch((error) => console.error("Fetch error:", error));
//   }, []);
//   console.log(jobData);
//   const [showForm, setShowForm] = useState(false); // State variable to manage form visibility

//   const [job, setJob] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [resume, setResume] = useState(null);
//   const handleFileChange = (selectedFile) => {
//     // Check if a file is selected
//     if (selectedFile) {
//       // Check file type (PDF, Word, DOC)
//       const allowedFileTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedFileTypes.includes(selectedFile.type)) {
//         alert("Invalid file type. Please upload a PDF, Word, or DOC file.");
//         setResume(null);
//         return;
//       }

//       // Check file size (in bytes)
//       const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
//       if (selectedFile.size > maxSizeInBytes) {
//         alert(
//           "File size exceeds the limit (5 MB). Please upload a smaller file."
//         );
//         setResume(null);
//         return;
//       }

//       // Set the selected file
//       setResume(selectedFile);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("job", job);
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("resume", resume);

//     fetch("/api/submit", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(result);
//         alert("Resume uploaded successfully!");
//         window.close();
//       })
//       .catch((error) => {
//         console.error("Error uploading resume:", error);
//       });
//   };

//   return (
//     <div>
//       <div className="card1">
//         <h1 style={{textAlign:'center'}}>Get your dream Jobs</h1>
//         <br/>
//         <h3>YOUR CAREERS</h3>
//         <p>
//           Take a journey of growth and excellence by joining <b>Excerpt
//           Technologies.</b><span style={{marginLeft:'2px'}}></span> Being a top tech firm, we are constantly searching for
//           driven and skilled people. Using creativity to communicate our vision.
//         </p>
//         <button onClick={() => setShowForm(true)}>Apply Now</button>
//       </div>
//       <div className="new-carrers">
//         <div
//           className="fluid-container"
//           style={{ marginBottom: "50px", marginTop: "-400px" }}
//         >
//           <div className="new-car-main">
//             {jobData.map((job, index) => (
//               <div
//                 className="new-car-sep col-lg-3"
//                 key={index}
//                 style={{ height: "430px" }}
//               >
//                 <div className="new-car-inner">
//                   <h3> {job.title}</h3>
//                   <h5>
//                     <i className="fas fa-briefcase"></i>&nbsp;YOE:{" "}
//                     {job.experience}
//                   </h5>
//                   <h4>
//                     <i className="fas fa-graduation-cap"></i> Qualification:{" "}
//                     {job.qualification}
//                   </h4>
//                   <div className="new-skill">
//                     {job.skills.map((skill, skillIndex) => (
//                       <span key={skillIndex}>
//                         <p>{skill}</p>
//                       </span>
//                     ))}
//                   </div>
//                   <div className="apply_before_container">
//                     <label className="new-skill">
//                       <span>{/* <p>Apply Before: </p> */}</span>
//                     </label>
//                     {/* <input type="date" className="date_input" /> */}
//                   </div>
//                   <br />
//                   <p style={{ color: "white" }}>
//                     Description: {job.description}
//                   </p>
//                 </div>

//                 <div className="new-car-btn">
//                   <button onClick={() => setShowForm(true)}>
//                     <em></em>
//                     <span>Apply</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {showForm && (
//         <div className="popup-overlay">
//           <div
//             className="container1"
//             style={{
//               marginTop: "100px",
//               marginBottom: "50px",
//               backgroundColor: "white",
//               width: "600px",
//             }}
//           >
//             <div className="left">
//               <div className="popup-content">
//                 <button
//                   className="close-btn"
//                   style={{ marginLeft: "40px", width: "30px" }}
//                   onClick={() => setShowForm(false)}
//                 >
//                   X
//                 </button>{" "}
//                 {/* Close button */}
//                 <form
//                   className="form1"
//                   onSubmit={handleSubmit}
//                   style={{ marginTop: "50px" }}
//                 >
//                   <h2 style={{ color: "#333", marginLeft: "80px" }}>
//                     Resume Form
//                   </h2>
//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="text"
//                       id="job"
//                       required=""
//                       placeholder="Job Title"
//                       value={job}
//                       onChange={(e) => setJob(e.target.value)}
//                     />
//                   </div>

//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="text"
//                       id="name"
//                       required=""
//                       placeholder="Your Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>

//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="email"
//                       id="email"
//                       required=""
//                       placeholder="Your Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>

//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="file"
//                       className="input"
//                       id="resume"
//                       accept=".pdf, .doc, .docx"
//                       required
//                       onChange={(e) => {
//                         setResume(e.target.files[0]); // Your existing setResume functionality
//                         handleFileChange(e.target.files[0]); // Enhanced file type and size check
//                       }}
//                     />
//                   </div>
//                   {/* Form fields */}
//                   <button
//                     type="submit"
//                     style={{ marginLeft: "40px", marginTop: "20px" }}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <div className="right">
//               <div className="img">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100%"
//                   height="100%"
//                   viewBox="0 0 731.67004 550.61784"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                 >
//                   <path
//                     d="M0,334.13393c0,.66003,.53003,1.19,1.19006,1.19H730.48004c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H1.19006c-.66003,0-1.19006,.53003-1.19006,1.19Z"
//                     fill="#3f3d56"
//                   ></path>

//                   <polygon
//                     points="466.98463 81.60598 470.81118 130.55703 526.26809 107.39339 494.98463 57.60598 466.98463 81.60598"
//                     fill="#a0616a"
//                   ></polygon>
//                   <circle
//                     cx="465.32321"
//                     cy="55.18079"
//                     r="41.33858"
//                     fill="#a0616a"
//                   ></circle>
//                   <polygon
//                     points="387.98463 440.60598 394.98463 503.39339 345.98463 496.60598 361.98463 438.60598 387.98463 440.60598"
//                     fill="#a0616a"
//                   ></polygon>
//                   <polygon
//                     points="578.98463 449.60598 585.98463 512.39339 536.98463 505.60598 552.98463 447.60598 578.98463 449.60598"
//                     fill="#a0616a"
//                   ></polygon>
//                   <path
//                     d="M462.48463,260.10598c-.66897,0-54.14584,2.68515-89.47714,4.46286-16.72275,.84141-29.45202,15.31527-28.15459,32.00884l12.63173,162.5283,36,1,.87795-131,71.12205,4-3-73Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M619.48463,259.10598s9,69,2,76c-7,7-226.5-5.5-226.5-5.5,0,0,48.15354-69.53704,56.82677-71.51852,8.67323-1.98148,146.67323-8.98148,146.67323-8.98148l21,10Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     id="uuid-91047c5b-47d7-4179-8a16-40bd6d529b28-203"
//                     d="M335.12666,172.23337c-8.35907-11.69074-9.10267-25.48009-1.66174-30.79863,7.44093-5.31854,20.24665-.15219,28.60713,11.54383,3.40375,4.62627,5.65012,10.00041,6.55111,15.67279l34.79215,49.9814-19.8001,13.70807-35.7745-48.83421c-5.07753-2.68845-9.43721-6.55406-12.71405-11.27326Z"
//                     fill="#a0616a"
//                   ></path>
//                   <path
//                     d="M464.98463,112.60598l51-21,96,148s-67,15-90,18c-23,3-49-9-49-9l-8-136Z"
//                     fill="#6c63ff"
//                   ></path>
//                   <path
//                     d="M526.98463,137.60598l-18.5-57.70866,24,18.20866s68,45,68,64c0,19,21,77,21,77,0,0,23.5,19.5,15.5,37.5-8,18,10.5,15.5,12.5,28.5,2,13-28.5,30.5-28.5,30.5,0,0-7.5-73.5-31.5-73.5-24,0-62.5-124.5-62.5-124.5Z"
//                     fill="#3f3d56"
//                   ></path>
//                   <path
//                     d="M468.56831,111.13035l-25.08368,9.97563s4,70,8,76c4,6,18,38,18,38v10.42913s-28,8.57087-27,13.57087c1,5,66,19,66,19,0,0-13-40-21-53-8-13-18.91632-113.97563-18.91632-113.97563Z"
//                     fill="#3f3d56"
//                   ></path>
//                   <path
//                     d="M452.48463,121.10598s-29-4-34,30c-5,34-1.82283,38.5-1.82283,38.5l-8.17717,19.5-27-30-26,17s47,76,66,74c19-2,47-57,47-57l-16-92Z"
//                     fill="#3f3d56"
//                   ></path>
//                   <path
//                     d="M597.32321,270.14478l-14.83858,209.96121-38.5-1.5s-8.5-198.5-8.5-201.5c0-3,4-20,29-21,25-1,32.83858,14.03879,32.83858,14.03879Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M541.48463,484.10598s20-6,23-2c3,4,20,6,20,6l5,49s-14,10-16,12-55,4-56-8c-1-12,14-27,14-27l10-30Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M394.48463,470.10598s6-5,8,9c2,14,9,37-1,40-10,3-110,4-110-5v-9l9-7,18.00394-2.869s34.99606-32.131,38.99606-32.131c4,0,17,13,17,13l20-6Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M505.98463,77.60598s-20-24-28-22-3,5-3,5l-20-22s-16-6-31,13c0,0-9-16,0-25,9-9,12-8,14-13,2-5,16-9,16-9,0,0-.80315-7.19685,3.59843-3.59843s15.3937,3.59843,15.3937,3.59843c0,0,.06299-4,4.53543,0,4.47244,4,9.47244,2,9.47244,2,0,0,0,6.92126,3.5,6.96063,3.5,.03937,9.5-4.96063,10.5-.96063,1,4,8,6,9,18,1,12-4,47-4,47Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <g>
//                     <path
//                       d="M342.99463,178.84874l-114.2362,78.82694c-3.94205,2.72015-9.36214,1.72624-12.08229-2.21581l-32.16176-46.60891c-2.72015-3.94205-1.7259-9.36208,2.21615-12.08223l114.2362-78.82694c3.94205-2.72015,9.36214-1.72624,12.08229,2.21581l32.16176,46.60891c2.72015,3.94205,1.7259,9.36208-2.21615,12.08223Z"
//                       fill="#fff"
//                     ></path>
//                     <path
//                       d="M312.83914,120.30274l32.16148,46.6085c2.64627,3.83499,1.68408,9.08121-2.15091,11.72749l-56.06388,38.68602c-14.78562-4.04015-28.2774-13.11486-37.66263-26.71596-6.14766-8.9092-9.85314-18.77211-11.26649-28.80885l63.25494-43.6481c3.83499-2.64627,9.08121-1.68408,11.72749,2.15091Z"
//                       fill="#e6e6e6"
//                     ></path>
//                     <path
//                       d="M223.84012,260.20913c-3.0791,0-6.10938-1.46094-7.9873-4.18066l-32.16211-46.60938c-1.4668-2.12695-2.01758-4.7002-1.5498-7.24805,.4668-2.54785,1.89551-4.75879,4.02246-6.22559l114.23535-78.82715c4.39746-3.03223,10.44043-1.92285,13.47363,2.4707l32.16211,46.60938c1.4668,2.12695,2.01758,4.7002,1.5498,7.24805-.4668,2.54688-1.89551,4.75879-4.02148,6.22559l-114.23633,78.82715c-1.67578,1.15527-3.59082,1.70996-5.48633,1.70996Zm82.04785-142.80176c-1.50391,0-3.02344,.44043-4.35254,1.35742l-114.23633,78.82715c-1.6875,1.16309-2.82031,2.91797-3.19141,4.94043-.37109,2.02148,.06543,4.06445,1.22949,5.75l32.16211,46.60938c2.40625,3.48633,7.20215,4.36816,10.69043,1.96094l114.2373-78.82715c1.68652-1.16309,2.81934-2.91797,3.19043-4.94043,.37109-2.02148-.06543-4.06445-1.22949-5.75l-32.16211-46.60938c-1.48926-2.1582-3.89453-3.31836-6.33789-3.31836Z"
//                       fill="#3f3d56"
//                     ></path>
//                     <path
//                       d="M224.6666,236.93718c-2.89521,1.9978-3.6253,5.97848-1.6275,8.87369,1.9978,2.89521,5.97848,3.6253,8.87369,1.6275l11.76134-8.11573c2.89521-1.9978,3.6253-5.97848,1.6275-8.87369-1.9978-2.89521-5.97848-3.6253-8.87369-1.6275l-11.76134,8.11573Z"
//                       fill="#6c63ff"
//                     ></path>
//                     <path
//                       d="M232.63862,171.91114c-4.56802,3.15209-5.71978,9.43286-2.56769,14.00088,3.15209,4.56802,9.43252,5.71972,14.00054,2.56763l18.29546-12.6245c4.56802-3.15209,5.72007-9.43245,2.56797-14.00047-3.15209-4.56802-9.4328-5.72013-14.00082-2.56804l-18.29546,12.6245Z"
//                       fill="#6c63ff"
//                     ></path>
//                   </g>
//                   <g>
//                     <path
//                       d="M340.25926,185.80874H201.4659c-4.78947,0-8.68608-3.89636-8.68608-8.68583v-56.62834c0-4.78947,3.89661-8.68583,8.68608-8.68583h138.79336c4.78947,0,8.68608,3.89636,8.68608,8.68583v56.62834c0,4.78947-3.89661,8.68583-8.68608,8.68583Z"
//                       fill="#fff"
//                     ></path>
//                     <path
//                       d="M348.69017,120.49482v56.62784c0,4.65939-3.77152,8.43091-8.43091,8.43091h-68.11583c-9.87497-11.72273-15.82567-26.8544-15.82567-43.37931,0-10.82439,2.55172-21.04674,7.08876-30.11034h76.85275c4.65939,0,8.43091,3.77152,8.43091,8.43091Z"
//                       fill="#e6e6e6"
//                     ></path>
//                     <path
//                       d="M340.25907,186.80874H201.4661c-5.34082,0-9.68652-4.34473-9.68652-9.68555v-56.62891c0-5.34082,4.3457-9.68555,9.68652-9.68555h138.79297c5.34082,0,9.68652,4.34473,9.68652,9.68555v56.62891c0,5.34082-4.3457,9.68555-9.68652,9.68555ZM201.4661,112.80874c-4.23828,0-7.68652,3.44727-7.68652,7.68555v56.62891c0,4.23828,3.44824,7.68555,7.68652,7.68555h138.79297c4.23828,0,7.68652-3.44727,7.68652-7.68555v-56.62891c0-4.23828-3.44824-7.68555-7.68652-7.68555H201.4661Z"
//                       fill="#3f3d56"
//                     ></path>
//                     <path
//                       d="M209.87637,166.41564c-3.51759,0-6.37931,2.86172-6.37931,6.37931s2.86172,6.37931,6.37931,6.37931h14.28966c3.51759,0,6.37931-2.86172,6.37931-6.37931s-2.86172-6.37931-6.37931-6.37931h-14.28966Z"
//                       fill="#6c63ff"
//                     ></path>
//                     <path
//                       d="M253.36907,117.42253c-5.55,0-10.06511,4.51536-10.06511,10.06536s4.51511,10.06486,10.06511,10.06486h22.22841c5.55,0,10.06511-4.51486,10.06511-10.06486s-4.51511-10.06536-10.06511-10.06536h-22.22841Z"
//                       fill="#6c63ff"
//                     ></path>
//                   </g>
//                   <g>
//                     <path
//                       d="M456.25926,381.80874h-138.79336c-4.78947,0-8.68608-3.89636-8.68608-8.68583v-56.62834c0-4.78947,3.89661-8.68583,8.68608-8.68583h138.79336c4.78947,0,8.68608,3.89636,8.68608,8.68583v56.62834c0,4.78947-3.89661,8.68583-8.68608,8.68583Z"
//                       fill="#fff"
//                     ></path>
//                     <path
//                       d="M464.69017,316.49482v56.62784c0,4.65939-3.77152,8.43091-8.43091,8.43091h-68.11583c-9.87497-11.72273-15.82567-26.8544-15.82567-43.37931,0-10.82439,2.55172-21.04674,7.08876-30.11034h76.85275c4.65939,0,8.43091,3.77152,8.43091,8.43091Z"
//                       fill="#e6e6e6"
//                     ></path>
//                     <path
//                       d="M456.25907,382.80874h-138.79297c-5.34082,0-9.68652-4.34473-9.68652-9.68555v-56.62891c0-5.34082,4.3457-9.68555,9.68652-9.68555h138.79297c5.34082,0,9.68652,4.34473,9.68652,9.68555v56.62891c0,5.34082-4.3457,9.68555-9.68652,9.68555Zm-138.79297-74c-4.23828,0-7.68652,3.44727-7.68652,7.68555v56.62891c0,4.23828,3.44824,7.68555,7.68652,7.68555h138.79297c4.23828,0,7.68652-3.44727,7.68652-7.68555v-56.62891c0-4.23828-3.44824-7.68555-7.68652-7.68555h-138.79297Z"
//                       fill="#3f3d56"
//                     ></path>
//                     <path
//                       d="M325.87637,362.41564c-3.51759,0-6.37931,2.86172-6.37931,6.37931s2.86172,6.37931,6.37931,6.37931h14.28966c3.51759,0,6.37931-2.86172,6.37931-6.37931s-2.86172-6.37931-6.37931-6.37931h-14.28966Z"
//                       fill="#6c63ff"
//                     ></path>
//                     <path
//                       d="M369.36907,313.42253c-5.55,0-10.06511,4.51536-10.06511,10.06536s4.51511,10.06486,10.06511,10.06486h22.22841c5.55,0,10.06511-4.51486,10.06511-10.06486s-4.51511-10.06536-10.06511-10.06536h-22.22841Z"
//                       fill="#6c63ff"
//                     ></path>
//                   </g>
//                   <path
//                     id="uuid-c026fd96-7d81-4b34-bb39-0646c0e08e96-204"
//                     d="M465.67391,331.01678c-12.74718,6.63753-26.5046,5.44058-30.72743-2.67249-4.22283-8.11308,2.6878-20.06802,15.44041-26.70621,5.05777-2.72156,10.69376-4.19231,16.43644-4.28916l54.36547-27.44139,10.79681,21.52636-53.36733,28.57487c-3.37375,4.65048-7.81238,8.42516-12.94437,11.00803Z"
//                     fill="#a0616a"
//                   ></path>
//                   <path
//                     d="M527.48463,97.10598s56-3,68,27c12,30,22,128,22,128l-122,66.37402-21-32.37402,82-64-29-125Z"
//                     fill="#3f3d56"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobData;



// import React, { useState, useEffect } from "react";

// const JobData = () => {
//   const [jobData, setJobData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [job, setJob] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [resume, setResume] = useState(null);
//   const [toast, setToast] = useState({ show: false, message: "" });

//   useEffect(() => {
//     fetch("/api/jobdata")
//       .then((response) => response.json())
//       .then((data) => setJobData(data))
//       .catch((error) => console.error("Fetch error:", error));
//   }, []);

//   // Effect to auto-close toast after 3 seconds
//   useEffect(() => {
//     let timer;
//     if (toast.show) {
//       timer = setTimeout(() => {
//         setToast({ show: false, message: "" });
//       }, 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [toast.show]);

//   const handleFileChange = (selectedFile) => {
//     if (selectedFile) {
//       const allowedFileTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedFileTypes.includes(selectedFile.type)) {
//         setToast({
//           show: true,
//           message: "Invalid file type. Please upload a PDF, Word, or DOC file.",
//           type: "error"
//         });
//         setResume(null);
//         return;
//       }

//       const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
//       if (selectedFile.size > maxSizeInBytes) {
//         setToast({
//           show: true,
//           message: "File size exceeds the limit (5 MB). Please upload a smaller file.",
//           type: "error"
//         });
//         setResume(null);
//         return;
//       }

//       setResume(selectedFile);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("job", job);
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("resume", resume);

//     fetch("/api/submit", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(result);
//         // Show success toast
//         setToast({
//           show: true,
//           message: "Resume uploaded successfully!",
//           type: "success"
//         });
        
//         // Reset form fields
//         setJob("");
//         setName("");
//         setEmail("");
//         setResume(null);
        
//         // Close the popup after a slight delay
//         setTimeout(() => {
//           setShowForm(false);
//         }, 1500);
//       })
//       .catch((error) => {
//         console.error("Error uploading resume:", error);
//         setToast({
//           show: true,
//           message: "Error uploading resume. Please try again.",
//           type: "error"
//         });
//       });
//   };

//   return (
//     <div>
//       {/* Toast Notification */}
//       {toast.show && (
//         <div 
//           className={`toast-notification ${toast.type === "success" ? "toast-success" : "toast-error"}`}
//           style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             backgroundColor: toast.type === "success" ? "#4CAF50" : "#f44336",
//             color: "white",
//             padding: "16px",
//             borderRadius: "4px",
//             zIndex: 9999,
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             minWidth: "250px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between"
//           }}
//         >
//           <span>{toast.message}</span>
//           <button 
//             onClick={() => setToast({ show: false, message: "" })}
//             style={{
//               background: "transparent",
//               border: "none",
//               color: "white",
//               fontSize: "16px",
//               cursor: "pointer",
//               marginLeft: "10px"
//             }}
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       <div className="card1">
//         <h1 style={{textAlign:'center'}}>Get your dream Jobs</h1>
//         <br/>
//         <h3>YOUR CAREERS</h3>
//         <p>
//           Take a journey of growth and excellence by joining <b>Excerpt
//           Technologies.</b><span style={{marginLeft:'2px'}}></span> Being a top tech firm, we are constantly searching for
//           driven and skilled people. Using creativity to communicate our vision.
//         </p>
//         <button onClick={() => setShowForm(true)}>Apply Now</button>
//       </div>
//       <div className="new-carrers">
//         <div
//           className="fluid-container"
//           style={{ marginBottom: "50px", marginTop: "-400px" }}
//         >
//           <div className="new-car-main">
//             {jobData.map((job, index) => (
//               <div
//                 className="new-car-sep col-lg-3"
//                 key={index}
//                 style={{ height: "430px" }}
//               >
//                 <div className="new-car-inner">
//                   <h3> {job.title}</h3>
//                   <h5>
//                     <i className="fas fa-briefcase"></i>&nbsp;YOE:{" "}
//                     {job.experience}
//                   </h5>
//                   <h4>
//                     <i className="fas fa-graduation-cap"></i> Qualification:{" "}
//                     {job.qualification}
//                   </h4>
//                   <div className="new-skill">
//                     {job.skills.map((skill, skillIndex) => (
//                       <span key={skillIndex}>
//                         <p>{skill}</p>
//                       </span>
//                     ))}
//                   </div>
//                   <div className="apply_before_container">
//                     <label className="new-skill">
//                       <span>{/* <p>Apply Before: </p> */}</span>
//                     </label>
//                     {/* <input type="date" className="date_input" /> */}
//                   </div>
//                   <br />
//                   <p style={{ color: "white" }}>
//                     Description: {job.description}
//                   </p>
//                 </div>

//                 <div className="new-car-btn">
//                   <button onClick={() => setShowForm(true)}>
//                     <em></em>
//                     <span>Apply</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {showForm && (
//         <div className="popup-overlay">
//           <div
//             className="container1"
//             style={{
//               marginTop: "100px",
//               marginBottom: "50px",
//               backgroundColor: "white",
//               width: "600px",
//             }}
//           >
//             <div className="left">
//               <div className="popup-content">
//                 <button
//                   className="close-btn"
//                   style={{ marginLeft: "40px", width: "30px" }}
//                   onClick={() => setShowForm(false)}
//                 >
//                   X
//                 </button>
//                 <form
//                   className="form1"
//                   onSubmit={handleSubmit}
//                   style={{ marginTop: "50px" }}
//                 >
//                   <h2 style={{ color: "#333", marginLeft: "80px" }}>
//                     Resume Form
//                   </h2>
//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="text"
//                       id="job"
//                       required=""
//                       placeholder="Job Title"
//                       value={job}
//                       onChange={(e) => setJob(e.target.value)}
//                     />
//                   </div>

//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="text"
//                       id="name"
//                       required=""
//                       placeholder="Your Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>

//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="email"
//                       id="email"
//                       required=""
//                       placeholder="Your Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>

//                   <div className="input-block">
//                     <input
//                       className="input"
//                       type="file"
//                       id="resume"
//                       accept=".pdf, .doc, .docx"
//                       required
//                       onChange={(e) => {
//                         handleFileChange(e.target.files[0]);
//                       }}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     style={{ marginLeft: "40px", marginTop: "20px" }}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <div className="right">
//               <div className="img">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100%"
//                   height="100%"
//                   viewBox="0 0 731.67004 550.61784"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                 >
//                   <path
//                     d="M0,334.13393c0,.66003,.53003,1.19,1.19006,1.19H730.48004c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H1.19006c-.66003,0-1.19006,.53003-1.19006,1.19Z"
//                     fill="#3f3d56"
//                   ></path>

//                   <polygon
//                     points="466.98463 81.60598 470.81118 130.55703 526.26809 107.39339 494.98463 57.60598 466.98463 81.60598"
//                     fill="#a0616a"
//                   ></polygon>
//                   <circle
//                     cx="465.32321"
//                     cy="55.18079"
//                     r="41.33858"
//                     fill="#a0616a"
//                   ></circle>
//                   <polygon
//                     points="387.98463 440.60598 394.98463 503.39339 345.98463 496.60598 361.98463 438.60598 387.98463 440.60598"
//                     fill="#a0616a"
//                   ></polygon>
//                   <polygon
//                     points="578.98463 449.60598 585.98463 512.39339 536.98463 505.60598 552.98463 447.60598 578.98463 449.60598"
//                     fill="#a0616a"
//                   ></polygon>
//                   <path
//                     d="M462.48463,260.10598c-.66897,0-54.14584,2.68515-89.47714,4.46286-16.72275,.84141-29.45202,15.31527-28.15459,32.00884l12.63173,162.5283,36,1,.87795-131,71.12205,4-3-73Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M619.48463,259.10598s9,69,2,76c-7,7-226.5-5.5-226.5-5.5,0,0,48.15354-69.53704,56.82677-71.51852,8.67323-1.98148,146.67323-8.98148,146.67323-8.98148l21,10Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     id="uuid-91047c5b-47d7-4179-8a16-40bd6d529b28-203"
//                     d="M335.12666,172.23337c-8.35907-11.69074-9.10267-25.48009-1.66174-30.79863,7.44093-5.31854,20.24665-.15219,28.60713,11.54383,3.40375,4.62627,5.65012,10.00041,6.55111,15.67279l34.79215,49.9814-19.8001,13.70807-35.7745-48.83421c-5.07753-2.68845-9.43721-6.55406-12.71405-11.27326Z"
//                     fill="#a0616a"
//                   ></path>
//                   <path
//                     d="M464.98463,112.60598l51-21,96,148s-67,15-90,18c-23,3-49-9-49-9l-8-136Z"
//                     fill="#6c63ff"
//                   ></path>
//                   <path
//                     d="M526.98463,137.60598l-18.5-57.70866,24,18.20866s68,45,68,64c0,19,21,77,21,77,0,0,23.5,19.5,15.5,37.5-8,18,10.5,15.5,12.5,28.5,2,13-28.5,30.5-28.5,30.5,0,0-7.5-73.5-31.5-73.5-24,0-62.5-124.5-62.5-124.5Z"
//                     fill="#3f3d56"
//                   ></path>
//                   <path
//                     d="M468.56831,111.13035l-25.08368,9.97563s4,70,8,76c4,6,18,38,18,38v10.42913s-28,8.57087-27,13.57087c1,5,66,19,66,19,0,0-13-40-21-53-8-13-18.91632-113.97563-18.91632-113.97563Z"
//                     fill="#3f3d56"
//                   ></path>
//                   <path
//                     d="M452.48463,121.10598s-29-4-34,30c-5,34-1.82283,38.5-1.82283,38.5l-8.17717,19.5-27-30-26,17s47,76,66,74c19-2,47-57,47-57l-16-92Z"
//                     fill="#3f3d56"
//                   ></path>
//                   <path
//                     d="M597.32321,270.14478l-14.83858,209.96121-38.5-1.5s-8.5-198.5-8.5-201.5c0-3,4-20,29-21,25-1,32.83858,14.03879,32.83858,14.03879Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M541.48463,484.10598s20-6,23-2c3,4,20,6,20,6l5,49s-14,10-16,12-55,4-56-8c-1-12,14-27,14-27l10-30Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M394.48463,470.10598s6-5,8,9c2,14,9,37-1,40-10,3-110,4-110-5v-9l9-7,18.00394-2.869s34.99606-32.131,38.99606-32.131c4,0,17,13,17,13l20-6Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <path
//                     d="M505.98463,77.60598s-20-24-28-22-3,5-3,5l-20-22s-16-6-31,13c0,0-9-16,0-25,9-9,12-8,14-13,2-5,16-9,16-9,0,0-.80315-7.19685,3.59843-3.59843s15.3937,3.59843,15.3937,3.59843c0,0,.06299-4,4.53543,0,4.47244,4,9.47244,2,9.47244,2,0,0,0,6.92126,3.5,6.96063,3.5,.03937,9.5-4.96063,10.5-.96063,1,4,8,6,9,18,1,12-4,47-4,47Z"
//                     fill="#2f2e41"
//                   ></path>
//                   <g>
//                     <path
//                       d="M342.99463,178.84874l-114.2362,78.82694c-3.94205,2.72015-9.36214,1.72624-12.08229-2.21581l-32.16176-46.60891c-2.72015-3.94205-1.7259-9.36208,2.21615-12.08223l114.2362-78.82694c3.94205-2.72015,9.36214-1.72624,12.08229,2.21581l32.16176,46.60891c2.72015,3.94205,1.7259,9.36208-2.21615,12.08223Z"
//                       fill="#fff"
//                     ></path>
//                     <path
//                       d="M312.83914,120.30274l32.16148,46.6085c2.64627,3.83499,1.68408,9.08121-2.15091,11.72749l-56.06388,38.68602c-14.78562-4.04015-28.2774-13.11486-37.66263-26.71596-6.14766-8.9092-9.85314-18.77211-11.26649-28.80885l63.25494-43.6481c3.83499-2.64627,9.08121-1.68408,11.72749,2.15091Z"
//                       fill="#e6e6e6"
//                     ></path>
//                     <path
//                       d="M223.84012,260.20913c-3.0791,0-6.10938-1.46094-7.9873-4.18066l-32.16211-46.60938c-1.4668-2.12695-2.01758-4.7002-1.5498-7.24805,.4668-2.54785,1.89551-4.75879,4.02246-6.22559l114.23535-78.82715c4.39746-3.03223,10.44043-1.92285,13.47363,2.4707l32.16211,46.60938c1.4668,2.12695,2.01758,4.7002,1.5498,7.24805-.4668,2.54688-1.89551,4.75879-4.02148,6.22559l-114.23633,78.82715c-1.67578,1.15527-3.59082,1.70996-5.48633,1.70996Zm82.04785-142.80176c-1.50391,0-3.02344,.44043-4.35254,1.35742l-114.23633,78.82715c-1.6875,1.16309-2.82031,2.91797-3.19141,4.94043-.37109,2.02148,.06543,4.06445,1.22949,5.75l32.16211,46.60938c2.40625,3.48633,7.20215,4.36816,10.69043,1.96094l114.2373-78.82715c1.68652-1.16309,2.81934-2.91797,3.19043-4.94043,.37109-2.02148-.06543-4.06445-1.22949-5.75l-32.16211-46.60938c-1.48926-2.1582-3.89453-3.31836-6.33789-3.31836Z"
//                       fill="#3f3d56"
//                     ></path>
//                     <path
//                       d="M224.6666,236.93718c-2.89521,1.9978-3.6253,5.97848-1.6275,8.87369,1.9978,2.89521,5.97848,3.6253,8.87369,1.6275l11.76134-8.11573c2.89521-1.9978,3.6253-5.97848,1.6275-8.87369-1.9978-2.89521-5.97848-3.6253-8.87369-1.6275l-11.76134,8.11573Z"
//                       fill="#6c63ff"
//                     ></path>
//                     <path
//                       d="M232.63862,171.91114c-4.56802,3.15209-5.71978,9.43286-2.56769,14.00088,3.15209,4.56802,9.43252,5.71972,14.00054,2.56763l18.29546-12.6245c4.56802-3.15209,5.72007-9.43245,2.56797-14.00047-3.15209-4.56802-9.4328-5.72013-14.00082-2.56804l-18.29546,12.6245Z"
//                       fill="#6c63ff"
//                     ></path>
//                   </g>
//                   <g>
//                     <path
//                       d="M340.25926,185.80874H201.4659c-4.78947,0-8.68608-3.89636-8.68608-8.68583v-56.62834c0-4.78947,3.89661-8.68583,8.68608-8.68583h138.79336c4.78947,0,8.68608,3.89636,8.68608,8.68583v56.62834c0,4.78947-3.89661,8.68583-8.68608,8.68583Z"
//                       fill="#fff"
//                     ></path>
//                     <path
//                       d="M348.69017,120.49482v56.62784c0,4.65939-3.77152,8.43091-8.43091,8.43091h-68.11583c-9.87497-11.72273-15.82567-26.8544-15.82567-43.37931,0-10.82439,2.55172-21.04674,7.08876-30.11034h76.85275c4.65939,0,8.43091,3.77152,8.43091,8.43091Z"
//                       fill="#e6e6e6"
//                     ></path>
//                     <path
//                       d="M340.25907,186.80874H201.4661c-5.34082,0-9.68652-4.34473-9.68652-9.68555v-56.62891c0-5.34082,4.3457-9.68555,9.68652-9.68555h138.79297c5.34082,0,9.68652,4.34473,9.68652,9.68555v56.62891c0,5.34082-4.3457,9.68555-9.68652,9.68555ZM201.4661,112.80874c-4.23828,0-7.68652,3.44727-7.68652,7.68555v56.62891c0,4.23828,3.44824,7.68555,7.68652,7.68555h138.79297c4.23828,0,7.68652-3.44727,7.68652-7.68555v-56.62891c0-4.23828-3.44824-7.68555-7.68652-7.68555H201.4661Z"
//                       fill="#3f3d56"
//                     ></path>
//                     <path
//                       d="M209.87637,166.41564c-3.51759,0-6.37931,2.86172-6.37931,6.37931s2.86172,6.37931,6.37931,6.37931h14.28966c3.51759,0,6.37931-2.86172,6.37931-6.37931s-2.86172-6.37931-6.37931-6.37931h-14.28966Z"
//                       fill="#6c63ff"
//                     ></path>
//                     <path
//                       d="M253.36907,117.42253c-5.55,0-10.06511,4.51536-10.06511,10.06536s4.51511,10.06486,10.06511,10.06486h22.22841c5.55,0,10.06511-4.51486,10.06511-10.06486s-4.51511-10.06536-10.06511-10.06536h-22.22841Z"
//                       fill="#6c63ff"
//                     ></path>
//                   </g>
//                   <g>
//                     <path
//                       d="M456.25926,381.80874h-138.79336c-4.78947,0-8.68608-3.89636-8.68608-8.68583v-56.62834c0-4.78947,3.89661-8.68583,8.68608-8.68583h138.79336c4.78947,0,8.68608,3.89636,8.68608,8.68583v56.62834c0,4.78947-3.89661,8.68583-8.68608,8.68583Z"
//                       fill="#fff"
//                     ></path>
//                     <path
//                       d="M464.69017,316.49482v56.62784c0,4.65939-3.77152,8.43091-8.43091,8.43091h-68.11583c-9.87497-11.72273-15.82567-26.8544-15.82567-43.37931,0-10.82439,2.55172-21.04674,7.08876-30.11034h76.85275c4.65939,0,8.43091,3.77152,8.43091,8.43091Z"
//                       fill="#e6e6e6"
//                     ></path>
//                     <path
//                       d="M456.25907,382.80874h-138.79297c-5.34082,0-9.68652-4.34473-9.68652-9.68555v-56.62891c0-5.34082,4.3457-9.68555,9.68652-9.68555h138.79297c5.34082,0,9.68652,4.34473,9.68652,9.68555v56.62891c0,5.34082-4.3457,9.68555-9.68652,9.68555Zm-138.79297-74c-4.23828,0-7.68652,3.44727-7.68652,7.68555v56.62891c0,4.23828,3.44824,7.68555,7.68652,7.68555h138.79297c4.23828,0,7.68652-3.44727,7.68652-7.68555v-56.62891c0-4.23828-3.44824-7.68555-7.68652-7.68555h-138.79297Z"
//                       fill="#3f3d56"
//                     ></path>
//                     <path
//                       d="M325.87637,362.41564c-3.51759,0-6.37931,2.86172-6.37931,6.37931s2.86172,6.37931,6.37931,6.37931h14.28966c3.51759,0,6.37931-2.86172,6.37931-6.37931s-2.86172-6.37931-6.37931-6.37931h-14.28966Z"
//                       fill="#6c63ff"
//                     ></path>
//                     <path
//                       d="M369.36907,313.42253c-5.55,0-10.06511,4.51536-10.06511,10.06536s4.51511,10.06486,10.06511,10.06486h22.22841c5.55,0,10.06511-4.51486,10.06511-10.06486s-4.51511-10.06536-10.06511-10.06536h-22.22841Z"
//                       fill="#6c63ff"
//                     ></path>
//                   </g>
//                   <path
//                     id="uuid-c026fd96-7d81-4b34-bb39-0646c0e08e96-204"
//                     d="M465.67391,331.01678c-12.74718,6.63753-26.5046,5.44058-30.72743-2.67249-4.22283-8.11308,2.6878-20.06802,15.44041-26.70621,5.05777-2.72156,10.69376-4.19231,16.43644-4.28916l54.36547-27.44139,10.79681,21.52636-53.36733,28.57487c-3.37375,4.65048-7.81238,8.42516-12.94437,11.00803Z"
//                     fill="#a0616a"
//                   ></path>
//                   <path
//                     d="M527.48463,97.10598s56-3,68,27c12,30,22,128,22,128l-122,66.37402-21-32.37402,82-64-29-125Z"
//                     fill="#3f3d56"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobData;
// import React, { useState, useEffect } from "react";

// const JobData = () => {
//   const [jobData, setJobData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [job, setJob] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [resume, setResume] = useState(null);
//   const [toast, setToast] = useState({ show: false, message: "" });

//   useEffect(() => {
//     fetch("/api/jobdata")
//       .then((response) => response.json())
//       .then((data) => setJobData(data))
//       .catch((error) => console.error("Fetch error:", error));
//   }, []);

//   // Effect to auto-close toast after 3 seconds
//   useEffect(() => {
//     let timer;
//     if (toast.show) {
//       timer = setTimeout(() => {
//         setToast({ show: false, message: "" });
//       }, 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [toast.show]);

//   const handleFileChange = (selectedFile) => {
//     if (selectedFile) {
//       const allowedFileTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedFileTypes.includes(selectedFile.type)) {
//         setToast({
//           show: true,
//           message: "Invalid file type. Please upload a PDF, Word, or DOC file.",
//           type: "error"
//         });
//         setResume(null);
//         return;
//       }

//       const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
//       if (selectedFile.size > maxSizeInBytes) {
//         setToast({
//           show: true,
//           message: "File size exceeds the limit (5 MB). Please upload a smaller file.",
//           type: "error"
//         });
//         setResume(null);
//         return;
//       }

//       setResume(selectedFile);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("job", job);
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("resume", resume);

//     fetch("/api/submit", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(result);
//         // Show success toast
//         setToast({
//           show: true,
//           message: "Resume uploaded successfully!",
//           type: "success"
//         });
        
//         // Reset form fields
//         setJob("");
//         setName("");
//         setEmail("");
//         setResume(null);
        
//         // Close the popup after a slight delay
//         setTimeout(() => {
//           setShowForm(false);
//         }, 1500);
//       })
//       .catch((error) => {
//         console.error("Error uploading resume:", error);
//         setToast({
//           show: true,
//           message: "Error uploading resume. Please try again.",
//           type: "error"
//         });
//       });
//   };

//   return (
//     <div className="min-vh-100" >
//       {/* Toast Notification */}
//       {toast.show && (
//         <div 
//           className={`position-fixed ${toast.type === "success" ? "alert-success" : "alert-danger"} alert`}
//           style={{
//             top: "20px",
//             right: "20px",
//             zIndex: 9999,
//             minWidth: "300px"
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center">
//             <span>{toast.message}</span>
//             <button 
//               type="button"
//               className="btn-close"
//               onClick={() => setToast({ show: false, message: "" })}
//             ></button>
//           </div>
//         </div>
//       )}

//       <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
//         <div className="row g-4">
//           {/* Hero Card - Get Your Dream Job */}
//           <div className="col-lg-4 col-md-6">
//             <div className="card h-100" style={{
//               border: 'none',
//               borderRadius: '15px',
//               overflow: 'hidden',
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }}>
//               <div style={{
//                 background: '#007bff',
//                 color: 'white',
//                 padding: '20px',
//                 textAlign: 'center'
//               }}>
//                 <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>Get Your Dream Job</h4>
//               </div>
              
//               <div className="card-body" style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
//                 <div>
//                   <h5 style={{ 
//                     color: '#007bff', 
//                     fontWeight: 'bold', 
//                     marginBottom: '15px',
//                     fontSize: '1.5rem'
//                   }}>
//                     YOUR CAREERS
//                   </h5>
//                   <p style={{ 
//                     color: '#6c757d', 
//                     marginBottom: '20px',
//                     lineHeight: '1.6',
//                     fontSize: '0.95rem'
//                   }}>
//                     Take a journey of growth and excellence by joining <strong>Excerpt Technologies.</strong> 
//                     Being a top tech firm, we are constantly searching for driven and skilled people. 
//                     Using creativity to communicate our vision.
//                   </p>
//                 </div>
                
//                 <button 
//                   className="btn w-100"
//                   style={{
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '25px',
//                     padding: '10px 20px',
//                     fontWeight: '600',
//                     fontSize: '0.95rem',
//                     marginTop: 'auto',
//                     marginLeft:"auto",
//                     marginRight:"auto"

//                   }}
//                   onClick={() => setShowForm(true)}
//                 >
//                   <i className="fas fa-paper-plane me-2"></i>Apply Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Job Cards */}
//           {jobData.map((job, index) => (
//             <div className="col-lg-4 col-md-6" key={index}>
//               <div className="card h-100" style={{
//                 border: 'none',
//                 borderRadius: '15px',
//                 overflow: 'hidden',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//               }}>
//                 <div style={{
//                   background: '#007bff',
//                   color: 'white',
//                   padding: '20px'
//                 }}>
//                   <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>{job.title}</h4>
//                 </div>
                
//                 <div className="card-body" style={{ padding: '20px' }}>
//                   <div style={{ marginBottom: '20px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                       <i className="fas fa-briefcase" style={{ color: '#007bff', marginRight: '10px', fontSize: '1rem' }}></i>
//                       <span style={{ fontWeight: '600', marginRight: '8px' }}>Experience:</span>
//                       <span style={{ color: '#6c757d' }}>{job.experience}</span>
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <i className="fas fa-graduation-cap" style={{ color: '#007bff', marginRight: '10px', fontSize: '1rem' }}></i>
//                       <span style={{ fontWeight: '600', marginRight: '8px' }}>Qualification:</span>
//                       <span style={{ color: '#6c757d',fontSize:"15px"}}>{job.qualification}</span>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: '20px' }}>
//                     <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '1rem' }}>Required Skills:</h6>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//                       {job.skills.map((skill, skillIndex) => (
//                         <span 
//                           key={skillIndex}
//                           style={{
//                             color: '#007bff',
//                             border: '1px solid #007bff',
//                             backgroundColor: 'white',
//                             borderRadius: '20px',
//                             padding: '5px 12px',
//                             fontSize: '0.875rem',
//                             fontWeight: '500',
//                             display: 'inline-block',
//                             whiteSpace: 'nowrap'
//                           }}
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: '20px' }}>
//                     <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '1rem' }}>Description:</h6>
//                     <p style={{ color: '#6c757d', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
//                       {job.description}
//                     </p>
//                   </div>
//                 </div>

//                 <div style={{ padding: '0 25px 25px 25px' }}>
//                   <button 
//                     className="btn w-100"
//                     style={{
//                       color: '#007bff',
//                       border: '1px solid #007bff',
//                       backgroundColor: 'white',
//                       borderRadius: '25px',
//                       padding: '10px 20px',
//                       fontWeight: '600',
//                       fontSize: '0.95rem',
//                       transition: 'all 0.3s ease',
//                        marginLeft:"auto",
//                     marginRight:"auto"

//                     }}
//                     onClick={() => setShowForm(true)}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = '#007bff';
//                       e.target.style.color = 'white';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = 'white';
//                       e.target.style.color = '#007bff';
//                     }}
//                   >
//                     <i className="fas fa-paper-plane me-2"></i>Apply for this position
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Application Form Modal */}
//       {showForm && (
//         <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content rounded-4 border-0 shadow-lg">
//               <div className="modal-header border-0 pb-0">
//                 <h4 className="modal-title text-primary fw-bold">Submit Your Application</h4>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowForm(false)}
//                 ></button>
//               </div>
              
//               <div className="modal-body p-4">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">Job Title</label>
//                       <input
//                         type="text"
//                         className="form-control form-control-lg rounded-pill"
//                         placeholder="Enter job title"
//                         value={job}
//                         onChange={(e) => setJob(e.target.value)}
//                         required
//                       />
//                     </div>
                    
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">Full Name</label>
//                       <input
//                         type="text"
//                         className="form-control form-control-lg rounded-pill"
//                         placeholder="Enter your full name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Email Address</label>
//                     <input
//                       type="email"
//                       className="form-control form-control-lg rounded-pill"
//                       placeholder="Enter your email address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label fw-semibold">Upload Resume</label>
//                     <input
//                       type="file"
//                       className="form-control form-control-lg"
//                       accept=".pdf,.doc,.docx"
//                       onChange={(e) => handleFileChange(e.target.files[0])}
//                       required
//                     />
//                     <div className="form-text">Accepted formats: PDF, DOC, DOCX (Max size: 5MB)</div>
//                   </div>

//                   <div className="d-flex gap-3 justify-content-end">
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary px-4 rounded-pill"
//                       onClick={() => setShowForm(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="btn btn-primary px-5 rounded-pill"
//                     >
//                       <i className="fas fa-paper-plane me-2"></i>Submit Application
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobData;



import React, { useState, useEffect } from "react";

const JobData = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Fetch job data from API
  useEffect(() => {
    console.log("Starting fetch...");
    
    fetch("http://localhost:3000/api/jobdata")
      .then(async (res) => {
        console.log("Response received:", res.status);
        const text = await res.text();
        console.log("Response body:", text);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        
        return JSON.parse(text);
      })
      .then(data => {
        console.log("Data parsed:", data);
        setJobData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Full error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Effect to auto-close toast after 3 seconds
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      const allowedFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setToast({
          show: true,
          message: "Invalid file type. Please upload a PDF, Word, or DOC file.",
          type: "error"
        });
        setResume(null);
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (selectedFile.size > maxSizeInBytes) {
        setToast({
          show: true,
          message: "File size exceeds the limit (5 MB). Please upload a smaller file.",
          type: "error"
        });
        setResume(null);
        return;
      }

      setResume(selectedFile);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("job", job);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);

    fetch("http://localhost:3000/api/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setToast({
          show: true,
          message: "Resume uploaded successfully!",
          type: "success"
        });
        
        setJob("");
        setName("");
        setEmail("");
        setResume(null);
        
        setTimeout(() => {
          setShowForm(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error uploading resume:", error);
        setToast({
          show: true,
          message: "Error uploading resume. Please try again.",
          type: "error"
        });
      });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-danger" style={{ fontSize: '3rem' }}></i>
          <h4 className="mt-3 text-danger">Error Loading Jobs</h4>
          <p className="text-muted">{error}</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      {/* Toast Notification */}
      {toast.show && (
        <div 
          className={`position-fixed ${toast.type === "success" ? "alert-success" : "alert-danger"} alert`}
          style={{
            top: "20px",
            right: "20px",
            zIndex: 9999,
            minWidth: "300px"
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <span>{toast.message}</span>
            <button 
              type="button"
              className="btn-close"
              onClick={() => setToast({ show: false, message: "", type: "" })}
            ></button>
          </div>
        </div>
      )}

      <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <div className="row g-4">
          {/* Hero Card - Get Your Dream Job */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 d-flex flex-column" style={{
              border: 'none',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                background: '#007bff',
                color: 'white',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>Get Your Dream Job</h4>
              </div>
              
              <div className="card-body d-flex flex-column" style={{ padding: '25px', flex: '1' }}>
                <div style={{ flex: '1' }}>
                  <h5 style={{ 
                    color: '#007bff', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    fontSize: '1.5rem'
                  }}>
                    YOUR CAREERS
                  </h5>
                  <p style={{ 
                    color: '#6c757d', 
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    Take a journey of growth and excellence by joining <strong>Excerpt Technologies.</strong> 
                    Being a top tech firm, we are constantly searching for driven and skilled people. 
                    Using creativity to communicate our vision.
                  </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <button 
                    className="btn"
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '10px 30px',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      minWidth: '200px'
                    }}
                    onClick={() => setShowForm(true)}
                  >
                    <i className="fas fa-paper-plane me-2"></i>Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          {jobData.map((jobItem, index) => (
            <div className="col-lg-4 col-md-6" key={jobItem._id || index}>
              <div className="card h-100 d-flex flex-column" style={{
                border: jobItem.isDefault ? '2px solid #007bff' : 'none',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  background: '#007bff',
                  color: 'white',
                  padding: '20px'
                }}>
                  <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>{jobItem.title}</h4>
                </div>
                
                <div className="card-body d-flex flex-column" style={{ padding: '20px', flex: '1' }}>
                  <div style={{ flex: '1' }}>
                    {!jobItem.isDefault && (
                      <>
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <i className="fas fa-briefcase" style={{ color: '#007bff', marginRight: '10px', fontSize: '1rem', width: '20px' }}></i>
                            <span style={{ fontWeight: '600', marginRight: '8px' }}>Experience:</span>
                            <span style={{ color: '#6c757d' }}>{jobItem.experience}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i className="fas fa-graduation-cap" style={{ color: '#007bff', marginRight: '10px', fontSize: '1rem', width: '20px' }}></i>
                            <span style={{ fontWeight: '600', marginRight: '8px' }}>Qualification:</span>
                            <span style={{ color: '#6c757d', fontSize: "15px" }}>{jobItem.qualification}</span>
                          </div>
                        </div>

                        {jobItem.skills && jobItem.skills.length > 0 && (
                          <div style={{ marginBottom: '20px' }}>
                            <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '1rem' }}>Required Skills:</h6>
                            <div style={{ 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: '8px',
                              maxHeight: '100px',
                              overflowY: 'auto'
                            }}>
                              {jobItem.skills.map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex}
                                  style={{
                                    color: '#007bff',
                                    border: '1px solid #007bff',
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    padding: '5px 12px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                    height: 'fit-content'
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '1rem' }}>Description:</h6>
                      <p style={{ 
                        color: '#6c757d', 
                        fontSize: '0.9rem', 
                        lineHeight: '1.6', 
                        margin: 0,
                        maxHeight: '150px',
                        overflowY: 'auto'
                      }}>
                        {jobItem.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button 
                      className="btn"
                      style={{
                        color: '#007bff',
                        border: '1px solid #007bff',
                        backgroundColor: 'white',
                        borderRadius: '25px',
                        padding: '10px 30px',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        marginTop: '15px',
                        minWidth: '250px'
                      }}
                      onClick={() => setShowForm(true)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#007bff';
                      }}
                    >
                      <i className="fas fa-paper-plane me-2"></i>Apply for this position
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title text-primary fw-bold">Submit Your Application</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              
              <div className="modal-body p-4">
                <div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Job Title</label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-pill"
                        placeholder="Enter job title"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-pill"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-pill"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Upload Resume</label>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      required
                    />
                    <div className="form-text">Accepted formats: PDF, DOC, DOCX (Max size: 5MB)</div>
                  </div>

                  <div className="d-flex gap-3 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 rounded-pill"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary px-5 rounded-pill"
                      onClick={handleSubmit}
                    >
                      <i className="fas fa-paper-plane me-2"></i>Submit Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobData;