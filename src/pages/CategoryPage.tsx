
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/shared/ProductCard";
import { products, categories } from "@/data/mockData";
import { Product } from "@/data/mockData";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (categorySlug) {
      const categoryInfo = categories.find(c => c.slug === categorySlug);
      if (categoryInfo) {
        setCategory(categoryInfo.name);
      }

      // Filter products by category
      const filtered = products.filter(
        product => product.category.toLowerCase() === categorySlug?.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [categorySlug]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-8">{category || "Category Products"}</h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find any products in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="max-w-[180px]">
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
