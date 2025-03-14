
// Mock API service that returns sample search results
// In a real application, this would fetch from an actual API endpoint

export interface SearchItem {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  imageUrl: string;
}

export interface SearchResponse {
  items: SearchItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

export const searchApi = async (query: string): Promise<SearchResponse> => {
  console.log(`Searching for: ${query}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock response data
  return {
    items: [
      {
        id: "001",
        name: "Project Report Q1",
        description: "Quarterly business analysis with financial projections and market insights",
        fileUrl: "https://example.com/files/project-report-q1.pdf",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "002",
        name: "Technical Documentation",
        description: "Complete system architecture and implementation guidelines",
        fileUrl: "https://example.com/files/technical-docs.zip",
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "003",
        name: "User Research Study",
        description: "Comprehensive analysis of user behavior and preferences",
        fileUrl: "https://example.com/files/user-research.xlsx",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 3,
      itemsPerPage: 3,
      totalItems: 9
    }
  };
};
