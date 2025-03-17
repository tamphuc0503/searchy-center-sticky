
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
import { LayoutDashboard, FileText, MapPin, LogOut, PanelLeftClose, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Dashboard from '@/components/portal/Dashboard';
import MySDSFiles from '@/components/portal/MySDSFiles';
import Locations from '@/components/portal/Locations';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Portal = () => {
  const [activeSection, setActiveSection] = React.useState<'dashboard' | 'files' | 'locations'>('dashboard');
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="inset">
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
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeSection === 'locations'}
                      onClick={() => setActiveSection('locations')}
                      tooltip="Locations"
                    >
                      <MapPin />
                      <span>Locations</span>
                    </SidebarMenuButton>
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
