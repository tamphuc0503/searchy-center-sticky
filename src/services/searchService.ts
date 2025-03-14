
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

// Generate a larger dataset of sample items
const generateSampleItems = (): SearchItem[] => {
  const categories = ['Report', 'Documentation', 'Research', 'Presentation', 'Analysis', 'Case Study', 'Blueprint'];
  const departments = ['Marketing', 'Finance', 'Engineering', 'Design', 'Operations', 'Sales', 'HR'];
  const fileTypes = ['.pdf', '.docx', '.xlsx', '.pptx', '.zip'];
  
  const imageUrls = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1582738412230-e8af881fab34?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1558611848-f4b15f4fa202?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  ];
  
  // Create 67 sample items (as requested)
  const items: SearchItem[] = [];
  for (let i = 1; i <= 67; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const quarter = Math.floor(Math.random() * 4) + 1;
    const year = 2022 + Math.floor(Math.random() * 3);
    
    items.push({
      id: i.toString().padStart(3, '0'),
      name: `${department} ${category} Q${quarter} ${year}`,
      description: `${department} ${category.toLowerCase()} with comprehensive analysis and insights for Q${quarter} ${year}`,
      fileUrl: `https://example.com/files/${department.toLowerCase()}-${category.toLowerCase()}${fileType}`,
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
    });
  }
  
  return items;
};

// Create our dataset once
const allSampleItems = generateSampleItems();

export const searchApi = async (query: string, page: number = 1, itemsPerPage: number = 10): Promise<SearchResponse> => {
  console.log(`Searching for: ${query} (Page ${page})`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter items based on query (case insensitive)
  const filteredItems = query 
    ? allSampleItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    : [...allSampleItems];
  
  // Calculate pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages)); // Ensure page is within bounds
  
  // Get items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  
  // Return the response
  return {
    items: paginatedItems,
    pagination: {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems
    }
  };
};
