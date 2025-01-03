import React, { useState } from 'react';

export const Signup = () => {
  // Setting up state for the form data and error
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    console.log('Form Data to be sent:', formData);

    // Clear any existing error
    setError('');

    // Send the signup data to the backend
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Signup Successful:', result);
        // Handle further actions after successful signup (e.g., redirect to login)
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
          });
          
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Error during signup. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '8px' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"  // Dynamically bind to formData.email
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"  // Dynamically bind to formData.password
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"  // Dynamically bind to formData.confirmPassword
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', background: 'green', color: 'white', border: 'none' }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
