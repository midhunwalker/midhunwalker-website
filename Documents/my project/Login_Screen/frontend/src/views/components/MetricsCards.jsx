import React from 'react';
import axios from 'axios';

const MetricsCards = () => {
  const [stats, setStats] = React.useState({
    users: 0,
    customers: 0,
    revenue: 0,
    campaigns: 0,
    subAdmins: 0,
  });

  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [usersRes, cartsRes, productsRes] = await Promise.all([
          axios.get('https://dummyjson.com/users?limit=100'),
          axios.get('https://dummyjson.com/carts'),
          axios.get('https://dummyjson.com/products'),
        ]);

        const users = usersRes.data.users;
        const subAdmins = users.filter(user => user.company.department === 'Marketing').length;
        const revenue = cartsRes.data.carts.reduce((sum, cart) => sum + cart.total, 0);

        setStats({
          users: users.length,
          customers: users.length,
          revenue,
          campaigns: productsRes.data.products.length,
          subAdmins,
        });
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    };

    fetchMetrics();
  }, []);

  const metrics = [
    { label: 'Total Users', value: stats.users },
    { label: 'Customers', value: stats.customers },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}` },
    { label: 'Campaigns', value: stats.campaigns },
    { label: 'Sub Admins', value: stats.subAdmins },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-800 shadow rounded-xl p-4 hover:bg-gray-700 transition-colors"
        >
          <p className="text-gray-300 text-sm">{item.label}</p>
          <p className="text-xl text-green-400 font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
