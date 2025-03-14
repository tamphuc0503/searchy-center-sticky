
import React from 'react';
import { SearchItem, SearchResponse } from '@/services/searchService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchResultsProps {
  searchData: SearchResponse | null;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchData, isLoading, onPageChange }) => {
  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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

  if (!searchData || searchData.items.length === 0) {
    return (
      <div className="mt-8 text-center text-muted-foreground animate-fade-in">
        No results found. Try a different search term.
      </div>
    );
  }

  const { items, pagination } = searchData;
  const { currentPage, totalPages, totalItems } = pagination;

  // Generate page numbers for pagination
  const renderPaginationItems = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          onClick={() => onPageChange(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // If we're too far from the start, show ellipsis
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're near the start or end
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            onClick={() => onPageChange(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // If we're too far from the end, show ellipsis
    if (currentPage < totalPages - 2 && totalPages > maxVisiblePages) {
      pages.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            onClick={() => onPageChange(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <div className="mt-8 w-full animate-fade-in space-y-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Showing {items.length} of {totalItems} results
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
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
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResults;
