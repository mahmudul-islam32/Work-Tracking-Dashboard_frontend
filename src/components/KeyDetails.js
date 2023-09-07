import React from "react";
import { useState } from "react";

export const KeyDetails = ({
  calculateIncomeTax,
  calculateNetSalary,
  calculateSocialTax,
  calculateTotalEarnings,
  handleDeleteAllSalaries,
  calculateTotalWorkedHours,
  salaries,
  //selectedMonthSalaries,
  selectedMonth,
  // handleFilterChange,
  selectedYear,
  filteredSalaries,
  handleMonthChange,
  handleYearChange,
  calculateTotalWorkedDays,
}) => {
  // Calculate totals for the whole year
  const calculateTotalEarningsYear = () => {
    const filteredYearSalaries = salaries.filter((salary) => {
      const salaryDate = new Date(salary.date);
      return salaryDate.getFullYear() === selectedYear;
    });
    return calculateTotalEarnings(filteredYearSalaries);
  };

  const calculateTotalWorkedHoursYear = () => {
    const filteredYearSalaries = salaries.filter((salary) => {
      const salaryDate = new Date(salary.date);
      return salaryDate.getFullYear() === selectedYear;
    });
    return calculateTotalWorkedHours(filteredYearSalaries);
  };

  const calculateTotalWorkedDaysYear = () => {
    const filteredYearSalaries = salaries.filter((salary) => {
      const salaryDate = new Date(salary.date);
      return salaryDate.getFullYear() === selectedYear;
    });
    return calculateTotalWorkedDays(filteredYearSalaries);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="col-md-3 mr-2">
        <h3 className="title">Details By {monthNames[selectedMonth]}</h3>
        <p>Earnings: ${calculateNetSalary().toFixed(2)}</p>
        <p>Worked Days: {calculateTotalWorkedDays(filteredSalaries)}</p>
        <p>
          Working Hours: {calculateTotalWorkedHours(filteredSalaries)} hours
        </p>
      </div>

      <div className="col-md-3 mr-2">
        <h3 className="title">Filter Your Earnings</h3>
        <div>
          <label htmlFor="month" className="form-label">
            Select Month:
          </label>
          <select
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="form-select"
          >
            <option value={null}>All</option>
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>
        </div>
        <div className="year-select">
          <label htmlFor="year" className="form-label">
            Select Year:
          </label>
          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="form-select"
          >
            <option value={null}>All</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            {/* Add more years as needed */}
          </select>
        </div>
      </div>

      <div className="col-md-3 mr-2">
        <h3 className="title">Details By {selectedYear}</h3>
        <p>Earnings: ${calculateTotalEarningsYear()}</p>
        <p>Worked Days: {calculateTotalWorkedDaysYear()}</p>
        <p>Working Hours: {calculateTotalWorkedHoursYear()} hours</p>
      </div>

      <div className="col-md-3">
        <h3 className="title">Want to Reset?</h3>
        <button className="btn btn-danger" onClick={handleDeleteAllSalaries}>
          Reset Dashboard
        </button>
      </div>
    </>
  );
};
