
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  userEmail: string | undefined;
  signOut: () => Promise<void>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userEmail, signOut }) => {
  return (
    <header className="bg-gradient-to-r from-event-blue-dark to-event-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-poppins">Dashboard Administrativo</h1>
          <p className="text-blue-100">Corrida das Famílias 2025 - Gerenciamento de Inscrições</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-3 py-2 bg-blue-800 bg-opacity-50 rounded-md">
            <span className="text-sm font-medium">
              {userEmail}
            </span>
          </div>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="bg-white text-blue-800 hover:bg-blue-50 border-none"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
