
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center hero-overlay"
      style={{ 
        backgroundImage: "url('/lovable-uploads/d503ab6c-5760-437a-bf07-6a33e96b3b2b.png')" 
      }}
    >
      <div className="hero-content text-center text-white p-4 md:p-8 max-w-5xl">
        <div className="animate-fade-in space-y-8">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="bg-gradient-to-r from-event-blue to-event-blue-light text-white text-sm font-semibold px-6 py-2 rounded-full uppercase tracking-wider shadow-md backdrop-blur-sm border border-white/20 flex items-center gap-2">
              <span className="bg-white/20 p-1 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              25 de Outubro de 2025
            </span>
            <span className="mx-2 text-gray-300 hidden sm:inline">|</span>
            <span className="text-white text-sm font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 border border-white/10">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 inline" 
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
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight font-poppins drop-shadow-lg">
            CORRIDA <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-event-blue-light">URBANA</span> XPTO
          </h1>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 max-w-3xl mx-auto transform hover:scale-[1.02] transition-all duration-300">
            <p className="text-xl sm:text-2xl md:text-3xl mb-10 text-gray-100 leading-relaxed">
              Prepare-se para o desafio do ano! Participe da corrida que vai movimentar a cidade e testar seus limites.
            </p>
          </div>
          
          <Button 
            asChild
            className="bg-gradient-to-r from-event-blue-dark via-event-blue to-event-blue-light hover:from-event-royal hover:to-event-blue text-white font-bold py-6 px-12 rounded-xl text-xl cta-button shadow-xl group transition-all duration-300 hover:scale-105"
            size="lg"
          >
            <a href="#registration" className="flex items-center gap-2">
              Inscreva-se Agora!
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 w-full flex justify-center">
        <a href="#about" className="animate-bounce bg-white/10 p-2 w-10 h-10 ring-1 ring-white/20 shadow-lg rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
