
import React from 'react';

interface StatusBannerProps {
  paymentStatus?: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ paymentStatus }) => {
  if (!paymentStatus) return null;

  let bgColor = 'bg-yellow-400';
  let textColor = 'text-yellow-900';
  let message = 'Sua inscrição está pendente de pagamento. Finalize para garantir sua vaga!';
  
  if (paymentStatus === 'confirmed') {
    bgColor = 'bg-green-500';
    textColor = 'text-white';
    message = 'Inscrição confirmada! Você está oficialmente inscrito no evento.';
  } else if (paymentStatus === 'canceled') {
    bgColor = 'bg-red-500';
    textColor = 'text-white';
    message = 'Sua inscrição foi cancelada. Entre em contato com o suporte para mais informações.';
  }
  
  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg mb-6 shadow-md flex items-center justify-center text-center font-medium`}>
      {message}
    </div>
  );
};

export default StatusBanner;
