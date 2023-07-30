import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import the CSS file

type Props = {};

const Notification: React.FC<Props> = () => {
  const handleButtonClick = () => {
    toast('Here is the Notification!', {
      type: 'info',
      position: 'top-center', // Set the notification position to top-center
    });
  };

  return (
    <div className="notification-container">      
      <button onClick={handleButtonClick} className="red-big-button">
        PRESS ME
      </button>
      <ToastContainer />
    </div>
  );
};

export default Notification;
