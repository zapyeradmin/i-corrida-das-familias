import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define the Athlete interface
export interface Athlete {
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

export const useAthletesData = () => {
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

  // Update athlete information
  const updateAthlete = async (updatedAthlete: Athlete) => {
    try {
      const { error } = await supabase
        .from('athletes')
        .update({
          full_name: updatedAthlete.full_name,
          cpf: updatedAthlete.cpf,
          birth_date: updatedAthlete.birth_date,
          email: updatedAthlete.email,
          phone: updatedAthlete.phone,
          gender: updatedAthlete.gender,
          course: updatedAthlete.course,
          shirt_size: updatedAthlete.shirt_size,
          payment_method: updatedAthlete.payment_method,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedAthlete.id);

      if (error) throw error;

      // Refresh athlete data
      fetchAthletes();
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error updating athlete:', error);
      toast.error(`Erro ao atualizar inscrição: ${error.message}`);
      return Promise.reject(error);
    }
  };

  // Confirm payment status
  const confirmPayment = async (athleteId: string) => {
    try {
      const { error } = await supabase
        .from('athletes')
        .update({ 
          payment_status: 'CONFIRMED',
          updated_at: new Date().toISOString()
        })
        .eq('id', athleteId);

      if (error) throw error;

      toast.success('Pagamento confirmado com sucesso!');
      // Refresh athlete data
      fetchAthletes();
    } catch (error: any) {
      console.error('Error confirming payment:', error);
      toast.error(`Erro ao confirmar pagamento: ${error.message}`);
    }
  };

  // Delete athlete
  const deleteAthlete = async (athleteId: string) => {
    try {
      const { error } = await supabase
        .from('athletes')
        .delete()
        .eq('id', athleteId);

      if (error) throw error;

      toast.success('Inscrição excluída com sucesso!');
      // Refresh athlete data
      fetchAthletes();
    } catch (error: any) {
      console.error('Error deleting athlete:', error);
      toast.error(`Erro ao excluir inscrição: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  // Calculate statistics
  const totalAthletes = athletes.length;
  const registrationFee = 47.0; // R$ 47,00 per registration
  const totalRevenue = totalAthletes * registrationFee;
  const pendingPayments = athletes.filter(a => a.payment_status === 'PENDING').length;
  const confirmedPayments = athletes.filter(a => a.payment_status === 'CONFIRMED').length;
  
  // Calculate financial metrics
  const confirmedRevenue = confirmedPayments * registrationFee;
  const pendingRevenue = pendingPayments * registrationFee;
  
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

  return {
    athletes,
    filteredAthletes,
    loading,
    searchTerm,
    setSearchTerm,
    paymentFilter,
    setPaymentFilter,
    totalAthletes,
    registrationFee,
    totalRevenue,
    pendingPayments,
    confirmedPayments,
    confirmedRevenue,
    pendingRevenue,
    formatCurrency,
    formatDate,
    mapGender,
    mapShirtSize,
    mapPaymentMethod,
    mapPaymentStatus,
    updateAthlete,
    confirmPayment,
    deleteAthlete,
    fetchAthletes
  };
};
