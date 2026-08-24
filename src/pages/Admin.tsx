import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import EditableElement from '../components/Admin/EditableElement';

const Admin = () => {
  const { config, setConfig, saveConfig, restoreDefault } = usePortfolio();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'tv' | 'portfolio' | 'book'>('tv');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

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

  const addBookElement = (pageId: string, type: 'text' | 'image' | 'title') => {
    const newElement: any = {
      id: Date.now().toString(),
      type: type,
      content: type === 'title' ? 'Meu Título' : (type === 'text' ? 'Escreva aqui...' : ''),
      x: 20,
      y: 20,
      width: type === 'title' ? 250 : 150,
      height: type === 'title' ? 50 : 30,
      fontFamily: type === 'title' ? 'Georgia' : 'Arial',
      fontSize: type === 'title' ? 28 : 16,
      color: '#333',
      rotation: 0,
      align: 'left',
      opacity: 1,
    };

    if (type === 'image') {
      const url = prompt('URL da imagem:');
      if (!url) return;
      newElement.content = url;
    }

    const newPages = config.bookPages.map(page => {
      if (page.id === pageId) {
        return { ...page, elements: [...page.elements, newElement] };
      }
      return page;
    });

    setConfig({ ...config, bookPages: newPages });
    setHasUnsavedChanges(true);
  };

  const addNewPage = () => {
    const newPage = { id: Date.now().toString(), elements: [], background: '#f4e3c1' };
    setConfig({ ...config, bookPages: [...config.bookPages, newPage] });
    setHasUnsavedChanges(true);
    setCurrentBookPage(config.bookPages.length);
  };

  const deletePage = (pageId: string) => {
    if (config.bookPages.length <= 1) return alert('O livro precisa ter pelo menos 1 página');
    if (confirm('Tem certeza que deseja excluir esta página?')) {
      const newPages = config.bookPages.filter(p => p.id !== pageId);
      setConfig({ ...config, bookPages: newPages });
      setHasUnsavedChanges(true);
      if (currentBookPage >= newPages.length) setCurrentBookPage(newPages.length - 1);
    }
  };

  const goToNextPage = () => {
    if (currentBookPage < config.bookPages.length - 1) {
      setCurrentBookPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentBookPage > 0) {
      setCurrentBookPage(prev => prev - 1);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const pdfUrl = URL.createObjectURL(file);
      setConfig({ ...config, pdfUrl });
      setHasUnsavedChanges(true);
      setPdfFile(file);
    }
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
      <div style={{ width: 260, background: '#1a1a2e', color: 'white', padding: 20 }}>
        <h2>⚙️ Painel</h2>
        <button onClick={() => setActiveTab('tv')} style={tabStyle(activeTab === 'tv')}>📺 Tela da TV</button>
        <button onClick={() => setActiveTab('portfolio')} style={tabStyle(activeTab === 'portfolio')}>🖼️ Portfólio</button>
        <button onClick={() => setActiveTab('book')} style={tabStyle(activeTab === 'book')}>📖 Livro</button>
        <button onClick={() => setIsLoggedIn(false)} style={{ ...tabStyle(false), background: '#e94560', marginTop: 30 }}>Sair</button>
      </div>

      <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
        {hasUnsavedChanges && <div style={{ background: '#ffeb3b', padding: 10, marginBottom: 20 }}>⚠️ Alterações não salvas</div>}
        {saveMessage && <div style={{ background: '#4CAF50', padding: 10, marginBottom: 20, color: 'white' }}>{saveMessage}</div>}

        {activeTab === 'tv' && (
          <div>
            <h2>Configurar Tela da TV</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
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
              
              {/* Prévia com imagem proporcional (usa aspect ratio e % para alinhar) */}
              <div style={{ background: '#000', borderRadius: 10, position: 'relative', overflow: 'hidden', aspectRatio: '16/9', width: '100%' }}>
                <img src="/assets/background.jpg" alt="bg" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* A caixinha da TV em porcentagem para se adaptar ao admin */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: `${(config.tv.y / 1000) * 100}%`, 
                    left: `${(config.tv.x / 1000) * 100}%`, 
                    width: `${(config.tv.width / 1000) * 100}%`, 
                    height: `${(config.tv.height / 1000) * 100}%`, 
                    border: '2px solid red', 
                    borderRadius: config.tv.borderRadius, 
                    transform: `rotate(${config.tv.rotation}deg)`, 
                    background: 'rgba(0,255,0,0.2)', 
                    cursor: 'move'
                  }}
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const origX = config.tv.x;
                    const origY = config.tv.y;
                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const dx = moveEvent.clientX - startX;
                      const dy = moveEvent.clientY - startY;
                      // Converte o movimento do mouse em pixels relativos à imagem
                      const containerWidth = (e.currentTarget.parentElement as HTMLElement).offsetWidth;
                      const containerHeight = (e.currentTarget.parentElement as HTMLElement).offsetHeight;
                      const scaleX = 1000 / containerWidth;
                      const scaleY = 1000 / containerHeight;
                      setConfig({...config, tv: {...config.tv, x: origX + (dx * scaleX), y: origY + (dy * scaleY)}});
                      setHasUnsavedChanges(true);
                    };
                    const handleMouseUp = () => {
                      window.removeEventListener('mousemove', handleMouseMove);
                      window.removeEventListener('mouseup', handleMouseUp);
                    };
                    window.addEventListener('mousemove', handleMouseMove);
                    window.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <span style={{ position: 'absolute', bottom: 5, left: 5, color: 'white', fontSize: 12 }}>TV</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
                </div>

                <div style={{ background: '#111', borderRadius: 10, position: 'relative', overflow: 'hidden', height: 500 }}>
                  <div style={{ width: config.tv.width, height: config.tv.height, border: '2px solid white', position: 'relative', overflow: 'hidden', margin: 'auto', marginTop: 50 }}>
                    {config.portfolioElements.map(el => (
                      <EditableElement key={el.id} element={el} onUpdate={updatePortfolioElement} onDelete={(id) => { setConfig({...config, portfolioElements: config.portfolioElements.filter(e => e.id !== id)}); setHasUnsavedChanges(true); }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {config.portfolioMode === 'pdf' && (
              <div style={{ background: 'white', padding: 20, marginTop: 20 }}>
                <h3>Enviar PDF</h3>
                <div style={{ background: '#f9f9f9', padding: 15, marginBottom: 10 }}>
                  <strong>Tamanho recomendado:</strong> {config.tv.width * 2} × {config.tv.height * 2} px
                </div>
                <input type="file" accept="application/pdf" onChange={handlePdfUpload} style={{ padding: 10, border: '1px solid #ccc' }} />
                {config.pdfUrl && (
                  <div style={{ marginTop: 20 }}>
                    <p style={{ color: 'green' }}>✓ PDF carregado e salvo!</p>
                    <iframe src={config.pdfUrl} style={{ width: '100%', height: '400px', border: '1px solid #ccc' }} title="Preview PDF" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'book' && (
          <div>
            <h2>Editar Livro</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
              <div style={{ background: 'white', padding: 20 }}>
                <h3>Páginas</h3>
                <button onClick={addNewPage} style={{ marginBottom: 10 }}>+ Nova Página</button>
                <div>
                  {config.bookPages.map((page, index) => (
                    <div key={page.id} style={{ padding: 5, border: '1px solid #ddd', marginBottom: 5, background: currentBookPage === index ? '#e0e0e0' : 'transparent' }}>
                      <span onClick={() => { setCurrentBookPage(index); }} style={{ cursor: 'pointer' }}>Página {index + 1}</span>
                      <button onClick={() => deletePage(page.id)} style={{ color: 'red', float: 'right', border: 'none', background: 'transparent' }}>X</button>
                    </div>
                  ))}
                </div>

                <h3 style={{ marginTop: 20 }}>Adicionar na Página Atual</h3>
                <button onClick={() => addBookElement(config.bookPages[currentBookPage].id, 'title')} style={{ display: 'block', width: '100%', marginBottom: 5 }}>+ Título</button>
                <button onClick={() => addBookElement(config.bookPages[currentBookPage].id, 'text')} style={{ display: 'block', width: '100%', marginBottom: 5 }}>+ Texto</button>
                <button onClick={() => addBookElement(config.bookPages[currentBookPage].id, 'image')} style={{ display: 'block', width: '100%' }}>+ Imagem</button>
              </div>

              {/* Prévia do Livro (Aberto) com navegação real */}
              <div style={{ background: '#2c2c2c', borderRadius: 10, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, color: 'white' }}>
                  <button onClick={goToPrevPage} disabled={currentBookPage === 0}>← Anterior</button>
                  <span>Página {currentBookPage + 1} de {config.bookPages.length}</span>
                  <button onClick={goToNextPage} disabled={currentBookPage === config.bookPages.length - 1}>Próxima →</button>
                </div>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'stretch' }}>
                  {/* Página Esquerda */}
                  <div style={{ flex: 1, background: config.bookPages[currentBookPage].background, padding: 20, position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', minHeight: 400 }}>
                    <span style={{ position: 'absolute', bottom: 10, left: 10, fontSize: 12, color: '#888' }}>{currentBookPage + 1}</span>
                    {config.bookPages[currentBookPage].elements.map(el => (
                      <EditableElement key={el.id} element={el} onUpdate={(id, updates) => updateBookElement(config.bookPages[currentBookPage].id, id, updates)} onDelete={(id) => { const newPages = config.bookPages.map(p => p.id === config.bookPages[currentBookPage].id ? { ...p, elements: p.elements.filter(e => e.id !== id) } : p); setConfig({...config, bookPages: newPages}); setHasUnsavedChanges(true); }} />
                    ))}
                  </div>

                  {/* Página Direita (Se existir) */}
                  {currentBookPage + 1 < config.bookPages.length ? (
                    <div style={{ flex: 1, background: config.bookPages[currentBookPage + 1].background, padding: 20, position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', minHeight: 400 }}>
                      <span style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 12, color: '#888' }}>{currentBookPage + 2}</span>
                      {config.bookPages[currentBookPage + 1].elements.map(el => (
                        <EditableElement key={el.id} element={el} onUpdate={(id, updates) => updateBookElement(config.bookPages[currentBookPage + 1].id, id, updates)} onDelete={(id) => { const newPages = config.bookPages.map(p => p.id === config.bookPages[currentBookPage + 1].id ? { ...p, elements: p.elements.filter(e => e.id !== id) } : p); setConfig({...config, bookPages: newPages}); setHasUnsavedChanges(true); }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ flex: 1, background: '#444', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                      Fim do livro
                    </div>
                  )}
                </div>
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
