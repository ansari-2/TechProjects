// EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css'; // Import the CSS file for styling

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tp_employee/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <p>Name: {employee.emp_name}</p>
            <p>EmployeeID: {employee.emp_id}</p>
            <p>Designation: {employee.designation}</p>
            <p>Date of Joining: {employee.doj}</p>
            <p>Date of Birth: {employee.dob}</p>
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
