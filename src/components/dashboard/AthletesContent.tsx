
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import LoadingSpinner from './LoadingSpinner';
import EmptyStateView from './EmptyStateView';
import AthletesTable from './AthletesTable';
import AthletesFilter from './AthletesFilter';
import AthleteEditDialog from './AthleteEditDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
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
  updateAthlete: (athlete: Athlete) => Promise<void>;
  confirmPayment: (athleteId: string) => Promise<void>;
  deleteAthlete: (athleteId: string) => Promise<void>;
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
  mapPaymentStatus,
  updateAthlete,
  confirmPayment,
  deleteAthlete
}) => {
  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  
  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState<{ id: string, name: string } | null>(null);

  // Handler to clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setPaymentFilter('all');
  };

  // Handler for editing athlete
  const handleEditAthlete = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setEditDialogOpen(true);
  };

  // Handler for confirming payment
  const handleConfirmPayment = (athleteId: string) => {
    confirmPayment(athleteId);
  };

  // Handler for deleting athlete
  const handleDeleteClick = (athleteId: string, athleteName: string) => {
    setAthleteToDelete({ id: athleteId, name: athleteName });
    setDeleteDialogOpen(true);
  };

  // Handler for confirming deletion
  const handleDeleteConfirm = () => {
    if (athleteToDelete) {
      deleteAthlete(athleteToDelete.id);
      setDeleteDialogOpen(false);
    }
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
            onEditAthlete={handleEditAthlete}
            onConfirmPayment={handleConfirmPayment}
            onDeleteAthlete={(athleteId) => {
              const athlete = filteredAthletes.find(a => a.id === athleteId);
              if (athlete) {
                handleDeleteClick(athleteId, athlete.full_name);
              }
            }}
          />
        )}
      </CardContent>

      {/* Edit Dialog */}
      <AthleteEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        athlete={selectedAthlete}
        onSave={updateAthlete}
      />

      {/* Delete Confirmation Dialog */}
      {athleteToDelete && (
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          athleteName={athleteToDelete.name}
        />
      )}
    </Card>
  );
};

export default AthletesContent;
