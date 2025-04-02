
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Location } from './LocationTree';
import { MapPin, Users, FileText, ChevronDown, ChevronRight, User, Building } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  // Assign the first user as team lead for demo purposes
  const teamLead = users[0];

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

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Location Information
          </TabsTrigger>
          <TabsTrigger value="sds" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            SDS Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-4 space-y-6">
          {/* Location Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
              <CardDescription>Basic information about this location</CardDescription>
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
                  <p className="text-sm font-medium text-muted-foreground">Team Lead</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={teamLead.avatar} />
                      <AvatarFallback>{teamLead.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{teamLead.name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Child Locations</p>
                  <p>{location.children.length || 'No sub locations'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>People with access to this location</CardDescription>
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
          </Card>

          {/* Sub-Locations Card */}
          <Card>
            <CardHeader>
              <CardTitle>Sub Locations</CardTitle>
              <CardDescription>Child locations under this location</CardDescription>
            </CardHeader>
            <CardContent>
              {location.children.length > 0 ? (
                <div className="space-y-2">
                  {location.children.map(child => (
                    <Card key={child.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{child.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No sub locations</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sds" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Data Sheets</CardTitle>
              <CardDescription>SDS files associated with this location</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {sdsFiles.map((file) => (
                  <AccordionItem key={file.id} value={file.id}>
                    <AccordionTrigger className="hover:bg-muted/50 p-2 rounded-md">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="flex items-center gap-4">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={getHazardBadgeVariant(file.hazardLevel).variant}
                            className={getHazardBadgeVariant(file.hazardLevel).className}
                          >
                            {file.hazardLevel}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{file.manufacturer}</span>
                          <span className="text-sm text-muted-foreground">{file.lastUpdated}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4 space-y-4 bg-muted/30 rounded-md mt-2">
                        <div>
                          <h4 className="font-medium">Product Details</h4>
                          <p className="text-sm text-muted-foreground">
                            {file.productName} by {file.manufacturer} - {file.department}
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
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">View Full SDS</Button>
                          <Button size="sm">Download PDF</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationDetail;
