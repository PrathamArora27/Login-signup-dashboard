import React from 'react';

export const User_Dashboard = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to User Dashboard</h1>
      <p>Here you can view your profile, activities, and more.</p>
      {/* Add user-specific functionality here */}
      <button style={{ padding: '10px', marginTop: '20px' }}>Logout</button>
    </div>
  );
};
