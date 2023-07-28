import React from 'react';

import SearchForm from './Searchform';

const SearchPage = () => {
  return (
    <><div>
          <SearchForm/>
         

          </div></>
  );
};

export default SearchPage;







// // SearchByDesg.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './SearchBar.css'; // Import the CSS file for styling

// const SearchForm = ({ onSubmit }) => {
//   const [query1, setQuery1] = useState('');
//   const [query2, setQuery2] = useState('');
//   const [query3, setQuery3] = useState('');
//   const [query4, setQuery4] = useState('');
//   const [searchResults1, setSearchResults1] = useState([]);
//   const [searchResults2, setSearchResults2] = useState([]);
//   const [searchResults3, setSearchResults3] = useState([]);
//   const [searchResults4, setSearchResults4] = useState([]);

//   const handleSearchChange1 = (event) => {
//     setQuery1(event.target.value);
//   };

//   const handleSearchChange2 = (event) => {
//     setQuery2(event.target.value);
//   };

  
//   const handleSearchChange3 = (event) => {
//     setQuery3(event.target.value);
//   };

  
//   const handleSearchChange4= (event) => {
//     setQuery4(event.target.value);
//   };


//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get('http://localhost:8000/tp_employee/searchall', {
//         params: { search: query1}});
//         setSearchResults1(response.data);
//     }catch (error) {
//       console.error('Error fetching search results:', error);
//     }

//     try {
//       const responsename = await axios.get('http://localhost:8000/tp_employee/searchbyName', {
//         params: { search: query2}});
//         setSearchResults2(responsename.data);
//     }catch (error) {
//       console.error('Error fetching search results:', error);
//     }

//     try {
//       const responseid = await axios.get('http://localhost:8000/tp_employee/searchbyId', {
//         params: { search: query3}});
//         setSearchResults3(responseid.data);
//     }catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//     try {
//       const responsedesg = await axios.get('http://localhost:8000/tp_employee/searchbyDesg', {
//         params: { search: query4}});
//         setSearchResults4(responsedesg.data);
//     }catch (error) {
//       console.error('Error fetching search results:', error);
//     }
    

//   };

//     // const formData = {
//     //   query1,
//     //   query2,
//     //   query3,
//     //   query4,
//     // };
//     // onSubmit(formData);
//     const clearSearchResults1 = () => {
//       setSearchResults1([]);
//   };

//   const clearSearchResults2 = () => {
//     setSearchResults2([]);
// };

// const clearSearchResults3 = () => {
//   setSearchResults3([]);
// };

// const clearSearchResults4 = () => {
//   setSearchResults4([]);
// };
//   return (
//     <div className="search-bar-container">
//     <form onSubmit={handleSearchSubmit}>
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchQuery1}
//         onChange={handleSearchChange1}
//       />
//       <br>
//       </br>
//       <input
//         type="text"
//         label="Name"
//         placeholder="SearchbyNamee"
//         value={searchQuery2}
//         onChange={handleSearchChange2}
//       />
//       <br></br>
//         <input
//         type="text"
//         label="ID"
//         placeholder="SearchbyID"
//         value={searchQuery3}
//         onChange={handleSearchChange3}
//       />
//         <input
//         type="text"
//         placeholder="SearchbyDesg"
//         value={searchQuery4}
//         onChange={handleSearchChange4}
//       />
//   <button type="submit">Submit</button>
//     </form>

//     {(searchResults1.length > 0 || searchResults2.length>0 || searchResults3.length>0 || searchResults4.length>4 )&& (
//       <div>
//         <table class="container">
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>EmployeeID</th>
//         <th>Mail id</th>
//         <th>Designation</th>
//         <th>Date of Joining</th>
//         <th>Date of Birth</th>
//       </tr>
//     </thead>
//     <tbody>
//       {searchResults1.map((employee) => (
//         <tr key={employee.id} className="employee-item">
//           <td>{employee.emp_name}</td>
//           <td>{employee.emp_id}</td>
//           <td>{employee.emp_mail}</td>
//           <td>{employee.designation}</td>
//           <td>{employee.doj}</td>
//           <td>{employee.dob}</td>
//         </tr>
//       ))}
//             {searchResults2.map((employee) => (
//         <tr key={employee.id} className="employee-item">
//           <td>{employee.emp_name}</td>
//           <td>{employee.emp_id}</td>
//           <td>{employee.emp_mail}</td>
//           <td>{employee.designation}</td>
//           <td>{employee.doj}</td>
//           <td>{employee.dob}</td>
//         </tr>
//       ))}
//             {searchResults3.map((employee) => (
//         <tr key={employee.id} className="employee-item">
//           <td>{employee.emp_name}</td>
//           <td>{employee.emp_id}</td>
//           <td>{employee.emp_mail}</td>
//           <td>{employee.designation}</td>
//           <td>{employee.doj}</td>
//           <td>{employee.dob}</td>
//         </tr>
//       ))}
//             {searchResults4.map((employee) => (
//         <tr key={employee.id} className="employee-item">
//           <td>{employee.emp_name}</td>
//           <td>{employee.emp_id}</td>
//           <td>{employee.emp_mail}</td>
//           <td>{employee.designation}</td>
//           <td>{employee.doj}</td>
//           <td>{employee.dob}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//       </div>
//     )}
//   </div>
// );
// };
//   //   <form onSubmit={handleSubmit}>
//   //     <input type="text" value={query1} onChange={(e) => setQuery1(e.target.value)} />
//   //     <input type="text" value={query2} onChange={(e) => setQuery2(e.target.value)} />
//   //     <input type="text" value={query3} onChange={(e) => setQuery3(e.target.value)} />
//   //     <input type="text" value={query4} onChange={(e) => setQuery4(e.target.value)} />
//   //     <button type="submit">Submit</button>
//   //   </form>
//   // );


// export default Search;
