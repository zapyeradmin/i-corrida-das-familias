
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAthletesData } from '@/hooks/useAthletesData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import AthletesContent from '@/components/dashboard/AthletesContent';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Palette } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { 
    loading, 
    searchTerm, 
    setSearchTerm,
    paymentFilter, 
    setPaymentFilter,
    filteredAthletes,
    totalAthletes,
    registrationFee,
    totalRevenue,
    pendingPayments,
    confirmedPayments,
    confirmedRevenue,
    pendingRevenue,
    formatCurrency,
    formatDate,
    mapGender,
    mapShirtSize,
    mapPaymentMethod,
    mapPaymentStatus,
    updateAthlete,
    confirmPayment,
    deleteAthlete
  } = useAthletesData();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <DashboardHeader userEmail={user?.email} signOut={signOut} />

      {/* Main content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Actions */}
        <div className="mb-8">
          <div className="flex justify-end">
            <Link to="/site-design">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Palette className="h-4 w-4 mr-2" />
                Design do Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section with modern cards */}
        <DashboardStats
          totalAthletes={totalAthletes}
          totalRevenue={totalRevenue}
          pendingPayments={pendingPayments}
          confirmedPayments={confirmedPayments}
          registrationFee={registrationFee}
          confirmedRevenue={confirmedRevenue}
          pendingRevenue={pendingRevenue}
          formatCurrency={formatCurrency}
        />

        {/* Athletes Table */}
        <AthletesContent
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
          filteredAthletes={filteredAthletes}
          totalAthletes={totalAthletes}
          formatDate={formatDate}
          mapGender={mapGender}
          mapShirtSize={mapShirtSize}
          mapPaymentMethod={mapPaymentMethod}
          mapPaymentStatus={mapPaymentStatus}
          updateAthlete={updateAthlete}
          confirmPayment={confirmPayment}
          deleteAthlete={deleteAthlete}
        />
      </main>
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
