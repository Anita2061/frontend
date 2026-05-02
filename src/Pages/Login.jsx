import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleCheckout = async () => {
  const token = localStorage.getItem('access_token'); 
  const res = await fetch('http://127.0.0.1:8000/api/orders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(yourOrderData)
  });
  
  const data = await res.json();
  console.log(data);
};

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/accounts/login/', { email, password });
      login(res.data.token, res.data.user);
      navigate('/products');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Please enter your details to login</p>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-orange-600" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-orange-600 font-semibold hover:underline">Forgot password?</a>
          </div>

          {error ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          ) : null}

          <button
            disabled={loading}
            className="w-full bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-700 transition shadow-md"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
    

        <p className="text-center text-gray-600 mt-8">
          Don't have an account?
          <Link to="/signup" className="text-orange-600 font-bold hover:underline ml-1">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;