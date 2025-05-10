
import React, { useState, useEffect } from 'react';
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
import { ArrowLeft, Upload, Image, Images, Palette, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Sponsor {
  id: number;
  name: string;
  imageUrl: string;
  isNew?: boolean;
}

const SiteDesign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('background');
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Image preview states
  const [heroPreview, setHeroPreview] = useState('/lovable-uploads/5ee1b807-0626-4575-bef4-27435d64a983.png');
  const [logoPreview, setLogoPreview] = useState('/lovable-uploads/0ced6a80-33a2-4da0-bbdd-ec8fd2d48ffa.png');
  
  // Sponsors state
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorImage, setNewSponsorImage] = useState<File | null>(null);
  const [newSponsorPreview, setNewSponsorPreview] = useState('');

  // Load initial sponsors
  useEffect(() => {
    // Initialize with placeholder sponsors
    const initialSponsors = Array.from({ length: 20 }, (_, i) => {
      const colorIndex = i % 10;
      const colors = [
        '3B82F6', '10B981', 'F59E0B', 'EC4899', 
        '8B5CF6', '6366F1', 'D946EF', '0EA5E9', 
        'F97316', 'EF4444'
      ];
      return {
        id: i + 1,
        name: `Patrocinador ${i + 1}`,
        imageUrl: `https://placehold.co/220x120/${colors[colorIndex]}/FFFFFF?text=Patrocinador+${i + 1}`
      };
    });
    
    setSponsors(initialSponsors);
    
    // In a real app, we would fetch from Supabase or another data store
    // fetchSponsors();
  }, []);

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
      } else if (imageType === 'sponsor') {
        setNewSponsorPreview(data.publicUrl);
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
        const fileExt = newSponsorImage.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `sponsors/${fileName}`;
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('site-images')
          .upload(filePath, newSponsorImage);
          
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
        
        imageUrl = data.publicUrl;
      }
      
      // Add new sponsor to the list
      const newSponsor: Sponsor = {
        id: sponsors.length + 1,
        name: newSponsorName,
        imageUrl: imageUrl,
        isNew: true
      };
      
      setSponsors([...sponsors, newSponsor]);
      
      // Reset form
      setNewSponsorName('');
      setNewSponsorImage(null);
      setNewSponsorPreview('');
      
      toast({
        title: "Patrocinador adicionado",
        description: "O patrocinador foi adicionado com sucesso.",
      });
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
  
  // Function to apply changes
  const applyChanges = async (imageType: string, imageUrl: string) => {
    // In a real implementation, this would update a site settings table in the database
    toast({
      title: "Alterações aplicadas",
      description: `A imagem ${imageType === 'hero' ? 'de fundo' : 'do logo'} foi atualizada com sucesso.`,
    });
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="border rounded-lg p-2 bg-white flex flex-col">
                          <div className="h-24 flex items-center justify-center mb-2">
                            <img 
                              src={sponsor.imageUrl}
                              alt={`Patrocinador ${sponsor.name}`}
                              className="max-h-16 max-w-full"
                            />
                          </div>
                          <div className="pt-2 border-t flex items-center justify-between">
                            <span className="text-sm font-medium truncate pr-2">{sponsor.name}</span>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                onClick={() => openEditDialog(sponsor)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600" 
                                onClick={() => handleDeleteSponsor(sponsor.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label className="block mb-4">Adicionar Novo Patrocinador</Label>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Edit Sponsor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                value={editingSponsor?.name || ''} 
                onChange={(e) => setEditingSponsor(prev => prev ? {...prev, name: e.target.value} : null)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="border rounded-md p-2 bg-white h-32 flex items-center justify-center">
                {editingSponsor && (
                  <img 
                    src={editingSponsor.imageUrl} 
                    alt={editingSponsor.name} 
                    className="max-h-24 max-w-full" 
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateSponsor}>
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default SiteDesign;
