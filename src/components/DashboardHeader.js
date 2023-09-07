import React from "react";

export const DashboardHeader = ({ user, onLogout }) => {
  return (
    <div className="container dashboard-header">
      <div className="row">
        <div className="col-md-6">
          <p className="welcome-text mb-0">
            Welcome, {user.username}! Now you can save your work details 😀
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
