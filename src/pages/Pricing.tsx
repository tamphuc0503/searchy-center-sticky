
import React from 'react';
import Header from '@/components/Header';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  return (
    <div className="min-h-screen pt-24 px-6">
      <Header />
      
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 text-center mb-12 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
            Pricing
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 animate-scale-in">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className="flex flex-col p-6 rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button className="mt-6 w-full" variant={index === 0 ? "default" : "outline"}>
                Get started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const pricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for small projects and personal use.",
    features: [
      "Up to 1,000 searches per month",
      "Basic analytics",
      "Email support",
      "1 user"
    ]
  },
  {
    name: "Professional",
    price: 29,
    description: "Ideal for growing businesses and teams.",
    features: [
      "Up to 10,000 searches per month",
      "Advanced analytics",
      "Priority support",
      "5 users",
      "API access"
    ]
  },
  {
    name: "Enterprise",
    price: 79,
    description: "For organizations with advanced needs.",
    features: [
      "Unlimited searches",
      "Custom reporting",
      "24/7 phone support",
      "Unlimited users",
      "Advanced API access",
      "Custom integration"
    ]
  }
];

export default Pricing;
