import React from 'react';

export const Admin_Dashboard = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Admin Dashboard</h1>
      <p>Here you can manage the system and view reports.</p>
      {/* Add admin-specific functionality here */}
      <button style={{ padding: '10px', marginTop: '20px' }}>Logout</button>
    </div>
  );
};
