
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    const newLocationData = convertLocationToTableData(newLocation);
    
    setLocations(prevLocations => [...prevLocations, newLocationData]);
    
    setHierarchyLocations(prevLocations => [...prevLocations, newLocation]);
    
    toast({
      title: "Location added",
      description: `${newLocation.name} has been added to your locations.`,
    });
  };

  const displayLocations = selectedLocation 
    ? [convertLocationToTableData(selectedLocation), 
       ...(selectedLocation.children.map(convertLocationToTableData))]
    : locations;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 relative">
          <Button 
            className="absolute top-2 right-2 flex items-center gap-2"
            onClick={() => setIsAddLocationDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Location
          </Button>
          <LocationsTable 
            locations={displayLocations} 
            title="" 
          />
        </CardContent>
      </Card>

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

