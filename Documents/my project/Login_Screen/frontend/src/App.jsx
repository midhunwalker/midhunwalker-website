import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/auth/Login';
import  Dashboard  from './views/dashboard/Dashboard';
import ForgotPassword from './views/auth/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={(user) => {
          window.location.href = `/${user.role}/dashboard`;
        }} />} />
        <Route path="/super_admin/dashboard" element={<Dashboard />} />
        <Route path="/sub_admin/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;