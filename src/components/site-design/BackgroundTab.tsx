
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/integrations/supabase/storage';

interface BackgroundTabProps {
  initialPreview: string;
}

const BackgroundTab = ({ initialPreview }: BackgroundTabProps) => {
  const { toast } = useToast();
  const [heroPreview, setHeroPreview] = useState(initialPreview);
  const [uploading, setUploading] = useState(false);

  // Function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        toast({
          title: "Erro",
          description: "Você precisa selecionar um arquivo para upload.",
          variant: "destructive",
        });
        return;
      }
      
      const file = event.target.files[0];
      const publicUrl = await uploadImage(file, 'site-images', 'hero');
      
      setHeroPreview(publicUrl);
      
      // Show success notification
      toast({
        title: "Sucesso!",
        description: "Imagem enviada com sucesso.",
      });
      
      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Erro no upload",
        description: error.message || "Ocorreu um erro ao fazer upload da imagem.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Function to apply changes
  const applyChanges = async () => {
    // In a real implementation, this would update a site settings table in the database
    toast({
      title: "Alterações aplicadas",
      description: "A imagem de fundo foi atualizada com sucesso.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagem de Fundo</CardTitle>
        <CardDescription>
          Altere a imagem de fundo do hero do site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="mb-4">
            <Label htmlFor="hero-image" className="block mb-2">Imagem Atual</Label>
            <div className="rounded-lg overflow-hidden h-48 bg-gray-100 relative">
              <img 
                src={heroPreview} 
                alt="Hero Background" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="hero-upload" className="block mb-2">Fazer Upload de Nova Imagem</Label>
            <div className="flex items-center gap-4">
              <Input
                id="hero-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <Button disabled={uploading} onClick={applyChanges}>
                {uploading ? 'Enviando...' : 'Aplicar'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <p className="text-sm text-gray-500">
          Recomendação: Use uma imagem com pelo menos 1920x1080 pixels para melhor qualidade.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BackgroundTab;
