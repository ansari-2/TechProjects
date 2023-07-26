import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Search from './components/Search';
import EmployeeList from './components/EmployeeList';
import AdminPage from './components/AdminPage';
import About from './components/About';
import Upload from './components/Upload';
import './App.css';


function App() {
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/search">Employee Search</Link>
            </li>
            <li>
              <Link to="/list">Employee List</Link>
            </li>
            
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/list" element={<EmployeeList/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/about" element={<About/>} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;

