
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Location } from './LocationTree';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LocationTree from './LocationTree';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1, { message: "Location name is required" }),
});

interface AddLocationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locations: Location[];
  onLocationCreated: (location: Location) => void;
}

const AddLocationDialog: React.FC<AddLocationDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  locations,
  onLocationCreated
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParentLocation, setSelectedParentLocation] = useState<Location | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleSelectParentLocation = (location: Location) => {
    setSelectedParentLocation(location);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new location with the form values
    const newLocation: Location = {
      id: `loc-${Date.now()}`, // Generate a temporary unique ID
      name: values.name,
      favorite: false,
      parentLocationId: selectedParentLocation?.id || null,
      children: [],
    };
    
    onLocationCreated(newLocation);
    
    toast({
      title: "Location created",
      description: `${values.name} has been added successfully.`,
    });
    
    // Reset form and close dialog
    form.reset();
    setSelectedParentLocation(null);
    onOpenChange(false);
  };

  // Filter locations by search query
  const filteredLocations = searchQuery.trim() === '' 
    ? locations 
    : locations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label>Parent Location (Optional)</Label>
              <div className="border rounded-md p-4 max-h-[300px] overflow-auto">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search locations..." 
                    className="pl-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {selectedParentLocation && (
                  <div className="mb-2 p-2 bg-muted rounded-md flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">Selected: {selectedParentLocation.name}</span>
                  </div>
                )}
                
                <LocationTree 
                  locations={filteredLocations} 
                  onSelect={handleSelectParentLocation}
                  selectedLocationId={selectedParentLocation?.id}
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Location</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLocationDialog;
