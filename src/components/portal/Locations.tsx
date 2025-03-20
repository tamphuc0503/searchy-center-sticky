
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Search, Plus, FileText, ChevronRight, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LocationTree, { Location } from './LocationTree';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Dummy location data with 4 sub-levels
const dummyLocations: Location[] = [
  {
    id: "loc1",
    name: "Main Facility",
    favorite: true,
    parentLocationId: null,
    children: [
      {
        id: "loc1-1",
        name: "Research Building",
        favorite: false,
        parentLocationId: "loc1",
        children: [
          {
            id: "loc1-1-1",
            name: "Laboratory A",
            favorite: true,
            parentLocationId: "loc1-1",
            children: [
              {
                id: "loc1-1-1-1",
                name: "Chemical Storage A1",
                favorite: false,
                parentLocationId: "loc1-1-1",
                children: []
              },
              {
                id: "loc1-1-1-2",
                name: "Equipment Room A2",
                favorite: false,
                parentLocationId: "loc1-1-1",
                children: []
              }
            ]
          },
          {
            id: "loc1-1-2",
            name: "Laboratory B",
            favorite: false,
            parentLocationId: "loc1-1",
            children: [
              {
                id: "loc1-1-2-1",
                name: "Chemical Storage B1",
                favorite: false,
                parentLocationId: "loc1-1-2",
                children: []
              }
            ]
          }
        ]
      },
      {
        id: "loc1-2",
        name: "Production Building",
        favorite: false,
        parentLocationId: "loc1",
        children: [
          {
            id: "loc1-2-1",
            name: "Assembly Line",
            favorite: false,
            parentLocationId: "loc1-2",
            children: [
              {
                id: "loc1-2-1-1",
                name: "Station 1",
                favorite: false,
                parentLocationId: "loc1-2-1",
                children: []
              },
              {
                id: "loc1-2-1-2",
                name: "Station 2",
                favorite: true,
                parentLocationId: "loc1-2-1",
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "loc2",
    name: "Remote Facility North",
    favorite: false,
    parentLocationId: null,
    children: [
      {
        id: "loc2-1",
        name: "Warehouse",
        favorite: true,
        parentLocationId: "loc2",
        children: [
          {
            id: "loc2-1-1",
            name: "Chemical Storage Area",
            favorite: false,
            parentLocationId: "loc2-1",
            children: [
              {
                id: "loc2-1-1-1",
                name: "Flammable Materials",
                favorite: false,
                parentLocationId: "loc2-1-1",
                children: []
              },
              {
                id: "loc2-1-1-2",
                name: "Corrosive Materials",
                favorite: false,
                parentLocationId: "loc2-1-1",
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

// Sample flattened locations data for the table
const sampleLocationsData = [
  { id: 1, name: 'Main Laboratory', address: '123 Science Blvd, Floor 2', sdsCount: 45 },
  { id: 2, name: 'Storage Room A', address: 'Building 3, Basement', sdsCount: 28 },
  { id: 3, name: 'Production Line', address: 'Factory Building, East Wing', sdsCount: 37 },
  { id: 4, name: 'Research Lab', address: '555 Innovation Drive, Suite 201', sdsCount: 15 },
  { id: 5, name: 'Warehouse', address: '78 Industrial Parkway', sdsCount: 7 },
];

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isTreeOpen, setIsTreeOpen] = useState(true);

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
            <CollapsibleContent forceMount className="hidden md:block">
              <CardContent>
                <LocationTree 
                  locations={dummyLocations} 
                  onSelect={handleLocationSelect}
                  selectedLocationId={selectedLocation?.id}
                />
              </CardContent>
            </CollapsibleContent>
            <CollapsibleContent open={isTreeOpen}>
              <CardContent className="md:hidden">
                <LocationTree 
                  locations={dummyLocations} 
                  onSelect={handleLocationSelect}
                  selectedLocationId={selectedLocation?.id}
                />
              </CardContent>
            </CollapsibleContent>
          </Card>
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
                  {sampleLocationsData.map((location) => (
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
      </div>
    </div>
  );
};

export default Locations;
