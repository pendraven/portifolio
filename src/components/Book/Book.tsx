import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const Book = () => {
  const { config } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    if (currentPage < config.bookPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (config.bookPages.length === 0) return null;

  return (
    <>
      {/* Área clicável invisível na imagem para abrir o livro */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '250px', 
          height: '200px', 
          bottom: '100px', 
          right: '100px', 
          cursor: 'pointer',
          zIndex: 5,
          opacity: 0,
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.3'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <motion.div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.9)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            style={{ 
              width: '800px', 
              maxWidth: '90vw', 
              height: '600px', 
              maxHeight: '80vh',
              background: '#f4e3c1', 
              borderRadius: '10px', 
              display: 'flex', 
              position: 'relative', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 10000
            }}
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Página Esquerda */}
            <div style={{ flex: 1, borderRight: '2px solid #d1bf9e', padding: 20, position: 'relative', overflow: 'auto' }}>
              <h4 style={{ position: 'absolute', bottom: 10, left: 10, color: '#888' }}>{currentPage + 1}</h4>
              {config.bookPages[currentPage]?.elements.map(el => (
                <div 
                  key={el.id} 
                  style={{ 
                    position: 'absolute', 
                    left: `${el.x}px`, 
                    top: `${el.y}px`, 
                    width: `${el.width}px`, 
                    height: `${el.height}px`,
                    transform: `rotate(${el.rotation}deg)`,
                    opacity: el.opacity,
                    fontFamily: el.fontFamily,
                    fontSize: el.fontSize,
                    color: el.color,
                    textAlign: el.align,
                  }}
                >
                  {el.type === 'text' || el.type === 'title' ? el.content : (
                    <img src={el.content} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Página Direita (Se existir) */}
            <div style={{ flex: 1, padding: 20, position: 'relative', overflow: 'auto' }}>
              <h4 style={{ position: 'absolute', bottom: 10, right: 10, color: '#888' }}>{currentPage + 2}</h4>
              {currentPage + 1 < config.bookPages.length && config.bookPages[currentPage + 1]?.elements.map(el => (
                <div 
                  key={el.id} 
                  style={{ 
                    position: 'absolute', 
                    left: `${el.x}px`, 
                    top: `${el.y}px`, 
                    width: `${el.width}px`, 
                    height: `${el.height}px`,
                    transform: `rotate(${el.rotation}deg)`,
                    opacity: el.opacity,
                    fontFamily: el.fontFamily,
                    fontSize: el.fontSize,
                    color: el.color,
                    textAlign: el.align,
                  }}
                >
                  {el.type === 'text' || el.type === 'title' ? el.content : (
                    <img src={el.content} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Navegação */}
            <div style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <button onClick={goToPrevPage} disabled={currentPage === 0}>← Anterior</button>
              <span>{currentPage + 1} / {config.bookPages.length}</span>
              <button onClick={goToNextPage} disabled={currentPage === config.bookPages.length - 1}>Próxima →</button>
            </div>

            {/* Botão Fechar */}
            <button 
              onClick={handleClose} 
              style={{ 
                position: 'absolute', 
                top: 15, 
                right: 15, 
                background: '#d32f2f', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                zIndex: 10001
              }}
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Book;
