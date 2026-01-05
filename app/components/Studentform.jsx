'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    collegeName: '',
    fatherName: '',
    course: '',
    certificateType: '',
    yop: '',
    from: '',
    to: '',
    softwareCovered: '',
    regNo: '',
    gender: '', // Adding gender field
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/addCourseStudent', formData);
      console.log('Data added successfully');
      // Optionally, reset the form fields after successful submission
      setFormData({
        name: '',
        age: '',
        collegeName: '',
        fatherName: '',
        course: '',
        certificateType: '',
        yop: '',
        from: '',
        to: '',
        softwareCovered: '',
        regNo: '',
        gender: '', // Reset gender field
      });
      // Show toast notification
      toast.success('Student data added successfully!');
      // Show alert message
      window.alert('Student data added successfully!');
    } catch (error) {
      console.error('Error adding data:', error.message);
      // Handle error
    }
  };
  

  return (
    <div>
      <h2>Add Student Data</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {/* Input fields for student data */}
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        {/* <div className="input-container">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={formData.age} onChange={handleChange} required />
        </div> */}
        <div className="input-container">
          <label htmlFor="collegeName">College Name:</label>
          <input type="text" id="collegeName" value={formData.collegeName} onChange={handleChange} required />
        </div>
        {/* <div className="input-container">
          <label htmlFor="fatherName">Father's Name:</label>
          <input type="text" id="fatherName" value={formData.fatherName} onChange={handleChange} required />
        </div> */}
        <div className="input-container">
          <label htmlFor="course">Qualification:</label>
          <input type="text" id="course" value={formData.course} onChange={handleChange} required />
        </div>
        {/* <div className="input-container">
          <label htmlFor="certificateType">Certificate Type:</label>
          <input type="text" id="certificateType" value={formData.certificateType} onChange={handleChange} required />
        </div> */}
        <div className="input-container">
          <label htmlFor="yop">Year of Passing:</label>
          <input type="number" id="yop" value={formData.yop} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label htmlFor="fromD">From Date:</label>
          <input type="text" id="from" placeholder="e.g., 01 June 2022" value={formData.from} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label htmlFor="toD">To Date:</label>
          <input type="text" id="to" placeholder="e.g., 30 June 2022" value={formData.to} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label htmlFor="softwareCovered">Software Covered:</label>
          <input type="text" id="softwareCovered" value={formData.softwareCovered} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label htmlFor="regNo">Registration Number:</label>
          <input type="text" id="regNo" value={formData.regNo} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default StudentForm;
