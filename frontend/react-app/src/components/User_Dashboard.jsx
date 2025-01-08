import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const User_Dashboard = () => {
  const location = useLocation();
  const name = location.state?.name; // Retrieve the email passed as state
  const navigate = useNavigate();

  const onLogout =()=>{
    navigate('/');
  }
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div>
        use
      </div>
      <h1>Welcome to User Dashboard</h1>
      {name && <p>Hello, {name}</p>}
      <p>Here you can view your profile, activities, and more.</p>
      {/* Add user-specific functionality here */}
      <button style={{ padding: '10px', marginTop: '20px' } }onClick={onLogout}>Logout</button>
    </div>
  );
};
