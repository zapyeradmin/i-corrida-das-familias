
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import LoadingSpinner from './LoadingSpinner';
import EmptyStateView from './EmptyStateView';
import AthletesTable from './AthletesTable';
import AthletesFilter from './AthletesFilter';
import { Athlete } from '@/hooks/useAthletesData';

interface AthletesContentProps {
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  paymentFilter: string;
  setPaymentFilter: (value: string) => void;
  filteredAthletes: Athlete[];
  totalAthletes: number;
  formatDate: (dateString: string) => string;
  mapGender: (gender: string) => string;
  mapShirtSize: (size: string) => string;
  mapPaymentMethod: (method: string) => string;
  mapPaymentStatus: (status: string) => string;
}

const AthletesContent: React.FC<AthletesContentProps> = ({
  loading,
  searchTerm,
  setSearchTerm,
  paymentFilter,
  setPaymentFilter,
  filteredAthletes,
  totalAthletes,
  formatDate,
  mapGender,
  mapShirtSize,
  mapPaymentMethod,
  mapPaymentStatus
}) => {
  // Handler to clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setPaymentFilter('all');
  };

  // Check if we're currently filtering
  const hasActiveFilters = searchTerm !== '' || paymentFilter !== 'all';

  return (
    <Card className="shadow-md border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b pb-8">
        <AthletesFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
          filteredAthletesCount={filteredAthletes.length}
          totalAthletesCount={totalAthletes}
          showClearFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </CardHeader>

      <CardContent className="px-6 py-4 bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : filteredAthletes.length === 0 ? (
          <EmptyStateView 
            hasFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        ) : (
          <AthletesTable 
            athletes={filteredAthletes}
            formatDate={formatDate}
            mapGender={mapGender}
            mapShirtSize={mapShirtSize}
            mapPaymentMethod={mapPaymentMethod}
            mapPaymentStatus={mapPaymentStatus}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AthletesContent;
