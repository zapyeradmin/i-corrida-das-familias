
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Sponsor {
  id: number;
  name: string;
  imageUrl: string;
  isNew?: boolean;
}

interface SponsorCardProps {
  sponsor: Sponsor;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: number) => void;
}

const SponsorCard = ({ sponsor, onEdit, onDelete }: SponsorCardProps) => {
  return (
    <div className="border rounded-lg p-2 bg-white flex flex-col">
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
            onClick={() => onEdit(sponsor)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600" 
            onClick={() => onDelete(sponsor.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SponsorCard;
