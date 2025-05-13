
import { createContext, useState, useContext, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  applyDiscount: (code: string) => boolean;
  discountAmount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Valid discount codes and their discount percentage
  const discountCodes = {
    "UMI10": 0.1,  // 10% off
    "BEAUTY20": 0.2,  // 20% off
    "WELCOME15": 0.15  // 15% off
  };

  const saveItems = (items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addItem = (item: CartItem) => {
    setItems(current => {
      const existingItem = current.find(i => i.id === item.id);
      if (existingItem) {
        const updated = current.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
        saveItems(updated);
        return updated;
      } else {
        const updated = [...current, item];
        saveItems(updated);
        return updated;
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(current => {
      const updated = current.filter(i => i.id !== id);
      saveItems(updated);
      return updated;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(current => {
      const updated = current.map(i => 
        i.id === id ? { ...i, quantity } : i
      );
      saveItems(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    saveItems([]);
    setDiscountAmount(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPrice = subtotalPrice - discountAmount;

  const applyDiscount = (code: string) => {
    const discountCode = discountCodes[code as keyof typeof discountCodes];
    if (discountCode) {
      const discount = subtotalPrice * discountCode;
      setDiscountAmount(discount);
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        applyDiscount,
        discountAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
