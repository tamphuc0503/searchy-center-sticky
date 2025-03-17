
// Mock API service that returns sample Safety Data Sheet (SDS) search results

export interface SDSItem {
  id: string;
  productName: string;
  substanceName: string;
  manufacturerName: string;
  revisionDate: string;
  ghs: string[];
  casNo: string;
  components: string[];
  imageUrl: string;
  fileUrl: string;
}

export interface SearchResponse {
  items: SDSItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

// Generate SDS sample items
const generateSampleSDSItems = (): SDSItem[] => {
  const manufacturers = ['3M', 'DuPont', 'BASF', 'Dow Chemical', 'ExxonMobil', 'Sherwin-Williams', 'PPG Industries'];
  const substances = ['Acetone', 'Methanol', 'Toluene', 'Ethanol', 'Isopropyl Alcohol', 'Hydrogen Peroxide', 'Sodium Hydroxide', 'Sulfuric Acid'];
  const ghsLabels = ['Flammable', 'Toxic', 'Corrosive', 'Environmentally Hazardous', 'Oxidizing', 'Explosive', 'Health Hazard', 'Acute Toxicity'];
  
  const imageUrls = [
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1581092921461-39b9d317e73c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1562751362-404243c2989b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1583426573939-97d09302d76a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1580169980114-ccd0babfa840?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  ];
  
  // Generate CAS numbers
  const generateCasNo = () => {
    const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const part2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const part3 = Math.floor(Math.random() * 10).toString();
    return `${part1}-${part2}-${part3}`;
  };
  
  // Generate random date within the last 3 years
  const generateRevisionDate = () => {
    const now = new Date();
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(now.getFullYear() - 3);
    
    const randomTimestamp = threeYearsAgo.getTime() + Math.random() * (now.getTime() - threeYearsAgo.getTime());
    const date = new Date(randomTimestamp);
    
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };
  
  // Create 77 sample items (as requested)
  const items: SDSItem[] = [];
  for (let i = 1; i <= 77; i++) {
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const substance = substances[Math.floor(Math.random() * substances.length)];
    
    // Generate 1-3 random GHS labels
    const numGhs = Math.floor(Math.random() * 3) + 1;
    const ghs: string[] = [];
    for (let j = 0; j < numGhs; j++) {
      const randomGhs = ghsLabels[Math.floor(Math.random() * ghsLabels.length)];
      if (!ghs.includes(randomGhs)) {
        ghs.push(randomGhs);
      }
    }
    
    // Generate 1-3 random components
    const numComponents = Math.floor(Math.random() * 3) + 1;
    const components: string[] = [];
    for (let j = 0; j < numComponents; j++) {
      const randomSubstance = substances[Math.floor(Math.random() * substances.length)];
      if (!components.includes(randomSubstance)) {
        components.push(randomSubstance);
      }
    }
    
    items.push({
      id: i.toString().padStart(3, '0'),
      productName: `${manufacturer} ${substance} ${Math.floor(Math.random() * 100)}`,
      substanceName: substance,
      manufacturerName: manufacturer,
      revisionDate: generateRevisionDate(),
      ghs,
      casNo: generateCasNo(),
      components,
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
      fileUrl: `https://example.com/sds/${manufacturer.toLowerCase()}-${substance.toLowerCase().replace(' ', '-')}.pdf`
    });
  }
  
  return items;
};

// Create our dataset once
const allSampleItems = generateSampleSDSItems();

export const searchApi = async (query: string, page: number = 1, itemsPerPage: number = 10): Promise<SearchResponse> => {
  console.log(`Searching for SDS: ${query} (Page ${page})`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter items based on query (case insensitive)
  const filteredItems = query 
    ? allSampleItems.filter(item => 
        item.productName.toLowerCase().includes(query.toLowerCase()) || 
        item.substanceName.toLowerCase().includes(query.toLowerCase()) ||
        item.manufacturerName.toLowerCase().includes(query.toLowerCase()) ||
        item.components.some(comp => comp.toLowerCase().includes(query.toLowerCase())) ||
        item.casNo.includes(query)
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
