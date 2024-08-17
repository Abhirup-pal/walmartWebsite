import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.key);
      navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.username) {
          console.error('Username error:', errorData.username);
          alert(`Username error: ${errorData.username.join(', ')}`);
        }

        if (errorData.email) {
          console.error('Email error:', errorData.email);
          alert(`Email error: ${errorData.email.join(', ')}`);
        }

        if (errorData.password1) {
          console.error('Password error:', errorData.password1);
          alert(`Password error: ${errorData.password1.join(', ')}`);
        }

        if (errorData.non_field_errors) {
          console.error('Non-field errors:', errorData.non_field_errors);
          alert(`Error: ${errorData.non_field_errors.join(', ')}`);
        }
      } else {
        console.error('Sign-up failed:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg my-10">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
