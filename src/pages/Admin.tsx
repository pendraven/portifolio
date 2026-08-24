import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Admin = () => {
  const { config, setConfig, saveConfig, restoreDefault } = usePortfolio();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'tv' | 'portfolio' | 'book'>('tv');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Simulação de autenticação (para testes locais sem Netlify Functions)
  // Em produção, você deve usar a Netlify Function '/.netlify/functions/auth'
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Portifolio3579') {
      setIsLoggedIn(true);
      alert('Login bem-sucedido!');
    } else {
      alert('Senha incorreta');
    }
  };

  const handleSave = () => {
    saveConfig(config);
    setHasUnsavedChanges(false);
    setSaveMessage('✓ Alterações salvas com sucesso!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleRestore = () => {
    if (confirm('Tem certeza que deseja restaurar os valores padrão? Esta ação não pode ser desfeita.')) {
      restoreDefault();
      setHasUnsavedChanges(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '40px', background: '#222', borderRadius: '10px' }}>
          <h2>Painel Administrativo</h2>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Senha Admin" 
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none' }}
          />
          <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f0f0' }}>
      {/* Menu Lateral */}
      <div style={{ width: 250, background: '#1a1a2e', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>⚙️ Painel</h2>
        
        <button 
          onClick={() => setActiveTab('tv')} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', background: activeTab === 'tv' ? '#0f3460' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', borderRadius: '5px' }}
        >
          📺 Personalizar Tela
        </button>
        
        <button 
          onClick={() => setActiveTab('portfolio')} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', background: activeTab === 'portfolio' ? '#0f3460' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', borderRadius: '5px' }}
        >
          🖼️ Personalizar Portfólio
        </button>
        
        <button 
          onClick={() => setActiveTab('book')} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', background: activeTab === 'book' ? '#0f3460' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', borderRadius: '5px' }}
        >
          📖 Personalizar Livro
        </button>

        <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
          <button onClick={() => setIsLoggedIn(false)} style={{ width: '100%', padding: '10px', background: '#e94560', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Sair</button>
        </div>
      </div>

      {/* Área Principal */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {hasUnsavedChanges && (
          <div style={{ background: '#ffeb3b', padding: '10px', marginBottom: '20px', borderRadius: '5px', color: '#333' }}>
            ⚠️ Você tem alterações não salvas!
          </div>
        )}

        {saveMessage && (
          <div style={{ background: '#4CAF50', padding: '10px', marginBottom: '20px', borderRadius: '5px', color: 'white' }}>
            {saveMessage}
          </div>
        )}

        {/* ================= ABA 1: PERSONALIZAÇÃO DA TELA ================= */}
        {activeTab === 'tv' && (
          <div>
            <h2>Personalização da Tela da TV</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Ajuste os parâmetros para encaixar a tela perfeitamente na televisão da imagem.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Parâmetros</h3>
                <label>Largura (px): <input type="number" value={config.tv.width} onChange={(e) => { setConfig({...config, tv: {...config.tv, width: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
                <label>Altura (px): <input type="number" value={config.tv.height} onChange={(e) => { setConfig({...config, tv: {...config.tv, height: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
                <label>Posição X (px): <input type="number" value={config.tv.x} onChange={(e) => { setConfig({...config, tv: {...config.tv, x: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
                <label>Posição Y (px): <input type="number" value={config.tv.y} onChange={(e) => { setConfig({...config, tv: {...config.tv, y: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
                <label>Rotação (graus): <input type="number" value={config.tv.rotation} onChange={(e) => { setConfig({...config, tv: {...config.tv, rotation: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
                <label>Border Radius: <input type="number" value={config.tv.borderRadius} onChange={(e) => { setConfig({...config, tv: {...config.tv, borderRadius: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
                <label>Opacidade (0 a 1): <input type="number" step="0.1" value={config.tv.opacity} onChange={(e) => { setConfig({...config, tv: {...config.tv, opacity: Number(e.target.value)}}); setHasUnsavedChanges(true); }} /></label>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Prévia da TV */}
                <div style={{ position: 'relative', width: '100%', height: '400px', background: '#333', overflow: 'hidden', borderRadius: '10px' }}>
                  <div style={{ position: 'absolute', top: config.tv.y, left: config.tv.x, width: config.tv.width, height: config.tv.height, background: 'rgba(0,255,0,0.3)', border: '2px solid green', borderRadius: config.tv.borderRadius, transform: `rotate(${config.tv.rotation}deg)`, opacity: config.tv.opacity }}>
                    <span style={{ position: 'absolute', bottom: 5, left: 5, color: 'white', fontSize: 12 }}>Prévia da TV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ABA 2: PERSONALIZAÇÃO DO PORTFÓLIO ================= */}
        {activeTab === 'portfolio' && (
          <div>
            <h2>Personalização do Portfólio</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Adicione elementos, textos e imagens que aparecerão dentro da TV.</p>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3>Modo de Exibição</h3>
                <select value={config.portfolioMode} onChange={(e) => { setConfig({...config, portfolioMode: e.target.value as 'editor' | 'pdf'}); setHasUnsavedChanges(true); }}>
                  <option value="editor">Portfólio criado pelo editor</option>
                  <option value="pdf">PDF personalizado</option>
                </select>
              </div>

              {config.portfolioMode === 'editor' && (
                <div>
                  <h3>Elementos</h3>
                  <button onClick={() => { setConfig({...config, portfolioElements: [...config.portfolioElements, { id: Date.now().toString(), type: 'text', content: 'Novo Texto', x: 20, y: 20, width: 200, height: 50, fontFamily: 'Arial', fontSize: 16, color: '#fff', rotation: 0 }]}); setHasUnsavedChanges(true); }} style={{ padding: '10px', marginBottom: '10px', cursor: 'pointer' }}>+ Adicionar Texto</button>
                  
                  {/* Lista de elementos */}
                  {config.portfolioElements.map((el, index) => (
                    <div key={el.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{el.type === 'text' ? `Texto: ${el.content}` : 'Imagem'}</span>
                      <div>
                        <button onClick={() => { const newElems = [...config.portfolioElements]; newElems.splice(index, 1); setConfig({...config, portfolioElements: newElems}); setHasUnsavedChanges(true); }} style={{ color: 'red', cursor: 'pointer' }}>Excluir</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {config.portfolioMode === 'pdf' && (
                <div style={{ marginTop: '20px' }}>
                  <h3>Enviar PDF</h3>
                  <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '10px' }}>
                    <strong>Tamanho recomendado do PDF:</strong> {config.tv.width * 2} × {config.tv.height * 2} px
                  </div>
                  <input type="file" accept="application/pdf" onChange={(e) => { /* Lógica de upload */ setHasUnsavedChanges(true); }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= ABA 3: PERSONALIZAÇÃO DO LIVRO ================= */}
        {activeTab === 'book' && (
          <div>
            <h2>Personalização do Livro</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Edite as páginas, textos e imagens do livro interativo.</p>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3>Páginas</h3>
              <button onClick={() => { setConfig({...config, bookPages: [...config.bookPages, { id: Date.now().toString(), elements: [], background: '#fff' }]}); setHasUnsavedChanges(true); }} style={{ padding: '10px', marginBottom: '10px', cursor: 'pointer' }}>+ Adicionar Página</button>
              
              {config.bookPages.map((page, index) => (
                <div key={page.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                  <strong>Página {index + 1}</strong>
                  <button onClick={() => { const newPages = [...config.bookPages]; newPages.splice(index, 1); setConfig({...config, bookPages: newPages}); setHasUnsavedChanges(true); }} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}>Excluir</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botões de Ação (Comuns a todas as abas) */}
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleSave} 
            style={{ padding: '15px 30px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
          >
            💾 SALVAR ALTERAÇÕES
          </button>
          <button 
            onClick={handleRestore} 
            style={{ padding: '15px 30px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
          >
            ♻️ RESTAURAR PADRÃO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
