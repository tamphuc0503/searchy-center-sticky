
import React from 'react';
import { SDSItem, SearchResponse } from '@/services/searchService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine, AlertTriangle, Info } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
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
      <div className="mt-8 w-full animate-fade-in">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
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
      
      <div className="space-y-4">
        {items.map((item: SDSItem) => (
          <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="grid md:grid-cols-[200px_1fr] gap-4">
              <div className="hidden md:block h-full overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={`${item.productName} SDS`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-xl line-clamp-1">{item.productName}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-1/3">Substance</TableCell>
                        <TableCell>{item.substanceName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Manufacturer</TableCell>
                        <TableCell>{item.manufacturerName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">CAS No.</TableCell>
                        <TableCell>{item.casNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Revision Date</TableCell>
                        <TableCell>{item.revisionDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Components</TableCell>
                        <TableCell>{item.components.join(", ")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">GHS</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {item.ghs.map((hazard, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                {hazard}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="p-0 pt-4 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    SDS ID: {item.id}
                  </div>
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ArrowDownToLine size={16} />
                      Download SDS
                    </Button>
                  </a>
                </CardFooter>
              </div>
            </div>
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
