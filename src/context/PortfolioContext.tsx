import React, { createContext, useContext, useState, useEffect } from 'react';

interface TVConfig {
  width: number; height: number; x: number; y: number; rotation: number;
  borderRadius: number; opacity: number;
}

interface Element {
  id: string; type: 'text' | 'image' | 'pdf'; content: string; x: number; y: number;
  width: number; height: number; fontFamily: string; fontSize: number; color: string; rotation: number;
}

interface BookPage {
  id: string; elements: Element[]; background: string;
}

interface SiteConfig {
  tv: TVConfig;
  portfolioMode: 'editor' | 'pdf';
  portfolioElements: Element[];
  pdfUrl: string | null;
  bookPages: BookPage[];
}

const defaultConfig: SiteConfig = {
  // Ajuste esses valores para a TV da sua imagem (experimente!)
  tv: { 
    width: 450,      // Largura da tela da TV
    height: 320,     // Altura da tela da TV
    x: 450,          // Distância da esquerda
    y: 200,          // Distância do topo
    rotation: 0, 
    borderRadius: 20, 
    opacity: 1 
  },
  portfolioMode: 'editor',
  portfolioElements: [],
  pdfUrl: null,
  bookPages: []
};

const PortfolioContext = createContext<any>(null);

export const PortfolioProvider = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('portfolio-config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const saveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('portfolio-config', JSON.stringify(newConfig));
    // Aqui você chamaria a Netlify Function: fetch('/.netlify/functions/save-config', ...)
  };

  const restoreDefault = () => {
    localStorage.removeItem('portfolio-config');
    setConfig(defaultConfig);
  };

  return (
    <PortfolioContext.Provider value={{ config, setConfig, saveConfig, restoreDefault }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
