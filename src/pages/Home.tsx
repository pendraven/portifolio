import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import TVScreen from '../components/TV/TVScreen';
import Book from '../components/Book/Book';

const Home = () => {
  const { config } = usePortfolio();
  const [isTvOn, setIsTvOn] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* Imagem de fundo (Ajuste a proporção para caber na tela) */}
      <img src="/assets/background.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      
      {/* Livro (Camada transparente) */}
      <Book />

      {/* TV */}
      <div 
        style={{ 
          position: 'absolute', 
          top: config.tv.y, 
          left: config.tv.x, 
          width: config.tv.width, 
          height: config.tv.height, 
          transform: `rotate(${config.tv.rotation}deg)`,
          zIndex: 10
        }}
        onClick={() => setIsTvOn(true)}
      >
        <TVScreen isOn={isTvOn} onOff={() => setIsTvOn(false)} />
      </div>
    </div>
  );
};

export default Home;