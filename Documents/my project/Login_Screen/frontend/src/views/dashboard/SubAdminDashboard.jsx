import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubAdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    tasks: 0,
    screenshots: 0,
    wallet: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todosRes, postsRes, cartsRes] = await Promise.all([
          axios.get('https://dummyjson.com/todos'),
          axios.get('https://dummyjson.com/posts'),
          axios.get('https://dummyjson.com/carts'),
        ]);

        setMetrics({
          tasks: todosRes.data.total,
          screenshots: postsRes.data.total,
          wallet: cartsRes.data.total,
        });
      } catch (err) {
        console.error('Sub Admin data fetch failed:', err);
      }
    };

    fetchData();
  }, []);

  const items = [
    { label: 'Assigned Tasks', value: metrics.tasks },
    { label: 'Reviewed Screenshots', value: metrics.screenshots },
    { label: 'Wallet Actions', value: metrics.wallet },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sub Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-gray-800 shadow rounded-xl p-4">
            <p className="text-white">{item.label}</p>
            <p className="text-xl text-green-500 font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-white">Screenshot Verification</h2>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Start Verifying
          </button>
        </div>
        <div className="bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-white">Assign New Task</h2>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
