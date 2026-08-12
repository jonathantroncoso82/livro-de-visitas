import { useState, useEffect } from 'react';
import './App.css';
import VisitorForm from './components/VisitorForm';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showAdmin, setShowAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  const handleLogin = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowAdmin(true);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowAdmin(false);
  };

  if (showAdmin && token) {
    return <AdminPanel token={token} user={user} onLogout={handleLogout} />;
  }

  if (token && !showAdmin) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Livro de Visitas - Museu</h1>
          <div className="header-actions">
            <span className="user-info">Olá, {user?.username}</span>
            <button className="btn-logout" onClick={handleLogout}>Sair</button>
            <button className="btn-admin" onClick={() => setShowAdmin(true)}>Painel Admin</button>
          </div>
        </header>
        <main className="app-main">
          <VisitorForm token={token} />
        </main>
      </div>
    );
  }

  return <LoginPage onLogin={handleLogin} />;
}

export default App;
