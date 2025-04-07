
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUp, Search, Filter, Download, Eye, BellDot, Globe, User, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

const MySDSFiles = () => {
  // Sample SDS files data with source information
  const files = [
    { id: 1, name: 'Acetone', dateAdded: '2023-10-15', manufacturer: '3M', category: 'Solvent', source: 'global' },
    { id: 2, name: 'Methanol', dateAdded: '2023-09-23', manufacturer: 'DuPont', category: 'Alcohol', source: 'mine' },
    { id: 3, name: 'Toluene', dateAdded: '2023-08-05', manufacturer: 'BASF', category: 'Solvent', source: 'members' },
    { id: 4, name: 'Ethanol', dateAdded: '2023-07-18', manufacturer: 'Dow Chemical', category: 'Alcohol', source: 'global' },
    { id: 5, name: 'Isopropyl Alcohol', dateAdded: '2023-06-30', manufacturer: '3M', category: 'Alcohol', source: 'mine' },
  ];

  // State for upload dialog
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasNotifications, setHasNotifications] = useState(true);

  // SDS filter state
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredFiles, setFilteredFiles] = useState(files);
  const [searchQuery, setSearchQuery] = useState("");

  // Processing notifications
  const [processingFiles, setProcessingFiles] = useState([
    { id: 1, name: 'New SDS File.pdf', status: 'processing', progress: 60 },
    { id: 2, name: 'Chemical Report.pdf', status: 'complete', progress: 100 }
  ]);

  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadDialogOpen(false);
          
          // Add to processing files
          setProcessingFiles(prev => [...prev, {
            id: Math.random(),
            name: selectedFile.name,
            status: 'processing',
            progress: 20
          }]);
          
          setHasNotifications(true);
          
          toast({
            title: "Upload Complete",
            description: "Your SDS file has been uploaded and is now processing.",
          });
          
          // Reset form
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Handle filter changes
  const handleFilterChange = (value: string) => {
    if (value) {
      setActiveFilter(value);
      if (value === "all") {
        setFilteredFiles(files);
      } else {
        const source = value === "global" ? "global" : value === "mine" ? "mine" : "members";
        setFilteredFiles(files.filter(file => file.source === source));
      }
    }
  };

  // Filter source icon
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'global':
        return <Globe className="h-4 w-4 text-sky-500" title="Global SDS" />;
      case 'mine':
        return <User className="h-4 w-4 text-emerald-500" title="Uploaded by me" />;
      case 'members':
        return <Users className="h-4 w-4 text-amber-500" title="Uploaded by team members" />;
      default:
        return null;
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    let filtered = files;
    if (activeFilter !== "all") {
      const source = activeFilter === "global" ? "global" : activeFilter === "mine" ? "mine" : "members";
      filtered = files.filter(file => file.source === source);
    }
    
    if (query) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(query) || 
        file.manufacturer.toLowerCase().includes(query) || 
        file.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredFiles(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My SDS Files</h1>
          <p className="text-muted-foreground">Manage your safety data sheets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2" onClick={() => setUploadDialogOpen(true)}>
            <FileUp className="h-4 w-4" />
            Upload SDS
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellDot className="h-4 w-4" />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="p-4 border-b">
                <h3 className="font-medium">SDS Processing Status</h3>
              </div>
              <div className="max-h-80 overflow-auto p-2">
                {processingFiles.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No files processing
                  </div>
                ) : (
                  <div className="space-y-3">
                    {processingFiles.map((file) => (
                      <div key={file.id} className="p-2 border rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <span className="text-xs capitalize text-muted-foreground">
                            {file.status}
                          </span>
                        </div>
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search SDS files..." 
            className="pl-8" 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <ToggleGroup type="single" value={activeFilter} onValueChange={handleFilterChange}>
          <ToggleGroupItem value="all" aria-label="All SDS">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="global" aria-label="Global SDS">
            <Globe className="h-4 w-4 mr-1" />
            Global
          </ToggleGroupItem>
          <ToggleGroupItem value="mine" aria-label="My SDS">
            <User className="h-4 w-4 mr-1" />
            Mine
          </ToggleGroupItem>
          <ToggleGroupItem value="members" aria-label="Team SDS">
            <Users className="h-4 w-4 mr-1" />
            Team
          </ToggleGroupItem>
        </ToggleGroup>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Categories</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <Checkbox id="solvent" />
              <label htmlFor="solvent" className="text-sm">Solvent</label>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Checkbox id="alcohol" />
              <label htmlFor="alcohol" className="text-sm">Alcohol</label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Manufacturers</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <Checkbox id="3m" />
              <label htmlFor="3m" className="text-sm">3M</label>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Checkbox id="dupont" />
              <label htmlFor="dupont" className="text-sm">DuPont</label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>SDS Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="w-10">
                    {getSourceIcon(file.source)}
                  </TableCell>
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
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload SDS File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full items-center gap-2">
              <label htmlFor="sds-file" className="text-sm font-medium">
                Select SDS Document
              </label>
              <Input
                id="sds-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline" disabled={uploading}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySDSFiles;
