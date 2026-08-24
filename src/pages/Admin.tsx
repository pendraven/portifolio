import React, { useState } from 'react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // LOGIN SIMULADO PARA TESTE LOCAL
    if (password === 'Portifolio3579') {
      setIsLoggedIn(true);
      alert('Login bem-sucedido!');
    } else {
      alert('Senha incorreta');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2>Painel Administrativo</h2>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Senha Admin" 
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', background: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ width: 250, background: '#222', color: 'white', padding: '20px' }}>
        <h2>Painel</h2>
        <button style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}>Personalizar TV</button>
        <button style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}>Personalizar Portfólio</button>
        <button style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}>Personalizar Livro</button>
        <button style={{ display: 'block', width: '100%', padding: '10px', background: 'red', color: 'white' }} onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>
      <div style={{ flex: 1, padding: 20 }}>
        <h1>Conteúdo Admin</h1>
        <p>Esta é a área onde você vai editar a TV, o Livro e o Portfólio.</p>
      </div>
    </div>
  );
};

export default Admin;
