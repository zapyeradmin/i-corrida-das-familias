
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/integrations/supabase/storage';

interface SponsorFormProps {
  onAddSponsor: (name: string, imageUrl: string) => Promise<void>;
}

const SponsorForm = ({ onAddSponsor }: SponsorFormProps) => {
  const { toast } = useToast();
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorImage, setNewSponsorImage] = useState<File | null>(null);
  const [newSponsorPreview, setNewSponsorPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  // Function to handle sponsor image preview
  const handleSponsorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setNewSponsorImage(file);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewSponsorPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Function to add new sponsor
  const handleAddSponsor = async () => {
    if (!newSponsorName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o patrocinador.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newSponsorImage && !newSponsorPreview) {
      toast({
        title: "Imagem obrigatória",
        description: "Por favor, selecione uma imagem para o patrocinador.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setUploading(true);
      
      let imageUrl = newSponsorPreview;
      
      // Upload image if it's a file (not just a preview URL)
      if (newSponsorImage) {
        imageUrl = await uploadImage(newSponsorImage, 'site-images', 'sponsors');
      }
      
      await onAddSponsor(newSponsorName, imageUrl);
      
      // Reset form
      setNewSponsorName('');
      setNewSponsorImage(null);
      setNewSponsorPreview('');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao adicionar o patrocinador.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sponsor-name" className="block mb-1">Nome do Patrocinador</Label>
        <Input
          id="sponsor-name"
          value={newSponsorName}
          onChange={(e) => setNewSponsorName(e.target.value)}
          placeholder="Digite o nome do patrocinador"
          className="mb-2"
        />
      </div>
      
      <div>
        <Label htmlFor="sponsor-upload" className="block mb-1">Logo do Patrocinador</Label>
        <div className="flex items-center gap-4">
          <Input
            id="sponsor-upload"
            type="file"
            accept="image/*"
            onChange={handleSponsorImageChange}
            disabled={uploading}
          />
        </div>
      </div>
      
      {newSponsorPreview && (
        <div className="mt-2 mb-4">
          <Label className="block mb-1">Pré-visualização</Label>
          <div className="border rounded p-2 bg-white h-32 flex items-center justify-center">
            <img 
              src={newSponsorPreview} 
              alt="Pré-visualização" 
              className="max-h-24 max-w-full" 
            />
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleAddSponsor} 
        disabled={uploading || !newSponsorName.trim() || (!newSponsorImage && !newSponsorPreview)}
        className="mt-2"
      >
        <Upload className="h-4 w-4 mr-1" />
        {uploading ? 'Enviando...' : 'Adicionar Patrocinador'}
      </Button>
    </div>
  );
};

export default SponsorForm;
