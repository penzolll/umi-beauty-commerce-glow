
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { formatRupiah, formatTanggalIndonesia } from "@/lib/format";

const OrdersPage = () => {
  const { user } = useAuth();
  
  // Data pesanan contoh (pada aplikasi nyata, ini akan diambil dari API)
  const pesanan = [
    {
      id: "PSN-123456",
      tanggal: "2023-06-15",
      total: 1299900,
      status: "Terkirim",
      items: [
        { id: "p1", name: "UMI Pembersih Wajah", quantity: 1, price: 299900 },
        { id: "p2", name: "UMI Pelembab", quantity: 1, price: 499900 },
        { id: "p3", name: "UMI Serum", quantity: 1, price: 500100 }
      ]
    },
    {
      id: "PSN-789012",
      tanggal: "2023-05-28",
      total: 849500,
      status: "Diproses",
      items: [
        { id: "p4", name: "UMI Masker Wajah", quantity: 2, price: 199900 },
        { id: "p5", name: "UMI Toner", quantity: 1, price: 449700 }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Pesanan Saya</h1>
        
        {pesanan.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">Belum ada pesanan</h3>
            <p className="text-gray-500 mt-2">
              Anda belum membuat pesanan apa pun.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pesanan.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                  <div>
                    <span className="font-medium">Pesanan #{order.id}</span>
                    <p className="text-sm text-gray-500">Dibuat pada {formatTanggalIndonesia(order.tanggal)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Terkirim" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-medium mt-1">{formatRupiah(order.total)}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-2">Item</h3>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span>{item.quantity}x {item.name}</span>
                        </div>
                        <span>{formatRupiah(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
