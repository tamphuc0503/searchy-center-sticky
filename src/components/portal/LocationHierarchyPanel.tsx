
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LocationTree, { Location } from './LocationTree';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface LocationHierarchyPanelProps {
  locations: Location[];
  selectedLocationId?: string;
  onLocationSelect: (location: Location) => void;
}

const LocationHierarchyPanel: React.FC<LocationHierarchyPanelProps> = ({ 
  locations, 
  selectedLocationId,
  onLocationSelect
}) => {
  const [isTreeOpen, setIsTreeOpen] = useState(true);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Location Hierarchy</CardTitle>
          <CollapsibleTrigger 
            onClick={() => setIsTreeOpen(!isTreeOpen)} 
            className="md:hidden"
          >
            {isTreeOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </CollapsibleTrigger>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search locations..." className="pl-8" />
        </div>
      </CardHeader>
      <Collapsible defaultOpen={true} className="hidden md:block">
        <CollapsibleContent>
          <CardContent>
            <LocationTree 
              locations={locations} 
              onSelect={onLocationSelect}
              selectedLocationId={selectedLocationId}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen={isTreeOpen} onOpenChange={setIsTreeOpen} className="md:hidden">
        <CollapsibleContent>
          <CardContent>
            <LocationTree 
              locations={locations} 
              onSelect={onLocationSelect}
              selectedLocationId={selectedLocationId}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default LocationHierarchyPanel;
