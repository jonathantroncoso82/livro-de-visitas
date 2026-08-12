import { useState, useEffect } from 'react';
import '../styles/AuditLogs.css';

function AuditLogs({ token }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 50;

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/audit-logs?page=${page}&limit=${limit}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao carregar logs');

      const data = await response.json();
      setLogs(data.logs);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <div className="audit-logs-container">
      <h2>Logs de Auditoria</h2>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Ação</th>
                  <th>Usuário ID</th>
                  <th>Detalhes</th>
                  <th>Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td><span className="action-badge">{log.action}</span></td>
                    <td>{log.user_id}</td>
                    <td className="details-cell">
                      <code>{JSON.stringify(log.details, null, 2)}</code>
                    </td>
                    <td>{new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-pagination"
            >
              ← Anterior
            </button>
            <span className="page-info">Página {page} de {Math.ceil(total / limit)} (Total: {total})</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / limit)}
              className="btn-pagination"
            >
              Próxima →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuditLogs;
