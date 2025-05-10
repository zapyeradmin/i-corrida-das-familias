
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Cadastro realizado! Verifique seu email para confirmar a conta.');
      setView('sign-in');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {view === 'sign-in' ? 'Login' : 'Criar conta'}
          </CardTitle>
          <CardDescription>
            {view === 'sign-in' 
              ? 'Entre com suas credenciais para acessar o painel' 
              : 'Preencha os dados abaixo para criar uma nova conta'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-700 hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? 'Processando...' : view === 'sign-in' ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            {view === 'sign-in' ? (
              <p>
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setView('sign-up')}
                  className="text-blue-700 hover:underline font-medium"
                >
                  Criar conta
                </button>
              </p>
            ) : (
              <p>
                Já possui uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setView('sign-in')}
                  className="text-blue-700 hover:underline font-medium"
                >
                  Fazer login
                </button>
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
