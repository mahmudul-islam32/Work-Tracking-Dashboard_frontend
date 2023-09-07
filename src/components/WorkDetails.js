import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'; 

export const WorkDetails = ({ salaries, handleDeleteSalary }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Calculate the total number of pages based on the number of entries and items per page
  const totalPages = Math.ceil(salaries.length / itemsPerPage);

  // Filter salaries by month
  const filteredSalaries = salaries.filter((salary) => {
    if (selectedMonth === "All") return true;

    const salaryMonth = new Date(salary.date).getMonth() + 1;
    return salaryMonth.toString() === selectedMonth;
  });

  // Calculate the visible salaries based on the current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleSalaries = filteredSalaries.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle month filter change
  const handleMonthFilterChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing the filter
  };

  useEffect(() => {
    // Scroll to the top of the component when the page changes
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="salaries-section col-md-6">
      <h3 className="title">All Your Entries</h3>
      {/* Month filter */}
      {/* Month filter */}
      <div className="mb-3">
        <label htmlFor="monthFilter" className="form-label">
          Filter by Month:
        </label>
        <select
          id="monthFilter"
          className="form-select"
          value={selectedMonth}
          onChange={handleMonthFilterChange}
        >
          <option value="All">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Salary Table */}
      <table className="table salary-details">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Earnings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleSalaries.map((salary) => (
            <tr key={salary._id}>
              <td>{new Date(salary.date).toDateString()}</td>
              <td>{salary.hoursWorked}</td>
              <td>${(salary.hoursWorked * salary.hourlyRate).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteSalary(salary._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {/* Pagination */}
      {/* Pagination */}
      {filteredSalaries.length > 4 && (
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
