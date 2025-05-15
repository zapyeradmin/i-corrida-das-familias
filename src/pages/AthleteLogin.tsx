
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAthleteAuth } from '@/hooks/useAthleteAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { UserRound, Lock, ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';

const AthleteLogin = () => {
  const [email, setEmail] = useState('');
  const [cpfPrefix, setCpfPrefix] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, athlete } = useAthleteAuth();
  const navigate = useNavigate();

  // Check if athlete is already logged in
  useEffect(() => {
    if (athlete) {
      navigate('/atleta/perfil');
    }
  }, [athlete, navigate]);

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
      console.log(`Tentando login para: ${email}`);
      const success = await login(email, cpfPrefix);
      
      if (success) {
        console.log('Login bem-sucedido, redirecionando...');
        toast.success('Login realizado com sucesso!');
        navigate('/atleta/perfil');
      } else {
        console.log('Login falhou');
        // Toast já é exibido dentro da função login
      }
    } catch (error: any) {
      console.error('Erro ao processar login:', error);
      toast.error(`Erro ao fazer login: ${error.message || 'Tente novamente mais tarde.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-6 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/8c9850a2-afd7-4d7b-bc61-72f5543885c8.png" 
            alt="Corrida das Famílias" 
            className="h-16 md:h-20 mx-auto mb-2"
          />
          <p className="text-gray-600 text-sm md:text-base">Acesse sua área de atleta</p>
        </div>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
          <CardHeader className="space-y-1 text-center pb-2 px-4 md:px-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
              Área do Atleta
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-gray-600">
              Acesse os detalhes da sua inscrição
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 md:px-6 py-3">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 text-sm md:text-base"
                    inputMode="email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpfPrefix" className="text-sm font-medium text-gray-700">
                  Senha (3 primeiros dígitos do CPF)
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="cpfPrefix"
                    type="text"
                    placeholder="Exemplo: 123"
                    maxLength={3}
                    value={cpfPrefix}
                    onChange={(e) => setCpfPrefix(e.target.value.replace(/\D/g, ''))}
                    required
                    className="pl-10 text-sm md:text-base"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 italic">
                  Para acessar, digite os 3 primeiros dígitos do CPF cadastrado no momento da inscrição.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 py-5 text-sm md:text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                    Processando...
                  </div>
                ) : (
                  'Acessar minha inscrição'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 bg-gray-50 px-4 md:px-6 py-4">            
            <Link to="/" className="w-full">
              <Button variant="homeButton" size="lg" className="w-full flex items-center justify-center gap-2 py-5 text-sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar à Página Inicial
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center mt-6 text-xs md:text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Corrida das Famílias. por Zapyer Soluções em Tecnologia. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default AthleteLogin;
