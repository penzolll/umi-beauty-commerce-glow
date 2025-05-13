
import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
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
    <Card className="overflow-hidden card-hover border-none shadow-sm">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-64">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Product badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {product.new && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            )}
            {product.bestSeller && (
              <Badge className="bg-umi-orange hover:bg-orange-700">Best Seller</Badge>
            )}
          </div>
          {product.discountPrice && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-umi-black hover:text-umi-orange transition-colors mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "text-yellow-300" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="text-gray-500 text-xs ml-1">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-umi-black">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-umi-black">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="text-sm bg-umi-orange hover:bg-orange-700 text-white px-3 py-1 rounded-full transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
