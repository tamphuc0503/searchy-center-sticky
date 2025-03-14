
import React from 'react';
import { SearchItem } from '@/services/searchService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';

interface SearchResultsProps {
  results: SearchItem[] | null;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-40 bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
      {results.map((item) => (
        <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="h-40 overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          </CardContent>
          <CardFooter>
            <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowDownToLine size={16} />
                Download
              </Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
