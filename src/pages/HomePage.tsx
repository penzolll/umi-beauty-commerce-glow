import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import HeroBanner from "@/components/shared/HeroBanner";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { categories, products, testimonials } from "@/data/mockData";

const HomePage = () => {
  const [featuredProducts] = useState(products.filter(p => p.featured));
  const [bestSellers] = useState(products.filter(p => p.bestSeller));
  const [recommendedProducts] = useState(products.filter((_, index) => index < 8));
  
  return (
    <MainLayout>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories Grid */}
      <section className="py-12 bg-white my-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Shop by Category</h2>
            <div className="w-16 h-1 bg-umi-orange mb-4"></div>
            <p className="max-w-2xl text-gray-600">Discover our curated collection of premium beauty products designed to enhance your natural beauty.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="category-card group relative overflow-hidden"
              >
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end z-20 p-4">
                    <h3 className="text-white font-bold uppercase tracking-wide">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel - "Bundling Lebih Hemat" */}
      <section className="py-12 bg-gray-50 my-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Bundling Lebih Hemat</h2>
            <div className="w-16 h-1 bg-umi-orange mb-4"></div>
            <p className="max-w-2xl text-gray-600">Hemat lebih banyak dengan produk bundling pilihan kami.</p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-4 lg:basis-1/5 md:basis-1/3 sm:basis-1/2"
                  style={{
                    maxWidth: {
                      lg: '180px',
                      md: '200px',
                      sm: '150px'
                    }[window.innerWidth >= 1024 ? 'lg' : window.innerWidth >= 768 ? 'md' : 'sm']
                  }}
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 size-9" />
            <CarouselNext className="-right-10 size-9" />
          </Carousel>
          
          <div className="text-center mt-8">
            <Link to="/products">
              <Button className="bg-umi-black hover:bg-umi-orange text-white uppercase tracking-wide px-8 py-6">
                Lihat Semua Produk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers - "Rekomendasi Produk Untukmu" */}
      <section className="py-12 bg-white my-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Rekomendasi Produk Untukmu</h2>
            <div className="w-16 h-1 bg-umi-orange mb-4"></div>
            <p className="max-w-2xl text-gray-600">Produk terlaris yang paling disukai pelanggan kami.</p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {bestSellers.map((product) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-4 lg:basis-1/5 md:basis-1/3 sm:basis-1/2"
                  style={{
                    maxWidth: {
                      lg: '180px',
                      md: '200px',
                      sm: '150px'
                    }[window.innerWidth >= 1024 ? 'lg' : window.innerWidth >= 768 ? 'md' : 'sm']
                  }}
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 size-9" />
            <CarouselNext className="-right-10 size-9" />
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50 my-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">What Our Customers Say</h2>
            <div className="w-16 h-1 bg-umi-orange mb-4"></div>
            <p className="max-w-2xl text-gray-600">Read what our valued customers have to say about their experience with our products.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-umi-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Beauty products"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-20 max-w-[1200px]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Join the UMI Beauty Family</h2>
            <p className="text-xl mb-6">
              Subscribe to our newsletter for exclusive offers, beauty tips, and new product announcements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-4 rounded-none w-full sm:w-64 focus:outline-none text-umi-black"
              />
              <Button className="bg-umi-orange hover:bg-orange-600 text-white px-8 py-6 rounded-none uppercase tracking-wide w-full sm:w-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
