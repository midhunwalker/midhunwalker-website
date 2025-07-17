import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService'; 
import SubAdminDashboard from './SubAdminDashboard'; 
import SuperAdminDashboard from './SuperAdminDashboard'; 
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../../hooks/useAuth'; 

const Dashboard = () => {
  const navigate = useNavigate();

  // Get the current user info, loading status, and error from the custom hook
  const { user, loading, error } = useAuth();

  // Normalize the user's role to lowercase to avoid case sensitivity issues
  const role = user?.role?.toLowerCase();

  // Booleans to check if the logged-in user is super_admin or sub_admin
  const isSuperAdmin = role === 'super_admin';
  const isSubAdmin = role === 'sub_admin';

  // Use this for displaying the role name in UI
  const roleDisplay = isSuperAdmin ? 'Super Admin' : isSubAdmin ? 'Sub Admin' : null;

  // Redirect to login if user is not logged in after loading
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Handle logout and redirect to login page
  const handleLogout = async () => {
    try {
      await logout();        // Call Firebase signOut
      navigate('/login');    // Navigate back to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // If still loading the user, show a full screen spinner
  if (loading) return <LoadingSpinner fullScreen />;

  // If there’s an error in auth, show it
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            {/* Show "Super Admin Dashboard" or "Sub Admin Dashboard" or default "Dashboard" */}
            <h1 className="text-2xl font-bold text-white">
              {roleDisplay ? `${roleDisplay} Dashboard` : 'Dashboard'}
            </h1>

            {/* Greet the user with their role or default */}
            <p className="text-gray-300 text-sm mt-1">
              Welcome back, {roleDisplay || 'Admin'}
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            {/* Logout icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="flex-1 bg-gradient-to-br from-gray-700 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6">
            {/* Show Super Admin Dashboard or Sub Admin Dashboard or access error */}
            {isSuperAdmin ? (
              <SuperAdminDashboard />
            ) : isSubAdmin ? (
              <SubAdminDashboard />
            ) : (
              <p className="text-red-500 font-medium">Access denied: Unknown role.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center text-sm">
        © 2025 Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
