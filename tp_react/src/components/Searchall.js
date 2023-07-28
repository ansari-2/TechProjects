import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // Import the CSS file for styling


const Searchall= () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.get('http://localhost:8000/tp_employee/searchall', {
          params: { search: searchQuery },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    const clearSearchResults = () => {
      setSearchResults([]);
    };
  
    return (
      <div className="search-bar-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
      <button type="submit">Submit</button>
        </form>
  
        {searchResults.length > 0 && (
          <div>
            <table class="container">
        <thead>
          <tr>
            <th>Name</th>
            <th>EmployeeID</th>
            <th>Mail id</th>
            <th>Designation</th>
            <th>Date of Joining</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((employee) => (
            <tr key={employee.id} className="employee-item">
              <td>{employee.emp_name}</td>
              <td>{employee.emp_id}</td>
              <td>{employee.emp_mail}</td>
              <td>{employee.designation}</td>
              <td>{employee.doj}</td>
              <td>{employee.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
          </div>
        )}
      </div>
    );
  };
  
  export default Searchall;