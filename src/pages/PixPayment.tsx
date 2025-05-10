
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const PixPayment = () => {
  const [copied, setCopied] = useState(false);
  const pixKey = "0fbc530d-e5ec-4f9a-bf05-dc1eb52de7e1";
  
  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success("Chave PIX copiada com sucesso!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with navigation similar to main page */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Corrida das Famílias 2025</h1>
            <a href="/" className="text-white hover:text-blue-200 transition">
              Voltar ao Início
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-800">
            Pagamento PIX
          </h1>

          <Card className="shadow-lg border-t-4 border-blue-600 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Inscrição Individual</CardTitle>
              <CardDescription className="text-center text-base">
                1ª Corrida das Famílias 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {/* QR Code */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <img 
                  src="/lovable-uploads/da0135c3-6cb9-43d1-82f0-fcbe2f77da39.png" 
                  alt="QR Code PIX" 
                  className="w-64 h-64 mx-auto"
                />
              </div>
              
              {/* PIX Key */}
              <div className="w-full">
                <p className="text-gray-600 text-sm mb-1 text-center">Chave PIX:</p>
                <div className="flex items-center justify-center border rounded-md p-3 bg-gray-50">
                  <code className="text-sm bg-transparent flex-1 overflow-x-auto whitespace-nowrap px-2">
                    {pixKey}
                  </code>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyPixKey} 
                    className="ml-2 flex items-center"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="ml-1">{copied ? "Copiado" : "Copiar"}</span>
                  </Button>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-blue-50 p-4 rounded-md w-full text-sm">
                <h3 className="font-semibold text-blue-800 mb-2">Instruções:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Escaneie o QR Code ou copie a chave PIX acima</li>
                  <li>Realize o pagamento no valor da inscrição</li>
                  <li>Após o pagamento, envie o comprovante por WhatsApp junto com as informações (Nome e CPF)</li>
                  <li>Aguarde a confirmação da sua inscrição</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="bg-yellow-50 p-3 rounded-md w-full text-sm">
                <p className="font-medium text-yellow-800">Observação importante:</p>
                <p className="text-gray-700">
                  Ao realizar o pagamento, enviar o comprovante e as informações de Nome, CPF do inscrito para o WhatsApp: (87) 99670-9355.
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  A inscrição somente será aprovada após confirmação.
                </p>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                onClick={() => window.open("http://wa.me/5587996709355", "_blank")}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Enviar minha Confirmação de Pagamento
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Corrida das Famílias. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PixPayment;
