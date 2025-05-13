
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="relative bg-umi-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        {/* Text content */}
        <div className="md:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Elevate Your <span className="text-umi-orange">Beauty</span> Routine
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300 max-w-lg">
            Discover premium beauty products crafted for every skin type. 
            Enhance your natural beauty with UMI's exclusive collection.
          </p>
          <div className="flex space-x-4">
            <Link to="/products">
              <Button className="bg-umi-orange hover:bg-orange-700 text-white px-6 py-2 rounded-full transition-colors text-lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-umi-black px-6 py-2 rounded-full transition-colors text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 relative">
          <div className="ml-auto w-full md:w-5/6">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              alt="UMI Beauty Products"
              className="rounded-lg shadow-lg object-cover w-full h-[400px] md:h-[500px]"
            />
            <div className="absolute -bottom-4 -left-4 bg-umi-orange p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-xl font-bold">New Collection</p>
              <p className="text-sm">Limited Edition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
