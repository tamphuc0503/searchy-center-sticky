
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Location } from './LocationTree';
import LocationsTable, { LocationData } from './LocationsTable';
import { sampleLocationsData, convertLocationToTableData } from './LocationsData';
import AddLocationDialog from './AddLocationDialog';
import { useToast } from '@/components/ui/use-toast';

interface LocationsProps {
  selectedLocation?: Location | null;
}

const Locations: React.FC<LocationsProps> = ({ selectedLocation }) => {
  const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>(sampleLocationsData);
  const [hierarchyLocations, setHierarchyLocations] = useState<Location[]>([]);
  const { toast } = useToast();

  const handleLocationCreated = (newLocation: Location) => {
    // Convert the new Location to LocationData format before adding
    const newLocationData = convertLocationToTableData(newLocation);
    
    // Update the table data
    setLocations(prevLocations => [...prevLocations, newLocationData]);
    
    // Also update the hierarchy data if needed
    setHierarchyLocations(prevLocations => [...prevLocations, newLocation]);
    
    toast({
      title: "Location added",
      description: `${newLocation.name} has been added to your locations.`,
    });
  };

  // Prepare display locations for the table
  const displayLocations = selectedLocation 
    ? [convertLocationToTableData(selectedLocation), 
       ...(selectedLocation.children.map(convertLocationToTableData))]
    : locations;

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
              locations={displayLocations} 
              title="" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Location Dialog */}
      <AddLocationDialog 
        isOpen={isAddLocationDialogOpen}
        onOpenChange={setIsAddLocationDialogOpen}
        locations={hierarchyLocations.length > 0 ? hierarchyLocations : []}
        onLocationCreated={handleLocationCreated}
      />
    </div>
  );
};

export default Locations;
