
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardCheck } from 'lucide-react';

interface RegistrationInfoCardProps {
  course?: string;
  shirtSize?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  createdAt?: string;
}

const RegistrationInfoCard: React.FC<RegistrationInfoCardProps> = ({
  course,
  shirtSize,
  paymentMethod,
  paymentStatus,
  createdAt
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const normalizeStatus = (status?: string) => {
    if (!status) return "";
    return status.toLowerCase();
  };

  const getPaymentStatusText = (status?: string) => {
    const normalizedStatus = normalizeStatus(status);
    switch (normalizedStatus) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'canceled': return 'Cancelado';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };
  
  const getPaymentStatusClass = (status?: string) => {
    const normalizedStatus = normalizeStatus(status);
    switch (normalizedStatus) {
      case 'pending': return 'text-yellow-600 font-bold';
      case 'confirmed': return 'text-green-600 font-bold';
      case 'canceled': return 'text-red-600 font-bold';
      case 'cancelled': return 'text-red-600 font-bold';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="overflow-hidden border-t-4 border-blue-400 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          <CardTitle className="text-lg font-medium">Dados da Inscrição</CardTitle>
        </div>
        <CardDescription className="text-blue-100">
          Detalhes da sua participação no evento
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Percurso</h4>
          {course ? (
            <p className="text-gray-900 font-medium">{course}</p>
          ) : (
            <Skeleton className="h-5 w-1/2" />
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Tamanho da Camiseta</h4>
          {shirtSize ? (
            <p className="text-gray-900">{shirtSize}</p>
          ) : (
            <Skeleton className="h-5 w-1/4" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Forma de pagamento</h4>
            {paymentMethod ? (
              <p className="text-gray-900">
                {paymentMethod === 'pix' || paymentMethod === 'PIX' ? 'PIX' : 
                 paymentMethod === 'credit_card' || paymentMethod === 'CARTAO_CREDITO' ? 'Cartão de Crédito' : 
                 paymentMethod === 'bank_slip' ? 'Boleto' : paymentMethod}
              </p>
            ) : (
              <Skeleton className="h-5 w-3/4" />
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status do pagamento</h4>
            {paymentStatus ? (
              <p className={`${getPaymentStatusClass(paymentStatus)} text-lg`}>
                {getPaymentStatusText(paymentStatus)}
              </p>
            ) : (
              <Skeleton className="h-5 w-1/2" />
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Data da inscrição</h4>
          {createdAt ? (
            <p className="text-gray-900">{formatDate(createdAt)}</p>
          ) : (
            <Skeleton className="h-5 w-3/4" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationInfoCard;
