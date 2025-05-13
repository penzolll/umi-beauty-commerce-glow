
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { products, categories } from "@/data/mockData";
import { Product } from "@/data/mockData";

const ProductsPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [sortBy, setSortBy] = useState("featured");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let filtered = [...products];
    setIsSearching(!!searchParam);

    // Filter by search query with improved relevance
    if (searchParam) {
      const searchQuery = searchParam.toLowerCase();
      
      // Split search query into words for better matching
      const searchWords = searchQuery.split(/\s+/).filter(word => word.length > 0);
      
      if (searchWords.length > 0) {
        filtered = filtered.filter(product => {
          // Check name, description, and category
          const nameMatch = product.name.toLowerCase().includes(searchQuery);
          const descMatch = product.description.toLowerCase().includes(searchQuery);
          const catMatch = product.category.toLowerCase().includes(searchQuery);
          
          // Check partial matches in name (higher priority)
          const partialNameMatches = searchWords.some(word => 
            product.name.toLowerCase().includes(word)
          );
          
          // Check tag matches
          const tagMatches = product.tags.some(tag => 
            searchWords.some(word => tag.toLowerCase().includes(word))
          );
          
          // Return true if any match is found
          return nameMatch || descMatch || catMatch || partialNameMatches || tagMatches;
        });
      }
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        (product.discountPrice || product.price) >= priceRange[0] &&
        (product.discountPrice || product.price) <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => 
          (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case "price-high":
        filtered.sort((a, b) => 
          (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case "newest":
        filtered.sort((a, b) => 
          a.new ? -1 : b.new ? 1 : 0
        );
        break;
      case "best-selling":
        filtered.sort((a, b) => 
          a.bestSeller ? -1 : b.bestSeller ? 1 : 0
        );
        break;
      default:
        filtered.sort((a, b) => 
          a.featured ? -1 : b.featured ? 1 : 0
        );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, sortBy, searchParam, categoryParam]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSortBy("featured");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {searchParam && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Search Results: "{searchParam}"</h1>
            <p className="text-gray-600 mt-2">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <Button
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="w-full bg-umi-black hover:bg-gray-800"
            >
              {isFiltersVisible ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters - Sidebar */}
          <div
            className={`w-full md:w-64 md:block ${
              isFiltersVisible ? "block" : "hidden"
            }`}
          >
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-umi-orange hover:text-orange-700"
                >
                  Clear
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => toggleCategory(category.slug)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={200}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <p className="text-gray-600 mb-2 sm:mb-0">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Sort by:</span>
                <select
                  className="border-gray-300 rounded-md text-sm p-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold">No products found</h3>
                <p className="text-gray-500 mt-2">
                  {isSearching 
                    ? "Try adjusting your search terms or browse our categories."
                    : "Please try adjusting your filters."}
                </p>
                <Button
                  onClick={clearFilters}
                  className="mt-4 bg-umi-orange hover:bg-orange-700"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
