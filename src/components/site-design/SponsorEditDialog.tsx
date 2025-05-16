
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { uploadImage } from '@/integrations/supabase/storage';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface Sponsor {
  id: number;
  name: string;
  imageUrl: string;
  isNew?: boolean;
}

interface SponsorEditDialogProps {
  sponsor: Sponsor | null;
  onChange: (sponsor: Sponsor | null) => void;
  onUpdate: () => void;
  onCancel: () => void;
}

const SponsorEditDialog = ({ sponsor, onChange, onUpdate, onCancel }: SponsorEditDialogProps) => {
  const { toast } = useToast();
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  if (!sponsor) return null;

  // Function to handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setNewImage(file);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Function to upload new image
  const handleImageUpload = async () => {
    if (!newImage) return;
    
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(newImage, 'site-images', 'sponsors');
      
      // Update sponsor with new image URL
      onChange({ ...sponsor, imageUrl });
      
      toast({
        title: "Imagem atualizada",
        description: "A imagem do patrocinador foi atualizada com sucesso.",
      });
      
      // Clear upload state
      setNewImage(null);
      setPreviewUrl('');
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao fazer upload da imagem.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Patrocinador</DialogTitle>
        <DialogDescription>
          Altere as informações do patrocinador.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="edit-sponsor-name">Nome do Patrocinador</Label>
          <Input 
            id="edit-sponsor-name" 
            value={sponsor.name} 
            onChange={(e) => onChange(sponsor ? {...sponsor, name: e.target.value} : null)} 
          />
        </div>
        
        <div className="space-y-2">
          <Label>Logo Atual</Label>
          <div className="border rounded-md p-2 bg-white h-32 flex items-center justify-center">
            <img 
              src={previewUrl || sponsor.imageUrl} 
              alt={sponsor.name} 
              className="max-h-24 max-w-full" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-sponsor-image">Nova Logo</Label>
          <div className="flex flex-col gap-2">
            <Input
              id="edit-sponsor-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
            />
            {newImage && (
              <Button 
                onClick={handleImageUpload} 
                disabled={isUploading}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-1" />
                {isUploading ? 'Enviando...' : 'Upload da Nova Logo'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onUpdate}>
          Salvar Alterações
        </Button>
      </div>
    </DialogContent>
  );
};

export default SponsorEditDialog;
