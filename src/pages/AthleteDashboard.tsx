
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import AthleteInfoCard from '@/components/dashboard/AthleteInfoCard';
import RegistrationInfoCard from '@/components/dashboard/RegistrationInfoCard';
import EventInfoCard from '@/components/dashboard/EventInfoCard';
import StatusBanner from '@/components/dashboard/StatusBanner';
import { LogOut, Home, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const AthleteDashboard = () => {
  const { athlete, logout, verifyAthleteSession } = useAthleteAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify the session when the component mounts
    const checkSession = async () => {
      try {
        const isValid = await verifyAthleteSession();
        if (!isValid) {
          toast.error('Sessão inválida ou expirada. Por favor, faça login novamente.');
          navigate('/atleta/login');
        }
      } catch (error) {
        console.error('Error verifying session:', error);
        toast.error('Erro ao verificar sessão. Por favor, faça login novamente.');
        navigate('/atleta/login');
      }
    };
    
    checkSession();
  }, [verifyAthleteSession, navigate]);

  const handleLogout = () => {
    try {
      logout();
      // Use window.location.href for a full page refresh and redirect
      window.location.href = '/atleta/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao sair da conta. Tente novamente.');
    }
  };

  const handleBackToHome = () => {
    // Use window.location.href for a more reliable navigation to home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1d48c0]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-28">
        <div className="max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={handleBackToHome}
              className="bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar à Página Principal
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
          
          {/* Status banner for payment information */}
          <StatusBanner paymentStatus={athlete?.payment_status} />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Athlete Information Card */}
            <AthleteInfoCard
              fullName={athlete?.full_name}
              email={athlete?.email}
              cpf={athlete?.cpf}
              birthDate={athlete?.birth_date}
              phone={athlete?.phone}
              gender={athlete?.gender}
            />
            
            {/* Registration Information Card */}
            <RegistrationInfoCard
              course={athlete?.course}
              shirtSize={athlete?.shirt_size}
              paymentMethod={athlete?.payment_method}
              paymentStatus={athlete?.payment_status}
              createdAt={athlete?.created_at}
            />
          </div>
          
          {/* Event Information Card */}
          <div className="mt-6">
            <EventInfoCard />
          </div>

          {/* Mobile bottom navigation */}
          <div className="fixed bottom-6 right-6 md:hidden">
            <Link to="/">
              <Button
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm rounded-full p-3 shadow-lg"
                title="Página Inicial"
              >
                <Home size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AthleteDashboard;
