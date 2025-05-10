
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

  return (
    <>
      {user ? (
        <div className="ml-6 flex items-center space-x-2">
          {/* Show Dashboard link to all authenticated users */}
          <Link 
            to="/dashboard" 
            className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-event-blue to-event-blue-light text-white hover:shadow-md transition-all duration-300"
          >
            Dashboard
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/auth');
            }}
            className="text-sm px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 hover:shadow-md transition-all duration-300"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="ml-6">
          <Link 
            to="/auth" 
            className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-event-blue to-event-blue-light text-white hover:shadow-md transition-all duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};
