
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="relative min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="UMI Beauty"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-4">
          Discover Your Natural Beauty
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Premium beauty products curated for your skin type and beauty needs
        </p>
        <Link to="/products">
          <Button 
            size="lg" 
            className="bg-umi-orange hover:bg-orange-600 text-white font-medium px-8 py-6 text-lg uppercase tracking-wide rounded-none"
          >
            Shop Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
