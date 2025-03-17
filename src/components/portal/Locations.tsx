
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Search, Plus, FileText, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Locations = () => {
  // Sample locations data
  const locations = [
    { id: 1, name: 'Main Laboratory', address: '123 Science Blvd, Floor 2', sdsCount: 45 },
    { id: 2, name: 'Storage Room A', address: 'Building 3, Basement', sdsCount: 28 },
    { id: 3, name: 'Production Line', address: 'Factory Building, East Wing', sdsCount: 37 },
    { id: 4, name: 'Research Lab', address: '555 Innovation Drive, Suite 201', sdsCount: 15 },
    { id: 5, name: 'Warehouse', address: '78 Industrial Parkway', sdsCount: 7 },
  ];

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
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search locations..." className="pl-8" />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Locations</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <TableCell>{location.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {location.sdsCount} files
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Locations;
