import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setError(null);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/', // API endpoint for login
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // After successful login, store the access token
      const token = response.data.access;
      localStorage.setItem('access_token', token);  // Save the token in localStorage

      // Redirect to the home page (or wherever you want)
      navigate('/');  // Redirect to the homepage after successful login

    } catch (error) {
      console.error('Error logging in', error);
      // Set an error message for invalid login or any server issues
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="login-form p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
          />
        </div>

        {/* Display error if any */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Login
        </button>
      </form>

      {/* Optional: Add a redirect to a signup page if the user is new */}
      <div className="mt-4 text-center">
        <p>New user? <a href="/signup" className="text-blue-500">Create an account</a></p>
      </div>
    </div>
  );
};

export default LoginPage;

