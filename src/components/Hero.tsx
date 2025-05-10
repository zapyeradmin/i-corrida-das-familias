
import React from 'react';

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center hero-overlay"
      style={{ 
        backgroundImage: "url('/lovable-uploads/d503ab6c-5760-437a-bf07-6a33e96b3b2b.png')" 
      }}
    >
      <div className="hero-content text-center text-white p-4 md:p-8">
        <div className="mb-6">
          <span className="bg-gradient-to-r from-event-blue to-event-blue-light text-white text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            15 de junho de 2025
          </span>
          <span className="mx-2 text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-200 text-sm font-medium block sm:inline mt-2 sm:mt-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 inline mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Praça Central da Cidade
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight font-poppins">
          1ª CORRIDA <span className="text-blue-400">DAS FAMÍLIAS</span> 2025
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
          Prepare-se para o desafio do ano! Participe da corrida que vai movimentar a cidade e testar seus limites.
        </p>
        <a 
          href="#registration" 
          className="bg-gradient-to-r from-event-blue-dark via-event-blue to-event-blue-light hover:from-event-royal hover:to-event-blue text-white font-bold py-4 px-10 rounded-lg text-lg cta-button shadow-xl inline-flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          Inscreva-se Agora!
        </a>
      </div>
    </section>
  );
};

export default Hero;
