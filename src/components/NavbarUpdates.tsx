
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
        <div className="ml-6">
          <Link 
            to="/dashboard" 
            className="text-sm px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          >
            Dashboard
          </Link>
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
