
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export function NavbarExtensions() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Link 
          to="/dashboard" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center"
        >
          Dashboard
        </Link>
      ) : (
        <Link 
          to="/auth"
          aria-label="Login"
          className="text-white hover:text-blue-300 transition-colors"
          title="Acesso ao Painel Administrativo"
        >
          <LogIn className="h-5 w-5" />
        </Link>
      )}
    </>
  );
}
