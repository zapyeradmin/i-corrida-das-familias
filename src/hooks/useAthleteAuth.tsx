
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

interface Athlete {
  id: string;
  full_name: string;
  email: string;
  cpf?: string;
  birth_date?: string;
  phone?: string;
  gender?: string;
  course?: string;
  shirt_size?: string;
  payment_method?: string;
  payment_status?: string;
  created_at?: string;
}

interface AthleteAuthContextType {
  athlete: Athlete | null;
  loading: boolean;
  login: (email: string, cpfPrefix: string) => Promise<boolean>;
  logout: () => void;
  verifyAthleteSession: () => Promise<boolean>;
}

interface AthleteLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  athlete?: Athlete;
}

const AthleteAuthContext = createContext<AthleteAuthContextType | undefined>(undefined);

// Local storage key for athlete token
const ATHLETE_TOKEN_KEY = 'athlete_auth_token';

export const AthleteAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica a sessão do atleta ao carregar a página
  useEffect(() => {
    const checkSession = async () => {
      await verifyAthleteSession();
      setLoading(false);
    };

    checkSession();
  }, []);

  // Verifica se existe um token salvo e se ele é válido
  const verifyAthleteSession = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem(ATHLETE_TOKEN_KEY);
      
      if (!token) {
        return false;
      }

      const { data, error } = await supabase.rpc('verify_athlete_token', { token });
      
      if (error || !data) {
        localStorage.removeItem(ATHLETE_TOKEN_KEY);
        setAthlete(null);
        return false;
      }

      const typedData = data as unknown as AthleteLoginResponse;
      
      if (!typedData.success) {
        localStorage.removeItem(ATHLETE_TOKEN_KEY);
        setAthlete(null);
        return false;
      }

      if (typedData.athlete) {
        setAthlete(typedData.athlete);
      }
      return true;
    } catch (error) {
      console.error('Erro ao verificar sessão do atleta:', error);
      localStorage.removeItem(ATHLETE_TOKEN_KEY);
      setAthlete(null);
      return false;
    }
  };

  // Login do atleta usando email e os 3 primeiros dígitos do CPF
  const login = async (email: string, cpfPrefix: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('athlete_login', {
        email_input: email,
        cpf_prefix: cpfPrefix
      });

      if (error || !data) {
        toast.error('Erro ao fazer login. Verifique suas credenciais.');
        return false;
      }

      const typedData = data as unknown as AthleteLoginResponse;
      
      if (!typedData.success) {
        toast.error(typedData.message || 'Credenciais inválidas.');
        return false;
      }

      // Salva o token e os dados do atleta
      if (typedData.token && typedData.athlete) {
        localStorage.setItem(ATHLETE_TOKEN_KEY, typedData.token);
        setAthlete(typedData.athlete);
        toast.success('Login realizado com sucesso!');
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
      return false;
    }
  };

  // Logout do atleta - Corrigido para garantir limpeza completa do estado
  const logout = () => {
    try {
      // Remove o token de autenticação
      localStorage.removeItem(ATHLETE_TOKEN_KEY);
      
      // Limpa o estado do atleta
      setAthlete(null);
      
      // Notifica o usuário
      toast.success('Você saiu da sua conta.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao sair da conta. Tente novamente.');
    }
  };

  return (
    <AthleteAuthContext.Provider 
      value={{ 
        athlete, 
        loading, 
        login, 
        logout, 
        verifyAthleteSession 
      }}
    >
      {children}
    </AthleteAuthContext.Provider>
  );
};

export const useAthleteAuth = () => {
  const context = useContext(AthleteAuthContext);
  if (context === undefined) {
    throw new Error('useAthleteAuth deve ser usado dentro de um AthleteAuthProvider');
  }
  return context;
};
