import { useState } from 'react';
import '../styles/VisitorForm.css';

function VisitorForm({ token }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erro ao registrar visitante');
        setLoading(false);
        return;
      }

      setMessage('Visitante registrado com sucesso! Obrigado pela visita.');
      setFormData({ name: '', email: '', phone: '', notes: '' });
      setLoading(false);
    } catch (err) {
      setError('Erro de conexão com o servidor');
      setLoading(false);
    }
  };

  return (
    <div className="visitor-form-container">
      <h2>Registre sua Visita</h2>
      <p className="form-subtitle">Preencha o formulário abaixo para registrar sua visita ao museu</p>

      <form onSubmit={handleSubmit} className="visitor-form">
        <div className="form-group">
          <label htmlFor="name">Nome *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Comentários</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Deixe seus comentários sobre a visita (opcional)"
            rows="4"
            disabled={loading}
          />
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Visita'}
        </button>
      </form>
    </div>
  );
}

export default VisitorForm;
