
import React from 'react';

const DashboardFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Corrida das Famílias. por Zapyer Soluções em Tecnologia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
