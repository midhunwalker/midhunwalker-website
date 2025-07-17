import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
);

const UserGrowth = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user-growth');
        const data = res.data;

        setChartData({
          labels: data.labels,
          datasets: [{
            label: 'User Growth',
            data: data.values,
            fill: true,
            borderColor: 'rgb(74, 222, 128)',
            backgroundColor: 'rgba(74, 222, 128, 0.2)',
            tension: 0.3,
          }]
        });
      } catch (err) {
        console.error('Failed to fetch user growth data:', err);
      }
    };

    fetchData();
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
        text: 'User Growth Over the Last 7 Days',
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
      <h2 className="text-lg text-white font-semibold mb-4">User Growth</h2>
      <div className="h-64">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGrowth;
