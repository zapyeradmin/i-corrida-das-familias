
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a 
      href="http://wa.me/5587996709355" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 flex flex-col items-center justify-center gap-1 bg-green-500 text-white p-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease, background-color 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div className="relative">
        <MessageCircle size={24} strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <span className="text-xs font-medium mt-1">Falar com Suporte</span>
    </a>
  );
};

export default WhatsAppButton;
