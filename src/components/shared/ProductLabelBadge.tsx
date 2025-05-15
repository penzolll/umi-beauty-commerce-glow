
import { cn } from "@/lib/utils";

interface ProductLabelBadgeProps {
  label: string;
  className?: string;
}

export function ProductLabelBadge({ label, className }: ProductLabelBadgeProps) {
  // Default styles and label-specific styles
  const getStyles = () => {
    switch (label) {
      case "terlaris":
        return "bg-yellow-500 text-white";
      case "promo":
        return "bg-umi-orange text-white";
      case "lokal":
        return "bg-green-600 text-white";
      case "baru":
        return "bg-blue-600 text-white";
      case "pre-order":
        return "bg-purple-600 text-white";
      case "habis":
        return "bg-red-600 text-white";
      case "terbatas":
        return "bg-pink-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  // Get translated label text
  const getLabelText = () => {
    switch (label) {
      case "terlaris":
        return "Terlaris";
      case "promo":
        return "Promo";
      case "lokal":
        return "Produk Lokal";
      case "baru":
        return "Baru";
      case "pre-order":
        return "Pre-Order";
      case "habis":
        return "Habis";
      case "terbatas":
        return "Stok Terbatas";
      default:
        return label;
    }
  };

  return (
    <span 
      className={cn(
        "text-xs font-bold px-2 py-1 uppercase text-[0.75rem]",
        getStyles(),
        className
      )}
    >
      {getLabelText()}
    </span>
  );
}
