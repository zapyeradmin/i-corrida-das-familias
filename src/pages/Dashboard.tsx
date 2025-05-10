
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
import { Users, CreditCard, Clock, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  
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
  const pendingPayments = athletes.filter(a => a.payment_status === 'PENDING').length;
  const confirmedPayments = athletes.filter(a => a.payment_status === 'CONFIRMED').length;
  
  // Filter athletes based on search term and payment status
  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.cpf.includes(searchTerm);
    
    const matchesPaymentFilter = 
      paymentFilter === 'all' || 
      athlete.payment_status === paymentFilter.toUpperCase();
    
    return matchesSearch && matchesPaymentFilter;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-event-blue-dark to-event-blue text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-poppins">Dashboard Administrativo</h1>
            <p className="text-blue-100">Corrida XPTO - Gerenciamento de Inscrições</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-2 bg-blue-800 bg-opacity-50 rounded-md">
              <span className="text-sm font-medium">
                {user?.email}
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="bg-white text-blue-800 hover:bg-blue-50 border-none"
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section with modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Number of Registrations */}
          <Card className="overflow-hidden border-t-4 border-t-event-blue shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Users size={18} className="text-event-blue" />
                Inscrições
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-gray-800">{totalAthletes}</div>
              <p className="text-sm text-gray-500 mt-2">Total de atletas inscritos</p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card className="overflow-hidden border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <CreditCard size={18} className="text-green-500" />
                Arrecadação
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
              <p className="text-sm text-gray-500 mt-2">Valor total ({formatCurrency(registrationFee)} por inscrição)</p>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card className="overflow-hidden border-t-4 border-t-orange-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Clock size={18} className="text-orange-500" />
                Pagamentos Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-orange-600">
                {pendingPayments}
              </div>
              <p className="text-sm text-gray-500 mt-2">Inscrições aguardando confirmação</p>
            </CardContent>
          </Card>
          
          {/* Confirmed Payments */}
          <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Pagamentos Confirmados
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-blue-600">
                {confirmedPayments}
              </div>
              <p className="text-sm text-gray-500 mt-2">Inscrições com pagamento confirmado</p>
            </CardContent>
          </Card>
        </div>

        {/* Athletes Table */}
        <Card className="shadow-md border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl font-poppins text-gray-800">
                Lista de Atletas Inscritos
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search box */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar por nome, email ou CPF..."
                    className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-event-blue focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Filter by payment status */}
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="confirmed">Confirmados</SelectItem>
                    <SelectItem value="cancelled">Cancelados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <div className="px-6 py-4 bg-white">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-event-blue"></div>
                  <p className="text-sm text-gray-500 mt-2">Carregando dados...</p>
                </div>
              </div>
            ) : filteredAthletes.length === 0 ? (
              <div className="text-center p-12 text-gray-500 bg-gray-50 rounded-md">
                {searchTerm || paymentFilter !== 'all' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="mt-2">Nenhum resultado encontrado para sua busca.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm('');
                        setPaymentFilter('all');
                      }}
                    >
                      Limpar filtros
                    </Button>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="mt-2">Nenhum atleta inscrito ainda.</p>
                  </>
                )}
              </div>
            ) : (
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
                    {filteredAthletes.map((athlete) => (
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
            )}
            
            {/* Pagination and results count */}
            {filteredAthletes.length > 0 && (
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>
                  Exibindo {filteredAthletes.length} de {totalAthletes} atletas
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2025 Corrida XPTO. Dashboard Administrativo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
