
import { formatRupiah } from "@/lib/format";

interface CODDetailsProps {
  total: number;
}

export const CODDetails = ({ total }: CODDetailsProps) => {
  return (
    <div className="mt-2 bg-gray-50 p-4 rounded-md">
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Total yang harus dibayar saat barang tiba:</p>
        <p className="font-bold text-lg">{formatRupiah(total)}</p>
      </div>
      
      <div className="text-sm text-gray-600 space-y-1">
        <p>Syarat dan Ketentuan Bayar di Tempat (COD):</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Tersedia untuk pemesanan dengan nilai maksimal Rp 2.000.000</li>
          <li>Siapkan uang pas untuk memudahkan transaksi</li>
          <li>Periksa barang sebelum membayar</li>
          <li>Bayar kepada kurir saat barang diterima</li>
          <li>Metode ini tidak tersedia untuk pengiriman ke beberapa daerah terpencil</li>
        </ul>
      </div>
    </div>
  );
};
