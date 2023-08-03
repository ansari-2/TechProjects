import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timesheets.css'; // Import the CSS file for styling

const Timesheets = () => {
  const [employees, setEmployees] = useState([]);
  const [timesheetData, setTimesheetData] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [currentEmployee, setCurrentEmployee] = useState(null); // Store the current employee for whom popup is open
  const [currentDay, setCurrentDay] = useState(null); // Store the current day for which popup is open
  const [taskDescription, setTaskDescription] = useState(''); // Store the task description

  useEffect(() => {
    // Fetch list of employees from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tp_employee/timesheets');
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

  const handleInputChange = (event, employeeId, day) => {
    const { name, value } = event.target;

    const timesheetIndex = timesheetData.findIndex((entry) => entry.employee === employeeId);

    if (timesheetIndex === -1) {
      setTimesheetData((prevTimesheetData) => [
        ...prevTimesheetData,
        {
          employee: employeeId,
          [day]: {
            [name]: value,
          },
        },
      ]);
    } else {
      setTimesheetData((prevTimesheetData) => [
        ...prevTimesheetData.slice(0, timesheetIndex),
        {
          ...prevTimesheetData[timesheetIndex],
          [day]: {
            ...prevTimesheetData[timesheetIndex][day],
            [name]: value,
          },
        },
        ...prevTimesheetData.slice(timesheetIndex + 1),
      ]);
    }
  };

  

  const handleCheckboxChange = (employeeId, day) => {
    // Toggle the popup visibility
    setShowPopup(!showPopup);
  
    if (showPopup) {
      // If the popup is being closed (checkbox is unchecked), clear task description
      setTaskDescription('');
    } else {
      // If the popup is being opened (checkbox is checked), store the current employee and day
      setCurrentEmployee(employeeId);
      setCurrentDay(day);
    }
  };
  
  

  const handleSubmitPopup = () => {
    if (currentEmployee && currentDay && taskDescription) {
      const updatedTimesheetData = timesheetData.map((entry) => {
        if (entry.employee === currentEmployee) {
          return {
            ...entry,
            [currentDay]: {
              ...entry[currentDay],
              description: taskDescription,
            },
          };
        }
        return entry;
      });
  
      // Update timesheetData with new data
      setTimesheetData(updatedTimesheetData);
  
      // Prepare the data for API submission
      const dataToSubmit = {
        employee: currentEmployee,
        date: currentDay,
        hours: timesheetData.find((entry) => entry.employee === currentEmployee)?.[currentDay]?.hours || '',
        projectCode: 'Selected Project Code', // Replace with the actual selected project code
        taskDescription,
      };
  
      // Send the data to the backend API
      axios.post('http://localhost:8000/tp_employee/timesheets/', dataToSubmit)
        .then((response) => {
          console.log('Data submitted successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
        });
    }
  
    // Clear popup related states
    setShowPopup(false);
    setCurrentEmployee(null);
    setCurrentDay(null);
    setTaskDescription('');
  };
  

  return (
    <div className="timesheets-container">
      <div className="week-bar">
      </div>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>
              <select>
                <option value="" className="text">Project Code</option>
                <option value="PR5">PR1</option>
                <option value="PR4">PR2</option>
                <option value="PR3">PR3</option>
              </select>
            </th>
            {weekDates.map((date) => (
              <th key={date.toISOString()}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                <br />
                {date.toLocaleDateString('en-US', { month: 'short' })}-{date.getDate()} {/* Display month */}
                <br />
                
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr>
                <td>Hours</td>
                {weekDates.map((date) => (
                  <td key={date.toISOString()}>
                    <input
                      type="number"
                      name="hours"
                      className="timesheet-input"
                      max={8}
                      min={0}
                      value={timesheetData.find((entry) => entry.employee === employee.id)?.[date.toISOString()]?.hours || ''}
                      onChange={(e) => handleInputChange(e, employee.id, date.toISOString())}
                    />
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      onClick={() => handleCheckboxChange(employee.id, date.toISOString())}
                    />
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
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