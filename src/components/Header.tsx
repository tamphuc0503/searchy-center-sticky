
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ease-in-out",
        scrolled 
          ? "py-4 glass-effect shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight transition-opacity duration-200 hover:opacity-80"
        >
          Search
        </Link>
        
        <nav className="flex items-center space-x-8">
          <Link to="/services" className="header-link">Services</Link>
          <Link to="/pricing" className="header-link">Pricing</Link>
          <Link to="/about" className="header-link">About us</Link>
          <div className="flex items-center space-x-3">
            <Link to="/sign-in">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button size="sm" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
