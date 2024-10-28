// StaffList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffList.css';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/staff'); // Replace with your API URL
        setStaffList(response.data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaffList();
  }, []);

  return (
    <div className="staff-list-container">
      <h1>Staff List</h1>
      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Contact Number</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.Staff_ID}>
              <td>{staff.Staff_ID}</td>
              <td>{staff.Name}</td>
              <td>{staff.Role}</td>
              <td>{staff.Contact_Number}</td>
              <td>{staff.Schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
