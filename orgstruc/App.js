// import React from 'react';
// import './App.css';
// import About from './components/About';
// import Aboutus from './components/Aboutus';
// import OrgStructure from './components/OrgStructure';
// import {BrowserRouter as Router,  Route} from 'react-router-dom';
// import Switch  from 'react-router-dom';
// import data from './components/data';


// function App() {
//   return (
//     <>
    
//       <h3> About Us page</h3>
//       {/* <OrgChartComponent/> */}
//       <OrgStructure />
//       {/* <About/> */}
    
       
      
//     </>
//   );
// }

// export default App;

import React, { Component } from 'react';
import OrgChart from './mytree';

export default class App extends Component {
    render() {
        return (
            <div style={{height: '100%', }}>

                <OrgChart nodes={[
                    { id: 1, name: 'Bindu Madhavi Madiraju ', title: 'President', img: 'https://techprojects.com/wp-content/uploads/2021/09/BIndu-300x300.png' ,disc : 'As a minority & women owned business leader, Bindu Madiraju got more than a decade experience'},
                    { id: 2, pid: 1, name: 'Ram Madiraju', title: 'Partner/COO', img: 'https://techprojects.com/wp-content/uploads/2021/05/Ram-copy-300x300.jpg' },
                    { id: 3, pid: 1, name: 'Chandra Reddy', title: 'Partner', img: 'https://techprojects.com/wp-content/uploads/2022/03/ChandraReddy-300x300.jpg' },
                    { id: 4, pid: 2, name: 'Krishna Alavala', title: 'Vice President -Finance & Sales', img: 'https://techprojects.com/wp-content/uploads/2021/05/Krishna-copy-300x300.jpg' },
                    { id: 5, pid: 2, name: 'Satish Vallabhaneni', title: 'Technical Project Manager & ERP', img: 'https://techprojects.com/wp-content/uploads/2022/05/Satich-300x300.jpg' },
                    { id: 6, pid: 3, name: 'Sarath Makkapati', title: 'Head of Finance & Accounting', img: 'https://techprojects.com/wp-content/uploads/2021/09/Sharath-300x300.jpg' },
                    { id: 7, pid: 3, name: 'Shweta Narang', title: 'Director of Operations', img: 'https://techprojects.com/wp-content/uploads/2021/05/Swetha-1-300x300.jpg' },
                    { id: 8, pid: 3, name: 'Farheen', title: 'HR Specialist', img: 'https://techprojects.com/wp-content/uploads/2021/09/Farheen-300x300.jpg' }
                ]} />
            </div>
        );
    }
}
