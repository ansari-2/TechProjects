import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css'; // Import the CSS file for styling

const EmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [formData, setFormData] = useState({
    emp_firstname: '',
    emp_lastname: '',
    emp_gender: '',
    ssn: '',
    emp_username: '',
    emp_alternatemail: '',
    contact: '',
    emp_type: '',
    emp_status: '',
    emp_department: '',
    emp_id: '',
    emp_mail: '',
    designation: '',
    doj: '',
    dob: '',
    doc: null,
  });
  const [selectedAction, setSelectedAction] = useState('add');

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

  // const handleDeleteEmployee = async () => {
  //   if (!selectedEmployeeId) {
  //     alert('Please select an employee to delete.');
  //     return;
  //   }

  //   try {
  //     // Send DELETE request to delete the selected employee
  //     await axios.delete(`http://localhost:8000/tp_employee/${selectedEmployeeId}/`);
  //     alert('Employee deleted successfully!');
  //     // Refresh the list of employees after successful deletion
  //     const response = await axios.get('http://localhost:8000/tp_employee/');
  //     setEmployees(response.data);
  //     // Clear the form after successful deletion
  //     setFormData({
  //       emp_name: '',
  //       emp_id: '',
  //       designation: '',
  //       doj: '',
  //       dob: '',
  //       doc: null,
  //     });
  //     setSelectedEmployeeId('');
  //   } catch (error) {
  //     console.error('Error deleting employee:', error);
  //   }
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Check the selected action from the dropdown
    const selectedAction = document.getElementById('employeeAction').value;
    const requestData = {
      ...formData,
      id: selectedEmployeeId,
    };
  
    if (selectedAction === 'add') {
      // If "Add Employee" is selected, create a new employee via POST request
      try {
        await axios.post('http://localhost:8000/tp_employee/', requestData);
        alert('New employee added successfully!');
        // Refresh the list of employees after successful addition
        const response = await axios.get('http://localhost:8000/tp_employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error adding new employee:', error);
      }
    } else if (selectedAction === 'delete') {
      // If "Delete Employee" is selected, delete the selected employee via DELETE request
      if (!selectedEmployeeId) {
        alert('Please select an employee to delete.');
        return;
      }
  
      try {
        await axios.delete(`http://localhost:8000/tp_employee/${selectedEmployeeId}/`);
        alert('Employee deleted successfully!');
        // Refresh the list of employees after successful deletion
        const response = await axios.get('http://localhost:8000/tp_employee/');
        setEmployees(response.data);
        // Clear the form after successful deletion
        setFormData({
          emp_firstname: '',
          emp_lastname: '',
          emp_gender: '',
          ssn: '',
          emp_username: '',
          emp_alternatemail: '',
          contact: '',
          emp_type: '',
          emp_status: '',
          emp_department: '',
          emp_id: '',
          emp_mail: '',
          designation: '',
          doj: '',
          dob: '',
          doc: null,
        });
        setSelectedEmployeeId('');
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    } else if (selectedAction === 'update') {
      try {
        await axios.put(`http://localhost:8000/tp_employee/${selectedEmployeeId}/`, requestData);
        alert('Employee updated successfully!');
        // Refresh the list of employees after successful update
        const response = await axios.get('http://localhost:8000/tp_employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
      // ... (existing code for updating an employee)
    } else {
      // If no action is selected, display an error message
      alert('Please select an action from the dropdown.');
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
        emp_firstname: selectedEmployee.emp_firstname,
        emp_lastname: selectedEmployee.emp_lastname,
        emp_gender: selectedEmployee.emp_gender,
        ssn: selectedEmployee.ssn,
        emp_username: selectedEmployee.emp_username,
        emp_alternatemail: selectedEmployee.emp_alternatemail,
        contact: selectedEmployee.contact,
        emp_type: selectedEmployee.emp_type,
        emp_status: selectedEmployee.emp_status,
        emp_department: selectedEmployee.emp_department,
        emp_id: selectedEmployee.emp_id,
        emp_mail:selectedEmployee.emp_mail ,
        designation: selectedEmployee.designation,
        doj: selectedEmployee.doj,
        dob: selectedEmployee.dob,
        doc: selectedEmployee.doc,
      });
    } else {
      // If no employee is selected, clear the form
      setFormData({
        emp_firstname: '',
        emp_lastname: '',
        emp_gender: '',
        ssn: '',
        emp_username: '',
        emp_alternatemail: '',
        contact: '',
        emp_type: '',
        emp_status: '',
        emp_department: '',
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

        {selectedAction === 'update' && (
          <div className="form-group">
            <label htmlFor="selectEmployee">Select Employee:</label>
            <select
              id="selectEmployee"
              name="selectedEmployeeId"
              value={selectedEmployeeId}
              onChange={handleEmployeeSelect}
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.emp_firstname}
                </option>
              ))}
            </select>
          </div>
        )}
                {selectedAction === 'delete' && (
          <div className="form-group">
            <label htmlFor="selectEmployee">Select Employee:</label>
            <select
              id="selectEmployee"
              name="selectedEmployeeId"
              value={selectedEmployeeId}
              onChange={handleEmployeeSelect}
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.emp_firstname}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Other input fields */}
        <ul className='side'>
        <div className="form-group">
        <b>First Name</b>
          <input
            type="text"
            id="emp_firstname"
            name="emp_firstname"
            value={formData.emp_firstname}
            onChange={handleInputChange}
            // placeholder="Enter Employee Name"
          />
        </div>
        <div className="form-group">
        <b>Last Name</b>
          <input
            type="text"
            id="emp_lastname"
            name="emp_lastname"
            value={formData.emp_lastname}
            onChange={handleInputChange}
            // placeholder="Enter Employee Name"
          />
        </div>
    
        <div className="form-group">
        <label htmlFor="emp_gender"><b>Gender</b></label>
        <select
          id="emp_gender"
          name="emp_gender"
          value={formData.emp_gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>


        </ul>
        <ul className='side'>
        <div className="form-group">
        <b>User Name</b>
          <input
            type="text"
            id="emp_username"
            name="emp_username"
            value={formData.emp_username}
            onChange={handleInputChange}
            // placeholder="Enter Employee Name"
          />
        </div>
        <div className="form-group">
        <b>Employee ID</b>
          <input
            type="text"
            id="emp_id"
            name="emp_id"
            value={formData.emp_id}
            onChange={handleInputChange}
            // placeholder="Enter Employee ID"
          />
        </div>
        <div className="form-group">
        <b>Email</b>
          <input
            type="text"
            id="emp_mail"
            name="emp_mail"
            value={formData.emp_mail}
            onChange={handleInputChange}
            // placeholder="Enter Employee ID"
          />
        </div>
        </ul>
        <ul className='side'>
        <div className="form-group">
        <b>Alternate Email</b>
          <input
            type="text"
            id="emp_alternatemail"
            name="emp_alternatemail"
            value={formData.emp_alternatemail}
            onChange={handleInputChange}
            // placeholder="Enter Employee ID"
          />
        </div>
        <div className="form-group">
        <b>Contact Number </b>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            // placeholder="Enter Designation"
          />
        </div>
        <div className="form-group">
        <b>Social Security Number</b>
          <input
            type="text"
            id="ssn"
            name="ssn"
            value={formData.ssn}
            onChange={handleInputChange}
            // placeholder="Enter Designation"
          />
        </div>
        </ul>
        <ul className='side'>
        <div className="form-group">
        <label htmlFor="emp_department"><b>Department</b></label>
        <select
          id="emp_department"
          name="emp_department"
          value={formData.emp_department}
          onChange={handleInputChange}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="designation"><b>Designation</b></label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          >
            <option value="Software Developer">Software Developer</option>
            <option value="Senior Software Developer">Senior Software Developer</option>
            <option value="Application Engineer">Application Engineer</option>
            <option value="Solution Architect">Solution Architect</option>
            <option value="Manager">Manager</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Senior Manager">Senior Manager</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="emp_type"><b>Employee Type</b></label>
        <select
          id="emp_type"
          name="emp_type"
          value={formData.emp_type}
          onChange={handleInputChange}
        >
          <option value="">Select Employee Type</option>
          <option value="Contract">Contract</option>
          <option value="Full-Time">Full-Time</option>
        </select>
      </div>
        </ul>
        <ul className='side'>
        <div className="form-group">
        <label htmlFor="emp_status"><b>Employee Status</b></label>
        <select
          id="emp_status"
          name="emp_status"
          value={formData.emp_status}
          onChange={handleInputChange}
        >
          <option value="">Select Employee Type</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
        <div className="form-group">
        <b>Date of Joining</b>
        <input
            type="date"
            id="doj"
            name="doj"
            value={formData.dobj}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
        <b>Date of Birth</b>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        </ul>
        {/* Add more input fields as needed */}
        <div className="form-option-group">
          <select
            id="employeeAction"
            name="employeeAction"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="add">Add</option>
            <option value="delete">Delete</option>
            <option value="update">Update</option>
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;