
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
    // Generate placeholder sponsors with different colors
    const colors = ['3B82F6', '10B981', 'F59E0B', 'EC4899', '8B5CF6', '6366F1', 'D946EF', '0EA5E9', 'F97316', 'EF4444'];
    
    const loadSponsors = async () => {
      // In a real implementation, we would fetch sponsors from Supabase
      // const { data, error } = await supabase
      //   .from('sponsors')
      //   .select('*')
      //   .order('id', { ascending: true });
      // 
      // if (data && !error) {
      //   setSponsors(data);
      //   return;
      // }

      // For now, load placeholders
      const initialSponsors = Array.from({
        length: 24
      }, (_, i) => {
        const colorIndex = i % colors.length;
        return {
          id: i + 1,
          name: `Patrocinador ${i + 1}`,
          imageUrl: `https://placehold.co/220x120/${colors[colorIndex]}/FFFFFF?text=Patrocinador+${i + 1}`
        };
      });
      
      setSponsors(initialSponsors);
    };
    
    loadSponsors();
  }, []);

  // Divide sponsors into four rows
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
          Agradecemos a todos os patrocinadores que tornam este evento possível e apoiam o esporte em nossa cidade.
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
