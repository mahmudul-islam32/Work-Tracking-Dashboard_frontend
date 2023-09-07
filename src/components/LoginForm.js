import React from 'react';

export const LoginForm = ({
  username,
  password,
  message,
  setUsername,
  setPassword,
  handleLogin,
  setRegistrationMode,
}) => {
  return (
    <div className="container justify-content-center align-items-center min-vh-100 logo-container">
      <div className="row">
        <div className="col-md-6">
          <div className="login-form">
            {/* Login Form */}
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
              className="btn btn-primary login-button"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="mt-3">
              Don't have an account?{' '}
              <button
                className="btn btn-link reg"
                onClick={() => setRegistrationMode(true)}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
