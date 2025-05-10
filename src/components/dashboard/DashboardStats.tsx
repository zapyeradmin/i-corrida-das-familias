
import React from 'react';
import { Users, CreditCard, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from './StatsCard';

interface DashboardStatsProps {
  totalAthletes: number;
  totalRevenue: number;
  pendingPayments: number;
  confirmedPayments: number;
  registrationFee: number;
  confirmedRevenue: number;
  pendingRevenue: number;
  formatCurrency: (value: number) => string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalAthletes,
  totalRevenue,
  pendingPayments,
  confirmedPayments,
  registrationFee,
  confirmedRevenue,
  pendingRevenue,
  formatCurrency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {/* Number of Registrations */}
      <StatsCard
        title="Inscrições"
        value={totalAthletes}
        description="Total de atletas inscritos"
        icon={<Users size={18} className="text-event-blue" />}
        borderColor="border-t-event-blue"
      />

      {/* Total Revenue */}
      <StatsCard
        title="Arrecadação Total"
        value={formatCurrency(totalRevenue)}
        description={`Valor total (${formatCurrency(registrationFee)} por inscrição)`}
        icon={<CreditCard size={18} className="text-green-500" />}
        borderColor="border-t-green-500"
        valueClassName="text-green-600"
      />

      {/* Confirmed Revenue */}
      <StatsCard
        title="Arrecadação Confirmada"
        value={formatCurrency(confirmedRevenue)}
        description="Valor total de pagamentos confirmados"
        icon={<CheckCircle size={18} className="text-blue-500" />}
        borderColor="border-t-blue-500"
        valueClassName="text-blue-600"
      />

      {/* Pending Revenue */}
      <StatsCard
        title="Arrecadação Pendente"
        value={formatCurrency(pendingRevenue)}
        description="Valor total de pagamentos pendentes"
        icon={<AlertCircle size={18} className="text-orange-500" />}
        borderColor="border-t-orange-500"
        valueClassName="text-orange-600"
      />
      
      {/* Pending Payments */}
      <StatsCard
        title="Pagamentos Pendentes"
        value={pendingPayments}
        description="Inscrições aguardando confirmação"
        icon={<Clock size={18} className="text-orange-500" />}
        borderColor="border-t-orange-500"
        valueClassName="text-orange-600"
      />
      
      {/* Confirmed Payments */}
      <StatsCard
        title="Pagamentos Confirmados"
        value={confirmedPayments}
        description="Inscrições com pagamento confirmado"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>}
        borderColor="border-t-blue-500"
        valueClassName="text-blue-600"
      />
    </div>
  );
};

export default DashboardStats;
