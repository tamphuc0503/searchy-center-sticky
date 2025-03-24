import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Location } from './LocationTree';
import LocationsTable, { LocationData } from './LocationsTable';
import { sampleLocationsData, convertLocationToTableData, dummyLocations } from './LocationsData';
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
  const [hierarchyLocations, setHierarchyLocations] = useState<Location[]>(dummyLocations);
  const { toast } = useToast();

  const handleLocationCreated = (newLocation: Location) => {
    const newLocationData = convertLocationToTableData(newLocation);
    
    setLocations(prevLocations => [...prevLocations, newLocationData]);
    
    if (newLocation.parentLocationId) {
      setHierarchyLocations(prevLocations => {
        const updatedLocations = [...prevLocations];
        
        const findAndUpdateParent = (locations: Location[]): boolean => {
          for (let i = 0; i < locations.length; i++) {
            if (locations[i].id === newLocation.parentLocationId) {
              locations[i].children = [...locations[i].children, newLocation];
              return true;
            }
            
            if (locations[i].children.length > 0) {
              if (findAndUpdateParent(locations[i].children)) {
                return true;
              }
            }
          }
          return false;
        };
        
        findAndUpdateParent(updatedLocations);
        return updatedLocations;
      });
    } else {
      setHierarchyLocations(prevLocations => [...prevLocations, newLocation]);
    }
    
    toast({
      title: "Location added",
      description: `${newLocation.name} has been added to your locations.`,
    });
  };

  const displayLocations = selectedLocation 
    ? [convertLocationToTableData(selectedLocation), 
       ...(selectedLocation.children.map(convertLocationToTableData))]
    : locations;

  const getParentPath = (locationId: string | null, allLocations: Location[]): Location[] => {
    if (!locationId) return [];
    
    const parent = findLocationById(locationId, allLocations);
    if (!parent) return [];
    
    if (parent.parentLocationId) {
      return [...getParentPath(parent.parentLocationId, allLocations), parent];
    }
    
    return [parent];
  };

  const findLocationById = (id: string, locations: Location[]): Location | null => {
    for (const loc of locations) {
      if (loc.id === id) return loc;
      
      if (loc.children && loc.children.length > 0) {
        const foundInChildren = findLocationById(id, loc.children);
        if (foundInChildren) return foundInChildren;
      }
    }
    return null;
  };

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
        locations={hierarchyLocations}
        onLocationCreated={handleLocationCreated}
        currentLocation={selectedLocation}
      />
    </div>
  );
};

export default Locations;
