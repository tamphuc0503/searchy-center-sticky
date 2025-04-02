
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LocationTree, { Location } from './LocationTree';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LocationHierarchyPanelProps {
  locations: Location[];
  selectedLocationId?: string;
  onLocationSelect: (location: Location) => void;
  variant?: 'default' | 'sidebar';
}

const LocationHierarchyPanel: React.FC<LocationHierarchyPanelProps> = ({ 
  locations, 
  selectedLocationId,
  onLocationSelect,
  variant = 'default'
}) => {
  const [isTreeOpen, setIsTreeOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  if (variant === 'sidebar') {
    return (
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search locations..." 
            className="pl-8 h-8 text-xs" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="h-[250px] overflow-y-hidden">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[350px]">
              <LocationTree 
                locations={locations} 
                onSelect={onLocationSelect}
                selectedLocationId={selectedLocationId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Location Hierarchy</CardTitle>
          <Collapsible open={isTreeOpen} onOpenChange={setIsTreeOpen} className="md:hidden">
            <CollapsibleTrigger className="md:hidden">
              {isTreeOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search locations..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <Collapsible defaultOpen={true} className="hidden md:block">
        <CollapsibleContent>
          <CardContent>
            <div className="h-[350px] overflow-y-hidden">
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[400px]">
                  <LocationTree 
                    locations={locations} 
                    onSelect={onLocationSelect}
                    selectedLocationId={selectedLocationId}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible open={isTreeOpen} onOpenChange={setIsTreeOpen} className="md:hidden">
        <CollapsibleContent>
          <CardContent>
            <div className="h-[300px] overflow-y-hidden">
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[400px]">
                  <LocationTree 
                    locations={locations} 
                    onSelect={onLocationSelect}
                    selectedLocationId={selectedLocationId}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default LocationHierarchyPanel;
