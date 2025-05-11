
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Home } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const CardPayment = () => {
  const isMobile = useIsMobile();
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 mt-16">
        {/* Back to Home Button */}
        <div className="mb-6 md:mb-8">
          <Link to="/">
            <Button 
              variant="homeButton" 
              size="lg" 
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Home className="h-4 w-4" />
              Voltar à Página Inicial
            </Button>
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-blue-800 font-poppins">
              Pagamento com <span className="text-event-blue">Cartão</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto px-2">
              Complete seu pagamento para confirmar sua inscrição na 1ª Corrida das Famílias 2025
            </p>
            <div className="mt-3 md:mt-4">
              <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-blue-100 text-blue-800 text-sm">
                <span className="mr-2">●</span> Aguardando pagamento
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-t-4 border-event-blue mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white py-4 md:py-6">
              <CardTitle className="text-xl md:text-2xl text-center text-blue-800">Inscrição Individual</CardTitle>
              <CardDescription className="text-center text-sm md:text-base">
                1ª Corrida das Famílias 2025
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center space-y-6 md:space-y-8 p-4 md:p-8">
              {/* Payment Amount */}
              <div className="bg-blue-600 text-white w-full py-3 px-4 rounded-lg text-center shadow-md">
                <h3 className="text-lg md:text-xl font-semibold">Valor da Inscrição</h3>
                <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">R$ 47,00</p>
                <p className="text-xs md:text-sm mt-1 opacity-90">Realize o pagamento clicando no botão abaixo</p>
              </div>
              
              {/* Credit Card Image - UPDATED IMAGE */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg w-full flex justify-center">
                <img src="/lovable-uploads/5d9336c3-1fd7-432b-880f-fa60531c407b.png" alt="Corrida das Famílias" className="max-w-full h-auto md:max-w-md" />
              </div>
              
              <Separator className="my-3 md:my-6" />
              
              {/* Payment Button */}
              <Button className="w-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all py-3 md:py-6 text-sm md:text-base" onClick={() => window.open("https://loja.infinitepay.io/francojoao91/rpt3350-inscricao-corrida-das-familias-2025", "_blank")}>
                <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Seguir para pagamento
              </Button>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 md:space-y-6 p-4 md:p-6 bg-gradient-to-b from-white to-blue-50">
              <div className="bg-yellow-50 p-3 md:p-4 rounded-lg w-full text-xs md:text-sm border border-yellow-100">
                <p className="font-medium text-yellow-800 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Observação importante:
                </p>
                <p className="text-gray-700 ml-7">
                  Ao realizar o pagamento, enviar o comprovante e as informações de <span className="font-semibold">Nome</span> e <span className="font-semibold">CPF</span> do inscrito para o WhatsApp: <span className="font-semibold">(87) 99670-9355</span>.
                </p>
                <p className="text-gray-700 mt-2 md:mt-3 font-medium text-center text-xs md:text-sm">
                  A inscrição somente será aprovada após confirmação.
                </p>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all py-3 md:py-6 text-sm md:text-base" onClick={() => window.open("http://wa.me/5587996709355", "_blank")}>
                <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Enviar minha Confirmação de Pagamento
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>;
};
export default CardPayment;
