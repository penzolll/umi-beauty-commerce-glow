
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, applyDiscount, discountAmount } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const subtotal = totalPrice + discountAmount;
  const shipping = items.length > 0 ? 10 : 0;
  const total = totalPrice + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      toast.error("Please enter a coupon code");
      return;
    }
    
    const success = applyDiscount(couponCode);
    if (success) {
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-umi-orange hover:bg-orange-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-5 bg-gray-50 p-4 border-b">
                  <div className="col-span-2">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="text-center">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">Subtotal</span>
                  </div>
                </div>

                {/* Cart Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center border-b"
                  >
                    {/* Product (image + name) */}
                    <div className="md:col-span-2 flex items-center">
                      <div className="w-20 h-20 mr-4 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <Link
                          to={`/products/${item.id}`}
                          className="font-medium hover:text-umi-orange transition-colors"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:text-center">
                      <span className="md:hidden font-medium mr-2">Price:</span>
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center md:justify-center">
                      <span className="md:hidden font-medium mr-2">Quantity:</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-umi-orange p-1"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-umi-orange p-1"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal + Remove */}
                    <div className="flex justify-between items-center md:justify-end">
                      <span className="md:hidden font-medium mr-2">Subtotal:</span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 ml-4"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Cart Actions */}
                <div className="p-4 flex justify-between">
                  <Link to="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="text-red-500 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Cart Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Coupon Code
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      className="rounded-l-none bg-umi-black hover:bg-gray-800"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Try: UMI10, BEAUTY20, or WELCOME15
                  </p>
                </div>

                {/* Price Details */}
                <div className="space-y-3 mb-6">
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
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-umi-orange hover:bg-orange-700"
                >
                  Proceed to Checkout
                </Button>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">We Accept</p>
                  <div className="flex justify-center space-x-2">
                    <span className="text-gray-400">
                      <svg className="h-6 w-10" fill="currentColor" viewBox="0 0 36 24">
                        <rect width="36" height="24" rx="2" fill="currentColor" />
                        <path d="M10.5 16.5h15L24 7.5H9l1.5 9z" fill="#fff" />
                        <path d="M13.97 14h-1.61l1.02-6h1.6l-1.01 6zm3.57-6l-1.37 4-0.17-0.87-0.48-2.5-0.04-0.63h-2.1l-0.04 0.22c0.44 0.13 0.92 0.32 1.23 0.53 0.17 0.12 0.28 0.28 0.22 0.57l-0.69 3.6h1.6l1.05-5.5h1.59zm2.77 6h-1.5l0.9-6h1.5l-0.9 6zm4.05-6l-1.59 6h-1.45l-0.9-4.5-0.5 4.5h-1.5l1.05-6h2.1l0.75 3.9 1.14-3.9h1.5z" fill="#22599A" />
                      </svg>
                    </span>
                    <span className="text-gray-400">
                      <svg className="h-6 w-10" fill="currentColor" viewBox="0 0 36 24">
                        <rect width="36" height="24" rx="2" fill="currentColor" />
                        <path d="M22.5 5.25h-9v13.5h9v-13.5z" fill="#FF5F00" />
                        <path d="M14.25 12a8.678 8.678 0 013.375-6.75 8.67 8.67 0 000 13.5 8.678 8.678 0 01-3.375-6.75z" fill="#EB001B" />
                        <path d="M31.5 12c0 4.5-3.6 8.25-8.25 8.25-1.875 0-3.6-0.675-4.875-1.5 2.175-1.8 3.375-4.5 3.375-6.75s-1.2-4.95-3.375-6.75a8.731 8.731 0 014.875-1.5c4.65 0 8.25 3.675 8.25 8.25z" fill="#F79E1B" />
                      </svg>
                    </span>
                    <span className="text-gray-400">
                      <svg className="h-6 w-10" fill="currentColor" viewBox="0 0 36 24">
                        <rect width="36" height="24" rx="2" fill="currentColor" />
                        <path d="M14.25 15h1.5v-6h-1.5v6zm3 0h3v-1.5h-1.5v-4.5h-1.5v6zm-6 0h3v-1.5h-1.5v-1.5h1.5v-1.5h-1.5v-1.5h1.5v-1.5h-3v6z" fill="#016FD0" />
                        <path d="M24 15h1.5v-6h-2.25l-1.5 3.75-1.5-3.75h-2.25v6h1.5v-4.5l1.5 3.375h1.5l1.5-3.375v4.5z" fill="#016FD0" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
