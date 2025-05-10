
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
  if (!sponsor) return null;

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
          <Label>Logo</Label>
          <div className="border rounded-md p-2 bg-white h-32 flex items-center justify-center">
            <img 
              src={sponsor.imageUrl} 
              alt={sponsor.name} 
              className="max-h-24 max-w-full" 
            />
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
