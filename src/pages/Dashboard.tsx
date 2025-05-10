
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the Athlete interface based on our database schema
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

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Format currency for Brazilian Real
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Format the date for Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  // Maps the database values to human-readable values
  const mapGender = (gender: string) => {
    const genderMap: Record<string, string> = {
      'MASCULINO': 'Masculino',
      'FEMININO': 'Feminino',
      'OUTRO': 'Outro',
      'PREFIRO_NAO_INFORMAR': 'Prefiro não informar'
    };
    return genderMap[gender] || gender;
  };

  const mapShirtSize = (size: string) => {
    const sizeMap: Record<string, string> = {
      'P_INFANTIL': 'P Infantil',
      'P': 'P Adulto',
      'M': 'M Adulto',
      'G': 'G Adulto',
      'GG': 'GG Adulto',
      'XGG': 'XGG Adulto'
    };
    return sizeMap[size] || size;
  };

  const mapPaymentMethod = (method: string) => {
    const methodMap: Record<string, string> = {
      'PIX': 'PIX',
      'DINHEIRO': 'Dinheiro',
      'TRANSFERENCIA': 'Transferência Bancária',
      'CARTAO_CREDITO': 'Cartão de Crédito'
    };
    return methodMap[method] || method;
  };

  const mapPaymentStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'Pendente',
      'CONFIRMED': 'Confirmado',
      'CANCELLED': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        
        // Ensure we're authenticated before fetching athletes
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!session) {
          throw new Error('Usuário não autenticado');
        }
        
        const { data, error } = await supabase
          .from('athletes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching athletes:', error.message);
          throw error;
        }
        
        setAthletes(data || []);
      } catch (error: any) {
        console.error('Erro ao carregar atletas:', error);
        toast.error(`Erro ao carregar atletas: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  // Calculate statistics
  const totalAthletes = athletes.length;
  const registrationFee = 47.0; // R$ 47,00 per registration
  const totalRevenue = totalAthletes * registrationFee;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>
            <Button 
              variant="outline" 
              onClick={signOut}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Number of Registrations */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Inscrições</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalAthletes}</div>
              <p className="text-sm text-gray-500 mt-2">Total de atletas inscritos</p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Arrecadação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
              <p className="text-sm text-gray-500 mt-2">Valor total ({formatCurrency(registrationFee)} por inscrição)</p>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pagamentos Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {athletes.filter(a => a.payment_status === 'PENDING').length}
              </div>
              <p className="text-sm text-gray-500 mt-2">Inscrições aguardando confirmação</p>
            </CardContent>
          </Card>
        </div>

        {/* Athletes Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Lista de Atletas Inscritos
            </h3>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
            </div>
          ) : athletes.length === 0 ? (
            <div className="text-center p-12 text-gray-500">
              Nenhum atleta inscrito ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Gênero</TableHead>
                    <TableHead>Percurso</TableHead>
                    <TableHead>Tamanho da Camisa</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Inscrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {athletes.map((athlete) => (
                    <TableRow key={athlete.id}>
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
