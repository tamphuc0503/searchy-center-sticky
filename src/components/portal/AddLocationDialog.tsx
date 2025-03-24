
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Location } from './LocationTree';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1, { message: "Location name is required" }),
  address: z.string().optional(),
});

interface AddLocationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locations: Location[];
  onLocationCreated: (location: Location) => void;
  currentLocation?: Location | null;
}

const AddLocationDialog: React.FC<AddLocationDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  onLocationCreated,
  currentLocation
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new location with the form values
    const newLocation: Location = {
      id: `loc-${Date.now()}`, // Generate a temporary unique ID
      name: values.name,
      favorite: false,
      parentLocationId: currentLocation?.id || null,
      children: [],
      address: values.address || undefined,
      sdsCount: 0, // Initialize with 0 SDS files
    };
    
    onLocationCreated(newLocation);
    
    toast({
      title: "Location created",
      description: `${values.name} has been added successfully${currentLocation ? ` under ${currentLocation.name}` : ''}.`,
    });
    
    // Reset form and close dialog
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {currentLocation 
              ? `Add New Location under ${currentLocation.name}` 
              : "Add New Location"}
          </DialogTitle>
          <DialogDescription>
            Create a new location for organizing your SDS files.
          </DialogDescription>
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
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
