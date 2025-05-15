
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User2 } from 'lucide-react';

interface AthleteInfoCardProps {
  fullName?: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  gender?: string;
}

const AthleteInfoCard: React.FC<AthleteInfoCardProps> = ({
  fullName,
  email,
  cpf,
  birthDate,
  phone,
  gender
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

  // Map gender to display value
  const getGender = (gender: string | undefined) => {
    const genderMap: Record<string, string> = {
      'MASCULINO': 'Masculino',
      'FEMININO': 'Feminino',
      'OUTRO': 'Outro',
      'PREFIRO_NAO_INFORMAR': 'Prefiro não informar'
    };
    return genderMap[gender || ''] || gender || 'Não informado';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User2 className="mr-2 h-5 w-5" />
          Informações do Atleta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Nome Completo</p>
          <p className="font-medium">{fullName || 'Não informado'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">E-mail</p>
          <p className="font-medium">{email || 'Não informado'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">CPF</p>
          <p className="font-medium">{cpf || 'Não informado'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Data de Nascimento</p>
          <p className="font-medium">{formatDate(birthDate)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Telefone</p>
          <p className="font-medium">{phone || 'Não informado'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Gênero</p>
          <p className="font-medium">{getGender(gender)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteInfoCard;
