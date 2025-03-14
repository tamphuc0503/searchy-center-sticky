
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
        </nav>
      </div>
    </header>
  );
};

export default Header;
