
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity: 1
    });
    
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Product Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new && (
              <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                Best Seller
              </span>
            )}
            {product.discountPrice && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white py-2 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
            <Button 
              onClick={handleAddToCart}
              variant="ghost" 
              className="w-full text-white hover:text-umi-orange"
            >
              Quick Add to Cart
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-umi-orange transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-umi-orange">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-umi-black">
                ${product.price.toFixed(2)}
              </span>
            )}
            
            {product.stock <= 0 && (
              <span className="text-xs text-red-600 font-medium">
                Out of stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
