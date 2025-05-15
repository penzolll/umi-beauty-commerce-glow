
export interface PromoEvent {
  id: string;
  name: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  bannerText: string;
  discountPercentage?: number;
  discountAmount?: number;
  minimumPurchase?: number;
  categoryId?: string;
  backgroundColor: string;
  textColor: string;
  featured?: boolean;
}

export const promoEvents: PromoEvent[] = [
  {
    id: "harbolnas-1111",
    name: "Harbolnas 11.11",
    slug: "harbolnas-1111",
    description: "Promo Hari Belanja Online Nasional dengan diskon hingga 70%",
    startDate: new Date(new Date().getTime() + 86400000), // Tomorrow
    endDate: new Date(new Date().getTime() + 5 * 86400000), // 5 days from now
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop",
    bannerText: "Diskon 70%",
    discountPercentage: 70,
    backgroundColor: "#FF0000",
    textColor: "#FFFFFF",
    featured: true
  },
  {
    id: "flash-sale-weekend",
    name: "Flash Sale Weekend",
    slug: "flash-sale-weekend",
    description: "Produk terbaik dengan harga spesial, hanya 24 jam!",
    startDate: new Date(new Date().getTime() - 1 * 86400000), // Yesterday
    endDate: new Date(new Date().getTime() + 1 * 86400000), // Tomorrow
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
    bannerText: "24 Jam Saja!",
    discountPercentage: 50,
    backgroundColor: "#5E17EB",
    textColor: "#FFFFFF",
    featured: true
  },
  {
    id: "ramadan-sale",
    name: "Ramadan Sale",
    slug: "ramadan-sale",
    description: "Promo spesial Ramadan dengan hadiah langsung untuk setiap pembelian",
    startDate: new Date(new Date().getTime() - 10 * 86400000), // 10 days ago
    endDate: new Date(new Date().getTime() - 1 * 86400000), // Yesterday (ended)
    image: "https://images.unsplash.com/photo-1588624930988-504dba3c5889?q=80&w=2070&auto=format&fit=crop",
    bannerText: "Ramadan Kareem",
    backgroundColor: "#00A300",
    textColor: "#FFFFFF"
  },
  {
    id: "harbolnas-1212",
    name: "Harbolnas 12.12",
    slug: "harbolnas-1212",
    description: "Festival belanja online terbesar akhir tahun dengan diskon besar",
    startDate: new Date(new Date().getTime() + 30 * 86400000), // 30 days from now
    endDate: new Date(new Date().getTime() + 35 * 86400000), // 35 days from now
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=2069&auto=format&fit=crop",
    bannerText: "Coming Soon",
    discountPercentage: 80,
    backgroundColor: "#FF6F00",
    textColor: "#FFFFFF",
    featured: true
  }
];

// Function to get active promo events
export const getActivePromos = () => {
  const now = new Date();
  return promoEvents.filter(promo => {
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);
    return startDate <= now && endDate >= now;
  });
};

// Function to get upcoming promo events
export const getUpcomingPromos = () => {
  const now = new Date();
  return promoEvents.filter(promo => {
    const startDate = new Date(promo.startDate);
    return startDate > now;
  }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

// Function to get featured promo events (both active and upcoming)
export const getFeaturedPromos = () => {
  return promoEvents.filter(promo => promo.featured);
};
