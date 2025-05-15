
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { PromoEventBanner } from "@/components/shared/PromoEventBanner";
import EnhancedProductCard from "@/components/shared/EnhancedProductCard";
import { promoEvents, PromoEvent } from "@/data/promoEvents";
import { products } from "@/data/enhancedMockData";

const PromoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<PromoEvent | null>(null);
  const [promoProducts, setPromoProducts] = useState(products);

  useEffect(() => {
    // Find the event based on slug
    if (slug) {
      const foundEvent = promoEvents.find(event => event.slug === slug);
      if (foundEvent) {
        setEvent(foundEvent);
        
        // Filter products based on event criteria (for demo, take 12 random products)
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 12);
        
        // Add discount to products if not already discounted
        const discountedProducts = selected.map(product => {
          if (foundEvent.discountPercentage && !product.discountPrice) {
            const discountPercent = foundEvent.discountPercentage / 100;
            return {
              ...product,
              discountPrice: product.price * (1 - discountPercent)
            };
          }
          return product;
        });
        
        setPromoProducts(discountedProducts);
      }
    }
  }, [slug]);

  if (!event) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Promo Tidak Ditemukan</h1>
            <p>Maaf, promo yang Anda cari tidak ditemukan atau telah berakhir.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Promo Banner */}
        <PromoEventBanner event={event} className="mb-8" />
        
        {/* Promo Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-600">{event.description}</p>
          
          {/* Promo Rules */}
          <div className="mt-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Syarat dan Ketentuan:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Promo berlaku dari {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} hingga {new Date(event.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</li>
              <li>Diskon {event.discountPercentage}% berlaku untuk produk tertentu</li>
              <li>Tidak dapat digabungkan dengan promo lainnya</li>
              <li>UMI Beauty berhak membatalkan pesanan jika terindikasi kecurangan</li>
              <li>Produk yang sudah dibeli tidak dapat ditukar atau dikembalikan</li>
            </ul>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Produk Promo</h2>
          {promoProducts.length === 0 ? (
            <div className="text-center py-12">
              <p>Tidak ada produk promo yang tersedia saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {promoProducts.map((product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PromoPage;
