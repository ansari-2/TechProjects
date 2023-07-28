import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // Import the CSS file for styling

const SearchForm = () => {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [query3, setQuery3] = useState('');
  const [query4, setQuery4] = useState('');
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [searchResults3, setSearchResults3] = useState([]);
  const [searchResults4, setSearchResults4] = useState([]);

  const handleSearchChange1 = (event1) => {
    setQuery1(event1.target.value);
  };

  const handleSearchChange2 = (event2) => {
    setQuery2(event2.target.value);
  };

  
  const handleSearchChange3 = (event3) => {
    setQuery3(event3.target.value);
  };

  
  const handleSearchChange4= (event4) => {
    setQuery4(event4.target.value);
  };


  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/tp_employee/searchall', {
        params: { search: query1}});
        setSearchResults1(response.data);
    }catch (error) {
      console.error('Error fetching search results:', error);
    }
  


    try {
      const responsename = await axios.get('http://localhost:8000/tp_employee/searchbyName', {
        params: { search: query2}});
        setSearchResults2(responsename.data);
    }catch (error) {
      console.error('Error fetching search results:', error);
    }
  


    
    try {
      const responseid = await axios.get('http://localhost:8000/tp_employee/searchbyId', {
        params: { search: query3}});
        setSearchResults3(responseid.data);
    }catch (error) {
      console.error('Error fetching search results:', error);
    }
  


    try {
      const responsedesg = await axios.get('http://localhost:8000/tp_employee/searchbyDesg', {
        params: { search: query4}});
        setSearchResults4(responsedesg.data);
    }catch (error) {
      console.error('Error fetching search results:', error);
    }
    

  };

 
    const clearSearchResults1 = () => {
      setSearchResults1([]);
  };

  const clearSearchResults2 = () => {
    setSearchResults2([]);
};

const clearSearchResults3 = () => {
  setSearchResults3([]);
};

const clearSearchResults4 = () => {
  setSearchResults4([]);
};
  return (
    <div className="search-bar-container">
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        
        placeholder="Search"
        value={query1}
        onChange={handleSearchChange1}
      />
      <br>
      </br>
     
      <input
        type="text"
        id="Name" placeholder="Search by Name"
        value={query2}
        onChange={handleSearchChange2}
      />
      <br></br>
        <input
        type="text"
        
        placeholder="Search by ID"
        value={query3}
        onChange={handleSearchChange3}
      />
      <br></br>
     
        <input
        type="text"
      
        placeholder="Search by Desg"
        value={query4}
        onChange={handleSearchChange4}
      />
      <br></br>
  <button type="submit">Submit</button>
    </form>

    { ((searchResults1.length > 0)||(searchResults2.length>0)||(searchResults3.length>0)||(searchResults4.length>0)) && (
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
              {searchResults1.map((employee) => (
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
        )};


  
           
  </div>
);
};


export default SearchForm;