
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarRail
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, MapPin, LogOut, ChevronDown, ChevronRight, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Dashboard from '@/components/portal/Dashboard';
import MySDSFiles from '@/components/portal/MySDSFiles';
import Locations from '@/components/portal/Locations';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import LocationTree, { Location } from '@/components/portal/LocationTree';

// Dummy location data for sidebar
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
        children: []
      },
      {
        id: "loc1-2",
        name: "Production Building",
        favorite: false,
        parentLocationId: "loc1",
        children: []
      }
    ]
  },
  {
    id: "loc2",
    name: "Remote Facility",
    favorite: false,
    parentLocationId: null,
    children: []
  }
];

const Portal = () => {
  const [activeSection, setActiveSection] = React.useState<'dashboard' | 'files' | 'locations'>('dashboard');
  const [isLocationsOpen, setIsLocationsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    // Here you would add actual sign out logic
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate('/');
  };

  const handleLocationSelect = (location: Location) => {
    setActiveSection('locations');
    // In a real app, you would pass the selected location ID to the Locations component
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">SDS Portal</h2>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeSection === 'dashboard'}
                      onClick={() => setActiveSection('dashboard')}
                      tooltip="Dashboard"
                    >
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeSection === 'files'}
                      onClick={() => setActiveSection('files')}
                      tooltip="My SDS Files"
                    >
                      <FileText />
                      <span>My SDS Files</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem className="flex flex-col">
                    <div className="flex w-full">
                      <SidebarMenuButton 
                        isActive={activeSection === 'locations'}
                        onClick={() => setActiveSection('locations')}
                        tooltip="Locations"
                        className="flex-1"
                      >
                        <MapPin />
                        <span>Locations</span>
                      </SidebarMenuButton>
                      <CollapsibleTrigger
                        onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                        className="flex h-10 w-10 items-center justify-center"
                      >
                        {isLocationsOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="pl-8 ml-1">
                      <LocationTree 
                        locations={dummyLocations} 
                        onSelect={handleLocationSelect} 
                      />
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 space-y-4">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3 px-2 py-2 rounded-md">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
            <Separator />
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2" 
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        {/* Add SidebarRail for better UX when collapsing/expanding */}
        <SidebarRail />
        
        <SidebarInset className="p-6">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'files' && <MySDSFiles />}
          {activeSection === 'locations' && <Locations />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Portal;
