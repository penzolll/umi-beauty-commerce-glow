
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatRupiah } from "@/lib/format";
import { BankTransferDetails } from "./BankTransferDetails";
import { EWalletDetails } from "./EWalletDetails";
import { CODDetails } from "./CODDetails";

interface PaymentMethod {
  id: string;
  name: string;
  type: "bank" | "ewallet" | "cod";
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  // Bank Transfer
  {
    id: "bca",
    name: "Transfer Bank BCA",
    type: "bank",
    icon: "/payment-icons/bca.png",
    description: "Pembayaran melalui transfer bank BCA"
  },
  {
    id: "mandiri",
    name: "Transfer Bank Mandiri",
    type: "bank",
    icon: "/payment-icons/mandiri.png",
    description: "Pembayaran melalui transfer bank Mandiri"
  },
  {
    id: "bri",
    name: "Transfer Bank BRI",
    type: "bank",
    icon: "/payment-icons/bri.png",
    description: "Pembayaran melalui transfer bank BRI"
  },
  // E-Wallets
  {
    id: "gopay",
    name: "GoPay",
    type: "ewallet",
    icon: "/payment-icons/gopay.png",
    description: "Pembayaran melalui e-wallet GoPay"
  },
  {
    id: "ovo",
    name: "OVO",
    type: "ewallet",
    icon: "/payment-icons/ovo.png",
    description: "Pembayaran melalui e-wallet OVO"
  },
  {
    id: "dana",
    name: "DANA",
    type: "ewallet",
    icon: "/payment-icons/dana.png",
    description: "Pembayaran melalui e-wallet DANA"
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    type: "ewallet",
    icon: "/payment-icons/shopeepay.png",
    description: "Pembayaran melalui e-wallet ShopeePay"
  },
  // COD
  {
    id: "cod",
    name: "Bayar di Tempat (COD)",
    type: "cod",
    icon: "/payment-icons/cod.png",
    description: "Bayar saat barang tiba"
  },
];

interface PaymentMethodsIndonesiaProps {
  total: number;
  onMethodSelect: (method: string) => void;
}

export const PaymentMethodsIndonesia = ({ total, onMethodSelect }: PaymentMethodsIndonesiaProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("bca");

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    onMethodSelect(value);
  };

  // Group payment methods by type
  const bankMethods = paymentMethods.filter(method => method.type === "bank");
  const ewalletMethods = paymentMethods.filter(method => method.type === "ewallet");
  const codMethods = paymentMethods.filter(method => method.type === "cod");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
      
      <RadioGroup value={selectedMethod} onValueChange={handleMethodChange} className="space-y-6">
        {/* Bank Transfer Section */}
        <div className="space-y-3">
          <h3 className="text-md font-medium">Transfer Bank</h3>
          <div className="border rounded-md p-2">
            {bankMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="w-10 h-6 flex items-center justify-center">
                  <img src={method.icon} alt={method.name} className="max-h-6 max-w-full" />
                </div>
                <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                  <div>{method.name}</div>
                  <div className="text-xs text-gray-500">{method.description}</div>
                </Label>
              </div>
            ))}
          </div>
          {selectedMethod === "bca" || selectedMethod === "mandiri" || selectedMethod === "bri" ? (
            <BankTransferDetails bank={selectedMethod} total={total} />
          ) : null}
        </div>

        {/* E-Wallet Section */}
        <div className="space-y-3">
          <h3 className="text-md font-medium">E-Wallet</h3>
          <div className="border rounded-md p-2">
            {ewalletMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="w-10 h-6 flex items-center justify-center">
                  <img src={method.icon} alt={method.name} className="max-h-6 max-w-full" />
                </div>
                <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                  <div>{method.name}</div>
                  <div className="text-xs text-gray-500">{method.description}</div>
                </Label>
              </div>
            ))}
          </div>
          {["gopay", "ovo", "dana", "shopeepay"].includes(selectedMethod) ? (
            <EWalletDetails provider={selectedMethod} total={total} />
          ) : null}
        </div>

        {/* COD Section */}
        <div className="space-y-3">
          <h3 className="text-md font-medium">Bayar di Tempat</h3>
          <div className="border rounded-md p-2">
            {codMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="w-10 h-6 flex items-center justify-center">
                  <img src={method.icon} alt={method.name} className="max-h-6 max-w-full" />
                </div>
                <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                  <div>{method.name}</div>
                  <div className="text-xs text-gray-500">{method.description}</div>
                </Label>
              </div>
            ))}
          </div>
          {selectedMethod === "cod" && <CODDetails total={total} />}
        </div>
      </RadioGroup>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Pembayaran:</span>
          <span className="font-bold text-lg text-umi-orange">{formatRupiah(total)}</span>
        </div>
      </div>
    </div>
  );
};
