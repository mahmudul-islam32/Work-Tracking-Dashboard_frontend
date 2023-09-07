import React from 'react';

export const RegistrationForm = ({
  username,
  password,
  message,
  setUsername,
  setPassword,
  handleRegistration,
  setRegistrationMode,
}) => {
  return (
    <div className="container register-container">
      <div className="row">
        <div className="col-md-6">
          <div className="registration-form">
            {/* Registration Form */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary register-button"
              onClick={handleRegistration}
            >
              Register
            </button>
            <button
              className="btn btn-secondary cancel-button"
              onClick={() => setRegistrationMode(false)}
            >
              Cancel
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
