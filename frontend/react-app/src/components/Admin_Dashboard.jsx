import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Admin_Dashboard = () => {
  const location = useLocation();
  const name = location.state?.name; // Retrieve the email passed as state
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Admin Dashboard</h1>
      {name && <p>Hello, {name}</p>} 
      <p>Here you can manage the system and view reports.</p>
      <button style={{ padding: '10px', marginTop: '20px' }} onClick={onLogout}>Logout</button>
    </div>
  );
};
