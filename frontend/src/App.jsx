import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', comments: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/visitors`);
      setVisitors(response.data);
    } catch (err) {
      setError('Failed to load visitors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/visitors/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/visitors`, formData);
      }
      setFormData({ name: '', email: '', comments: '' });
      fetchVisitors();
    } catch (err) {
      setError('Failed to save visitor');
      console.error(err);
    }
  };

  const handleEdit = (visitor) => {
    setFormData({
      name: visitor.name,
      email: visitor.email,
      comments: visitor.comments || ''
    });
    setEditingId(visitor.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/api/visitors/${id}`);
      fetchVisitors();
    } catch (err) {
      setError('Failed to delete visitor');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', comments: '' });
    setEditingId(null);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🏛️ Museum Visitor Book</h1>
        <p>Sign our guest book and share your experience</p>
      </header>

      <main className="main">
        <section className="form-section">
          <h2>{editingId ? 'Edit Visitor' : 'Add Your Visit'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Share your thoughts about your visit..."
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Sign'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {error && <div className="error-message">{error}</div>}

        <section className="visitors-section">
          <h2>Recent Visitors ({visitors.length})</h2>
          {loading ? (
            <p className="loading">Loading visitors...</p>
          ) : visitors.length === 0 ? (
            <p className="empty">No visitors yet. Be the first to sign!</p>
          ) : (
            <div className="visitors-list">
              {visitors.map(visitor => (
                <div key={visitor.id} className="visitor-card">
                  <div className="visitor-header">
                    <h3>{visitor.name}</h3>
                    <span className="visitor-date">
                      {new Date(visitor.visit_date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="visitor-email">{visitor.email}</p>
                  {visitor.comments && (
                    <p className="visitor-comments">{visitor.comments}</p>
                  )}
                  <div className="visitor-actions">
                    <button
                      onClick={() => handleEdit(visitor)}
                      className="btn btn-small btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(visitor.id)}
                      className="btn btn-small btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
