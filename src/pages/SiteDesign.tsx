
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Upload, Image, Images, Palette } from 'lucide-react';

const SiteDesign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('background');
  
  // Image preview states
  const [heroPreview, setHeroPreview] = useState('/lovable-uploads/5ee1b807-0626-4575-bef4-27435d64a983.png');
  const [logoPreview, setLogoPreview] = useState('/lovable-uploads/0ced6a80-33a2-4da0-bbdd-ec8fd2d48ffa.png');
  
  // Function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, imageType: string) => {
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${imageType}/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);
        
      if (!data.publicUrl) {
        throw new Error('Failed to get public URL');
      }
      
      // Update preview based on image type
      if (imageType === 'hero') {
        setHeroPreview(data.publicUrl);
      } else if (imageType === 'logo') {
        setLogoPreview(data.publicUrl);
      }
      
      // Show success notification
      toast({
        title: "Sucesso!",
        description: "Imagem enviada com sucesso.",
      });
      
      return data.publicUrl;
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
  const applyChanges = async (imageType: string, imageUrl: string) => {
    toast({
      title: "Alterações aplicadas",
      description: `A imagem ${imageType === 'hero' ? 'de fundo' : 'do logo'} foi atualizada com sucesso.`,
    });
    // In a real implementation, this would update a site settings table in the database
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <DashboardHeader userEmail={user?.email} signOut={signOut} />
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Design do Site</h1>
        </div>
        
        <Tabs defaultValue="background" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="background">
              <Palette className="h-4 w-4 mr-2" />
              Imagem de Fundo
            </TabsTrigger>
            <TabsTrigger value="logo">
              <Image className="h-4 w-4 mr-2" />
              Logo
            </TabsTrigger>
            <TabsTrigger value="sponsors">
              <Images className="h-4 w-4 mr-2" />
              Patrocinadores
            </TabsTrigger>
          </TabsList>
          
          {/* Background Image Tab */}
          <TabsContent value="background">
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
                        onChange={(e) => handleFileUpload(e, 'hero')}
                        disabled={uploading}
                      />
                      <Button disabled={uploading} onClick={() => applyChanges('hero', heroPreview)}>
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
          </TabsContent>
          
          {/* Logo Tab */}
          <TabsContent value="logo">
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
                        onChange={(e) => handleFileUpload(e, 'logo')}
                        disabled={uploading}
                      />
                      <Button disabled={uploading} onClick={() => applyChanges('logo', logoPreview)}>
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
          </TabsContent>
          
          {/* Sponsors Tab */}
          <TabsContent value="sponsors">
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="border rounded-lg p-2 bg-white flex items-center justify-center h-24">
                          <img 
                            src={`https://placehold.co/200x100/3B82F6/FFFFFF?text=Patrocinador ${index + 1}`}
                            alt={`Patrocinador ${index + 1}`}
                            className="max-h-16 max-w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="sponsor-upload" className="block mb-2">Adicionar Novo Patrocinador</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="sponsor-upload"
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                      />
                      <Button disabled={uploading}>
                        <Upload className="h-4 w-4 mr-1" />
                        {uploading ? 'Enviando...' : 'Enviar'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50 border-t px-6 py-3">
                <p className="text-sm text-gray-500">
                  Recomendação: Use imagens de tamanho uniforme para melhor apresentação.
                </p>
                <Button variant="outline">
                  Gerenciar Patrocinadores
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default SiteDesign;
