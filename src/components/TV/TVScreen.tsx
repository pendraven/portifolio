import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TVScreen = ({ isOn, onOff }) => {
  const [powerState, setPowerState] = useState('off');

  useEffect(() => {
    if (isOn) {
      setPowerState('turning-on');
      setTimeout(() => setPowerState('on'), 1500); // Duração do efeito de ligar
    } else {
      setPowerState('off');
    }
  }, [isOn]);

  if (powerState === 'off') {
    return <div style={{ width: '100%', height: '100%', background: '#111', borderRadius: '10px' }} />;
  }

  if (powerState === 'turning-on') {
    return (
      <motion.div 
        style={{ width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 1.5 }}
      >
        {/* Efeito de scanline e glitch */}
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />
      </motion.div>
    );
  }

  return (
    <motion.div 
      style={{ width: '100%', height: '100%', background: '#222', color: 'white', position: 'relative', overflow: 'hidden', borderRadius: '10px' }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <button onClick={(e) => { e.stopPropagation(); onOff(); }} style={{ position: 'absolute', top: 10, right: 10, zIndex: 20 }}>Desligar</button>
      
      {/* Renderize aqui o conteúdo do portfólio (Textos, Imagens, PDF) */}
      <div style={{ padding: 20 }}>
        <h1>Bem-vindo ao meu Portfólio</h1>
      </div>
    </motion.div>
  );
};

export default TVScreen;