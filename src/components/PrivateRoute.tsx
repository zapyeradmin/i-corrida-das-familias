
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const PrivateRoute = () => {
  const { user, loading } = useAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  // Check if the user is authenticated and if the email is one of the admin emails
  const isAdmin = user && (
    user.email === 'admin@corrida.com' || 
    user.email === 'admin@corridarosario.com.br'
  );
  
  return isAdmin ? <Outlet /> : <Navigate to="/auth" />;
};
