import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showStrongPasswordMessage, setShowStrongPasswordMessage] = useState(false);
  const handleLogin = () => {
    // Handle login functionality
  };

  const handleRegister = () => {
    // Check if the password is strong enough before proceeding with registration
    if (!isStrongPassword(password)) {
      setShowStrongPasswordMessage(true);
      return;
    }

    // Handle registration functionality
    setShowStrongPasswordMessage(false);
    // ... Code to handle registration
  };

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    console.log('Forgot Password: ', email);
  };

  const toggleToLogin = () => {
    setMode('login');
  };

  const toggleToRegister = () => {
    setMode('register');
  };

  const toggleToForgotPassword = () => {
    setMode('forgotPassword');
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isStrongPassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
  };
  
  return (
    <div className="auth-container">
      {mode === 'login' ? (
        <>
          <h2>Login</h2>
          {/* <div > */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password-btn" onClick={toggleShowPassword}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account? <span className="link" onClick={toggleToRegister}>Register</span>
          </p>
          <p>
            <span className="link" onClick={toggleToForgotPassword}>Forgot Password?</span>
          </p>
        </>
      ) : mode === 'register' ? (
        <>
          <h2>Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password-btn" onClick={toggleShowPassword}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {showStrongPasswordMessage && (
            <p className="password-strength-message">Password should be at least 8 characters long and contain a mix of uppercase letters, lowercase letters, and numbers.</p>
          )}
          <button onClick={handleRegister} >Register</button>
          <p>
            Already have an account? <span className="link" onClick={toggleToLogin}>Login</span>
          </p>
        </>

      ) : (
        <>
          <h2>Forgot Password</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleForgotPassword} className='link'>Reset Password</button>
          <p>
            Remembered your password? <span className='link' onClick={toggleToLogin}>Login</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
