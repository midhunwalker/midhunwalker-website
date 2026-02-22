import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API;

function SearchPage() {
  const [category, setCategory] = useState('');
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!category.trim()) {
      setError('Please enter a category to search');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSearched(false);
      
      // Public search - no Authorization header required
      const response = await fetch(
        `${API_BASE}/api/search?category=${encodeURIComponent(category.trim())}`
      );
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      setGifts(Array.isArray(data) ? data : []);
      setSearched(true);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Search Gifts</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Electronics, Books, Toys"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      {searched && !loading && !error && gifts.length === 0 && (
        <p>No gifts found for category "{category}".</p>
      )}
      
      {searched && !loading && !error && gifts.length > 0 && (
        <div className="gifts-grid">
          <h2>Results ({gifts.length})</h2>
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

export default SearchPage;
