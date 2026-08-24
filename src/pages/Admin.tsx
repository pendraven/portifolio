import React, { useState } from 'react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/.netlify/functions/auth', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    if (res.ok) setIsLoggedIn(true);
    else alert('Senha incorreta');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha Admin" />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 250, background: '#222', height: '100vh', color: 'white' }}>
        <h2>Painel</h2>
        <button>Personalizar TV</button>
        <button>Personalizar Portfólio</button>
        <button>Personalizar Livro</button>
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>
      <div style={{ flex: 1, padding: 20 }}>
        {/* Aqui entram as três abas com formulários e editores */}
        <h1>Conteúdo Admin</h1>
      </div>
    </div>
  );
};

export default Admin;