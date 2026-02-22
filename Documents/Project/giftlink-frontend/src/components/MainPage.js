import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API;

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE}/api/gifts`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch gifts');
      }
      
      const data = await response.json();
      setGifts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Unable to load gifts. Please try again later.');
      console.error('Fetch gifts error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>GiftLink - All Gifts</h1>
      
      {loading && <p>Loading gifts...</p>}
      
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && gifts.length === 0 && (
        <p>No gifts available at the moment.</p>
      )}
      
      {!loading && !error && gifts.length > 0 && (
        <div className="gifts-grid">
          {gifts.map((gift) => (
            <div key={gift._id} className="gift-card">
              <h3>{gift.title || 'Untitled Gift'}</h3>
              <p><strong>Category:</strong> {gift.category || 'N/A'}</p>
              <p><strong>Price:</strong> ${gift.price ? gift.price.toFixed(2) : '0.00'}</p>
              <Link to={`/gift/${gift._id}`} className="btn">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
