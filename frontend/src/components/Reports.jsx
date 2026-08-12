import { useState, useEffect } from 'react';
import '../styles/Reports.css';

function Reports({ token }) {
  const [statistics, setStatistics] = useState(null);
  const [byDate, setByDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({ date_from: '', date_to: '' });

  const fetchStatistics = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/reports/statistics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao carregar estatísticas');

      const data = await response.json();
      setStatistics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByDate = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams(dateRange);
      const response = await fetch(`/api/reports/by-date?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao carregar relatório');

      const data = await response.json();
      setByDate(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="reports-container">
      <h2>Relatórios e Estatísticas</h2>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <section className="statistics-section">
            <h3>Estatísticas Gerais</h3>
            {statistics && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{statistics.total_visitors}</div>
                  <div className="stat-label">Total de Visitantes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{statistics.visitors_today}</div>
                  <div className="stat-label">Visitantes Hoje</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{statistics.visitors_this_month}</div>
                  <div className="stat-label">Visitantes Este Mês</div>
                </div>
              </div>
            )}
          </section>

          <section className="by-date-section">
            <h3>Visitantes por Data</h3>
            <div className="date-filters">
              <input
                type="date"
                name="date_from"
                value={dateRange.date_from}
                onChange={handleDateChange}
                className="filter-input"
              />
              <input
                type="date"
                name="date_to"
                value={dateRange.date_to}
                onChange={handleDateChange}
                className="filter-input"
              />
              <button onClick={fetchByDate} className="btn-filter">Filtrar</button>
            </div>

            {byDate.length > 0 && (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Quantidade de Visitantes</th>
                  </tr>
                </thead>
                <tbody>
                  {byDate.map((row, idx) => (
                    <tr key={idx}>
                      <td>{new Date(row.date).toLocaleDateString('pt-BR')}</td>
                      <td className="count-cell">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Reports;
