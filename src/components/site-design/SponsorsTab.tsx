
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Dialog } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import SponsorCard from './SponsorCard';
import SponsorForm from './SponsorForm';
import SponsorEditDialog from './SponsorEditDialog';

interface Sponsor {
  id: number;
  name: string;
  imageUrl: string;
  isNew?: boolean;
}

const SponsorsTab = () => {
  const { toast } = useToast();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Inicializar com os novos patrocinadores
    const sponsorImages = [
      '/lovable-uploads/49c797a9-3e44-408d-bec2-34ea3baaf0dd.png', // Zapyer
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

    const sponsorNames = [
      'Zapyer', 'JN Suplementos', 'Brotinhos', 'Cultura FM', 'Hortfruti Santo Antônio', 'Grupo Pinheirinho',
      'Azul Cargo Express', 'CrediFácil Promotora', 'CEFITT', 'Tratores Pajeu', 'Vereador Tercio Siqueira', 'TS Construtora',
      'Bilisq', 'Alpha', 'Márcia', 'César Kaique', 'Tech Zone', 'Leidejane', 'Geladão Nogueira', 'Renan Nogueira'
    ];
    
    // Manter os patrocinadores que já existem para os slots 21-24
    const colors = ['3B82F6', '10B981', 'F59E0B', 'EC4899'];
    
    const initialSponsors = sponsorNames.map((name, i) => {
      return {
        id: i + 1,
        name: name,
        imageUrl: sponsorImages[i]
      };
    });
    
    // Adicionar os patrocinadores 21-24 (placeholders)
    for (let i = 20; i < 24; i++) {
      const colorIndex = i % colors.length;
      initialSponsors.push({
        id: i + 1,
        name: `Patrocinador ${i + 1}`,
        imageUrl: `https://placehold.co/220x120/${colors[colorIndex]}/FFFFFF?text=Patrocinador+${i + 1}`
      });
    }
    
    setSponsors(initialSponsors);
  }, []);

  // Function to add new sponsor
  const handleAddSponsor = async (name: string, imageUrl: string) => {
    // Add new sponsor to the list
    const newSponsor: Sponsor = {
      id: sponsors.length + 1,
      name: name,
      imageUrl: imageUrl,
      isNew: true
    };
    
    setSponsors([...sponsors, newSponsor]);
    
    toast({
      title: "Patrocinador adicionado",
      description: "O patrocinador foi adicionado com sucesso.",
    });
  };
  
  // Function to delete sponsor
  const handleDeleteSponsor = (id: number) => {
    setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
    
    toast({
      title: "Patrocinador removido",
      description: "O patrocinador foi removido com sucesso.",
    });
  };
  
  // Function to edit sponsor
  const openEditDialog = (sponsor: Sponsor) => {
    setEditingSponsor({...sponsor});
    setIsDialogOpen(true);
  };
  
  // Function to update sponsor
  const handleUpdateSponsor = async () => {
    if (!editingSponsor) return;
    
    try {
      // Update the sponsor in the list
      const updatedSponsors = sponsors.map(sponsor => 
        sponsor.id === editingSponsor.id ? editingSponsor : sponsor
      );
      
      setSponsors(updatedSponsors);
      setIsDialogOpen(false);
      
      toast({
        title: "Patrocinador atualizado",
        description: "O patrocinador foi atualizado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao atualizar o patrocinador.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Patrocinadores</CardTitle>
          <CardDescription>
            Gerencie as imagens dos patrocinadores do evento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="mb-4">
              <Label className="block mb-4">Patrocinadores Atuais</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sponsors.map((sponsor) => (
                  <SponsorCard 
                    key={sponsor.id} 
                    sponsor={sponsor} 
                    onEdit={openEditDialog} 
                    onDelete={handleDeleteSponsor} 
                  />
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="block mb-4">Adicionar Novo Patrocinador</Label>
              <SponsorForm onAddSponsor={handleAddSponsor} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Sponsor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SponsorEditDialog 
          sponsor={editingSponsor} 
          onChange={setEditingSponsor} 
          onUpdate={handleUpdateSponsor}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default SponsorsTab;
