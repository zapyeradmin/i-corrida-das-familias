
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-blue-700">Área do Atleta</CardTitle>
            <CardDescription>
              Acesse os detalhes da sua inscrição
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o email cadastrado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cpf" className="text-sm font-medium">
                  Senha (3 primeiros dígitos do CPF)
                </label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="Exemplo: 123"
                  maxLength={3}
                  value={cpfPrefix}
                  onChange={(e) => setCpfPrefix(e.target.value.replace(/\D/g, ''))}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Para acessar, digite os 3 primeiros dígitos do CPF cadastrado no momento da inscrição.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
                variant="homeButton"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
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
