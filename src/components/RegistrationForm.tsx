
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
  const { toast } = useToast();
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
  
  const getPaymentInstructions = (method: string): string => {
    switch(method) {
      case 'PIX':
        return 'Chave PIX: evento@corrida.com.br (CNPJ). Envie o comprovante para comprovantes@corrida.com.br com seu nome e CPF.';
      case 'TRANSFERENCIA':
        return 'Banco XPTO S.A | Ag: 0001 | C/C: 12345-6 | CNPJ: 00.000.000/0001-00. Envie o comprovante.';
      case 'DINHEIRO':
        return 'O pagamento em dinheiro deverá ser efetuado no dia da retirada do kit do atleta.';
      case 'CARTAO_CREDITO':
        return 'Opção de Cartão de Crédito indisponível no momento. Por favor, selecione outra forma de pagamento.';
      default:
        return '';
    }
  };
  
  const validateForm = (): boolean => {
    // Simple validation
    if (!formData.fullName || !formData.cpf || !formData.birthDate || 
        !formData.email || !formData.phone || !formData.gender || 
        !formData.shirtSize || !formData.paymentMethod) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return false;
    }
    
    // CPF validation (simple format check)
    const cpfPattern = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
    if (!cpfPattern.test(formData.cpf)) {
      toast({
        title: "CPF inválido",
        description: "Por favor, use o formato XXX.XXX.XXX-XX.",
        variant: "destructive"
      });
      return false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive"
      });
      return false;
    }
    
    // Birth date validation (must be in the past)
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (birthDate >= today) {
      toast({
        title: "Data de nascimento inválida",
        description: "A data de nascimento deve ser no passado.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá um e-mail de confirmação em breve.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        cpf: '',
        birthDate: '',
        email: '',
        phone: '',
        gender: '',
        shirtSize: '',
        paymentMethod: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="registration" className="pt-12 md:pt-16 pb-16 md:pb-20 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Inscreva-se e <span className="text-orange-400">Participe!</span>
        </h2>
        <p className="text-center text-blue-100 mb-10 max-w-xl mx-auto">
          Não perca tempo! Preencha o formulário abaixo e garanta sua vaga na Corrida Urbana XPTO. Vagas limitadas!
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-2xl text-gray-800 custom-card"
        >
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow"
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
                placeholder="000.000.000-00"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow"
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
                placeholder="seuemail@dominio.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow"
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
                placeholder="(00) 90000-0000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-white"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-white"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-event-orange focus:border-transparent transition-shadow bg-white"
            >
              <option value="">Selecione...</option>
              <option value="DINHEIRO">Dinheiro (Pagamento no local/dia da entrega do kit)</option>
              <option value="PIX">PIX (Instruções após inscrição)</option>
              <option value="TRANSFERENCIA">Transferência Bancária (Instruções após inscrição)</option>
              <option value="CARTAO_CREDITO">Cartão de Crédito (Indisponível no momento)</option>
            </select>
            {formData.paymentMethod && (
              <p className="text-xs text-gray-500 mt-1.5">
                {getPaymentInstructions(formData.paymentMethod)}
              </p>
            )}
          </div>

          <div className="text-center">
            <button 
              type="submit"
              disabled={isSubmitting} 
              className="bg-gradient-to-r from-event-orange to-event-red hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 px-12 rounded-lg text-lg cta-button w-full sm:w-auto shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Confirmar Inscrição
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
