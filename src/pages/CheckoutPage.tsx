
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { PaymentMethodsIndonesia } from "@/components/checkout/PaymentMethodsIndonesia";
import { formatRupiah } from "@/lib/format";

const CheckoutPage = () => {
  const { items, totalPrice, discountAmount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const subtotal = totalPrice + discountAmount;
  const shipping = 10000;  // Changed to IDR
  const total = totalPrice + shipping;

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    country: "Indonesia",
    paymentMethod: "bca",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodSelect = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || 
        !formData.province || !formData.zipCode) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua kolom yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // This is where you'd normally send the order to your backend
    toast({
      title: "Pesanan Berhasil",
      description: "Pesanan Anda telah berhasil dibuat dan sedang diproses."
    });
    clearCart();
    
    // Redirect to a success page
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Informasi Pengiriman
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama Depan *
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama Belakang *
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nomor Telepon *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="contoh: 0812xxxx"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Alamat Lengkap *
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Nama jalan, nomor rumah, RT/RW"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Kota *
                    </label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Provinsi *
                    </label>
                    <Input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Kode Pos *
                    </label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Negara *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    >
                      <option value="Indonesia">Indonesia</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapura">Singapura</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method - Using our new Indonesian payment component */}
              <PaymentMethodsIndonesia 
                total={total} 
                onMethodSelect={handlePaymentMethodSelect}
              />

              {/* Place Order Button */}
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-umi-orange hover:bg-orange-700 py-3 text-lg"
                >
                  Buat Pesanan
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                    </div>
                    <span>{formatRupiah(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t pt-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon</span>
                      <span>-{formatRupiah(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span>{formatRupiah(shipping)}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">{formatRupiah(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
