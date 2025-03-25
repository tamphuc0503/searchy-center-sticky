
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Location } from './LocationTree';
import { MapPin, Users, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SdsFile {
  id: string;
  name: string;
  productName: string;
  manufacturer: string;
  hazardLevel: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
  department: string;
}

interface LocationUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface LocationDetailProps {
  location: Location;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ location }) => {
  // Mock data - in a real app, this would be fetched based on the location ID
  const sdsFiles: SdsFile[] = [
    { id: '1', name: 'Acetone', productName: 'Acetone 99%', manufacturer: 'ChemCorp', hazardLevel: 'Medium', lastUpdated: '2023-05-12', department: 'Laboratory' },
    { id: '2', name: 'Sodium Hydroxide', productName: 'NaOH Solution', manufacturer: 'ChemTech', hazardLevel: 'High', lastUpdated: '2023-06-18', department: 'Processing' },
    { id: '3', name: 'Isopropyl Alcohol', productName: 'IPA 70%', manufacturer: 'MediClean', hazardLevel: 'Low', lastUpdated: '2023-07-22', department: 'Cleaning' },
    { id: '4', name: 'Hydrochloric Acid', productName: 'HCl 35%', manufacturer: 'ChemCorp', hazardLevel: 'High', lastUpdated: '2023-04-05', department: 'Laboratory' },
    { id: '5', name: 'Ethanol', productName: 'Ethanol 96%', manufacturer: 'BioChem', hazardLevel: 'Medium', lastUpdated: '2023-08-11', department: 'Laboratory' },
  ];

  const users: LocationUser[] = [
    { id: '1', name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'Safety Officer', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Department Manager', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Sarah Johnson', email: 'sarah.johnson@example.com', role: 'Lab Technician', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'David Clark', email: 'david.clark@example.com', role: 'Maintenance Staff', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Lisa Rodriguez', email: 'lisa.rodriguez@example.com', role: 'Inventory Manager', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});

  const toggleFileExpand = (fileId: string) => {
    setExpandedFiles(prev => ({
      ...prev,
      [fileId]: !prev[fileId]
    }));
  };

  const getHazardBadgeVariant = (level: 'Low' | 'Medium' | 'High') => {
    switch(level) {
      case 'Low': return { variant: 'outline' as const, className: 'bg-green-50 text-green-700 border-green-200' };
      case 'Medium': return { variant: 'outline' as const, className: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      case 'High': return { variant: 'outline' as const, className: 'bg-red-50 text-red-700 border-red-200' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-6 w-6" />
        <h1 className="text-2xl font-bold">{location.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
          <CardDescription>Details about this location and its properties.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{location.address || 'No address provided'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SDS Count</p>
              <p>{location.sdsCount || sdsFiles.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Parent Location</p>
              <p>{location.parentLocationId ? 'Has parent' : 'Root location'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Child Locations</p>
              <p>{location.children.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sds" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="sds" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            SDS Files
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sds" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Data Sheets</CardTitle>
              <CardDescription>SDS files associated with this location.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: '30%' }}>Name</TableHead>
                    <TableHead>Manufacturer</TableHead>
                    <TableHead>Hazard Level</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sdsFiles.map((file) => (
                    <React.Fragment key={file.id}>
                      <TableRow className="cursor-pointer" onClick={() => toggleFileExpand(file.id)}>
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell>{file.manufacturer}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getHazardBadgeVariant(file.hazardLevel).variant}
                            className={getHazardBadgeVariant(file.hazardLevel).className}
                          >
                            {file.hazardLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>{file.department}</TableCell>
                        <TableCell>{file.lastUpdated}</TableCell>
                        <TableCell>
                          {expandedFiles[file.id] ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </TableCell>
                      </TableRow>
                      {expandedFiles[file.id] && (
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={6} className="p-4">
                            <div className="p-4 space-y-4">
                              <div>
                                <h4 className="font-medium">Product Details</h4>
                                <p className="text-sm text-muted-foreground">
                                  {file.productName} by {file.manufacturer}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Safety Precautions</h4>
                                  <ul className="text-sm list-disc pl-5 mt-2">
                                    <li>Wear appropriate protective equipment</li>
                                    <li>Store in a well-ventilated area</li>
                                    <li>Keep away from ignition sources</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium">First Aid Measures</h4>
                                  <ul className="text-sm list-disc pl-5 mt-2">
                                    <li>Eye contact: Rinse with water for 15 minutes</li>
                                    <li>Skin contact: Wash with soap and water</li>
                                    <li>Inhalation: Move to fresh air</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm" className="mr-2">View Full SDS</Button>
                                <Button size="sm">Download PDF</Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All SDS Files</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>People with access to this location.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Badge>{user.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Manage Permissions</Button>
              <Button>Add User</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationDetail;
