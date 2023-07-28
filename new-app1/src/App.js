import React from 'react';
import './App.css';
import { BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Aboutusp from './components/pages/Aboutusp';
import Home from './components/pages/Home';
import Orgstructurep from './components/pages/Orgstructurep';



function App() {
  return (
    <>
    
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' excat  Component={Home} />
          <Route path='/aboutus' Component={Aboutusp} />
          <Route path='/organisation' Component={Orgstructurep} />
        </Routes>
    </Router>
     

    </> 
    
  );
}

export default App;
