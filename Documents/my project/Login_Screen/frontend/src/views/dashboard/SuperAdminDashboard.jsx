import React from 'react';
import Metrics from '../components/MetricsCards';
import UserGrowth from '../components/UserGrowth';
import CampaignTrends from '../components/CampaignTrends';
import AdminActivity from '../components/AdminActivity';

const SuperAdminDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-700 to-blue-100 min-h-screen">
      <Metrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowth />
        <CampaignTrends />
        <div className="lg:col-span-2">
          <AdminActivity />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;