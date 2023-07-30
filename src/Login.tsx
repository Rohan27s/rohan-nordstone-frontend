import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { auth, firestore } from './firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface LoginProps {
  onLoginSuccess: () => void;
  isLoggedIn: boolean;
}
const Login: React.FC<LoginProps> = ({ onLoginSuccess, isLoggedIn }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showStrongPasswordMessage, setShowStrongPasswordMessage] = useState(false);
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);

      toast.success('Login successful!', { position: 'top-center' });
      onLoginSuccess();

    } catch (error) {
      toast.error('Error logging in:' + error, { position: 'top-center' });

    }
  };
  const handleRegister = async () => {
    if (!isStrongPassword(password)) {
      setShowStrongPasswordMessage(true);
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(userCredential.user?.uid).set({
        email: email,
      });
      setShowStrongPasswordMessage(false);
      toast.success('Registration successful!', { position: 'top-center' });
    } catch (error) {
      toast.error('Error registering:' + error, { position: 'top-center' });

    }
  };

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      toast.info('Password reset email sent.', { position: 'top-center' });

    } catch (error) {
      toast.error('Error sending password reset email:' + error, { position: 'top-center' });
    }
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
    <>
      <ToastContainer />
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
    </>
  );
};

export default Login;
