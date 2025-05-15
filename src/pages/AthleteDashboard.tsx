
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import AthleteInfoCard from '@/components/dashboard/AthleteInfoCard';
import RegistrationInfoCard from '@/components/dashboard/RegistrationInfoCard';
import EventInfoCard from '@/components/dashboard/EventInfoCard';
import StatusBanner from '@/components/dashboard/StatusBanner';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

const AthleteDashboard = () => {
  const { athlete, logout, verifyAthleteSession } = useAthleteAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify the session when the component mounts
    const checkSession = async () => {
      try {
        await verifyAthleteSession();
      } catch (error) {
        console.error('Error verifying session:', error);
      }
    };
    
    checkSession();
  }, [verifyAthleteSession]);

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
    navigate('/atleta/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1d48c0]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-28">
        <div className="max-w-4xl mx-auto">
          {/* Status banner for payment information */}
          <StatusBanner paymentStatus={athlete?.payment_status} />

          {/* Logout button in a floating action button style */}
          <div className="fixed bottom-6 right-6">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm flex items-center gap-2 rounded-full px-4 py-2 shadow-lg"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>

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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AthleteDashboard;
