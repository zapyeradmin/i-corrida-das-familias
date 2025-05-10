
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/integrations/supabase/storage';

interface LogoTabProps {
  initialPreview: string;
}

const LogoTab = ({ initialPreview }: LogoTabProps) => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState(initialPreview);
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
      const publicUrl = await uploadImage(file, 'site-images', 'logo');
      
      setLogoPreview(publicUrl);
      
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
      description: "A imagem do logo foi atualizada com sucesso.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo</CardTitle>
        <CardDescription>
          Altere a logo do site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="mb-4">
            <Label htmlFor="logo-image" className="block mb-2">Imagem Atual</Label>
            <div className="rounded-lg overflow-hidden h-32 bg-gray-100 flex items-center justify-center">
              <img 
                src={logoPreview} 
                alt="Logo" 
                className="max-h-24 max-w-full" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="logo-upload" className="block mb-2">Fazer Upload de Nova Logo</Label>
            <div className="flex items-center gap-4">
              <Input
                id="logo-upload"
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
          Recomendação: Use uma imagem com fundo transparente (PNG) para melhores resultados.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LogoTab;
