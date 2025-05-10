
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';

interface Athlete {
  id: string;
  full_name: string;
  cpf: string;
  birth_date: string;
  email: string;
  phone: string;
  gender: string;
  course: string;
  shirt_size: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

interface AthletesTableProps {
  athletes: Athlete[];
  formatDate: (dateString: string) => string;
  mapGender: (gender: string) => string;
  mapShirtSize: (size: string) => string;
  mapPaymentMethod: (method: string) => string;
  mapPaymentStatus: (status: string) => string;
}

const AthletesTable: React.FC<AthletesTableProps> = ({
  athletes,
  formatDate,
  mapGender,
  mapShirtSize,
  mapPaymentMethod,
  mapPaymentStatus
}) => {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AthletesTable;
