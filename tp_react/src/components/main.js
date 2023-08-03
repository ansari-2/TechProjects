// Timesheets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timesheets.css'; // Import the CSS file for styling

const Timesheets = () => {
  const [employees, setEmployees] = useState([]);
  const [timesheetData, setTimesheetData] = useState([]);
  const [weekDates, setWeekDates] = useState([]);

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

  return (
    <div className="timesheets-container">
      <div className="week-bar">
      </div>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th><select
        >
          <option value="" class='text'>Project Code</option>
          <option value="PR5">PR1</option>
          <option value="PR4">PR2</option>
          <option value="PR3">PR3</option>
        </select></th>
            {weekDates.map((date) => (
              <th key={date.toISOString()}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                <br />
                {date.getDate()}
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
                      value={timesheetData.find((entry) => entry.employee === employee.id)?.[date.toISOString()]?.hours || ''}
                      onChange={(e) => handleInputChange(e, employee.id, date.toISOString())}
                    />
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheets;