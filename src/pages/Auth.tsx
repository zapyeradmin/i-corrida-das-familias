
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, Home } from 'lucide-react';
import { Label } from '@/components/ui/label';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Try to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <p className="text-gray-600 text-sm md:text-base">Acesse o painel administrativo</p>
        </div>
        
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
          <CardHeader className="space-y-1 text-center pb-2 px-4 md:px-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
              Bem-vindo de volta!
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-gray-600">
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 md:px-6 py-3">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
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
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 text-sm md:text-base"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? 
                      <EyeOff className="h-4 w-4" /> : 
                      <Eye className="h-4 w-4" />
                    }
                  </button>
                </div>
                <p className="text-xs text-right text-gray-500">
                  Mínimo de 6 caracteres
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 py-5 text-sm md:text-base font-medium"
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 bg-gray-50 px-4 md:px-6 py-4">            
            <Link to="/" className="w-full">
              <Button variant="homeButton" size="lg" className="w-full flex items-center justify-center gap-2 py-5 text-sm">
                <Home className="h-4 w-4" />
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

export default Auth;
