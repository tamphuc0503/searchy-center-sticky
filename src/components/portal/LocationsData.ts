
import { Location } from './LocationTree';
import { LocationData } from './LocationsTable';

// Dummy location data with 4 sub-levels
export const dummyLocations: Location[] = [
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
        children: [
          {
            id: "loc1-1-1",
            name: "Laboratory A",
            favorite: true,
            parentLocationId: "loc1-1",
            children: [
              {
                id: "loc1-1-1-1",
                name: "Chemical Storage A1",
                favorite: false,
                parentLocationId: "loc1-1-1",
                children: []
              },
              {
                id: "loc1-1-1-2",
                name: "Equipment Room A2",
                favorite: false,
                parentLocationId: "loc1-1-1",
                children: []
              }
            ]
          },
          {
            id: "loc1-1-2",
            name: "Laboratory B",
            favorite: false,
            parentLocationId: "loc1-1",
            children: [
              {
                id: "loc1-1-2-1",
                name: "Chemical Storage B1",
                favorite: false,
                parentLocationId: "loc1-1-2",
                children: []
              }
            ]
          }
        ]
      },
      {
        id: "loc1-2",
        name: "Production Building",
        favorite: false,
        parentLocationId: "loc1",
        children: [
          {
            id: "loc1-2-1",
            name: "Assembly Line",
            favorite: false,
            parentLocationId: "loc1-2",
            children: [
              {
                id: "loc1-2-1-1",
                name: "Station 1",
                favorite: false,
                parentLocationId: "loc1-2-1",
                children: []
              },
              {
                id: "loc1-2-1-2",
                name: "Station 2",
                favorite: true,
                parentLocationId: "loc1-2-1",
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "loc2",
    name: "Remote Facility North",
    favorite: false,
    parentLocationId: null,
    children: [
      {
        id: "loc2-1",
        name: "Warehouse",
        favorite: true,
        parentLocationId: "loc2",
        children: [
          {
            id: "loc2-1-1",
            name: "Chemical Storage Area",
            favorite: false,
            parentLocationId: "loc2-1",
            children: [
              {
                id: "loc2-1-1-1",
                name: "Flammable Materials",
                favorite: false,
                parentLocationId: "loc2-1-1",
                children: []
              },
              {
                id: "loc2-1-1-2",
                name: "Corrosive Materials",
                favorite: false,
                parentLocationId: "loc2-1-1",
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

// Sample flattened locations data for the table with address and sdsCount
export const sampleLocationsData: LocationData[] = [
  { id: "1", name: 'Main Laboratory', address: '123 Science Blvd, Floor 2', sdsCount: 45 },
  { id: "2", name: 'Storage Room A', address: 'Building 3, Basement', sdsCount: 28 },
  { id: "3", name: 'Production Line', address: 'Factory Building, East Wing', sdsCount: 37 },
  { id: "4", name: 'Research Lab', address: '555 Innovation Drive, Suite 201', sdsCount: 15 },
  { id: "5", name: 'Warehouse', address: '78 Industrial Parkway', sdsCount: 7 },
];

// Helper function to adapt Location objects to LocationData format for the table
export const convertLocationToTableData = (location: Location): LocationData => {
  return {
    ...location,
    address: location.address || "No address specified", // Use location address if available
    sdsCount: location.sdsCount || 0 // Use location sdsCount if available
  };
};
