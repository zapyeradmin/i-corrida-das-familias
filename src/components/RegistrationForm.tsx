
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { toast: legacyToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    phone: '',
    gender: '',
    shirtSize: '',
    paymentMethod: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = (): boolean => {
    // Simple validation
    if (!formData.fullName || !formData.cpf || !formData.birthDate || !formData.email || !formData.phone || !formData.gender || !formData.shirtSize || !formData.paymentMethod) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    // CPF validation (simple format check)
    const cpfPattern = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
    if (!cpfPattern.test(formData.cpf)) {
      toast.error("CPF inválido. Por favor, use o formato XXX.XXX.XXX-XX.");
      return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Email inválido. Por favor, insira um endereço de email válido.");
      return false;
    }

    // Birth date validation (must be in the past)
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birthDate >= today) {
      toast.error("Data de nascimento inválida. A data de nascimento deve ser no passado.");
      return false;
    }
    return true;
  };

  const sendConfirmationEmail = async (name: string, email: string) => {
    try {
      console.log(`Attempting to send confirmation email to ${email} for ${name}`);
      const response = await supabase.functions.invoke('send-confirmation-email', {
        body: { name, email }
      });
      if (response.error) {
        console.error('Error response from email function:', response.error);
        throw response.error;
      }
      console.log('Email confirmation response:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Exception when sending confirmation email:', error);
      // Log the error but don't show it to the user
      return { success: false, error };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show registration closed message immediately when form is submitted
    toast.error("AS INSCRIÇÕES PARA A 1ª CORRIDA DAS FAMÍLIAS, ESTÃO ENCERRADAS. AGUARDO VOCÊ NA PRÓXIMA EDIÇÃO.");
    return;
  };

  return (
    <section id="registration" className="pt-12 md:pt-16 pb-16 md:pb-20 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins text-white">
          Inscreva-se e <span className="text-orange-400">Participe!</span>
        </h2>
        <p className="text-center text-blue-100 mb-10 max-w-xl mx-auto">
          Não perca tempo! Preencha o formulário abaixo e garanta sua vaga na Corrida das Famílias. Vagas limitadas!
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-2xl text-gray-800 custom-card">
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold mb-1 text-gray-700">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
                disabled
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed" 
              />
            </div>
            <div>
              <label htmlFor="cpf" className="block text-sm font-semibold mb-1 text-gray-700">
                CPF <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="cpf" 
                name="cpf" 
                value={formData.cpf} 
                onChange={handleChange} 
                required 
                disabled
                placeholder="000.000.000-00" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed" 
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-semibold mb-1 text-gray-700">
                Data de Nascimento <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                id="birthDate" 
                name="birthDate" 
                value={formData.birthDate} 
                onChange={handleChange} 
                required 
                disabled
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-700">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                disabled
                placeholder="seuemail@dominio.com" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed" 
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1 text-gray-700">
                Telefone/WhatsApp <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                disabled
                placeholder="(00) 90000-0000" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed" 
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold mb-1 text-gray-700">
                Gênero <span className="text-red-500">*</span>
              </label>
              <select 
                id="gender" 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                required 
                disabled
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed"
              >
                <option value="">Selecione...</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
                <option value="PREFIRO_NAO_INFORMAR">Prefiro não informar</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Percurso</label>
            <input 
              type="text" 
              value="5Km (Opção Única)" 
              disabled 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
            />
          </div>

          <div className="mb-5">
            <label htmlFor="shirtSize" className="block text-sm font-semibold mb-1 text-gray-700">
              Tamanho da Camisa <span className="text-red-500">*</span>
            </label>
            <select 
              id="shirtSize" 
              name="shirtSize" 
              value={formData.shirtSize} 
              onChange={handleChange} 
              required 
              disabled
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed"
            >
              <option value="">Selecione...</option>
              <option value="P_INFANTIL">P Infantil</option>
              <option value="P">P Adulto</option>
              <option value="M">M Adulto</option>
              <option value="G">G Adulto</option>
              <option value="GG">GG Adulto</option>
              <option value="XGG">XGG Adulto</option>
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="paymentMethod" className="block text-sm font-semibold mb-1 text-gray-700">
              Forma de Pagamento <span className="text-red-500">*</span>
            </label>
            <select 
              id="paymentMethod" 
              name="paymentMethod" 
              value={formData.paymentMethod} 
              onChange={handleChange} 
              required 
              disabled
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-gray-100 cursor-not-allowed"
            >
              <option value="">Selecione...</option>
              <option value="PIX">PIX</option>
              <option value="CARTAO_CREDITO">Cartão de Crédito</option>
            </select>
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              disabled={true}
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-3.5 px-12 rounded-lg text-lg w-full sm:w-auto shadow-xl cursor-not-allowed opacity-70"
            >
              Inscrições Encerradas
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
