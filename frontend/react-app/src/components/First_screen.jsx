import React, { useState } from 'react';
import { Login } from './Login';
import { Signup } from './Signup';

export const First_screen = () => {
  const [activeForm, setActiveForm] = useState("Login");

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div>
        <button
          onClick={() => setActiveForm("Login")}
          style={{
            padding: '10px 20px',
            margin: '5px',
            background: activeForm === "Login" ? 'blue' : 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Login
        </button>
        <button
          onClick={() => setActiveForm("Signup")}
          style={{
            padding: '10px 20px',
            margin: '5px',
            background: activeForm === "Signup" ? 'blue' : 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Signup
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {activeForm === "Login" && <Login />}
        {activeForm === "Signup" && <Signup />}
      </div>
    </div>
  );
};
