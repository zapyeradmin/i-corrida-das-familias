
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateViewProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="text-center p-12 text-gray-500 bg-gray-50 rounded-md">
      {hasFilters ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="mt-2">Nenhum resultado encontrado para sua busca.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onClearFilters}
          >
            Limpar filtros
          </Button>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="mt-2">Nenhum atleta inscrito ainda.</p>
        </>
      )}
    </div>
  );
};

export default EmptyStateView;
