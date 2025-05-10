
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Check, Trash, MessageSquare } from 'lucide-react';
import { Athlete } from '@/hooks/useAthletesData';

interface AthletesTableProps {
  athletes: Athlete[];
  formatDate: (dateString: string) => string;
  mapGender: (gender: string) => string;
  mapShirtSize: (size: string) => string;
  mapPaymentMethod: (method: string) => string;
  mapPaymentStatus: (status: string) => string;
  onEditAthlete: (athlete: Athlete) => void;
  onConfirmPayment: (athleteId: string) => void;
  onDeleteAthlete: (athleteId: string) => void;
}

const AthletesTable: React.FC<AthletesTableProps> = ({
  athletes,
  formatDate,
  mapGender,
  mapShirtSize,
  mapPaymentMethod,
  mapPaymentStatus,
  onEditAthlete,
  onConfirmPayment,
  onDeleteAthlete
}) => {
  // Função para formatar o número de telefone para uso no link do WhatsApp
  const formatWhatsAppNumber = (phone: string) => {
    // Remove todos os caracteres não numéricos
    const numbersOnly = phone.replace(/\D/g, '');
    
    // Se o número já começar com 55 (código do Brasil), não adiciona novamente
    if (numbersOnly.startsWith('55')) {
      return numbersOnly;
    }
    
    return `55${numbersOnly}`;
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-600">Nome</TableHead>
            <TableHead className="font-semibold text-gray-600">CPF</TableHead>
            <TableHead className="font-semibold text-gray-600">Data de Nascimento</TableHead>
            <TableHead className="font-semibold text-gray-600">Email</TableHead>
            <TableHead className="font-semibold text-gray-600">Telefone</TableHead>
            <TableHead className="font-semibold text-gray-600">Gênero</TableHead>
            <TableHead className="font-semibold text-gray-600">Percurso</TableHead>
            <TableHead className="font-semibold text-gray-600">Camisa</TableHead>
            <TableHead className="font-semibold text-gray-600">Pagamento</TableHead>
            <TableHead className="font-semibold text-gray-600">Status</TableHead>
            <TableHead className="font-semibold text-gray-600">Data de Inscrição</TableHead>
            <TableHead className="font-semibold text-gray-600">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow key={athlete.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{athlete.full_name}</TableCell>
              <TableCell>{athlete.cpf}</TableCell>
              <TableCell>{formatDate(athlete.birth_date)}</TableCell>
              <TableCell>{athlete.email}</TableCell>
              <TableCell>{athlete.phone}</TableCell>
              <TableCell>{mapGender(athlete.gender)}</TableCell>
              <TableCell>{athlete.course}</TableCell>
              <TableCell>{mapShirtSize(athlete.shirt_size)}</TableCell>
              <TableCell>{mapPaymentMethod(athlete.payment_method)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  athlete.payment_status === 'CONFIRMED' 
                    ? 'bg-green-100 text-green-800' 
                    : athlete.payment_status === 'CANCELLED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {mapPaymentStatus(athlete.payment_status)}
                </span>
              </TableCell>
              <TableCell>{new Date(athlete.created_at).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditAthlete(athlete)}
                    title="Editar inscrição"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </Button>
                  
                  {athlete.payment_status !== 'CONFIRMED' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onConfirmPayment(athlete.id)}
                      title="Confirmar pagamento"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeleteAthlete(athlete.id)}
                    title="Excluir inscrição"
                  >
                    <Trash className="h-4 w-4 text-red-600" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    title="Falar no WhatsApp"
                  >
                    <a 
                      href={`https://wa.me/${formatWhatsAppNumber(athlete.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AthletesTable;
