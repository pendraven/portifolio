import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const TVScreen = ({ isOn, onOff }) => {
  const { config } = usePortfolio();
  const [powerState, setPowerState] = useState('off');

  useEffect(() => {
    if (isOn) {
      setPowerState('turning-on');
      setTimeout(() => setPowerState('on'), 1500);
    } else {
      setPowerState('off');
    }
  }, [isOn]);

  if (powerState === 'off') return <div style={{ width: '100%', height: '100%', background: '#111', borderRadius: 'inherit' }} />;
  if (powerState === 'turning-on') return <div style={{ width: '100%', height: '100%', background: '#000', animation: 'glitch 1s' }} />;

  return (
    <div style={{ width: '100%', height: '100%', background: '#222', color: 'white', position: 'relative', overflow: 'hidden', borderRadius: 'inherit' }}>
      <button onClick={(e) => { e.stopPropagation(); onOff(); }} style={{ position: 'absolute', top: 10, right: 10, zIndex: 20 }}>Desligar</button>
      
      {/* Renderização do Portfólio ou PDF */}
      {config.portfolioMode === 'pdf' ? (
        <iframe src={config.pdfUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF" />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {config.portfolioElements.map(el => (
            <div key={el.id} style={{ position: 'absolute', left: el.x, top: el.y, width: el.width, height: el.height, transform: `rotate(${el.rotation}deg)`, opacity: el.opacity, color: el.color, fontFamily: el.fontFamily, fontSize: el.fontSize, textAlign: el.align }}>
              {el.type === 'text' ? el.content : <img src={el.content} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TVScreen;
