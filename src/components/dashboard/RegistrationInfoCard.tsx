
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, CreditCard, MapPin, Medal, ShirtIcon } from 'lucide-react';

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
  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Não informado';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR').format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Map the payment status to a user-friendly display
  const getPaymentStatus = (status: string | undefined) => {
    switch (status) {
      case 'CONFIRMED':
        return { text: 'Confirmado', color: 'bg-green-100 text-green-800', icon: <CreditCard className="h-5 w-5" /> };
      case 'PENDING':
        return { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: <CreditCard className="h-5 w-5" /> };
      case 'CANCELLED':
        return { text: 'Cancelado', color: 'bg-red-100 text-red-800', icon: <CreditCard className="h-5 w-5" /> };
      default:
        return { text: 'Desconhecido', color: 'bg-gray-100 text-gray-800', icon: <CreditCard className="h-5 w-5" /> };
    }
  };

  // Map the payment method to a user-friendly display
  const getPaymentMethod = (method: string | undefined) => {
    switch (method) {
      case 'PIX':
        return 'PIX';
      case 'CARTAO_CREDITO':
        return 'Cartão de Crédito';
      default:
        return 'Não informado';
    }
  };
  
  // Map the shirt size to a user-friendly display
  const getShirtSize = (size: string | undefined) => {
    const sizeMap: Record<string, string> = {
      'P_INFANTIL': 'P Infantil',
      'P': 'P Adulto',
      'M': 'M Adulto',
      'G': 'G Adulto',
      'GG': 'GG Adulto',
      'XGG': 'XGG Adulto'
    };
    return sizeMap[size || ''] || size || 'Não informado';
  };

  const paymentStatusInfo = getPaymentStatus(paymentStatus);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Medal className="mr-2 h-5 w-5" />
          Informações da Inscrição
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Percurso</p>
          <p className="font-medium flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {course || '5Km'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Tamanho da Camiseta</p>
          <p className="font-medium flex items-center">
            <ShirtIcon className="mr-1 h-4 w-4" />
            {getShirtSize(shirtSize)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Método de Pagamento</p>
          <p className="font-medium flex items-center">
            <CreditCard className="mr-1 h-4 w-4" />
            {getPaymentMethod(paymentMethod)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Status do Pagamento</p>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md ${paymentStatusInfo.color}`}>
            {paymentStatusInfo.icon}
            <span className="ml-1 font-medium">{paymentStatusInfo.text}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Data da Inscrição</p>
          <p className="font-medium flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {formatDate(createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationInfoCard;
