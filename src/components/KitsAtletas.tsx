import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Medal, Droplet, Ticket, Shirt } from 'lucide-react';
const KitsAtletas = () => {
  return <section id="kits" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Kit dos <span className="gradient-text">Atletas</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Confira todos os itens exclusivos que você receberá no seu kit atleta para tornar sua experiência ainda mais especial.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="custom-card overflow-hidden">
            <img alt="Kit dos Atletas - Camisa, número e garrafa de água" className="w-full h-auto object-contain" src="/lovable-uploads/8d9963c7-ec7f-4e2a-b1ad-d1f5c9ee9f33.jpg" />
          </div>
          
          <div className="text-gray-700">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 font-poppins">
              Kit Completo para sua Corrida
            </h3>
            <p className="mb-6 text-lg leading-relaxed">
              Preparamos um kit especial para que você tenha tudo o que precisa para participar da corrida com conforto e estilo. Cada item foi cuidadosamente selecionado pensando na sua experiência.
            </p>
            
            <Card className="mb-4 hover:shadow-lg transition-all border-l-4 border-l-event-blue">
              <CardContent className="p-4 flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <Shirt className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Camiseta Oficial</h4>
                  <p className="text-gray-600">
                    Camiseta técnica exclusiva do evento, confortável e respirável, com arte especial da corrida.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-4 hover:shadow-lg transition-all border-l-4 border-l-event-blue">
              <CardContent className="p-4 flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <Ticket className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Número de Peito</h4>
                  <p className="text-gray-600">
                    Número de identificação personalizado com chip de cronometragem integrado.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-4 hover:shadow-lg transition-all border-l-4 border-l-event-blue">
              <CardContent className="p-4 flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <Droplet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Hidratação</h4>
                  <p className="text-gray-600">
                    Hidratação durante todo percurso, disponibilizando água para você.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-4 hover:shadow-lg transition-all border-l-4 border-l-event-blue">
              <CardContent className="p-4 flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <Medal className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Medalha Finisher</h4>
                  <p className="text-gray-600">
                    Medalha comemorativa exclusiva para todos que completarem o percurso.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default KitsAtletas;