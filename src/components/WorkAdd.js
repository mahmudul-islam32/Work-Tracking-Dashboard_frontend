import React from "react";

export const WorkAdd = ({
  newSalary,
  setNewSalary,
  handleAddSalary,
  message,
  socialTaxRate,
  incomeTaxRate,
  setIncomeTaxRate,
  setSocialTaxRate,
}) => {
  return (
    <div className="col-md-6 workAdd">
      <h3 className="title">Add Your Work Details</h3>
      {/* Add Salary Form */}
      <div className="mb-3">
        <label htmlFor="employmentType" className="form-label">
          Employment Type:
        </label>
        <select
          id="employmentType"
          className="form-select"
          value={newSalary.employmentType}
          onChange={(e) =>
            setNewSalary({ ...newSalary, employmentType: e.target.value })
          }
        >
          <option value="fullTime">Full Time</option>
          <option value="partTime">Part Time</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="hoursWorked" className="form-label">
          Date:
        </label>
        <input
          type="date"
          className="form-control custom-date-input"
          value={newSalary.date}
          onChange={(e) => setNewSalary({ ...newSalary, date: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="hoursWorked" className="form-label">
          Hours Worked:
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Hours Worked"
          value={newSalary.hoursWorked}
          onChange={(e) =>
            setNewSalary({ ...newSalary, hoursWorked: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="hourlyRate" className="form-label">
          Hourly Rate:
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Hourly Rate"
          value={newSalary.hourlyRate}
          onChange={(e) =>
            setNewSalary({ ...newSalary, hourlyRate: e.target.value })
          }
        />
      </div>
      {/* <div className="mb-3">
        <label htmlFor="socialTaxRate" className="form-label">
          Social Tax Rate (%):
        </label>
        <input
          type="number"
          className="form-control"
          id="socialTaxRate"
          value={socialTaxRate}
          onChange={(e) => setSocialTaxRate(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="incomeTaxRate" className="form-label">
          Income Tax Rate (%):
        </label>
        <input
          type="number"
          className="form-control"
          id="incomeTaxRate"
          value={incomeTaxRate}
          onChange={(e) => setIncomeTaxRate(parseFloat(e.target.value))}
        />
      </div>
*/}

      <button className="btn btn-primary" onClick={handleAddSalary}>
        Add
      </button>
    </div>
  );
};
