
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Location } from './LocationTree';
import LocationsTable from './LocationsTable';
import { sampleLocationsData } from './LocationsData';
import AddLocationDialog from './AddLocationDialog';
import { useToast } from '@/components/ui/use-toast';

interface LocationsProps {
  selectedLocation?: Location | null;
}

const Locations: React.FC<LocationsProps> = ({ selectedLocation }) => {
  const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false);
  const [locations, setLocations] = useState(sampleLocationsData);
  const { toast } = useToast();

  const handleLocationCreated = (newLocation: Location) => {
    // In a real app, you would make an API call to save the location
    // For now, we'll just update the local state
    setLocations(prevLocations => [...prevLocations, newLocation]);
    
    toast({
      title: "Location added",
      description: `${newLocation.name} has been added to your locations.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-muted-foreground">Manage locations and associated SDS files</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsAddLocationDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>
      
      <div>
        {/* Locations Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              {selectedLocation 
                ? `Location: ${selectedLocation.name}`
                : "All Locations"
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LocationsTable 
              locations={selectedLocation ? [selectedLocation, ...selectedLocation.children] : locations} 
              title="" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Location Dialog */}
      <AddLocationDialog 
        isOpen={isAddLocationDialogOpen}
        onOpenChange={setIsAddLocationDialogOpen}
        locations={locations}
        onLocationCreated={handleLocationCreated}
      />
    </div>
  );
};

export default Locations;
