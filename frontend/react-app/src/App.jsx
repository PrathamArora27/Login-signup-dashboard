import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { First_screen } from './components/First_screen';
import { User_Dashboard } from './components/User_Dashboard';
import { Admin_Dashboard } from './components/Admin_Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<First_screen />} />
      <Route path="/user-dashboard" element={<User_Dashboard />} />
      <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
    </Routes>
  );
}

export default App;
