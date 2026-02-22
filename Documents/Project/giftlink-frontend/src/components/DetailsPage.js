import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API;

function DetailsPage() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Basic ObjectId validation (24 hex characters)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      setError('Invalid gift ID format');
      setLoading(false);
      return;
    }

    fetchGiftDetails();
  }, [id]);

  const fetchGiftDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE}/api/gifts/${id}`);
      
      if (response.status === 404) {
        setError('Gift not found');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch gift details');
      }
      
      const data = await response.json();
      setGift(data);
    } catch (err) {
      setError('Unable to load gift details. Please try again later.');
      console.error('Fetch gift details error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to All Gifts</Link>
      
      {loading && <p>Loading gift details...</p>}
      
      {error && (
        <div>
          <p className="error-message">{error}</p>
        </div>
      )}
      
      {!loading && !error && gift && (
        <div className="gift-details">
          <h1>{gift.title || 'Untitled Gift'}</h1>
          
          {gift.image && (
            <img 
              src={gift.image} 
              alt={gift.title} 
              className="gift-image"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          
          <div className="details-info">
            <p><strong>Category:</strong> {gift.category || 'N/A'}</p>
            <p><strong>Price:</strong> ${gift.price ? gift.price.toFixed(2) : '0.00'}</p>
            
            {gift.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{gift.description}</p>
              </div>
            )}
            
            {gift.condition && (
              <p><strong>Condition:</strong> {gift.condition}</p>
            )}
            
            {gift.age_years !== undefined && (
              <p><strong>Age:</strong> {gift.age_years} years</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
