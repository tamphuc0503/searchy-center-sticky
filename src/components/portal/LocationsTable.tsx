
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Location } from './LocationTree';

// Define a unified type that can handle both the old location data format and the new Location type
export interface LocationData {
  id: string | number;
  name: string;
  address?: string;
  sdsCount?: number;
  // Optional Location properties
  favorite?: boolean;
  parentLocationId?: string | null;
  children?: Location[];
}

interface LocationsTableProps {
  locations: LocationData[];
  title: string;
}

const LocationsTable: React.FC<LocationsTableProps> = ({ locations, title }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>SDS Files</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {location.name}
                </div>
              </TableCell>
              <TableCell>{location.address || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {location.sdsCount || 0} files
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LocationsTable;
