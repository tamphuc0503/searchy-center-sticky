
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, MapPin, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define an interface for activities that can be clicked to navigate
interface ActivityItem {
  id: number;
  title: string;
  time: string;
  type: 'update' | 'add' | 'location' | 'assign';
  entityId?: number; // ID of the SDS or location
}

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample activities with IDs for navigation
  const recentActivities: ActivityItem[] = [
    { id: 1, title: "SDS for Acetone updated", time: "2 hours ago", type: "update", entityId: 1 }, // matches SDS ID 1
    { id: 2, title: "New SDS for Methanol added", time: "Yesterday", type: "add", entityId: 2 }, // matches SDS ID 2
    { id: 3, title: "Location 'Lab 3' created", time: "2 days ago", type: "location", entityId: 3 }, // would match a location ID
    { id: 4, title: "Assigned 5 SDS files to 'Storage Room'", time: "1 week ago", type: "assign", entityId: 2 } // refers to location ID
  ];

  // Handle click on activity item
  const handleActivityClick = (activity: ActivityItem) => {
    // Dispatch events to the parent Portal component via custom events
    const isSdsActivity = activity.type === 'update' || activity.type === 'add';
    
    if (isSdsActivity && activity.entityId) {
      // For SDS activities, dispatch event with SDS ID
      const event = new CustomEvent('viewSdsDetail', { 
        detail: { sdsId: activity.entityId }
      });
      window.dispatchEvent(event);
    } else if ((activity.type === 'location' || activity.type === 'assign') && activity.entityId) {
      // For location activities, dispatch event with location ID
      const event = new CustomEvent('viewLocationDetail', { 
        detail: { locationId: activity.entityId }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your SDS management dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total SDS Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">
              +6 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent SDS management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
