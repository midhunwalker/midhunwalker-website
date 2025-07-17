import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminActivity = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin-activity');
        setChartData(res.data);
      } catch (err) {
        console.error('Failed to fetch activity data:', err);
      }
    };

    fetchActivity();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#E5E7EB' } 
      },
      title: {
        display: true,
        text: 'Admin Actions',
        color: '#E5E7EB'
      },
    },
    scales: {
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(229, 231, 235, 0.1)' }
      },
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(229, 231, 235, 0.1)' }
      }
    }
  };

  return (
    <div className="bg-gray-800 shadow rounded-xl p-6">
      <h2 className="text-lg text-white font-semibold mb-4">Sub-admin Activity</h2>
      <div className="h-64">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivity;
