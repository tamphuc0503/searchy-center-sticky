
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUp, Search, Filter, Download, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MySDSFiles = () => {
  // Sample SDS files data
  const files = [
    { id: 1, name: 'Acetone', dateAdded: '2023-10-15', manufacturer: '3M', category: 'Solvent' },
    { id: 2, name: 'Methanol', dateAdded: '2023-09-23', manufacturer: 'DuPont', category: 'Alcohol' },
    { id: 3, name: 'Toluene', dateAdded: '2023-08-05', manufacturer: 'BASF', category: 'Solvent' },
    { id: 4, name: 'Ethanol', dateAdded: '2023-07-18', manufacturer: 'Dow Chemical', category: 'Alcohol' },
    { id: 5, name: 'Isopropyl Alcohol', dateAdded: '2023-06-30', manufacturer: '3M', category: 'Alcohol' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My SDS Files</h1>
          <p className="text-muted-foreground">Manage your safety data sheets</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileUp className="h-4 w-4" />
          Upload SDS
        </Button>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search SDS files..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>SDS Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.manufacturer}</TableCell>
                  <TableCell>{file.category}</TableCell>
                  <TableCell>{file.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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

export default MySDSFiles;
