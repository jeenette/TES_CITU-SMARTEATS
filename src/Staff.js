import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Staff.css';

const Staff = () => {
  const [staffDetails, setStaffDetails] = useState({
    Staff_ID: '',
    Name: '',
    Role: '',
    Contact_Number: '',
    Schedule: ''
  });

  const navigate = useNavigate();

  // Handle input changes for the staff form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({
      ...staffDetails,
      [name]: value
    });
  };

  // Create a new staff member (POST request)
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/staff', staffDetails); 
      console.log('Staff member created successfully:', response.data);
      alert('Staff member created successfully!');
      navigate('/staff-success');  // Navigate to a success page (optional)
    } catch (error) {
      console.error('Error creating staff member:', error);
      alert('Error creating staff member. Please try again.');
    }
  };

  // Update an existing staff member by ID (PUT request)
  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const staffId = staffDetails.Staff_ID;
    try {
      const response = await axios.put(`http://localhost:8080/api/staff/${staffId}`, staffDetails);
      console.log('Staff member updated successfully:', response.data);
      alert('Staff member updated successfully!');
      navigate('/staff-update-success');  // Navigate to a success page (optional)
    } catch (error) {
      console.error('Error updating staff member:', error);
      alert('Error updating staff member. Please try again.');
    }
  };

  // Delete a staff member by ID (DELETE request)
  const handleDeleteStaff = async () => {
    const staffId = staffDetails.Staff_ID;
    try {
      const response = await axios.delete(`http://localhost:8080/api/staff/${staffId}`);
      console.log('Staff member deleted successfully:', response.data);
      alert('Staff member deleted successfully!');
      setStaffDetails({
        Staff_ID: '',
        Name: '',
        Role: '',
        Contact_Number: '',
        Schedule: ''
      }); // Clear form after deletion
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert('Error deleting staff member. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Staff Form</h1>
      <form onSubmit={handleCreateStaff}>
        <label htmlFor="Staff_ID">Staff ID:</label>
        <input
          type="text"
          id="Staff_ID"
          name="Staff_ID"
          value={staffDetails.Staff_ID}
          onChange={handleChange}
          required
        />

        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={staffDetails.Name}
          onChange={handleChange}
          required
        />

        <label htmlFor="Role">Role:</label>
        <input
          type="text"
          id="Role"
          name="Role"
          value={staffDetails.Role}
          onChange={handleChange}
          required
        />

        <label htmlFor="Contact_Number">Contact Number:</label>
        <input
          type="text"
          id="Contact_Number"
          name="Contact_Number"
          value={staffDetails.Contact_Number}
          onChange={handleChange}
          required
        />

        <label htmlFor="Schedule">Schedule:</label>
        <input
          type="text"
          id="Schedule"
          name="Schedule"
          value={staffDetails.Schedule}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Staff</button>
        <button type="button" onClick={handleUpdateStaff}>
          Update Staff
        </button>
        <button type="button" onClick={handleDeleteStaff}>
          Delete Staff
        </button>
      </form>
    </div>
  );
};

export default Staff;
