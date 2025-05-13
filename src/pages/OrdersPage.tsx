
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

const OrdersPage = () => {
  const { user } = useAuth();
  
  // Mock order data (in a real app, this would be fetched from API)
  const orders = [
    {
      id: "ORD-123456",
      date: "2023-06-15",
      total: 129.99,
      status: "Delivered",
      items: [
        { id: "p1", name: "UMI Facial Cleanser", quantity: 1, price: 29.99 },
        { id: "p2", name: "UMI Moisturizer", quantity: 1, price: 49.99 },
        { id: "p3", name: "UMI Serum", quantity: 1, price: 50.01 }
      ]
    },
    {
      id: "ORD-789012",
      date: "2023-05-28",
      total: 84.95,
      status: "Processing",
      items: [
        { id: "p4", name: "UMI Face Mask", quantity: 2, price: 19.99 },
        { id: "p5", name: "UMI Toner", quantity: 1, price: 44.97 }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">No orders yet</h3>
            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                  <div>
                    <span className="font-medium">Order #{order.id}</span>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-medium mt-1">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span>{item.quantity}x {item.name}</span>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
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
