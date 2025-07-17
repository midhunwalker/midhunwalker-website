import React from 'react';
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
const CampaignTrends = () => {
  const [chartData, setChartData] = React.useState(null);

  React.useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        const topProducts = response.data.products
          .sort((a, b) => b.price - a.price)
          .slice(0, 5);

        setChartData({
          labels: topProducts.map(p => p.title),
          datasets: [{
            label: 'Product Price (₹)',
            data: topProducts.map(p => p.price),
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }]
        });
      } catch (err) {
        console.error('Failed to load campaign data:', err);
      }
    };

    fetchCampaignData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#E5E7EB' } },
      title: { display: true, color: '#E5E7EB' },
    },
    scales: {
      y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(229, 231, 235, 0.1)' } },
      x: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(229, 231, 235, 0.1)' } }
    }
  };

  return (
    <div className="bg-gray-800 shadow rounded-xl p-6">
      <h2 className="text-lg text-white font-semibold mb-4">Campaign Trends</h2>
      <div className="h-64">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CampaignTrends;