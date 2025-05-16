import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Sponsor {
  id: number;
  name: string;
  imageUrl: string;
}

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  
  useEffect(() => {
    // Carregar os patrocinadores com as novas imagens
    const loadSponsors = async () => {
      // Em uma implementação real, buscaríamos os patrocinadores do Supabase
      // const { data, error } = await supabase
      //   .from('sponsors')
      //   .select('*')
      //   .order('id', { ascending: true });
      // 
      // if (data && !error) {
      //   setSponsors(data);
      //   return;
      // }

      // Carregar as imagens atualizadas dos patrocinadores
      const sponsorImages = [
        '/lovable-uploads/49c797a9-3e44-408d-bec2-34ea3baaf0dd.png', // Zapyer (revertida)
        '/lovable-uploads/13c7321e-f573-4136-91d5-a1701fe19531.png', // JN Suplementos
        '/lovable-uploads/43524a1f-c523-4290-9fcf-8b77c8c43c18.png', // Brotinhos
        '/lovable-uploads/2cf388de-8697-4297-aab6-023b8d730209.png', // Cultura FM
        '/lovable-uploads/36cc7dce-d53a-40dc-a32d-dfc1b7002e88.png', // Hortfruti
        '/lovable-uploads/63b7e136-28bd-428a-b286-93b674097c76.png', // Pinheirinho
        '/lovable-uploads/51d9b30d-c963-48f7-822f-838438c12df0.png', // Azul Cargo Express
        '/lovable-uploads/d2b6f0f1-a6b7-4c95-82fc-5518931e685d.png', // CrediFácil
        '/lovable-uploads/d75949c2-179f-4353-ae35-8a0f96e34fd2.png', // Cefitt
        '/lovable-uploads/467bcc74-3e35-4169-9734-ab8b14b764c9.png', // Tratores Pajeu
        '/lovable-uploads/40665746-c81e-475d-8899-6f9b6ce7e1bc.png', // Tercio Siqueira
        '/lovable-uploads/85c4088e-6b92-4835-8310-ade63696b2e9.png', // TS Construtora
        '/lovable-uploads/4f6144e4-a17c-4474-b230-d9b3faadd1e0.png', // Bilisq
        '/lovable-uploads/95b23c17-efbc-427d-aa47-32d038853be9.png', // Alpha
        '/lovable-uploads/b6c425eb-49aa-49b7-8357-6bf67367e07b.png', // Márcia
        '/lovable-uploads/3ac8134f-1592-456b-a06b-6cdcccd05a90.png', // César Kaique
        '/lovable-uploads/3494bf1b-6a0b-4c1c-9ae9-2e61309b37c3.png', // Tech Zone
        '/lovable-uploads/ab332979-20ec-45ad-9e09-9dcc16313b84.png', // Leidejane
        '/lovable-uploads/406d0212-14c6-47f9-bb84-4c0bb47983f3.png', // Geladão Nogueira
        '/lovable-uploads/2c07c5d6-b628-46ff-89da-336337c208f3.png', // Renan Nogueira
      ];

      // Criar os 20 patrocinadores com as novas imagens
      const sponsorNames = [
        'Zapyer', 'JN Suplementos', 'Brotinhos', 'Cultura FM', 'Hortfruti Santo Antônio', 'Grupo Pinheirinho',
        'Azul Cargo Express', 'CrediFácil Promotora', 'CEFITT', 'Tratores Pajeu', 'Vereador Tercio Siqueira', 'TS Construtora',
        'Bilisq', 'Alpha', 'Márcia', 'César Kaique', 'Tech Zone', 'Leidejane', 'Geladão Nogueira', 'Renan Nogueira'
      ];

      const updatedSponsors = sponsorNames.map((name, i) => {
        return {
          id: i + 1,
          name: name,
          imageUrl: sponsorImages[i]
        };
      });

      // Adicionar os patrocinadores 21-24 (placeholders)
      const colors = ['3B82F6', '10B981', 'F59E0B', 'EC4899'];
      for (let i = 20; i < 24; i++) {
        const colorIndex = i % colors.length;
        updatedSponsors.push({
          id: i + 1,
          name: `Patrocinador ${i + 1}`,
          imageUrl: `https://placehold.co/220x120/${colors[colorIndex]}/FFFFFF?text=Patrocinador+${i + 1}`
        });
      }
      
      setSponsors(updatedSponsors);
    };
    
    loadSponsors();
  }, []);

  // Dividir patrocinadores em quatro linhas
  const firstRow = sponsors.slice(0, 6);
  const secondRow = sponsors.slice(6, 12);
  const thirdRow = sponsors.slice(12, 18);
  const fourthRow = sponsors.slice(18, 24);

  const renderSponsorRow = (rowSponsors: Sponsor[]) => (
    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 mb-8">
      {rowSponsors.map(sponsor => (
        <div key={sponsor.id} className="flex items-center justify-center">
          <img 
            src={sponsor.imageUrl} 
            alt={`Logo ${sponsor.name}`} 
            className="max-h-24 max-w-44 object-contain transition-transform hover:scale-105" 
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id="sponsors" className="pt-20 md:pt-28 pb-16 md:pb-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Nossos <span className="gradient-text">Parceiros</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Agradecemos a todos os patrocinadores e apoiadores que tornam este evento possível e apoiam o esporte em nossa cidade.
        </p>
        
        <div className="mb-12">
          {/* First row - Patrocinadores 1 ao 6 */}
          {renderSponsorRow(firstRow)}
          
          {/* Second row - Patrocinadores 7 ao 12 */}
          {renderSponsorRow(secondRow)}
          
          {/* Third row - Patrocinadores 13 ao 18 */}
          {renderSponsorRow(thirdRow)}
          
          {/* Fourth row - Patrocinadores 19 ao 24 */}
          {renderSponsorRow(fourthRow)}
        </div>

        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-poppins text-event-royal">
            <span className="gradient-text">Quer ser um patrocinador</span> e fazer parte deste evento?
          </h3>
          <a href="https://wa.me/5587996709355" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg cta-button shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Seja um Parceiro
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
