import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/accounts/signup/', { username, email, password });
      login(res.data.token, res.data.user);
      navigate('/products');
    } catch (err) {
      const msg = err?.response?.data?.detail || 
                  (err?.response?.data && typeof err.response.data === 'object'
                    ? Object.values(err.response.data).flat().join(' ')
                    : 'Signup failed');
      setError(msg);
      alert(msg); // Help user see exactly why it failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-gray-50 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-8">Join Bare & Bold today and start shopping!</p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            />
          </div>

          <div className="text-xs text-gray-500 mt-2">
            By signing up, you agree to our <span className="text-orange-600 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-orange-600 cursor-pointer hover:underline">Privacy Policy</span>.
          </div>

          {error ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          ) : null}

          <button
            disabled={loading}
            className="w-full bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-700 transition shadow-md mt-4"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp