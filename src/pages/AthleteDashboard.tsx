
import React from 'react';
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

const AthleteDashboard = () => {
  const { athlete, logout } = useAthleteAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/atleta/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1d48c0]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-blue-800/40 p-4 rounded-lg backdrop-blur-sm shadow-lg">
            <h1 className="text-3xl font-bold text-white">Minha Inscrição</h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
          
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
          <EventInfoCard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AthleteDashboard;
