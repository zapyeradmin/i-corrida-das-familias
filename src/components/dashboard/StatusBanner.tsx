
import React from 'react';
import { Clock, Medal } from 'lucide-react';

interface StatusBannerProps {
  paymentStatus?: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ paymentStatus }) => {
  if (paymentStatus === 'CONFIRMED') {
    return (
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center">
          <Medal className="h-12 w-12 mr-4" />
          <div>
            <h3 className="font-bold text-xl">Inscrição Confirmada!</h3>
            <p>Sua inscrição para a Corrida das Famílias 2025 está confirmada. Nos vemos no evento!</p>
          </div>
        </div>
      </div>
    );
  } else if (paymentStatus === 'PENDING') {
    return (
      <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center">
          <Clock className="h-12 w-12 mr-4" />
          <div>
            <h3 className="font-bold text-xl">Pagamento Pendente</h3>
            <p>Realize o pagamento para confirmar sua participação na Corrida das Famílias 2025.</p>
            <a
              href="https://loja.infinitepay.io/francojoao91/rpt3350-inscricao-corrida-das-familias-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-white text-yellow-600 px-3 py-1 rounded-md font-medium hover:bg-yellow-50 transition-colors"
            >
              Realizar Pagamento
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default StatusBanner;
