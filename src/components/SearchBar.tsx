
import React, { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchApi, SearchResponse } from '@/services/searchService';
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  onSearchResults: (results: SearchResponse | null) => void;
  onSearchStart: () => void;
}

const SearchBar = ({ onSearchResults, onSearchStart }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() && query.trim() !== '') {
      toast({
        title: "Search query is empty",
        description: "Please enter something to search for",
        variant: "destructive",
      });
      return;
    }

    onSearchStart();
    
    try {
      const response = await searchApi(query);
      onSearchResults(response);
      
      toast({
        title: "Search completed",
        description: `Found ${response.pagination.totalItems} Safety Data Sheets`,
      });
    } catch (error) {
      console.error("Search error:", error);
      onSearchResults(null);
      
      toast({
        title: "Search failed",
        description: "There was an error processing your search",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-container w-full max-w-3xl">
      <div
        className={cn(
          "relative flex items-center transition-all duration-300 ease-in-out",
          "rounded-full border border-input bg-background shadow-sm",
          focused ? "ring-2 ring-primary/20" : "",
          focused || query ? "w-full" : "w-[90%] mx-auto"
        )}
      >
        <div className="flex items-center justify-center w-12 h-12 pointer-events-none">
          <Search 
            className={cn(
              "w-5 h-5 transition-colors duration-300",
              focused ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        
        <input
          type="text"
          placeholder="Search for a product, substance, or CAS number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "flex-1 h-12 bg-transparent outline-none",
            "placeholder:text-muted-foreground text-base",
            "transition-all duration-300"
          )}
        />
        
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="px-4 h-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        )}
        
        <button
          type="submit"
          className="h-12 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-r-full hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>
      
      {focused && (
        <div className="mt-2 text-sm text-center text-muted-foreground animate-fade-in">
          Press Enter to search
        </div>
      )}
    </form>
  );
};

export default SearchBar;
