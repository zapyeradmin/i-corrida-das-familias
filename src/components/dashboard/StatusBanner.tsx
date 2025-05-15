
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBannerProps {
  paymentStatus?: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ paymentStatus }) => {
  if (!paymentStatus) return null;

  let bgColor = 'bg-yellow-400';
  let textColor = 'text-yellow-900';
  let borderColor = 'border-yellow-500';
  let message = 'Sua inscrição está pendente de pagamento. Finalize para garantir sua vaga!';
  let icon = <AlertCircle className="h-6 w-6" />;
  
  if (paymentStatus === 'confirmed' || paymentStatus === 'CONFIRMED') {
    bgColor = 'bg-green-500';
    textColor = 'text-white';
    borderColor = 'border-green-600';
    message = 'Inscrição confirmada! Você está oficialmente inscrito no evento.';
    icon = <CheckCircle className="h-6 w-6" />;
  } else if (paymentStatus === 'canceled' || paymentStatus === 'CANCELLED') {
    bgColor = 'bg-red-500';
    textColor = 'text-white';
    borderColor = 'border-red-600';
    message = 'Sua inscrição foi cancelada. Entre em contato com o suporte para mais informações.';
    icon = <XCircle className="h-6 w-6" />;
  }
  
  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg mb-6 shadow-lg border-2 ${borderColor} flex items-center justify-center text-center font-medium animate-pulse-slow transition-all transform hover:scale-[1.01]`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default StatusBanner;
