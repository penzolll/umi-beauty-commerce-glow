
import { useState, useEffect } from "react";
import { PromoEvent, getFeaturedPromos } from "@/data/promoEvents";
import { PromoEventBanner } from "./PromoEventBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const PromoEventCarousel = () => {
  const [events, setEvents] = useState<PromoEvent[]>([]);
  
  useEffect(() => {
    // Get featured promo events
    const featuredEvents = getFeaturedPromos();
    setEvents(featuredEvents);
  }, []);
  
  if (events.length === 0) {
    return null;
  }
  
  return (
    <section className="my-8">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem key={event.id} className="md:basis-full">
                <PromoEventBanner event={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default PromoEventCarousel;
