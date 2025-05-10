
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-event-blue"></div>
        <p className="text-sm text-gray-500 mt-2">Carregando dados...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
