export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  localProduct?: boolean;
  preOrder?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

// Categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Skincare",
    slug: "skincare",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    description: "Products to nourish and care for your skin",
    productCount: 24
  },
  {
    id: "2",
    name: "Makeup",
    slug: "makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    description: "Beauty products to enhance your features",
    productCount: 36
  },
  {
    id: "3",
    name: "Haircare",
    slug: "haircare",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1411&q=80",
    description: "Products to keep your hair healthy and beautiful",
    productCount: 18
  },
  {
    id: "4",
    name: "Fragrance",
    slug: "fragrance",
    image: "https://images.unsplash.com/photo-1557170334-a9086d21c4d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Scents that capture your essence",
    productCount: 12
  },
  {
    id: "5",
    name: "Tools",
    slug: "tools",
    image: "https://images.unsplash.com/photo-1626784215471-56ef25d93757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    description: "Beauty tools to enhance your routine",
    productCount: 15
  },
  {
    id: "6",
    name: "Sets",
    slug: "sets",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    description: "Curated sets for the perfect gift or routine",
    productCount: 9
  }
];

// Products
export const products: Product[] = [
  {
    id: "1",
    name: "Hydrating Facial Serum",
    description: "This lightweight serum deeply hydrates the skin while reducing the appearance of fine lines. Infused with hyaluronic acid and vitamin E, it helps to maintain skin elasticity and provides long-lasting moisture.",
    price: 48.99,
    images: [
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    category: "Skincare",
    tags: ["hydrating", "anti-aging", "serum"],
    rating: 4.8,
    reviewCount: 354,
    stock: 43,
    featured: true,
    bestSeller: true
  },
  {
    id: "2",
    name: "Matte Liquid Lipstick",
    description: "Long-wearing, high-pigment liquid lipstick that delivers intense color with a comfortable matte finish. Formulated to be non-drying, this lipstick stays put for hours without feathering.",
    price: 22.99,
    discountPrice: 18.99,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80",
      "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1939&q=80"
    ],
    category: "Makeup",
    tags: ["lipstick", "matte", "long-wearing"],
    rating: 4.5,
    reviewCount: 287,
    stock: 65,
    featured: true
  },
  {
    id: "3",
    name: "Revitalizing Shampoo",
    description: "Restore life to dull, damaged hair with this revitalizing shampoo. Enriched with natural oils and extracts, it cleanses while nourishing the hair from root to tip.",
    price: 26.99,
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    category: "Haircare",
    tags: ["shampoo", "revitalizing", "damaged hair"],
    rating: 4.2,
    reviewCount: 163,
    stock: 29,
    bestSeller: true
  },
  {
    id: "4",
    name: "Floral Eau de Parfum",
    description: "A delicate blend of floral notes with hints of citrus and musk, creating a sophisticated and feminine fragrance that lasts all day.",
    price: 78.99,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=704&q=80"
    ],
    category: "Fragrance",
    tags: ["perfume", "floral", "long-lasting"],
    rating: 4.7,
    reviewCount: 219,
    stock: 17,
    featured: true
  },
  {
    id: "5",
    name: "Professional Makeup Brush Set",
    description: "A comprehensive set of soft, high-quality brushes for flawless makeup application. Includes brushes for foundation, powder, blush, eyeshadow, and more.",
    price: 54.99,
    discountPrice: 42.99,
    images: [
      "https://images.unsplash.com/photo-1613114016915-3d5002e60f05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    category: "Tools",
    tags: ["brushes", "makeup tools", "professional"],
    rating: 4.6,
    reviewCount: 198,
    stock: 38,
    new: true
  },
  {
    id: "6",
    name: "Limited Edition Skincare Set",
    description: "Everything you need for a complete skincare routine in one beautiful set. Includes cleanser, toner, serum, moisturizer, and eye cream.",
    price: 149.99,
    discountPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    category: "Sets",
    tags: ["skincare", "gift set", "limited edition"],
    rating: 4.9,
    reviewCount: 87,
    stock: 12,
    featured: true,
    new: true
  },
  {
    id: "7",
    name: "Exfoliating Face Scrub",
    description: "Gentle yet effective exfoliating scrub that removes dead skin cells and impurities, revealing a brighter, more radiant complexion.",
    price: 32.99,
    images: [
      "https://images.unsplash.com/photo-1608765216251-111e52a9bf68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    category: "Skincare",
    tags: ["exfoliant", "scrub", "brightening"],
    rating: 4.3,
    reviewCount: 142,
    stock: 51
  },
  {
    id: "8",
    name: "Volumizing Mascara",
    description: "Instant volume and length for dramatic lashes. The unique brush separates and coats each lash for a clump-free, voluminous look.",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1631214524030-d5589456e67d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1409&q=80"
    ],
    category: "Makeup",
    tags: ["mascara", "volumizing", "lashes"],
    rating: 4.4,
    reviewCount: 276,
    stock: 89,
    bestSeller: true
  }
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah J.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "I've been using UMI's skincare products for 3 months now and my skin has never looked better! The hydrating serum is a game-changer.",
    date: "2023-03-15"
  },
  {
    id: "2",
    name: "Michael T.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    text: "The fragrance I purchased has become my signature scent. I get compliments everywhere I go! Will definitely be ordering more.",
    date: "2023-04-02"
  },
  {
    id: "3",
    name: "Lily Chen",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    text: "I'm obsessed with the makeup brush set - professional quality at a reasonable price. My makeup application has improved dramatically!",
    date: "2023-05-20"
  }
];

// Orders for admin panel
export const orders: Order[] = [
  {
    id: "ORD-2023-001",
    customerId: "cust-001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    items: [
      { productId: "1", name: "Hydrating Facial Serum", price: 48.99, quantity: 1 },
      { productId: "8", name: "Volumizing Mascara", price: 19.99, quantity: 2 }
    ],
    total: 88.97,
    status: "delivered",
    date: "2023-05-12",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2023-002",
    customerId: "cust-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    items: [
      { productId: "6", name: "Limited Edition Skincare Set", price: 129.99, quantity: 1 }
    ],
    total: 129.99,
    status: "processing",
    date: "2023-05-18",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "USA"
    },
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-2023-003",
    customerId: "cust-003",
    customerName: "Robert Johnson",
    customerEmail: "robert.j@example.com",
    items: [
      { productId: "4", name: "Floral Eau de Parfum", price: 78.99, quantity: 1 },
      { productId: "5", name: "Professional Makeup Brush Set", price: 42.99, quantity: 1 }
    ],
    total: 121.98,
    status: "shipped",
    date: "2023-05-15",
    shippingAddress: {
      street: "789 Pine Blvd",
      city: "Chicago",
      state: "IL",
      postalCode: "60007",
      country: "USA"
    },
    paymentMethod: "Credit Card"
  }
];
