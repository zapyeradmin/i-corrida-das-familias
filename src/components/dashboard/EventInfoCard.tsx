
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const EventInfoCard: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Informações do Evento</CardTitle>
        <CardDescription>
          Corrida das Famílias 2025
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-w-16 aspect-h-9">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/8d9963c7-ec7f-4e2a-b1ad-d1f5c9ee9f33.jpg" 
              alt="Corrida das Famílias" 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h4 className="font-medium">Data do Evento</h4>
            <p>25 de Maio de 2025</p>
          </div>
          <div>
            <h4 className="font-medium">Local</h4>
            <p>Parque Olímpico, Rio de Janeiro</p>
          </div>
          <div>
            <h4 className="font-medium">Horário</h4>
            <p>7:00 - Concentração</p>
            <p>8:00 - Largada</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventInfoCard;
