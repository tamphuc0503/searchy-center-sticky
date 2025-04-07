import React, { useEffect } from 'react';
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
import { LayoutDashboard, FileText, MapPin, LogOut, ChevronDown, ChevronRight, User, UserCog } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Dashboard from '@/components/portal/Dashboard';
import MySDSFiles, { SDSFile } from '@/components/portal/MySDSFiles';
import Locations from '@/components/portal/Locations';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import LocationHierarchyPanel from '@/components/portal/LocationHierarchyPanel';
import { dummyLocations } from '@/components/portal/LocationsData';
import { Location } from '@/components/portal/LocationTree';
import UserSettings from '@/components/portal/UserSettings';
import LocationDetail from '@/components/portal/LocationDetail';
import SDSDetail from '@/components/portal/SDSDetail';

const Portal = () => {
  const [activeSection, setActiveSection] = React.useState<'dashboard' | 'files' | 'locations' | 'settings' | 'locationDetail' | 'sdsDetail'>('dashboard');
  const [isLocationsOpen, setIsLocationsOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);
  const [selectedSDS, setSelectedSDS] = React.useState<SDSFile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Effect to listen for custom events from Dashboard
  useEffect(() => {
    // Handle SDS detail view request
    const handleViewSdsDetail = (event: CustomEvent<{ sdsId: number }>) => {
      // Find the SDS with the matching ID
      const sdsFiles: SDSFile[] = [
        { id: 1, name: 'Acetone', dateAdded: '2023-10-15', manufacturer: '3M', category: 'Solvent', source: 'global', description: 'Common solvent used in many applications including nail polish remover and paint thinner.', hazards: ['Flammable', 'Eye irritant'] },
        { id: 2, name: 'Methanol', dateAdded: '2023-09-23', manufacturer: 'DuPont', category: 'Alcohol', source: 'mine', description: 'Highly toxic alcohol used as a solvent and fuel. Handle with extreme care.', hazards: ['Toxic', 'Flammable', 'CNS depressant'] },
        { id: 3, name: 'Toluene', dateAdded: '2023-08-05', manufacturer: 'BASF', category: 'Solvent', source: 'members', description: 'Aromatic hydrocarbon used in paints, paint thinners, and adhesives.', hazards: ['Flammable', 'Reproductive toxin'] },
        { id: 4, name: 'Ethanol', dateAdded: '2023-07-18', manufacturer: 'Dow Chemical', category: 'Alcohol', source: 'global', description: 'Common alcohol used in many applications including disinfectants and beverages.', hazards: ['Flammable'] },
        { id: 5, name: 'Isopropyl Alcohol', dateAdded: '2023-06-30', manufacturer: '3M', category: 'Alcohol', source: 'mine', description: 'Common disinfectant and cleaning agent.', hazards: ['Flammable', 'Eye irritant'] },
      ];

      const sds = sdsFiles.find(sds => sds.id === event.detail.sdsId);
      if (sds) {
        setSelectedSDS(sds);
        setActiveSection('sdsDetail');
      }
    };

    // Handle location detail view request
    const handleViewLocationDetail = (event: CustomEvent<{ locationId: number }>) => {
      // Find the location with the matching ID (using the dummyLocations)
      const findLocation = (locations: Location[], id: number): Location | null => {
        for (const location of locations) {
          if (location.id === id) {
            return location;
          }
          if (location.children) {
            const found = findLocation(location.children, id);
            if (found) return found;
          }
        }
        return null;
      };
      
      const location = findLocation(dummyLocations, event.detail.locationId);
      if (location) {
        setSelectedLocation(location);
        setActiveSection('locationDetail');
      }
    };

    // Add event listeners
    window.addEventListener('viewSdsDetail', handleViewSdsDetail as EventListener);
    window.addEventListener('viewLocationDetail', handleViewLocationDetail as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('viewSdsDetail', handleViewSdsDetail as EventListener);
      window.removeEventListener('viewLocationDetail', handleViewLocationDetail as EventListener);
    };
  }, []);

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate('/');
  };

  // Modified to set location detail view
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setActiveSection('locationDetail');
  };
  
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setActiveSection('locationDetail');
  };
  
  const handleUserSettingsClick = () => {
    setActiveSection('settings');
  };

  // Handle SDS selection
  const handleSDSSelect = (sds: SDSFile) => {
    setSelectedSDS(sds);
    setActiveSection('sdsDetail');
  };

  // Go back from SDS detail to files list
  const handleBackFromSDSDetail = () => {
    setActiveSection('files');
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
                      isActive={activeSection === 'files' || activeSection === 'sdsDetail'}
                      onClick={() => {
                        if (activeSection === 'sdsDetail') {
                          setActiveSection('files');
                        } else {
                          setActiveSection('files');
                        }
                      }}
                      tooltip="My SDS Files"
                    >
                      <FileText />
                      <span>My SDS Files</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem className="flex flex-col">
                    <Collapsible open={isLocationsOpen} onOpenChange={setIsLocationsOpen}>
                      <div className="flex w-full">
                        <SidebarMenuButton 
                          isActive={activeSection === 'locations' || activeSection === 'locationDetail'}
                          onClick={() => setActiveSection('locations')}
                          tooltip="Locations"
                          className="flex-1"
                        >
                          <MapPin />
                          <span>Locations</span>
                        </SidebarMenuButton>
                        <CollapsibleTrigger className="flex h-10 w-10 items-center justify-center">
                          {isLocationsOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="px-3 py-2">
                          <LocationHierarchyPanel 
                            locations={dummyLocations}
                            selectedLocationId={selectedLocation?.id}
                            onLocationSelect={handleLocationSelect}
                            variant="sidebar"
                          />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 space-y-4">
            <Button 
              variant="ghost" 
              className="w-full p-2 h-auto flex items-center justify-start hover:bg-sidebar-accent cursor-pointer" 
              onClick={handleUserSettingsClick}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
                <UserCog className="ml-auto h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
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
        
        <SidebarRail />
        
        <SidebarInset className="p-6">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'files' && <MySDSFiles onSelectSDS={handleSDSSelect} />}
          {activeSection === 'locations' && <Locations selectedLocation={selectedLocation} onLocationClick={handleLocationClick} />}
          {activeSection === 'settings' && <UserSettings />}
          {activeSection === 'locationDetail' && selectedLocation && <LocationDetail location={selectedLocation} />}
          {activeSection === 'sdsDetail' && selectedSDS && <SDSDetail sds={selectedSDS} onBack={handleBackFromSDSDetail} />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Portal;
