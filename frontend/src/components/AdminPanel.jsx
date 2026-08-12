import { useState, useEffect } from 'react';
import '../styles/AdminPanel.css';
import VisitorsList from './VisitorsList';
import Reports from './Reports';
import AuditLogs from './AuditLogs';

function AdminPanel({ token, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('visitors');

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-left">
          <h1>Painel Administrativo</h1>
          <p className="header-subtitle">Livro de Visitas - Museu</p>
        </div>
        <div className="header-right">
          <span className="user-badge">👤 {user?.username}</span>
          <button className="btn-logout" onClick={onLogout}>Sair</button>
        </div>
      </header>

      <nav className="admin-nav">
        <button
          className={`nav-btn ${activeTab === 'visitors' ? 'active' : ''}`}
          onClick={() => setActiveTab('visitors')}
        >
          📋 Visitantes
        </button>
        <button
          className={`nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          📊 Relatórios
        </button>
        <button
          className={`nav-btn ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          🔐 Auditoria
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'visitors' && <VisitorsList token={token} />}
        {activeTab === 'reports' && <Reports token={token} />}
        {activeTab === 'audit' && <AuditLogs token={token} />}
      </main>
    </div>
  );
}

export default AdminPanel;
