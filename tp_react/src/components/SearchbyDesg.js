// SearchByDesg.js
import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // Import the CSS file for styling

const SearchbyDesg= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/tp_employee/searchbyDesg', {
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
          placeholder="Search by Desg"
          value={searchQuery}
          onChange={handleSearchChange}
        />
    <button type="submit">Submit</button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <ul>
            {searchResults.map((employee) => (
              <li key={employee.id} className="employee-item">
                <p>Name: {employee.emp_name}</p>
                <p>EmployeeID: {employee.emp_id}</p>
                <p>Designation: {employee.designation}</p>
                <p>Date of Joining: {employee.doj}</p>
                <p>Date of Birth: {employee.dob}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchbyDesg;

