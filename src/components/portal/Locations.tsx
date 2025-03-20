
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Location } from './LocationTree';
import LocationHierarchyPanel from './LocationHierarchyPanel';
import LocationsTable from './LocationsTable';
import { dummyLocations, sampleLocationsData } from './LocationsData';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    // In a real app, here you would fetch SDS files for the selected location
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-muted-foreground">Manage locations and associated SDS files</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Location Tree Panel */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <LocationHierarchyPanel 
            locations={dummyLocations}
            selectedLocationId={selectedLocation?.id}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        {/* Locations Table */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
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
                locations={sampleLocationsData} 
                title="" 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Locations;
