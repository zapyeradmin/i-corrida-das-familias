
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CheckCircle, Clock, CreditCard, MapPin, Medal, ShirtIcon, User2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AthleteDashboard = () => {
  const { athlete, logout } = useAthleteAuth();
  const navigate = useNavigate();

  // Mapeia o status de pagamento para uma exibição amigável
  const getPaymentStatus = (status: string | undefined) => {
    switch (status) {
      case 'CONFIRMED':
        return { text: 'Confirmado', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-5 w-5" /> };
      case 'PENDING':
        return { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-5 w-5" /> };
      case 'CANCELLED':
        return { text: 'Cancelado', color: 'bg-red-100 text-red-800', icon: <CreditCard className="h-5 w-5" /> };
      default:
        return { text: 'Desconhecido', color: 'bg-gray-100 text-gray-800', icon: <CreditCard className="h-5 w-5" /> };
    }
  };

  // Mapeia o método de pagamento para uma exibição amigável
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
  
  // Mapeia o tamanho da camiseta para uma exibição amigável
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

  // Mapeia o gênero para uma exibição amigável
  const getGender = (gender: string | undefined) => {
    const genderMap: Record<string, string> = {
      'MASCULINO': 'Masculino',
      'FEMININO': 'Feminino',
      'OUTRO': 'Outro',
      'PREFIRO_NAO_INFORMAR': 'Prefiro não informar'
    };
    return genderMap[gender || ''] || gender || 'Não informado';
  };

  // Formata a data para o formato brasileiro
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Não informado';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR').format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Busca o status de pagamento
  const paymentStatus = getPaymentStatus(athlete?.payment_status);

  const handleLogout = () => {
    logout();
    navigate('/atleta/login');
  };

  // Função para obter o banner adequado com base no status de pagamento
  const getStatusBanner = () => {
    if (athlete?.payment_status === 'CONFIRMED') {
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
    } else if (athlete?.payment_status === 'PENDING') {
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

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Minha Inscrição</h1>
            <Button variant="outline" onClick={handleLogout}>Sair</Button>
          </div>
          
          {getStatusBanner()}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card de Informações do Atleta */}
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
                  <p className="font-medium">{athlete?.full_name || 'Não informado'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium">{athlete?.email || 'Não informado'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium">{athlete?.cpf || 'Não informado'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Data de Nascimento</p>
                  <p className="font-medium">{formatDate(athlete?.birth_date)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{athlete?.phone || 'Não informado'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gênero</p>
                  <p className="font-medium">{getGender(athlete?.gender)}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Card de Informações da Inscrição */}
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
                    {athlete?.course || '5Km'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Tamanho da Camiseta</p>
                  <p className="font-medium flex items-center">
                    <ShirtIcon className="mr-1 h-4 w-4" />
                    {getShirtSize(athlete?.shirt_size)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Método de Pagamento</p>
                  <p className="font-medium flex items-center">
                    <CreditCard className="mr-1 h-4 w-4" />
                    {getPaymentMethod(athlete?.payment_method)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status do Pagamento</p>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md ${paymentStatus.color}`}>
                    {paymentStatus.icon}
                    <span className="ml-1 font-medium">{paymentStatus.text}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Data da Inscrição</p>
                  <p className="font-medium flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {formatDate(athlete?.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Informações do Evento */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informações do Evento</CardTitle>
              <CardDescription>
                Corrida das Famílias 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-w-16 aspect-h-9">
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/8d9963c7-ec7f-4e2a-b1ad-d1f5c9ee9f33.jpg" 
                    alt="Corrida das Famílias" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-medium">Data do Evento</h4>
                  <p>25 de Maio de 2025</p>
                </div>
                <div>
                  <h4 className="font-medium">Local</h4>
                  <p>Parque Olímpico, Rio de Janeiro</p>
                </div>
                <div>
                  <h4 className="font-medium">Horário</h4>
                  <p>7:00 - Concentração</p>
                  <p>8:00 - Largada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AthleteDashboard;
