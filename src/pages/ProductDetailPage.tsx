
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ProductCard from "@/components/shared/ProductCard";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(
    products.find((p) => p.id === productId)
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === productId);
      setProduct(foundProduct);
      
      if (foundProduct) {
        setActiveImage(foundProduct.images[0]);
        
        // Find related products (same category, excluding current product)
        const related = products
          .filter(
            (p) => 
              p.category === foundProduct.category && 
              p.id !== foundProduct.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images[0],
        quantity
      });
      toast.success(`${product.name} added to cart`);
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-8">
            The product you are looking for does not exist.
          </p>
          <Link to="/products">
            <Button className="bg-umi-orange hover:bg-orange-700">
              Back to Products
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Product Detail Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4">
              <img
                src={activeImage || product.images[0]}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                      activeImage === image
                        ? "border-umi-orange"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating ? "text-yellow-300" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Category: {product.category}</p>
            </div>
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-umi-black mr-2">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-umi-black">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-green-600">In Stock</span>
                  {product.stock < 10 && (
                    <span className="ml-2 text-sm text-gray-500">
                      (Only {product.stock} left)
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-red-600">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Quantity:</p>
              <div className="flex items-center w-32">
                <button
                  onClick={decreaseQuantity}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 h-8 w-8 flex items-center justify-center rounded-l"
                >
                  -
                </button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="h-8 w-14 text-center rounded-none border-x-0"
                />
                <button
                  onClick={increaseQuantity}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 h-8 w-8 flex items-center justify-center rounded-r"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-6">
              <Button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-umi-orange hover:bg-orange-700 text-white px-8 py-2"
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Category</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Tags</td>
                    <td>{product.tags.join(", ")}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Stock</td>
                    <td>{product.stock} units</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Rating</td>
                    <td>{product.rating}/5 ({product.reviewCount} reviews)</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <p className="text-gray-700">
                Reviews will be implemented in future updates.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
