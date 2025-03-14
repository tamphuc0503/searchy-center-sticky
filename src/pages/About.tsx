
import React from 'react';
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen pt-24 px-6">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-12 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
            About Us
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to simplify information retrieval.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none animate-slide-in">
          <p>
            We believe that finding information should be simple, elegant, and efficient. Our search platform is designed with a focus on user experience, combining powerful technology with intuitive design.
          </p>
          
          <p>
            Founded in 2023, our team brings together experts in search technology, user experience design, and artificial intelligence. We're passionate about creating tools that make information more accessible and useful.
          </p>
          
          <h2>Our Values</h2>
          
          <div className="grid gap-6 md:grid-cols-2 my-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-xl border bg-card">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
          
          <h2>Our Team</h2>
          
          <p>
            We're a diverse group of thinkers, designers, and engineers committed to building the best search experience possible. Our team combines deep technical expertise with a passion for elegant, functional design.
          </p>
        </div>
      </div>
    </div>
  );
};

const values = [
  {
    title: "Simplicity",
    description: "We believe in removing complexity, not adding features for their own sake."
  },
  {
    title: "Quality",
    description: "We pay attention to every detail and never compromise on quality."
  },
  {
    title: "Innovation",
    description: "We continuously explore new ideas and approaches to improve the search experience."
  },
  {
    title: "Privacy",
    description: "We respect user privacy and design our systems with privacy in mind from the start."
  }
];

export default About;
