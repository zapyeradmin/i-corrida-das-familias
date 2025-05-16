
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
    // Initialize with placeholder sponsors - using 24 sponsors to match the frontend display
    const colors = [
      '3B82F6', '10B981', 'F59E0B', 'EC4899', 
      '8B5CF6', '6366F1', 'D946EF', '0EA5E9', 
      'F97316', 'EF4444'
    ];
    
    const initialSponsors = Array.from({ length: 24 }, (_, i) => {
      const colorIndex = i % colors.length;
      return {
        id: i + 1,
        name: `Patrocinador ${i + 1}`,
        imageUrl: `https://placehold.co/220x120/${colors[colorIndex]}/FFFFFF?text=Patrocinador+${i + 1}`
      };
    });
    
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
    setEditingSponsor(sponsor);
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
