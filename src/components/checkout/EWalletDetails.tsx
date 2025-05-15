
import { useEffect, useState } from "react";
import { QrCodeIcon } from "lucide-react";
import { formatRupiah } from "@/lib/format";

interface EWalletDetailsProps {
  provider: string;
  total: number;
}

export const EWalletDetails = ({ provider, total }: EWalletDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading QR code
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [provider]);

  // Get proper provider name for display
  const getProviderName = () => {
    switch(provider) {
      case "gopay": return "GoPay";
      case "ovo": return "OVO";
      case "dana": return "DANA";
      case "shopeepay": return "ShopeePay";
      default: return provider;
    }
  };

  return (
    <div className="mt-2 bg-gray-50 p-4 rounded-md">
      <div className="mb-3 text-center">
        <p className="text-sm text-gray-600 mb-1">
          Bayar dengan {getProviderName()}
        </p>
        <p className="font-bold text-lg mb-2">
          {formatRupiah(total)}
        </p>
        
        <div className="flex justify-center">
          {isLoading ? (
            <div className="w-48 h-48 border rounded bg-gray-100 flex items-center justify-center">
              <div className="animate-pulse">
                <QrCodeIcon className="h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Memuat QR Code...</p>
              </div>
            </div>
          ) : (
            <div className="border p-2 bg-white rounded">
              <img 
                src={`/payment-qr/${provider}-qr.png`} 
                alt={`QR Code ${getProviderName()}`} 
                className="w-48 h-48"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-600 space-y-1 mt-4">
        <p>Cara Pembayaran:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Buka aplikasi {getProviderName()} di smartphone Anda</li>
          <li>Pilih 'Scan QR' atau 'Pay'</li>
          <li>Scan QR code di atas</li>
          <li>Periksa detail pembayaran dan selesaikan transaksi</li>
          <li>Pembayaran akan diverifikasi otomatis</li>
        </ol>
      </div>
    </div>
  );
};
