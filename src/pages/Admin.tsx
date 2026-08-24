import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import EditableElement from '../components/Admin/EditableElement';

const Admin = () => {
  const { config, setConfig, saveConfig, restoreDefault } = usePortfolio();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'tv' | 'portfolio' | 'book'>('tv');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Portifolio3579') setIsLoggedIn(true);
    else alert('Senha incorreta');
  };

  const handleSave = () => {
    saveConfig(config);
    setHasUnsavedChanges(false);
    setSaveMessage('✓ Alterações salvas com sucesso!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleRestore = () => {
    if (confirm('Tem certeza que deseja restaurar os valores padrão?')) {
      restoreDefault();
      setHasUnsavedChanges(false);
    }
  };

  // Funções utilitárias para editar elementos
  const updatePortfolioElement = (id: string, updates: any) => {
    const newElements = config.portfolioElements.map(el => el.id === id ? { ...el, ...updates } : el);
    setConfig({ ...config, portfolioElements: newElements });
    setHasUnsavedChanges(true);
  };

  const updateBookElement = (pageId: string, elementId: string, updates: any) => {
    const newPages = config.bookPages.map(page => {
      if (page.id === pageId) {
        return { ...page, elements: page.elements.map(el => el.id === elementId ? { ...el, ...updates } : el) };
      }
      return page;
    });
    setConfig({ ...config, bookPages: newPages });
    setHasUnsavedChanges(true);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ padding: 40, background: '#222', borderRadius: 10 }}>
          <h2>Painel Admin</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" style={{ padding: 10, margin: '10px 0', width: '100%' }} />
          <button type="submit" style={{ padding: 10, width: '100%', background: '#4CAF50', color: 'white', border: 'none' }}>Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaeaea' }}>
      {/* Menu Lateral */}
      <div style={{ width: 260, background: '#1a1a2e', color: 'white', padding: 20 }}>
        <h2>⚙️ Painel</h2>
        <button onClick={() => setActiveTab('tv')} style={tabStyle(activeTab === 'tv')}>📺 Tela da TV</button>
        <button onClick={() => setActiveTab('portfolio')} style={tabStyle(activeTab === 'portfolio')}>🖼️ Portfólio</button>
        <button onClick={() => setActiveTab('book')} style={tabStyle(activeTab === 'book')}>📖 Livro</button>
        <button onClick={() => setIsLoggedIn(false)} style={{ ...tabStyle(false), background: '#e94560', marginTop: 30 }}>Sair</button>
      </div>

      {/* Área de Trabalho */}
      <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
        {hasUnsavedChanges && <div style={{ background: '#ffeb3b', padding: 10, marginBottom: 20 }}>⚠️ Alterações não salvas</div>}
        {saveMessage && <div style={{ background: '#4CAF50', padding: 10, marginBottom: 20, color: 'white' }}>{saveMessage}</div>}

        {/* ABA 1: TELA DA TV */}
        {activeTab === 'tv' && (
          <div>
            <h2>Configurar Tela da TV</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ background: 'white', padding: 20, borderRadius: 10 }}>
                <h3>Parâmetros</h3>
                <label>Largura: <input type="number" value={config.tv.width} onChange={(e) => { setConfig({...config, tv: {...config.tv, width: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
                <label>Altura: <input type="number" value={config.tv.height} onChange={(e) => { setConfig({...config, tv: {...config.tv, height: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
                <label>Posição X: <input type="number" value={config.tv.x} onChange={(e) => { setConfig({...config, tv: {...config.tv, x: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
                <label>Posição Y: <input type="number" value={config.tv.y} onChange={(e) => { setConfig({...config, tv: {...config.tv, y: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
                <label>Rotação: <input type="number" value={config.tv.rotation} onChange={(e) => { setConfig({...config, tv: {...config.tv, rotation: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
                <label>Border Radius: <input type="number" value={config.tv.borderRadius} onChange={(e) => { setConfig({...config, tv: {...config.tv, borderRadius: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
                <label>Opacidade: <input type="number" step="0.1" value={config.tv.opacity} onChange={(e) => { setConfig({...config, tv: {...config.tv, opacity: +e.target.value}}); setHasUnsavedChanges(true); }} /></label>
              </div>
              
              <div style={{ background: '#333', borderRadius: 10, padding: 20, position: 'relative' }}>
                <h3 style={{ color: 'white' }}>Prévia da Imagem</h3>
                {/* Aqui você coloca a imagem de fundo real */}
                <img src="/assets/background.jpg" alt="bg" style={{ width: '100%', borderRadius: 10 }} />
                {/* A TV arrastável */}
                <div style={{ position: 'absolute', top: config.tv.y, left: config.tv.x, width: config.tv.width, height: config.tv.height, border: '2px solid red', borderRadius: config.tv.borderRadius, transform: `rotate(${config.tv.rotation}deg)`, background: 'rgba(0,255,0,0.2)' }} />
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: PORTFÓLIO */}
        {activeTab === 'portfolio' && (
          <div>
            <h2>Editar Portfólio</h2>
            <select value={config.portfolioMode} onChange={(e) => { setConfig({...config, portfolioMode: e.target.value as any}); setHasUnsavedChanges(true); }}>
              <option value="editor">Editor</option>
              <option value="pdf">PDF</option>
            </select>

            {config.portfolioMode === 'editor' && (
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
                <div style={{ background: 'white', padding: 20 }}>
                  <h3>Adicionar</h3>
                  <button onClick={() => { setConfig({...config, portfolioElements: [...config.portfolioElements, { id: Date.now().toString(), type: 'text', content: 'Novo Texto', x: 20, y: 20, width: 200, height: 40, fontFamily: 'Arial', fontSize: 16, color: '#000', rotation: 0, align: 'left', opacity: 1 }]}); setHasUnsavedChanges(true); }}>+ Texto</button>
                  <button onClick={() => { const url = prompt('URL da imagem:'); if(url) setConfig({...config, portfolioElements: [...config.portfolioElements, { id: Date.now().toString(), type: 'image', content: url, x: 20, y: 20, width: 200, height: 200, fontFamily: 'Arial', fontSize: 16, color: '#000', rotation: 0, align: 'left', opacity: 1 }]}); }}>+ Imagem</button>
                  <h3 style={{ marginTop: 20 }}>Propriedades</h3>
                  {/* Aqui você renderiza os controles de propriedade do elemento selecionado */}
                </div>

                {/* Prévia da TV */}
                <div style={{ background: '#111', borderRadius: 10, position: 'relative', overflow: 'hidden', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: config.tv.width, height: config.tv.height, border: '2px solid white', position: 'relative', overflow: 'hidden' }}>
                    {config.portfolioElements.map(el => (
                      <EditableElement key={el.id} element={el} onUpdate={updatePortfolioElement} onDelete={(id) => { setConfig({...config, portfolioElements: config.portfolioElements.filter(e => e.id !== id)}); setHasUnsavedChanges(true); }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABA 3: LIVRO */}
        {activeTab === 'book' && (
          <div>
            <h2>Editar Livro</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
              <div style={{ background: 'white', padding: 20 }}>
                <h3>Páginas</h3>
                {config.bookPages.map((page, index) => (
                  <div key={page.id} style={{ padding: 10, border: '1px solid #ddd', marginBottom: 5 }}>
                    <strong>Página {index + 1}</strong>
                    <button onClick={() => { setConfig({...config, bookPages: config.bookPages.filter(p => p.id !== page.id)}); setHasUnsavedChanges(true); }} style={{ color: 'red', float: 'right' }}>X</button>
                  </div>
                ))}
                <button onClick={() => { setConfig({...config, bookPages: [...config.bookPages, { id: Date.now().toString(), elements: [], background: '#f4e3c1' }]}); setHasUnsavedChanges(true); }}>+ Nova Página</button>
              </div>

              {/* Prévia do Livro Aberto */}
              <div style={{ background: '#555', borderRadius: 10, padding: 40, display: 'flex', gap: 10 }}>
                {config.bookPages.map((page, index) => (
                  <div key={page.id} style={{ flex: 1, background: page.background, padding: 20, position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                    <h4>Página {index + 1}</h4>
                    {page.elements.map(el => (
                      <EditableElement key={el.id} element={el} onUpdate={(id, updates) => updateBookElement(page.id, id, updates)} onDelete={(id) => { const newPages = config.bookPages.map(p => p.id === page.id ? { ...p, elements: p.elements.filter(e => e.id !== id) } : p); setConfig({...config, bookPages: newPages}); setHasUnsavedChanges(true); }} isBook />
                    ))}
                    <button onClick={() => { setConfig({...config, bookPages: config.bookPages.map(p => p.id === page.id ? { ...p, elements: [...p.elements, { id: Date.now().toString(), type: 'text', content: 'Texto', x: 20, y: 20, width: 150, height: 30, fontFamily: 'Georgia', fontSize: 16, color: '#000', rotation: 0, align: 'left', opacity: 1 }] } : p)}); setHasUnsavedChanges(true); }} style={{ marginTop: 10 }}>+ Texto</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button onClick={handleSave} style={{ marginTop: 30, padding: '15px 30px', background: '#4CAF50', color: 'white', border: 'none', fontSize: 16, fontWeight: 'bold' }}>💾 SALVAR ALTERAÇÕES</button>
        <button onClick={handleRestore} style={{ marginLeft: 10, padding: '15px 30px', background: '#f44336', color: 'white', border: 'none', fontSize: 16, fontWeight: 'bold' }}>♻️ RESTAURAR PADRÃO</button>
      </div>
    </div>
  );
};

// Estilos utilitários
const tabStyle = (isActive: boolean) => ({
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  background: isActive ? '#0f3460' : 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  textAlign: 'left' as const,
  borderRadius: '5px',
  fontSize: '16px',
});

export default Admin;
