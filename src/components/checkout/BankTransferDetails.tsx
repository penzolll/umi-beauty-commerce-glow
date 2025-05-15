
import { useEffect, useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";

interface BankTransferDetailsProps {
  bank: string;
  total: number;
}

// Mock data for bank accounts
const BANK_ACCOUNTS = {
  bca: {
    number: "1234567890",
    name: "PT UMI Beauty Indonesia"
  },
  mandiri: {
    number: "0987654321",
    name: "PT UMI Beauty Indonesia"
  },
  bri: {
    number: "9876543210",
    name: "PT UMI Beauty Indonesia"
  }
};

export const BankTransferDetails = ({ bank, total }: BankTransferDetailsProps) => {
  const [copied, setCopied] = useState(false);
  const bankAccount = BANK_ACCOUNTS[bank as keyof typeof BANK_ACCOUNTS];
  
  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccount.number);
    setCopied(true);
  };
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="mt-2 bg-gray-50 p-4 rounded-md">
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Silakan transfer ke rekening berikut:</p>
        <p className="font-medium">{bank.toUpperCase()} a/n {bankAccount.name}</p>
      </div>
      
      <div className="flex items-center justify-between bg-white border rounded p-2 mb-3">
        <span className="font-mono font-bold">{bankAccount.number}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy}
          className="flex items-center gap-1"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-green-600" />
              <span className="text-green-600 text-xs">Tersalin</span>
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              <span className="text-xs">Salin</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Nominal yang harus ditransfer:</p>
        <p className="font-bold text-lg">{formatRupiah(total)}</p>
      </div>
      
      <div className="text-sm text-gray-600 space-y-1">
        <p>Catatan penting:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Transfer sesuai nominal persis untuk memudahkan verifikasi</li>
          <li>Pembayaran akan diverifikasi otomatis dalam 10 menit setelah transfer</li>
          <li>Pesanan akan dibatalkan otomatis jika tidak dibayar dalam 24 jam</li>
        </ul>
      </div>
    </div>
  );
};
