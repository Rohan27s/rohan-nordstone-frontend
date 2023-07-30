import React, { useState } from 'react';
import Login from './Login';
import './App.css';
import Notification from './Notification';
import Text from './Text';
import Calculator from './Calculator';
import ImageUpload from './ImageUpload';

const LoginScreen: React.FC = () => <Login />;
const NotificationScreen: React.FC = () => <Notification />;
const PhotoScreen: React.FC = () => <ImageUpload />;
const TextScreen: React.FC = () => <Text />;
const CalculatorScreen: React.FC = () => <Calculator />;

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<LoginScreen />);

  const handleComponentChange = (component: React.ReactNode) => {
    setSelectedComponent(component);
  };

  return (
    <div className="App">
      <nav className='navbar'>
        <li onClick={() => handleComponentChange(<LoginScreen />)}>Login/Sign Up</li>
        <li onClick={() => handleComponentChange(<NotificationScreen />)}>Notification Screen</li>
        <li onClick={() => handleComponentChange(<PhotoScreen />)}>Photo Screen</li>
        <li onClick={() => handleComponentChange(<TextScreen />)}>Text Screen</li>
        <li onClick={() => handleComponentChange(<CalculatorScreen />)}>Calculator Screen</li>
      </nav>
      <div className="main">
        {selectedComponent}
      </div>
    </div>
  );
};

export default App;
