
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatTanggalIndonesia } from "@/lib/format";

interface PromoEvent {
  id: string;
  name: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  bannerText: string;
  backgroundColor: string;
  textColor: string;
}

interface PromoEventBannerProps {
  event?: PromoEvent;
  className?: string;
}

export const PromoEventBanner = ({ event, className = "" }: PromoEventBannerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'active' | 'ended'>('active');

  useEffect(() => {
    if (!event) return;
    
    const now = new Date();
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    
    // Determine event status
    if (now < eventStart) {
      setEventStatus('upcoming');
    } else if (now > eventEnd) {
      setEventStatus('ended');
    } else {
      setEventStatus('active');
    }
    
    // Calculate time remaining
    const updateTimer = () => {
      const now = new Date();
      
      // If event hasn't started yet, count down to start
      // If event is active, count down to end
      const targetDate = eventStatus === 'upcoming' ? eventStart : eventEnd;
      
      const totalSeconds = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));
      
      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, [event, eventStatus]);

  if (!event) return null;
  
  // Format the dates
  const formattedStartDate = formatTanggalIndonesia(event.startDate);
  const formattedEndDate = formatTanggalIndonesia(event.endDate);
  
  return (
    <div 
      className={`w-full rounded-lg overflow-hidden relative ${className}`}
      style={{ 
        backgroundColor: event.backgroundColor || '#F37021',
        color: event.textColor || 'white'
      }}
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full object-cover h-[200px] md:h-[300px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">{event.name}</h2>
          <p className="mb-4 text-sm md:text-base">{event.description}</p>
          
          {/* Event Dates */}
          <div className="mb-4 text-sm">
            {eventStatus === 'upcoming' ? (
              <p>Akan dimulai pada {formattedStartDate}</p>
            ) : eventStatus === 'active' ? (
              <p>Berakhir pada {formattedEndDate}</p>
            ) : (
              <p>Promo telah berakhir</p>
            )}
          </div>
          
          {/* Countdown Timer */}
          {eventStatus !== 'ended' && (
            <div className="flex space-x-2 md:space-x-4 mb-4">
              <div className="bg-black/40 backdrop-blur-sm p-2 rounded text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold">{timeRemaining.days}</div>
                <div className="text-xs">Hari</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm p-2 rounded text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold">{timeRemaining.hours}</div>
                <div className="text-xs">Jam</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm p-2 rounded text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold">{timeRemaining.minutes}</div>
                <div className="text-xs">Menit</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm p-2 rounded text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold">{timeRemaining.seconds}</div>
                <div className="text-xs">Detik</div>
              </div>
            </div>
          )}
          
          {/* CTA Button */}
          <Link to={`/promo/${event.slug}`}>
            <Button 
              variant="default"
              className="bg-umi-orange hover:bg-orange-600 text-white"
              disabled={eventStatus === 'ended'}
            >
              {eventStatus === 'upcoming' ? "Lihat Produk" : 
               eventStatus === 'active' ? "Belanja Sekarang" : 
               "Promo Berakhir"}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Floating banner */}
      {event.bannerText && (
        <div className="absolute top-4 right-0 bg-umi-orange text-white px-4 py-2 font-bold">
          {event.bannerText}
        </div>
      )}
    </div>
  );
};
