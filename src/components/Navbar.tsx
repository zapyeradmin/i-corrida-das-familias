
import React, { useState, useEffect } from 'react';
import { NavbarExtensions } from './NavbarUpdates';
import logoBranca from '/lovable-uploads/0ced6a80-33a2-4da0-bbdd-ec8fd2d48ffa.png';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'header-scrolled' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center py-3 md:py-4 px-4 sm:px-6">
        <a href="#hero" className="brand-logo">
          <img 
            src={logoBranca} 
            alt="Corrida das Famílias" 
            className="h-9 md:h-12 w-auto transition-all duration-300"
          />
        </a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
          <a href="#about" className="nav-link text-white hover:text-blue-300 transition-colors px-2 py-1 text-sm lg:text-base">Sobre</a>
          <a href="#kits" className="nav-link text-white hover:text-blue-300 transition-colors px-2 py-1 text-sm lg:text-base">Kits</a>
          <a href="#timeline" className="nav-link text-white hover:text-blue-300 transition-colors px-2 py-1 text-sm lg:text-base">Cronograma</a>
          <a href="#course" className="nav-link text-white hover:text-blue-300 transition-colors px-2 py-1 text-sm lg:text-base">Percurso</a>
          <a href="#sponsors" className="nav-link text-white hover:text-blue-300 transition-colors px-2 py-1 text-sm lg:text-base">Patrocinadores</a>
          <a href="#registration" className="nav-link text-white hover:text-blue-300 transition-colors px-2 py-1 text-sm lg:text-base">Inscrição</a>
          
          {/* Add NavbarExtensions here */}
          <NavbarExtensions />
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white mobile-menu-button p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu - Slide from right */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <button 
              onClick={closeMenu}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-6 py-8">
            <a href="#about" className="text-xl text-white hover:text-blue-300 transition-colors py-2" onClick={closeMenu}>Sobre</a>
            <a href="#kits" className="text-xl text-white hover:text-blue-300 transition-colors py-2" onClick={closeMenu}>Kits</a>
            <a href="#timeline" className="text-xl text-white hover:text-blue-300 transition-colors py-2" onClick={closeMenu}>Cronograma</a>
            <a href="#course" className="text-xl text-white hover:text-blue-300 transition-colors py-2" onClick={closeMenu}>Percurso</a>
            <a href="#sponsors" className="text-xl text-white hover:text-blue-300 transition-colors py-2" onClick={closeMenu}>Patrocinadores</a>
            <a href="#registration" className="text-xl text-white hover:text-blue-300 transition-colors py-2" onClick={closeMenu}>Inscrição</a>
            
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
