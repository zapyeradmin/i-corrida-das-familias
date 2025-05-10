
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Palette, Image, Images } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';

// Import refactored components
import BackgroundTab from '@/components/site-design/BackgroundTab';
import LogoTab from '@/components/site-design/LogoTab';
import SponsorsTab from '@/components/site-design/SponsorsTab';

const SiteDesign = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('background');
  
  // Initial image states
  const heroPreview = '/lovable-uploads/5ee1b807-0626-4575-bef4-27435d64a983.png';
  const logoPreview = '/lovable-uploads/0ced6a80-33a2-4da0-bbdd-ec8fd2d48ffa.png';
  
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
            <BackgroundTab initialPreview={heroPreview} />
          </TabsContent>
          
          {/* Logo Tab */}
          <TabsContent value="logo">
            <LogoTab initialPreview={logoPreview} />
          </TabsContent>
          
          {/* Sponsors Tab */}
          <TabsContent value="sponsors">
            <SponsorsTab />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default SiteDesign;
