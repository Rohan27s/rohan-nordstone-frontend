import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FiBell } from 'react-icons/fi'; // Import the FiBell icon
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

type Props = {};

const Notification: React.FC<Props> = () => {
  const handleButtonClick = () => {
    toast('Here is the Notification!', {
      type: 'info',
      position: 'top-center',
    });
  };

  return (
    <div className="notification-container">      
      {/* Add the FiBell icon before the button text */}
      <button onClick={handleButtonClick} className="red-big-button">
        <FiBell /> PRESS ME
      </button>
      <ToastContainer />
    </div>
  );
};

export default Notification;
