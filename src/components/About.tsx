
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Sobre o <span className="gradient-text">Evento</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          O primeiro grande evento de corrida de rua para famílias em Serra Talhada, idealizado pelo ECC da Paróquia do Rosário, unindo fé, esporte e solidariedade.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="custom-card overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop" 
              alt="Atletas correndo em evento" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="text-gray-700">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 font-poppins">
              Uma Experiência Única de Alegria, Fé e Saúde
            </h3>
            <p className="mb-6 text-lg leading-relaxed">
              A Corrida das Famílias é mais que uma competição, é um convite para unir a família em um momento especial de esporte, Fé, saúde e diversão. Um evento que promove a integração social e o bem-estar de todos.
            </p>
            
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Data e Horários</h4>
                  <p className="text-gray-600">
                    <strong>Data:</strong> 25 de Outubro de 2025<br />
                    <strong>Concentração:</strong> 06:00 | <strong>Largada 5Km:</strong> 07:00
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Localização Estratégica</h4>
                  <p className="text-gray-600">
                    <strong>Local:</strong> Praça Central da Cidade - Fácil acesso e infraestrutura completa.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-event-orange text-white flex items-center justify-center mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Suporte ao Atleta</h4>
                  <p className="text-gray-600">
                    <strong>5 Pontos de Apoio:</strong> Hidratação, frutas e suporte médico ao longo dos 5Km para garantir seu bem-estar.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
