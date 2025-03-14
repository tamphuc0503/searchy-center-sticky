
import React from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col justify-center items-center px-6 animate-fade-in">
        <div className="max-w-4xl w-full text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Find what you're looking for
          </h1>
          <p className="text-xl text-muted-foreground">
            The simple way to search and discover information
          </p>
        </div>
        
        <SearchBar />
        
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
      </main>
      
      <footer className="py-6 border-t">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2023 Search. All rights reserved.
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
    title: "Simple & Fast",
    description: "Get results instantly with our lightning-fast search technology."
  },
  {
    title: "Intelligent Suggestions",
    description: "Our algorithms learn from your searches to provide better results over time."
  },
  {
    title: "Seamless Experience",
    description: "Enjoy a beautiful, intuitive interface designed for clarity and ease of use."
  }
];

export default Index;
