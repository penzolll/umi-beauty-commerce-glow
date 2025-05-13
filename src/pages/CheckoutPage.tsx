
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, totalPrice, discountAmount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const subtotal = totalPrice + discountAmount;
  const shipping = 10;
  const total = totalPrice + shipping;

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Indonesia",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardHolder: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || 
        !formData.state || !formData.zipCode) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.cardHolder || 
          !formData.expMonth || !formData.expYear || !formData.cvv) {
        toast.error("Please fill in all payment details");
        return;
      }
    }

    // This is where you'd normally send the order to your backend
    toast.success("Order placed successfully!");
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
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name *
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
                      Last Name *
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
                      Email Address *
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
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Address *
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City *
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
                      State/Province *
                    </label>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ZIP/Postal Code *
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
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    >
                      <option value="Indonesia">Indonesia</option>
                      <option value="USA">United States</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  {/* Payment Options */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit-card"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === "credit-card"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="credit-card" className="flex items-center">
                        Credit/Debit Card
                        <div className="flex ml-2 space-x-1">
                          <span className="text-gray-400">
                            <svg className="h-6 w-8" viewBox="0 0 36 24" fill="currentColor">
                              <rect width="36" height="24" rx="2" />
                            </svg>
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="midtrans"
                        name="paymentMethod"
                        value="midtrans"
                        checked={formData.paymentMethod === "midtrans"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="midtrans" className="flex items-center">
                        Midtrans Payment (Bank Transfer, E-Wallet)
                      </label>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {formData.paymentMethod === "credit-card" && (
                    <div className="border-t pt-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Card Number *
                          </label>
                          <Input
                            type="text"
                            name="cardNumber"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={formData.cardNumber}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Cardholder Name *
                          </label>
                          <Input
                            type="text"
                            name="cardHolder"
                            placeholder="Name as it appears on the card"
                            value={formData.cardHolder}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Expiration Date *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              type="text"
                              name="expMonth"
                              placeholder="MM"
                              value={formData.expMonth}
                              onChange={handleChange}
                            />
                            <Input
                              type="text"
                              name="expYear"
                              placeholder="YY"
                              value={formData.expYear}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            CVV *
                          </label>
                          <Input
                            type="text"
                            name="cvv"
                            placeholder="XXX"
                            value={formData.cvv}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Midtrans Instructions */}
                  {formData.paymentMethod === "midtrans" && (
                    <div className="border-t pt-4 mt-4">
                      <div className="bg-blue-50 p-4 rounded">
                        <h3 className="font-medium text-blue-800 mb-2">Midtrans Payment Information</h3>
                        <p className="text-sm text-blue-700 mb-2">
                          After placing your order, you will be redirected to Midtrans to complete your payment.
                        </p>
                        <p className="text-sm text-blue-700">
                          Available payment methods include:
                        </p>
                        <ul className="list-disc list-inside text-sm text-blue-700 ml-2 mt-1">
                          <li>Bank Transfer (BCA, Mandiri, BNI, BRI)</li>
                          <li>E-Wallets (GoPay, OVO, DANA, LinkAja)</li>
                          <li>Convenience Stores (Indomaret, Alfamart)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Place Order Button */}
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-umi-orange hover:bg-orange-700 py-3 text-lg"
                >
                  Place Order
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t pt-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
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
