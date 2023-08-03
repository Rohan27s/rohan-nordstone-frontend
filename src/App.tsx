import React, { useState, useEffect } from 'react';
import Login from './Login';
import './App.css';
import Notification from './Notification';
import Text from './Text';
import Calculator from './Calculator';
import ImageUpload from './ImageUpload';
import { FiUser, FiBell, FiImage, FiEdit, FiTrello,FiLogOut } from 'react-icons/fi';
import { auth } from './firebase';

// Define a new type that includes the props required for LoginScreen component
type LoginScreenProps = {
  onLoginSuccess: () => void;
  isLoggedIn: boolean;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, isLoggedIn }) => (
  <Login onLoginSuccess={onLoginSuccess} isLoggedIn={isLoggedIn} />
);

const NotificationScreen: React.FC = () => <Notification />;
const PhotoScreen: React.FC = () => <ImageUpload />;
const TextScreen: React.FC = () => <Text />;
const CalculatorScreen: React.FC = () => <Calculator />;

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeNavItem, setActiveNavItem] = useState<string>(''); // New state for the active navigation item

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveNavItem('notification'); // Set the active item to 'notification' when the user logs in
  };

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        handleLoginSuccess();
      }
    });

    // Unsubscribe from the auth state listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleComponentChange = (component: string) => {
    setActiveNavItem(component); // Update the active navigation item when a new component is selected
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveNavItem('login'); // Set the active item to 'login' when the user logs out
  };

  return (
    <div className="App">
      <nav className='navbar'>
        <ul>
          {isLoggedIn && (
            <>
              <li
                className={activeNavItem === 'notification' ? 'active' : ''}
                onClick={() => handleComponentChange('notification')}
              >
                <FiBell />
                Notification 
              </li>
              <li
                className={activeNavItem === 'photo' ? 'active' : ''}
                onClick={() => handleComponentChange('photo')}
              >
                <FiImage />
                Upload Photo
              </li>
              <li
                className={activeNavItem === 'text' ? 'active' : ''}
                onClick={() => handleComponentChange('text')}
              >
                <FiEdit />
                Upload Text
              </li>
              <li
                className={activeNavItem === 'calculator' ? 'active' : ''}
                onClick={() => handleComponentChange('calculator')}
              >
                <FiTrello />
                Calculator
              </li>
            </>
          )}
          <li
            className={'login-icon'}
            onClick={isLoggedIn ? handleLogout : () => handleComponentChange('login')}
          >
            {isLoggedIn ? <><FiLogOut/>Logout</> : <>
              <FiUser />
              Login/Sign Up
            </>}
          </li>
        </ul>
      </nav>
      <div className="main">
        {isLoggedIn ? (
          // Render the selected component based on the activeNavItem
          <>
            {activeNavItem === 'notification' && <NotificationScreen />}
            {activeNavItem === 'photo' && <PhotoScreen />}
            {activeNavItem === 'text' && <TextScreen />}
            {activeNavItem === 'calculator' && <CalculatorScreen />}
          </>
        ) : (
          // If not logged in, render the LoginScreen
          <LoginScreen onLoginSuccess={handleLoginSuccess} isLoggedIn={false} />
        )}
      </div>
    </div>
  );
};

export default App;
