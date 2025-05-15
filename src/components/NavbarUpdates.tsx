
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { UserRound, LayoutDashboard, Medal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function NavbarExtensions() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center gap-4">
        <Link 
          to="/atleta/login" 
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center gap-2"
          title="Área do Atleta"
        >
          <Medal className="h-4 w-4" />
          Área do Atleta
        </Link>
        
        {user ? (
          <Link 
            to="/dashboard" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        ) : (
          <Link 
            to="/auth"
            aria-label="Login"
            className="flex items-center justify-center"
            title="Acesso ao Painel Administrativo"
          >
            <div className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
              <UserRound className="h-4 w-4 mr-2" />
              <span>Login</span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
