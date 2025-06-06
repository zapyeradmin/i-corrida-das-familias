
import React from 'react';

const CourseMap = () => {
  return (
    <section id="course" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Percurso <span className="gradient-text">Desafiador</span> (5Km)
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Explore um trajeto de 5km que combina desafio e beleza, passando por pontos icônicos de Serra Talhada.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="custom-card overflow-hidden">
              <img 
                src="/lovable-uploads/7e0260b1-64d8-41c9-bdce-91f558647522.png" 
                alt="Mapa do Percurso da Corrida de 5km" 
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              Mapa do percurso. Com detalhes das rotas e Pontos de Apoio e Hidratação.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 text-gray-700">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 font-poppins">
              Explore a Cidade Correndo
            </h3>
            <p className="mb-6 text-lg leading-relaxed">
              O percurso de 5km foi desenhado para ser acessível a todos os níveis de corredores, desde iniciantes até os mais experientes, proporcionando uma experiência inesquecível.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl text-event-orange mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Trajeto Principal</h4>
                  <p className="text-gray-600">
                    Largada e chegada na Igreja Matriz do Rosário - Rua Cornélio Soares, Rua Joca Magalhães, Rua José Alves da Silveira, Avenida Afonso Magalhães (retorno no cruzamento com a Rua Neco Maranhão, Próximo à Drogaria DjaFarma), Rua Enock Ignácio de Oliveira, Rua Joaquim Conrado de Lorena e Sá, Retorno à Rua Cornélio Soares e chegada na Igreja Matriz do Rosário - Rua Cornélio Soares.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl text-event-orange mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Sinalização e Apoio</h4>
                  <p className="text-gray-600">
                    Percurso sinalizado, com staff dedicado e pontos de hidratação 1Km.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl text-event-orange mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Altimetria</h4>
                  <p className="text-gray-600">
                    Percurso 100% asfaltado, com poucas elevações ideal para uma corrida sem grandes dificuldades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseMap;
