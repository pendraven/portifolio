import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Área clicável invisível sobre o livro na imagem */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '250px', 
          height: '200px', 
          bottom: '100px', 
          right: '100px', 
          cursor: 'pointer',
          zIndex: 5,
          background: 'transparent'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.3'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        onClick={() => setIsOpen(true)}
      />

      {/* MODAL DO LIVRO (Só aparece quando isOpen é true) */}
      {isOpen && (
        <motion.div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.9)', // Fundo bem escuro
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999 // Z-index ALTÍSSIMO para garantir que fique na frente de tudo
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* O LIVRO ABERTO */}
          <motion.div 
            style={{ 
              width: '800px', 
              maxWidth: '90vw', // Para não estourar em telas menores
              height: '600px', 
              maxHeight: '80vh',
              background: '#f4e3c1', // Cor de papel
              borderRadius: '10px', 
              display: 'flex', 
              position: 'relative', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 10000 // Acima do fundo preto
            }}
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Página Esquerda */}
            <div style={{ flex: 1, borderRight: '2px solid #d1bf9e', padding: 20, overflow: 'auto' }}>
              <h2>Capítulo 1</h2>
              <p style={{ marginTop: 20 }}>Este é o conteúdo da página esquerda.</p>
            </div>
            
            {/* Página Direita */}
            <div style={{ flex: 1, padding: 20, overflow: 'auto' }}>
              <h2>Capítulo 2</h2>
              <p style={{ marginTop: 20 }}>Este é o conteúdo da página direita.</p>
            </div>

            {/* Botão Fechar */}
            <button 
              onClick={() => setIsOpen(false)} 
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
                zIndex: 10001 // Acima de tudo
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
