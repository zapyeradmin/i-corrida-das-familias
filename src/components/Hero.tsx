
import React from 'react';

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center hero-overlay"
      style={{ 
        backgroundImage: "url('/lovable-uploads/5ee1b807-0626-4575-bef4-27435d64a983.png')" 
      }}
    >
      <div className="hero-content text-center text-white p-4 md:p-8 max-w-5xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="bg-gradient-to-r from-event-blue to-event-blue-light text-white text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              15 de junho de 2025
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="text-gray-200 text-sm font-medium mt-2 md:mt-0 flex items-center">
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
              Igreja Matriz do Rosário
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight font-poppins tracking-tight">
          1ª CORRIDA <span className="text-blue-400">DAS FAMÍLIAS</span> 2025
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed">
          As Famílias Correndo Juntos no Rosário. Será 5km de percurso, medalhas, kits exclusivos e muita diversão para toda a família.
        </p>
        
        <div className="flex justify-center">
          <a 
            href="#registration" 
            className="bg-gradient-to-r from-event-blue-dark via-event-blue to-event-blue-light hover:from-event-royal hover:to-event-blue text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg text-base md:text-lg cta-button shadow-xl inline-flex items-center transform transition-all duration-300 hover:-translate-y-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
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
      </div>
      
      {/* Hero scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#about" className="text-white opacity-75 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
