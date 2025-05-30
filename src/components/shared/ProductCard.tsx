
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/data/mockData";
import { formatRupiah } from "@/lib/format";

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

  // Calculate discount percentage
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card group h-full flex flex-col card-hover max-w-full">
      {/* Product Image with fixed height */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="h-[200px] w-full overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
          
        {/* Product Badges with smaller font */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.new && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 uppercase text-[0.75rem]">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 uppercase text-[0.75rem]">
              Best Seller
            </span>
          )}
          {product.discountPrice && (
            <span className="bg-umi-orange text-white text-xs font-bold px-1 py-0.5 uppercase text-[0.75rem]">
              Diskon {discountPercentage}%
            </span>
          )}
        </div>
      </Link>
      
      {/* Product Info with reduced padding */}
      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 group-hover:text-umi-orange transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${
                i < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">
            ({product.reviewCount})
          </span>
        </div>
        
        <div className="mt-2 mb-2 flex justify-between items-center">
          {product.discountPrice ? (
            <div className="flex items-center">
              <span className="text-base font-bold text-umi-orange">
                {formatRupiah(product.discountPrice)}
              </span>
              <span className="text-xs text-gray-400 line-through ml-2">
                {formatRupiah(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-base font-bold text-gray-800">
              {formatRupiah(product.price)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <div className="mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full flex items-center justify-center text-xs font-medium rounded-none py-1 ${
              product.stock > 0 
                ? "bg-umi-black hover:bg-umi-orange text-white" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="mr-1 h-3 w-3" />
            {product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
