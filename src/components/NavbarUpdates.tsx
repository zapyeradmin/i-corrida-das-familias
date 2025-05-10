
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * This component provides extensions to the Navbar component.
 * It can be used to add authentication-related links to the navbar.
 */
export const NavbarExtensions: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if the user has admin email
  const isAdmin = user && (
    user.email === 'admin@corrida.com' || 
    user.email === 'admin@corridarosario.com.br'
  );

  return (
    <>
      {user ? (
        <div className="ml-6">
          {isAdmin && (
            <Link 
              to="/dashboard" 
              className="text-sm px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/auth');
            }}
            className="text-sm px-4 py-2 ml-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition-colors"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="ml-6">
          <Link 
            to="/auth" 
            className="text-sm px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};
