
import React from 'react';
import Header from '@/components/Header';

const Services = () => {
  return (
    <div className="min-h-screen pt-24 px-6">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-12 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
            Our Services
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Discover what we offer
          </h1>
          <p className="text-lg text-muted-foreground">
            We provide a range of services designed to help you succeed.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 animate-scale-in">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Search Optimization",
    description: "Improve your search results and visibility with our advanced optimization techniques."
  },
  {
    title: "Data Analysis",
    description: "Gain insights from your search data with comprehensive analysis and reporting."
  },
  {
    title: "Custom Integration",
    description: "Seamlessly integrate our search technology with your existing systems and workflows."
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need it with our round-the-clock customer support team."
  }
];

export default Services;
