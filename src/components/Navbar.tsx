
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state based on scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out py-2 ${
        isScrolled || isMobileMenuOpen ? 'header-scrolled' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <a href="#" className={`text-3xl font-bold font-poppins ${
            isScrolled || isMobileMenuOpen ? 'text-event-blue' : 'text-white'
          }`}>
            CORRIDA<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-event-blue-light">XPTO</span>
          </a>
          
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#about" className={`nav-link font-medium transition-colors ${
              isScrolled ? 'text-event-blue-dark hover:text-event-blue' : 'text-gray-200 hover:text-white'
            }`}>Sobre</a>
            <a href="#timeline" className={`nav-link font-medium transition-colors ${
              isScrolled ? 'text-event-blue-dark hover:text-event-blue' : 'text-gray-200 hover:text-white'
            }`}>Cronograma</a>
            <a href="#course" className={`nav-link font-medium transition-colors ${
              isScrolled ? 'text-event-blue-dark hover:text-event-blue' : 'text-gray-200 hover:text-white'
            }`}>Percurso</a>
            <a href="#sponsors" className={`nav-link font-medium transition-colors ${
              isScrolled ? 'text-event-blue-dark hover:text-event-blue' : 'text-gray-200 hover:text-white'
            }`}>Patrocinadores</a>
            <a 
              href="#registration" 
              className="bg-gradient-to-r from-event-blue-dark to-event-blue hover:from-event-royal hover:to-event-blue-dark text-white font-semibold py-2 px-5 rounded-lg cta-button text-sm"
            >
              Inscreva-se
            </a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className={`mobile-menu-button focus:outline-none ${
                isScrolled ? 'text-event-blue-dark' : 'text-gray-200 hover:text-white'
              }`}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-lg absolute w-full transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'block' : 'hidden'
      }`}>
        <a href="#about" onClick={closeMobileMenu} className="block py-3 px-6 text-event-blue-dark hover:bg-blue-50">Sobre</a>
        <a href="#timeline" onClick={closeMobileMenu} className="block py-3 px-6 text-event-blue-dark hover:bg-blue-50">Cronograma</a>
        <a href="#course" onClick={closeMobileMenu} className="block py-3 px-6 text-event-blue-dark hover:bg-blue-50">Percurso</a>
        <a href="#sponsors" onClick={closeMobileMenu} className="block py-3 px-6 text-event-blue-dark hover:bg-blue-50">Patrocinadores</a>
        <a href="#registration" onClick={closeMobileMenu} className="block py-3 px-6 bg-gradient-to-r from-event-blue-dark to-event-blue text-white text-center font-semibold hover:from-event-royal hover:to-event-blue-dark">Inscreva-se</a>
      </div>
    </header>
  );
};

export default Navbar;
