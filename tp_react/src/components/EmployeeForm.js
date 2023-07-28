// EmployeeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css'; // Import the CSS file for styling

const EmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [formData, setFormData] = useState({
    emp_name: '',
    emp_id: '',
    emp_mail: '',
    designation: '',
    doj: '',
    dob: '',
    doc: null,
  });

  // Fetch list of employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tp_employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployeeId) {
      alert('Please select an employee to delete.');
      return;
    }

    try {
      // Send DELETE request to delete the selected employee
      await axios.delete(`http://localhost:8000/tp_employee/${selectedEmployeeId}/`);
      alert('Employee deleted successfully!');
      // Clear the form after successful deletion
      try {
        const response = await axios.get('http://localhost:8000/tp_employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
      setFormData({
        emp_name: '',
        emp_id: '',
        emp_mail:'',
        designation: '',
        doj: '',
        dob: '',
        doc: null,
      });
      setSelectedEmployeeId('');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Prepare the request data
    const requestData = {
      ...formData,
      id: selectedEmployeeId,
    };

    if (selectedEmployeeId) {
      // If an existing employee is selected, update the details
      try {
        await axios.put(`http://localhost:8000/tp_employee/${selectedEmployeeId}/`, requestData);
        alert('Employee updated successfully!');
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    } else {
      // If no employee is selected, create a new employee via POST request
      try {
        await axios.post('http://localhost:8000/tp_employee/', requestData);
        alert('New employee added successfully!');
        try {
          const response = await axios.get('http://localhost:8000/tp_employee/');
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
        // Clear the form after successful creation
        setFormData({
          emp_name: '',
          emp_id: '',
          emp_mail:'',
          designation: '',
          doj: '',
          dob: '',
          doc: null,
        });
        setSelectedEmployeeId('');
      } catch (error) {
        console.error('Error adding new employee:', error);
      }
    }
  };

  const handleEmployeeSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedEmployeeId(selectedId);

    // Find the selected employee by ID from the employees list
    const selectedEmployee = employees.find((employee) => employee.id === parseInt(selectedId));

    // If an employee is selected, autofill the form with existing details
    if (selectedEmployee) {
      setFormData({
        emp_name: selectedEmployee.emp_name,
        emp_id: selectedEmployee.emp_id,
        emp_mail: selectedEmployee.emp_mail,
        designation: selectedEmployee.designation,
        doj: selectedEmployee.doj,
        dob: selectedEmployee.dob,
        doc: selectedEmployee.doc,
      });
    } else {
      // If no employee is selected, clear the form
      setFormData({
        emp_name: '',
        emp_id: '',
        emp_mail: '',
        designation: '',
        doj: '',
        dob: '',
        doc: null,
      });
    }
  };

  return (
    <div className="employee-form-container">
      <form onSubmit={handleFormSubmit}>
        <select
          id="selectEmployee"
          name="selectedEmployeeId"
          value={selectedEmployeeId}
          onChange={handleEmployeeSelect}
        >
          <option value="">Select an Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.emp_name}
            </option>
          ))}
        </select>
        {/* Other input fields */}
        <div className="form-group">
          <input
            type="text"
            id="emp_name"
            name="emp_name"
            value={formData.emp_name}
            onChange={handleInputChange}
            placeholder="Enter Employee Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="emp_id"
            name="emp_id"
            value={formData.emp_id}
            onChange={handleInputChange}
            placeholder="Enter Employee ID"h
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="emp_mail"
            name="emp_mail"
            value={formData.emp_mail}
            onChange={handleInputChange}
            placeholder="Enter Employee Mail id"h
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Enter Designation"
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            id="doj"
            name="doj"
            value={formData.doj}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more input fields as needed */}
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleDeleteEmployee}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
