
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/shared/ProductCard";
import { products, categories } from "@/data/mockData";
import { Product } from "@/data/mockData";

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [produkDifilter, setProdukDifilter] = useState<Product[]>([]);
  const [kategori, setKategori] = useState<string>("");

  useEffect(() => {
    if (categorySlug) {
      const infoKategori = categories.find(c => c.slug === categorySlug);
      if (infoKategori) {
        setKategori(infoKategori.name);
      }

      // Filter produk berdasarkan kategori
      const produkTerfilter = products.filter(
        product => product.category.toLowerCase() === categorySlug?.toLowerCase()
      );
      setProdukDifilter(produkTerfilter);
    }
  }, [categorySlug]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-8">{kategori || "Produk Kategori"}</h1>

        {produkDifilter.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">Tidak ada produk ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Kami tidak dapat menemukan produk untuk kategori ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {produkDifilter.map((product) => (
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
