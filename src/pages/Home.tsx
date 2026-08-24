import React, { createContext, useContext, useState } from 'react';

export interface Element {
  id: string;
  type: 'text' | 'image' | 'title';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: number;
  color: string;
  rotation: number;
  align: 'left' | 'center' | 'right';
  opacity: number;
}

export interface BookPage {
  id: string;
  elements: Element[];
  background: string;
}

export interface SiteConfig {
  tv: {
    width: number; height: number; x: number; y: number; rotation: number;
    borderRadius: number; opacity: number;
  };
  portfolioMode: 'editor' | 'pdf';
  portfolioElements: Element[];
  pdfUrl: string | null;
  bookPages: BookPage[];
}

const defaultConfig: SiteConfig = {
  tv: { width: 500, height: 350, x: 450, y: 200, rotation: 0, borderRadius: 20, opacity: 1 },
  portfolioMode: 'editor',
  portfolioElements: [
    { id: '1', type: 'text', content: 'Meu Portfólio', x: 50, y: 50, width: 300, height: 60, fontFamily: 'Arial', fontSize: 32, color: '#ffffff', rotation: 0, align: 'center', opacity: 1 }
  ],
  pdfUrl: null,
  bookPages: [
    { id: 'pag1', elements: [{ id: 'txt1', type: 'text', content: 'Capítulo 1', x: 20, y: 20, width: 200, height: 50, fontFamily: 'Georgia', fontSize: 24, color: '#333', rotation: 0, align: 'left', opacity: 1 }], background: '#f4e3c1' },
    { id: 'pag2', elements: [], background: '#f4e3c1' }
  ]
};

const PortfolioContext = createContext<any>(null);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('portfolio-config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const saveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('portfolio-config', JSON.stringify(newConfig));
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
