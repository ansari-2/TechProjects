// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Timesheets.css'; // Import the CSS file for styling

// const Timesheets = () => {
//   const [employees, setEmployees] = useState([]);
//   const [timesheetData, setTimesheetData] = useState([]);
//   const [weekDates, setWeekDates] = useState([]);
//   const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
//   const [currentEmployee, setCurrentEmployee] = useState(null); // Store the current employee for whom popup is open
//   const [currentDay, setCurrentDay] = useState(null); // Store the current day for which popup is open
//   const [taskDescription, setTaskDescription] = useState(''); // Store the task description
//   const [selectedProjectCode, setSelectedProjectCode] = useState('');



//   useEffect(() => {
//     // Fetch list of employees from the API
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/tp_employee/');
//         setEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };

//     fetchEmployees();

 
    
//     // Generate an array of week dates (Monday to Sunday)
//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
//     const dates = [];
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       dates.push(date);
//     }
//     setWeekDates(dates);
//   }, []);

  

//   const handleInputChange = (event, employeeId, day) => {
//     const { name, value } = event.target;

//     const timesheetIndex = timesheetData.findIndex((entry) => entry.employee === employeeId);

//     if (timesheetIndex === -1) {
//       setTimesheetData((prevTimesheetData) => [
//         ...prevTimesheetData,
//         {
//           employee: employeeId,
//           [day]: {
//             [name]: value,
//           },
//         },
//       ]);
//     } else {
//       setTimesheetData((prevTimesheetData) => [
//         ...prevTimesheetData.slice(0, timesheetIndex),
//         {
//           ...prevTimesheetData[timesheetIndex],
//           [day]: {
//             ...prevTimesheetData[timesheetIndex][day],
//             [name]: value,
//           },
//         },
//         ...prevTimesheetData.slice(timesheetIndex + 1),
//       ]);
//     }
//     // handleOpenDescription(employeeId, day);
//   };

  

//   const handleOpenDescription = (employeeId, day) => {
//     setShowPopup(!showPopup);
//     setCurrentEmployee(employeeId);
//     setCurrentDay(day);
  
//     // Clear task description if popup is closed
//     if (!showPopup) {
//       setTaskDescription('');
//     }
//   };
  
  
  

// const handleSubmitPopup = () => {

//   if (currentEmployee && currentDay && taskDescription) {
//     const timesheetEntry = timesheetData.find((entry) => entry.employee === currentEmployee);

//     const formattedDate = new Date(currentDay).toISOString().split('T')[0]; // Format to yyyy-mm-dd
//     const hoursWorked = timesheetEntry?.[currentDay]?.hours || '';

//     const dataToSubmit = {
//       date: formattedDate,
//       hours_worked: hoursWorked,
//       project_code: selectedProjectCode, // Use the selected project code
//       task_description: taskDescription,
//     };

//     axios.post('http://localhost:8000/tp_employee/timesheets/', JSON.stringify(dataToSubmit), {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         console.log('Data submitted successfully:', response.data);
//         alert('Data submitted successfully')
//       })
//       .catch((error) => {
//         console.error('Error submitting data:', error);
//       });
//   }

//   setShowPopup(false);
//   setCurrentEmployee(null);
//   setCurrentDay(null);
//   setTaskDescription('');
// };

  
  

//   return (
//     <div className="timesheets-container">
//       <div className="week-bar">
//       </div>
//       <table className="timesheet-table">
//         <thead>
//           <tr>
//             <th>
//             <select value={selectedProjectCode} onChange={(e) => setSelectedProjectCode(e.target.value)}>
//   <option value="">Project Code</option>
//   <option value="PR1">PR1</option>
//   <option value="PR2">PR2</option>
//   <option value="PR">PR3</option>
// </select>

//             </th>
//             {weekDates.map((date) => (
//               <th key={date.toISOString()}>
//                 {date.toLocaleDateString('en-US', { weekday: 'short' })}
//                 <br />
//                 {date.toLocaleDateString('en-US', { month: 'short' })}-{date.getDate()} {/* Display month */}
//                 <br />
                
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <React.Fragment key={employee.id}>
//               <tr>
//                 <td>Hours</td>
//                 {weekDates.map((date) => (
//                   <td key={date.toISOString()}>
//                     <input
//                       type="number"
//                       name="hours"
//                       className="timesheet-input"
//                       max={8}
//                       min={0}
//                       value={timesheetData.find((entry) => entry.employee === employee.id)?.[date.toISOString()]?.hours || ''}
//                       onChange={(e) => handleInputChange(e, employee.id, date.toISOString())}
//                     />
//                       <span className="edit-icon" onClick={() => handleOpenDescription(employee.id, date.toISOString())} >
//                        <i className="fa fa-pencil"></i>
//                       </span>
//                   </td>
//                 ))}
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//       {showPopup && (
//         <div className="large-popup">
//           <div className="large-popup-content">
//             <h2>Task Description</h2>
//             <textarea
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//               placeholder="Enter task description"
//               rows="8"
//             />
//             <div className="popup-buttons">
//               <button onClick={handleSubmitPopup}>Submit</button>
//               <button onClick={() => setShowPopup(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Timesheets;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timesheets.css'; // Import the CSS file for styling

const Timesheets = () => {
  const [employees, setEmployees] = useState([]);
  const [timesheetData, setTimesheetData] = useState({});
  const [weekDates, setWeekDates] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [currentDay, setCurrentDay] = useState(null); // Store the current day for which popup is open
  const [taskDescription, setTaskDescription] = useState(''); // Store the task description
  const [selectedProjectCode, setSelectedProjectCode] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store the selected employee
  const [hoursInput, setHoursInput] = useState({});


  useEffect(() => {
    // Fetch list of employees from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tp_employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();

    // Generate an array of week dates (Monday to Sunday)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    setWeekDates(dates);
  }, []);
  

  const handleInputChange = (event, day) => {
    const { value } = event.target;

    setHoursInput((prevHoursInput) => ({
      ...prevHoursInput,
      [day]: value,
    }));
  };
  
  
  
  
  

  const handleOpenDescription = (day) => {
    setShowPopup(!showPopup);
    setCurrentDay(day);

    // Clear task description if popup is closed
    if (!showPopup) {
      setTaskDescription('');
    }
  };

  const handleSubmitPopup = () => {
    if (selectedEmployee && currentDay && taskDescription) {
      const formattedDate = new Date(currentDay).toISOString().split('T')[0]; // Format to yyyy-mm-dd

      const updatedTimesheetData = {
        ...timesheetData,
        [formattedDate]: {
          ...timesheetData[formattedDate],
          emp_data: selectedEmployee,
          date: formattedDate,
          hours_worked: hoursInput,
          project_code: selectedProjectCode,
          task_description: taskDescription,
        },
      };

      setTimesheetData(updatedTimesheetData);

      const dataToSubmit = {
        emp_data: selectedEmployee,
        date: formattedDate,
        hours_worked: hoursInput[currentDay] || '',
        project_code: selectedProjectCode,
        task_description: taskDescription,
      };

      axios.post('http://localhost:8000/tp_employee/timesheets/', dataToSubmit)
        .then((response) => {
          console.log('Data submitted successfully:', response.data);
        })
        .catch((error) => {
          console.log(currentDay)
          console.log(hoursInput)
          console.error('Error submitting data:', error);
        });
    }

    setShowPopup(false);
    setCurrentDay(null);
    setTaskDescription('');
  };

  return (
    <div className="timesheets-container">
      <div className="week-bar"></div>
      <div className="employee-dropdown">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.emp_firstname}
            </option>
          ))}
        </select>
      </div>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>
              <select
                value={selectedProjectCode}
                onChange={(e) => setSelectedProjectCode(e.target.value)}
              >
                <option value="">Project Code</option>
                <option value="PR1">PR1</option>
                <option value="PR2">PR2</option>
                <option value="PR3">PR3</option>
              </select>
            </th>
            {weekDates.map((date) => (
              <th key={date.toISOString()}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                <br />
                {date.toLocaleDateString('en-US', {
                  month: 'short',
                })}-{date.getDate()} {/* Display month */}
                <br />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
  <tr>
    <td>Hours</td>
    {weekDates.map((date) => (
     <td key={date.toISOString()}>
     <div className="input-container">
     <input
  type="number"
  name="hours_worked" // Note: Use "hours_worked" here
  className="timesheet-input"
  max={8}
  min={0}
  value={hoursInput[date.toISOString()] || ''}
  onChange={(e) => handleInputChange(e, date.toISOString())}
/>


       <span
         className="edit-icon"
         onClick={() =>
           handleOpenDescription(date.toISOString())
         }
       >
         <i className="fa fa-pencil"></i>
       </span>
     </div>
   </td>
   
    ))}
  </tr>
</tbody>
      </table>
      {showPopup && (
        <div className="large-popup">
          <div className="large-popup-content">
            <h2>Task Description</h2>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              rows="8"
            />
            <div className="popup-buttons">
              <button onClick={handleSubmitPopup}>Submit</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timesheets;


