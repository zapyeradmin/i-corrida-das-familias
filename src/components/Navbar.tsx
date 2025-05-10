import React, { useState, useEffect } from 'react';
import { NavbarExtensions } from './NavbarUpdates';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'header-scrolled' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        <a href="#hero" className="text-2xl font-bold brand-logo text-white">Corrida<span className="text-blue-400">XPTO</span></a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className="nav-link text-white hover:text-blue-300 transition-colors">Sobre</a>
          <a href="#timeline" className="nav-link text-white hover:text-blue-300 transition-colors">Cronograma</a>
          <a href="#course" className="nav-link text-white hover:text-blue-300 transition-colors">Percurso</a>
          <a href="#sponsors" className="nav-link text-white hover:text-blue-300 transition-colors">Patrocinadores</a>
          <a href="#registration" className="nav-link text-white hover:text-blue-300 transition-colors">Inscrição</a>
          
          {/* Add NavbarExtensions here */}
          <NavbarExtensions />
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <a href="#about" className="block py-2 text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre</a>
            <a href="#timeline" className="block py-2 text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Cronograma</a>
            <a href="#course" className="block py-2 text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Percurso</a>
            <a href="#sponsors" className="block py-2 text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Patrocinadores</a>
            <a href="#registration" className="block py-2 text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Inscrição</a>
            
            {/* Add Dashboard or Login link based on auth state */}
            <div className="py-2">
              <NavbarExtensions />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
