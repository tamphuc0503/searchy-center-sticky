
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Location } from './LocationTree';
import LocationsTable, { LocationData } from './LocationsTable';
import { sampleLocationsData, convertLocationToTableData } from './LocationsData';
import AddLocationDialog from './AddLocationDialog';
import { useToast } from '@/components/ui/use-toast';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';

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

  // Function to find parent location path
  const getParentPath = (locationId: string | null, allLocations: Location[]): Location[] => {
    if (!locationId) return [];
    
    // Find direct parent
    const parent = allLocations.find(loc => loc.id === locationId);
    if (!parent) return [];
    
    // If this parent has a parent, recursively get that path
    if (parent.parentLocationId) {
      return [...getParentPath(parent.parentLocationId, allLocations), parent];
    }
    
    return [parent];
  };
  
  // Get the breadcrumb path if a location is selected
  const breadcrumbPath = selectedLocation 
    ? getParentPath(selectedLocation.parentLocationId, hierarchyLocations)
    : [];

  return (
    <div className="space-y-6">
      {selectedLocation && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/portal">Locations</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            {breadcrumbPath.map((location, index) => (
              <React.Fragment key={location.id}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/portal?location=${location.id}`}>
                    {location.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}
            
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedLocation.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      
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
        currentLocation={selectedLocation}
      />
    </div>
  );
};

export default Locations;
