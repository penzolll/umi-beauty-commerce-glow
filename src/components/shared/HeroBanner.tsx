
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-umi-black to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Text content */}
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Discover Your Natural Beauty
            </h2>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Experience the luxury of premium organic skincare and makeup products. 
              Made with natural ingredients for radiant, healthy skin.
            </p>
            <div className="flex space-x-4">
              <Link to="/products">
                <Button className="bg-umi-orange hover:bg-orange-700 text-white">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  About UMI
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1235&q=80" 
                alt="UMI Beauty Products" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 48H1440V0C1440 0 1082.89 48 720 48C357.109 48 0 0 0 0V48Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
