import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 5, width: '100%', height: '100%' }}>
      
      {/* A imagem do livro transparente (Fica exatamente onde deve ficar) */}
      <img 
        src="/assets/book-overlay.png" 
        alt="Livro" 
        style={{ 
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          zIndex: 5
        }} 
      />

      {/* Área clicável invisível sobre o livro (ajuste essas coordenadas) */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '250px', 
          height: '200px', 
          bottom: '100px', 
          right: '100px', 
          cursor: 'pointer',
          zIndex: 6
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.3'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <motion.div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            style={{ width: '800px', height: '600px', background: '#f4e3c1', borderRadius: '10px', display: 'flex', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ flex: 1, borderRight: '2px solid #d1bf9e', padding: 20 }}>
              <h2>Capítulo 1</h2>
            </div>
            <div style={{ flex: 1, padding: 20 }}>
              <p>Conteúdo da página.</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: 10, right: 10 }}>Fechar</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Book;
