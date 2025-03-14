
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="search-container">
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
          placeholder="Search anything..."
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
            onClick={() => setQuery('')}
            className="px-4 h-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      
      {focused && (
        <div className="mt-2 text-sm text-center text-muted-foreground animate-fade-in">
          Press Enter to search
        </div>
      )}
    </div>
  );
};

export default SearchBar;
