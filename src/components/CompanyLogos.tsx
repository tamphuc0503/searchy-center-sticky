
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
  imageUrl: string;
};

const companies: Company[] = [
  { 
    name: '3M', 
    logo: '3M', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/3M_logo.svg/1200px-3M_logo.svg.png'
  },
  { 
    name: 'DuPont', 
    logo: 'DuPont', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/DuPont_logo.svg/1280px-DuPont_logo.svg.png'
  },
  { 
    name: 'BASF', 
    logo: 'BASF', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BASF-Logo.svg/1024px-BASF-Logo.svg.png'
  },
  { 
    name: 'Dow Chemical', 
    logo: 'Dow', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Dow_Chemical_Company_logo.svg/1280px-Dow_Chemical_Company_logo.svg.png'
  },
  { 
    name: 'Shell', 
    logo: 'Shell', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Shell_logo.svg/1200px-Shell_logo.svg.png'
  },
  { 
    name: 'Exxon', 
    logo: 'Exxon', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ExxonMobil_logo.svg/1200px-ExxonMobil_logo.svg.png'
  },
  { 
    name: 'Chevron', 
    logo: 'Chevron', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Chevron_Corporation_logo.svg/1200px-Chevron_Corporation_logo.svg.png'
  },
  { 
    name: 'BP', 
    logo: 'BP', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/BP_logo.svg/1200px-BP_logo.svg.png'
  },
  { 
    name: 'Johnson & Johnson', 
    logo: 'J&J', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Johnson_and_Johnson_Logo.svg/2560px-Johnson_and_Johnson_Logo.svg.png'
  },
  { 
    name: 'Bayer', 
    logo: 'Bayer', 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bayer_Logo.svg/1200px-Bayer_Logo.svg.png'
  },
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
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {companies.map((company, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <div className="h-28 flex flex-col items-center justify-center p-2">
                <div className="h-16 w-full flex items-center justify-center border rounded-md bg-white p-2">
                  <img 
                    src={company.imageUrl} 
                    alt={company.name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = '/placeholder.svg';
                      target.alt = `${company.name} logo`;
                    }}
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">{company.name}</span>
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
