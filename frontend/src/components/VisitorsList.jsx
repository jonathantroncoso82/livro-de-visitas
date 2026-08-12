import { useState, useEffect } from 'react';
import '../styles/VisitorsList.css';

function VisitorsList({ token }) {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ name: '', email: '', date_from: '', date_to: '' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const limit = 20;

  const fetchVisitors = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
      });

      const response = await fetch(`/api/visitors?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao carregar visitantes');

      const data = await response.json();
      setVisitors(data.visitors);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleEdit = (visitor) => {
    setEditingId(visitor.id);
    setEditData(visitor);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/visitors/${editingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) throw new Error('Erro ao atualizar visitante');

      setEditingId(null);
      fetchVisitors();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este visitante?')) return;

    try {
      const response = await fetch(`/api/visitors/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao deletar visitante');

      fetchVisitors();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="visitors-list-container">
      <h2>Gestão de Visitantes</h2>

      <div className="filters-section">
        <input
          type="text"
          name="name"
          placeholder="Filtrar por nome"
          value={filters.name}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Filtrar por email"
          value={filters.email}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="date"
          name="date_from"
          value={filters.date_from}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="date"
          name="date_to"
          value={filters.date_to}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="visitors-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Data da Visita</th>
                  <th>Notas</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map(visitor => (
                  <tr key={visitor.id}>
                    <td>
                      {editingId === visitor.id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        visitor.name
                      )}
                    </td>
                    <td>
                      {editingId === visitor.id ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        visitor.email
                      )}
                    </td>
                    <td>
                      {editingId === visitor.id ? (
                        <input
                          type="text"
                          value={editData.phone || ''}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        visitor.phone || '-'
                      )}
                    </td>
                    <td>{new Date(visitor.visit_date).toLocaleString('pt-BR')}</td>
                    <td>
                      {editingId === visitor.id ? (
                        <input
                          type="text"
                          value={editData.notes || ''}
                          onChange={(e) => setEditData({...editData, notes: e.target.value})}
                          className="edit-input"
                        />
                      ) : (
                        visitor.notes || '-'
                      )}
                    </td>
                    <td className="actions-cell">
                      {editingId === visitor.id ? (
                        <>
                          <button className="btn-save" onClick={handleSaveEdit}>Salvar</button>
                          <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-edit" onClick={() => handleEdit(visitor)}>Editar</button>
                          <button className="btn-delete" onClick={() => handleDelete(visitor.id)}>Deletar</button>
                        </>
                      )}
                    </td>
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

export default VisitorsList;
