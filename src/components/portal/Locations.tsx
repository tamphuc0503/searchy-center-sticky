
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Location } from './LocationTree';
import LocationsTable from './LocationsTable';
import { sampleLocationsData } from './LocationsData';

interface LocationsProps {
  selectedLocation?: Location | null;
}

const Locations: React.FC<LocationsProps> = ({ selectedLocation }) => {
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
              locations={sampleLocationsData} 
              title="" 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Locations;
