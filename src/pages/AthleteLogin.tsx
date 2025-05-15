
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { UserRound, Lock } from 'lucide-react';

const AthleteLogin = () => {
  const [email, setEmail] = useState('');
  const [cpfPrefix, setCpfPrefix] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAthleteAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !cpfPrefix) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    if (cpfPrefix.length !== 3) {
      toast.error('A senha deve ser os 3 primeiros dígitos do seu CPF.');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, cpfPrefix);
      if (success) {
        navigate('/atleta/perfil');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-700 to-blue-900">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-sm border-blue-200">
          <CardHeader className="space-y-2 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Área do Atleta</CardTitle>
            <CardDescription className="text-blue-100">
              Acesse os detalhes da sua inscrição
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite o email cadastrado"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                  Senha (3 primeiros dígitos do CPF)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="Exemplo: 123"
                    maxLength={3}
                    value={cpfPrefix}
                    onChange={(e) => setCpfPrefix(e.target.value.replace(/\D/g, ''))}
                    className="pl-10 border-blue-200 focus:border-blue-500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 italic">
                  Para acessar, digite os 3 primeiros dígitos do CPF cadastrado no momento da inscrição.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                    Acessando...
                  </div>
                ) : (
                  'Acessar minha inscrição'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AthleteLogin;
