
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { SearchResponse, searchApi } from '@/services/searchService';

const Index = () => {
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearchStart = () => {
    setIsSearching(true);
  };

  const handleSearchResults = (results: SearchResponse | null) => {
    setSearchData(results);
    setIsSearching(false);
    if (results) {
      setCurrentQuery(results.pagination.currentPage === 1 ? '' : currentQuery);
    }
  };

  const handlePageChange = async (page: number) => {
    if (!currentQuery && searchData) {
      // If we have results but no query stored (happens on first search),
      // use an empty string to get all results
      setCurrentQuery('');
    }
    
    setIsSearching(true);
    try {
      const response = await searchApi(currentQuery || '', page);
      setSearchData(response);
    } catch (error) {
      console.error("Error fetching page:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 animate-fade-in">
        <div className="max-w-4xl w-full text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Safety Data Sheet Search
          </h1>
          <p className="text-xl text-muted-foreground">
            Find detailed safety information for chemicals and substances
          </p>
        </div>
        
        <SearchBar 
          onSearchStart={handleSearchStart}
          onSearchResults={handleSearchResults}
        />
        
        <SearchResults 
          searchData={searchData} 
          isLoading={isSearching}
          onPageChange={handlePageChange}
        />
        
        {!searchData && !isSearching && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full animate-slide-in">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border bg-card text-center transition-all duration-300 hover:shadow-md"
              >
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2023 SDS Search. All rights reserved.
          </div>
          
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Comprehensive Database",
    description: "Access thousands of Safety Data Sheets from leading manufacturers worldwide."
  },
  {
    title: "Detailed Information",
    description: "View hazard information, composition, handling procedures, and more for each substance."
  },
  {
    title: "Regulatory Compliance",
    description: "Stay compliant with OSHA, GHS, and other international safety standards."
  }
];

export default Index;
