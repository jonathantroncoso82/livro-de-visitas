import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchVisitors()
  }, [])

  const fetchVisitors = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/visitors')
      if (!response.ok) throw new Error('Failed to fetch visitors')
      const data = await response.json()
      setVisitors(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      setError('Name and email are required')
      return
    }
    try {
      setLoading(true)
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Failed to add visitor')
      setFormData({ name: '', email: '', message: '' })
      setError('')
      await fetchVisitors()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Museum Visitor Book</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Sign Visitor Book'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <h2>Recent Visitors</h2>
      {loading && <p>Loading...</p>}
      {visitors.length === 0 && !loading && <p>No visitors yet.</p>}
      <ul className="visitors-list">
        {visitors.map(visitor => (
          <li key={visitor.id} className="visitor-item">
            <strong>{visitor.name}</strong> ({visitor.email})
            {visitor.message && <p>{visitor.message}</p>}
            <small>{new Date(visitor.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
