
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

type Company = {
  name: string;
  logo: string;
};

const companies: Company[] = [
  { name: '3M', logo: '3M' },
  { name: 'DuPont', logo: 'DuPont' },
  { name: 'BASF', logo: 'BASF' },
  { name: 'Dow Chemical', logo: 'Dow' },
  { name: 'Shell', logo: 'Shell' },
  { name: 'Exxon', logo: 'Exxon' },
  { name: 'Chevron', logo: 'Chevron' },
  { name: 'BP', logo: 'BP' },
  { name: 'Johnson & Johnson', logo: 'J&J' },
  { name: 'Bayer', logo: 'Bayer' },
];

const CompanyLogos = () => {
  return (
    <div className="my-10">
      <p className="text-center text-lg font-medium mb-6 text-gray-700">
        Trusted by leading companies worldwide
      </p>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {companies.map((company, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <div className="h-24 flex items-center justify-center p-2">
                <div className="h-12 w-full bg-gray-100 rounded-md flex items-center justify-center border">
                  <span className="font-semibold text-gray-700">{company.logo}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative static mx-2 transform-none" />
          <CarouselNext className="relative static mx-2 transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default CompanyLogos;
