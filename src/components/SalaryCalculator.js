// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoginForm } from "./LoginForm";
import { DashboardHeader } from "./DashboardHeader";
import { RegistrationForm } from "./RegistrationForm";
import { KeyDetails } from "./KeyDetails";
import { WorkAdd } from "./WorkAdd";
import { WorkDetails } from "./WorkDetails";
import { MessageDisplay } from "./MessageDisplay";

const SalaryCalculator = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [salaries, setSalaries] = useState([]);
  const [newSalary, setNewSalary] = useState({
    date: "",
    hoursWorked: 0,
    hourlyRate: 0,
    employmentType: null,
  });
  const [registrationMode, setRegistrationMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  //Frontend States

  const [employmentType, setEmploymentType] = useState("fullTime");
  const [socialTaxRate, setSocialTaxRate] = useState(0);
  const [incomeTaxRate, setIncomeTaxRate] = useState(0);

  const maxHours = employmentType === "fullTime" ? 200 : 100;

  useEffect(() => {
    // Check if the user is already authenticated
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
      fetchSalaries(storedToken);
    }
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const closeMessage = () => {
    setMessage("");
    setMessageType("");
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        "https://work-tracking-backend.onrender.com/api/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchSalaries = async (token) => {
    try {
      const response = await axios.get(
        "https://work-tracking-backend.onrender.com/api/salaries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalaries(response.data);
    } catch (error) {
      console.error("Error fetching salaries:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://work-tracking-backend.onrender.com/api/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      setToken(token);
      setUsername("");
      setPassword("");
      localStorage.setItem("token", token);
      fetchUserData(token);
      fetchSalaries(token);
      setMessage("Login successful.");
      setMessageType("success");
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
      setMessageType("error");
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        "https://work-tracking-backend.onrender.com/api/register",
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      setToken(token);
      setUsername("");
      setPassword("");
      localStorage.setItem("token", token);
      fetchUserData(token);
      fetchSalaries(token);
      setMessage("Registration successful. Please Go to Login Page for Log in");
      setMessageType("success");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      setMessageType("error");
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    setSalaries([]);
    localStorage.removeItem("token");
    setMessage("Logged out successfully.");
    setMessageType("success");
  };

  const handleAddSalary = async () => {
    try {
      if (
        !newSalary.date ||
        newSalary.hoursWorked <= 0 ||
        newSalary.hourlyRate <= 0
      ) {
        setMessage("Please fill in all required fields.");
        return;
      }
      await axios.post(
        "https://work-tracking-backend.onrender.com/api/salaries",
        { ...newSalary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalaries([...salaries, newSalary]);
      setNewSalary({
        date: "",
        hoursWorked: 0,
        hourlyRate: 0,
      });
      fetchSalaries(token);
      setMessage("Salary entry added successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage("Error adding salary entry. Please try again.");
      setMessageType("error");
    }
  };

  const handleDeleteSalary = async (salaryId) => {
    try {
      await axios.delete(
        `https://work-tracking-backend.onrender.com/api/salaries/${salaryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSalaries(token);
      setMessage("Salary entry deleted successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage("Error deleting salary entry. Please try again.");
      setMessageType("error");
    }
  };

  const handleDeleteAllSalaries = async () => {
    try {
      await axios.delete(
        "https://work-tracking-backend.onrender.com/api/salaries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSalaries(token); // Fetch salaries again to update the UI
      setMessage("All salary entries deleted successfully");
      setMessageType("success");
    } catch (error) {
      setMessage("Error deleting salary entries. Please try again.");
      setMessageType("error");
    }
  };
  /*
  const calculateNetSalary = () => {
    const totalEarnings = salaries.reduce(
      (total, salary) => total + salary.hoursWorked * salary.hourlyRate,
      0
    );
    // Assuming 10% tax and 5% social deductions for full-time employees
    const tax = totalEarnings * 0.1;
    const social = totalEarnings * 0.05;
    return totalEarnings - tax - social;
  };

  */

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Get the current month (0-11)
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  useEffect(() => {
    // Filter salaries when selectedMonth or selectedYear changes
    if (selectedMonth !== null && selectedYear !== null) {
      const filtered = salaries.filter((salary) => {
        const salaryDate = new Date(salary.date);
        return (
          salaryDate.getMonth() === selectedMonth &&
          salaryDate.getFullYear() === selectedYear
        );
      });
      setFilteredSalaries(filtered);
    }
  }, [selectedMonth, selectedYear, salaries]);

  const calculateTotalEarnings = (selectedSalaries) => {
    return selectedSalaries.reduce(
      (total, log) => total + log.hoursWorked * log.hourlyRate,
      0
    );
  };

  const calculateTotalWorkedHours = (selectedSalaries) => {
    return selectedSalaries.reduce((total, log) => total + log.hoursWorked, 0);
  };

  const calculateTotalWorkedDays = (selectedSalaries) => {
    return selectedSalaries.length;
  };

  const calculateSocialTax = () => {
    if (newSalary.employmentType === "fullTime") {
      return (
        calculateTotalEarnings(filteredSalaries) *
        (socialTaxRate / 100)
      ).toFixed(2);
    }
    return 0;
  };

  const calculateIncomeTax = () => {
    if (newSalary.employmentType === "fullTime") {
      return (
        calculateTotalEarnings(filteredSalaries) *
        (incomeTaxRate / 100)
      ).toFixed(2);
    }
    return 0;
  };

  const calculateNetSalary = () => {
    const totalEarnings = calculateTotalEarnings(filteredSalaries);
    const socialTax = calculateSocialTax();
    const incomeTax = calculateIncomeTax();
    return totalEarnings - socialTax - incomeTax;
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };
  return (
    <div className="main">
      <MessageDisplay
        message={message}
        messageType={messageType}
        closeMessage={closeMessage}
      />
      {/* User Authentication and Registration */}
      {user ? (
        <>
          <DashboardHeader
            user={user}
            username={username}
            onLogout={handleLogout}
          />
        </>
      ) : registrationMode ? (
        <RegistrationForm
          username={username}
          password={password}
          message={message}
          setUsername={setUsername}
          setPassword={setPassword}
          setRegistrationMode={setRegistrationMode}
          handleRegistration={handleRegistration}
        />
      ) : (
        <LoginForm
          username={username}
          password={password}
          message={message}
          setUsername={setUsername}
          setPassword={setPassword}
          setRegistrationMode={setRegistrationMode}
          handleLogin={handleLogin}
        />
      )}

      {/* Dashboard Sections */}
      {user && (
        <>
          <div className="container key-details">
            <div className="row">
              <KeyDetails
                calculateIncomeTax={calculateIncomeTax}
                calculateNetSalary={calculateNetSalary}
                calculateSocialTax={calculateSocialTax}
                calculateTotalEarnings={calculateTotalEarnings}
                calculateTotalWorkedHours={calculateTotalWorkedHours}
                handleDeleteAllSalaries={handleDeleteAllSalaries}
                salaries={salaries}
                // selectedMonthSalaries={selectedMonthSalaries}
                selectedMonth={selectedMonth}
                //  handleFilterChange={handleFilterChange}
                selectedYear={selectedYear}
                filteredSalaries={filteredSalaries}
                handleMonthChange={handleMonthChange}
                handleYearChange={handleYearChange}
                calculateTotalWorkedDays={calculateTotalWorkedDays}
              />
            </div>
          </div>
          <div className="container second-section">
            <div className="row">
              <WorkAdd
                newSalary={newSalary}
                setNewSalary={setNewSalary}
                handleAddSalary={handleAddSalary}
                message={message}
                socialTaxRate={socialTaxRate}
                incomeTaxRate={incomeTaxRate}
                setSocialTaxRate={setSocialTaxRate}
                setIncomeTaxRate={setIncomeTaxRate}
              />
              <WorkDetails
                salaries={salaries}
                handleDeleteSalary={handleDeleteSalary}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TaxCalculation = () => {};

export default SalaryCalculator;
