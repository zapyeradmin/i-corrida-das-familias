
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update with the actual current year
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);
  
  return (
    <footer className="bg-gradient-to-br from-event-royal to-slate-900 text-gray-300 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
              <img 
                alt="Corrida das Famílias Logo" 
                className="h-12 w-auto" 
                src="/lovable-uploads/0ced6a80-33a2-4da0-bbdd-ec8fd2d48ffa.png" 
              />
            </div>
            <p className="text-sm">
              Este evento marca o início de uma nova tradição em Serra Talhada e região, reunindo famílias em uma celebração de Fé, saúde, esporte e união.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 text-sm">
              <li>
                <a href="#about" className="hover:text-blue-300 transition-colors">
                  Sobre o Evento
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-blue-300 transition-colors">
                  Cronograma
                </a>
              </li>
              <li>
                <a href="#course" className="hover:text-blue-300 transition-colors">
                  Percurso
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-blue-300 transition-colors">
                  Inscreva-se
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Contatos</h4>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {/* Social media icons can be added here */}
            </div>
            <p className="text-sm">Equipe Dirigente do ECC do Rosário 2025</p>
            <p className="text-sm mt-2">Telefone/WhatsApp: (87) 99670-9355</p>
            <p className="text-sm mt-2">E-mail: corridadasfamiliaseccrosario@gmail.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p className="flex items-center justify-center flex-wrap gap-1">
            &copy; {currentYear} Corrida das Famílias. por Zapyer Soluções em Tecnologia. Todos os direitos reservados. 
            <span className="flex items-center">
              Desenvolvido com 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mx-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
              </svg>
              .
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
