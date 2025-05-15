
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventInfoCard: React.FC = () => {
  return (
    <Card className="mt-6 overflow-hidden border-t-4 border-blue-300 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <CardTitle className="text-lg font-medium">Informações do Evento</CardTitle>
        </div>
        <CardDescription className="text-blue-50">
          Corrida das Famílias 2025
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div className="aspect-w-16 aspect-h-9">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden shadow-inner">
            <img 
              src="/lovable-uploads/8d9963c7-ec7f-4e2a-b1ad-d1f5c9ee9f33.jpg" 
              alt="Corrida das Famílias" 
              className="object-cover w-full h-full rounded-md transition-transform hover:scale-105 duration-500"
            />
          </AspectRatio>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg shadow-sm">
            <Calendar className="h-8 w-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-700">Data do Evento</h4>
            <p className="text-gray-900 font-semibold text-center">25 de Maio de 2025</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg shadow-sm">
            <MapPin className="h-8 w-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-700">Local</h4>
            <p className="text-gray-900 font-semibold text-center">Parque Olímpico, Rio de Janeiro</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg shadow-sm">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-700">Horário</h4>
            <p className="text-gray-900 font-semibold text-center">7:00 - Concentração</p>
            <p className="text-gray-900 font-semibold text-center">8:00 - Largada</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventInfoCard;
