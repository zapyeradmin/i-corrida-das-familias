
import React from 'react';

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 md:py-28 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Cronograma <span className="gradient-text">Oficial</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Fique por dentro de todas as datas e horários importantes, desde a abertura das inscrições até o grande dia!
        </p>
        
        <div className="max-w-3xl mx-auto relative pl-8">
          <div className="timeline-line"></div>
          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative timeline-item">
              <div className="custom-card p-6 ml-4">
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <h3 className="font-bold text-xl text-event-blue">Abertura das Inscrições</h3>
                  <time className="font-medium text-sm text-event-orange bg-orange-100 px-2 py-1 rounded mt-2 sm:mt-0">
                    10/05/2025
                  </time>
                </div>
                <p className="text-gray-600">
                  Garanta sua vaga na corrida mais vibrante da cidade! Inscrições online com vagas limitadas. A partir das 17h do dia 10 de maio até às 23h59 do dia 31 de maio de 2025.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative timeline-item">
              <div className="custom-card p-6 ml-4">
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <h3 className="font-bold text-xl text-event-blue">Entrega dos Kits</h3>
                  <time className="font-medium text-sm text-event-orange bg-orange-100 px-2 py-1 rounded mt-2 sm:mt-0">
                    12 e 13/05/2025
                  </time>
                </div>
                <p className="text-gray-600">
                  Retire seu kit atleta (camiseta Oficial, número) das 19:30:00 às 22:00. No Centro Pastoral da Igreja de N. Sra. da Conceição.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 3 - Highlighted */}
            <div className="relative timeline-item">
              <div className="custom-card p-6 ml-4 border-l-4 border-event-orange">
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <h3 className="font-bold text-xl text-event-orange">Dia da Corrida das Famílias!</h3>
                  <time className="font-medium text-sm text-event-orange bg-orange-100 px-2 py-1 rounded mt-2 sm:mt-0">
                    15/05/2025
                  </time>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
                  <li><strong>05:00:</strong> Concentração e Abertura da Arena das Famílias</li>
                  <li><strong>05:30:</strong> Aquecimento Coletivo</li>
                  <li><strong>06:00:</strong> Largada Oficial 5Km</li>
                  <li><strong>08:30:</strong> Início da Cerimônia de Premiação</li>
                  <li><strong>09:30:</strong> Encerramento do Evento</li>
                </ul>
              </div>
            </div>
            
            {/* Timeline Item 4 */}
            <div className="relative timeline-item">
              <div className="custom-card p-6 ml-4">
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <h3 className="font-bold text-xl text-event-blue">Fotos e Resultados</h3>
                  <time className="font-medium text-sm text-event-orange bg-orange-100 px-2 py-1 rounded mt-2 sm:mt-0">
                    15/05/2025
                  </time>
                </div>
                <p className="text-gray-600">
                  Confira os resultados oficiais e as fotos do evento no Instagram @eccrosariost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
