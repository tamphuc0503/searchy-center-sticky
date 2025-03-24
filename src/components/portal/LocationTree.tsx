import React, { useState } from 'react';
import { ChevronRight, ChevronDown, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Location {
  id: string;
  name: string;
  favorite: boolean;
  parentLocationId: string | null;
  children: Location[];
  address?: string;
  sdsCount?: number;
}

interface LocationTreeProps {
  locations: Location[];
  onSelect: (location: Location) => void;
  selectedLocationId?: string;
}

interface LocationItemProps {
  location: Location;
  level: number;
  onSelect: (location: Location) => void;
  selectedLocationId?: string;
}

const LocationItem: React.FC<LocationItemProps> = ({ 
  location, 
  level, 
  onSelect, 
  selectedLocationId 
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = location.children && location.children.length > 0;
  const isSelected = selectedLocationId === location.id;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    onSelect(location);
  };

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1.5 px-2 rounded-md transition-colors",
          isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted/50 cursor-pointer",
          level === 0 ? "font-medium" : ""
        )}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
        onClick={handleSelect}
      >
        {hasChildren && (
          <button 
            onClick={toggleExpand} 
            className="mr-1 h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {!hasChildren && <div className="w-5" />}
        <MapPin className={cn("h-4 w-4 shrink-0 mr-2", location.favorite ? "text-yellow-500" : "text-muted-foreground")} />
        <span className="text-sm truncate">{location.name}</span>
        {location.favorite && <Star className="h-3 w-3 ml-2 text-yellow-500" />}
      </div>

      {isExpanded && hasChildren && (
        <div className="pl-4">
          {location.children.map((child) => (
            <LocationItem 
              key={child.id} 
              location={child} 
              level={level + 1} 
              onSelect={onSelect}
              selectedLocationId={selectedLocationId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const LocationTree: React.FC<LocationTreeProps> = ({ 
  locations, 
  onSelect,
  selectedLocationId
}) => {
  return (
    <div className="space-y-1 py-2">
      {locations.map((location) => (
        <LocationItem 
          key={location.id} 
          location={location} 
          level={0} 
          onSelect={onSelect}
          selectedLocationId={selectedLocationId}
        />
      ))}
    </div>
  );
};

export default LocationTree;
