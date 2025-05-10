
import React from 'react';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface AthletesFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  paymentFilter: string;
  setPaymentFilter: (value: string) => void;
  filteredAthletesCount: number;
  totalAthletesCount: number;
  showClearFilters: boolean;
  onClearFilters: () => void;
}

const AthletesFilter: React.FC<AthletesFilterProps> = ({
  searchTerm,
  setSearchTerm,
  paymentFilter,
  setPaymentFilter,
  filteredAthletesCount,
  totalAthletesCount,
  showClearFilters,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="text-xl font-poppins text-gray-800">
        Lista de Atletas Inscritos
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome, email ou CPF..."
            className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-event-blue focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter by payment status */}
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="confirmed">Confirmados</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Clear filters button appears conditionally */}
      {showClearFilters && (
        <Button 
          variant="outline" 
          className="mt-2 sm:mt-0"
          onClick={onClearFilters}
        >
          Limpar filtros
        </Button>
      )}
      
      {/* Results count shown when athletes are displayed */}
      {filteredAthletesCount > 0 && (
        <div className="text-sm text-gray-500">
          Exibindo {filteredAthletesCount} de {totalAthletesCount} atletas
        </div>
      )}
    </div>
  );
};

export default AthletesFilter;
