
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';

export const AthletePrivateRoute = () => {
  const { athlete, loading } = useAthleteAuth();
  
  // Mostra um spinner de carregamento enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  // Verifica se o atleta está autenticado
  return athlete ? <Outlet /> : <Navigate to="/atleta/login" />;
};
