
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative">
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80" 
          alt="UMI Beauty Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-wide">
              Discover Your Natural Beauty
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Premium organic skincare and beauty products for your daily routine. Made with love for your skin.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button 
                  className="bg-umi-orange hover:bg-orange-600 text-white uppercase tracking-wide font-medium px-8 py-6 rounded-none"
                >
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 uppercase tracking-wide font-medium px-8 py-6 rounded-none"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
