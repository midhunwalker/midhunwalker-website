import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 👉 Handles form submission for sending password reset email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      // ✅ If successful
      setMessage('A password reset link has been sent to your email.');
    } catch (err) {
      // 🔥 Specific error if user not found
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else {
        setError(err.message || 'Failed to send reset email.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 to-blue-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl border border-blue-500">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="mt-2 text-blue-200">Enter your email to receive a reset link</p>
        </div>

        {/* ✅ Success message */}
        {message && <div className="bg-green-600 text-white p-3 rounded">{message}</div>}

        {/* ❌ Error message */}
        {error && <div className="bg-red-600 text-white p-3 rounded">{error}</div>}

        {/* 🔐 Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white placeholder-blue-300"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* 🔘 Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
