
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';

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
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCpf = (cpf?: string) => {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <Card className="overflow-hidden border-t-4 border-blue-500 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <CardTitle className="text-lg font-medium">Dados do Atleta</CardTitle>
        </div>
        <CardDescription className="text-blue-100">
          Informações pessoais do participante
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Nome completo</h4>
          {fullName ? (
            <p className="text-gray-900 font-medium">{fullName}</p>
          ) : (
            <Skeleton className="h-5 w-3/4" />
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">E-mail</h4>
          {email ? (
            <p className="text-gray-900">{email}</p>
          ) : (
            <Skeleton className="h-5 w-full" />
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">CPF</h4>
          {cpf ? (
            <p className="text-gray-900">{formatCpf(cpf)}</p>
          ) : (
            <Skeleton className="h-5 w-1/2" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Data de nascimento</h4>
            {birthDate ? (
              <p className="text-gray-900">{formatDate(birthDate)}</p>
            ) : (
              <Skeleton className="h-5 w-3/4" />
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Sexo</h4>
            {gender ? (
              <p className="text-gray-900">{gender === 'M' ? 'Masculino' : 'Feminino'}</p>
            ) : (
              <Skeleton className="h-5 w-1/2" />
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Telefone</h4>
          {phone ? (
            <p className="text-gray-900">{phone}</p>
          ) : (
            <Skeleton className="h-5 w-1/2" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteInfoCard;
