import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../../firebaseConfig';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      // Send token to backend for verification
      const response = await axios.post(
        'http://localhost:5000/api/auth/firebase-login',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userData = response.data?.user || { email: user.email };
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem('user', JSON.stringify(userData));
      storage.setItem('token', token);

      onLoginSuccess?.(userData); // safer: optional chaining
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 to-blue-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl border border-blue-500">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-blue-200">Enter your details</p>
        </div>

        {error && (
          <div className="p-3 text-white bg-red-600 rounded-lg text-sm animate-pulse">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white placeholder-blue-300"
              placeholder="you@company.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-blue-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white placeholder-blue-300 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-blue-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-blue-400" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRememberMe((prev) => !prev)}
                className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  rememberMe ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                    rememberMe ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <label
                className="ml-2 block text-sm text-blue-300 cursor-pointer"
                onClick={() => setRememberMe((prev) => !prev)}
              >
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-300 hover:text-blue-100 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
