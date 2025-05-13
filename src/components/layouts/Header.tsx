
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/mockData";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const moreMenuRef = useRef<HTMLLIElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside of dropdown menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  // Split categories for main nav and More dropdown
  const mainCategories = categories.slice(0, 4);
  const moreCategories = categories.slice(4);

  return (
    <header className={`w-full bg-white transition-all duration-300 z-50 ${isScrolled ? 'fixed top-0 left-0 shadow-md' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Top bar with logo, nav, and actions */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="h-10 w-10">
              <img 
                src="/lovable-uploads/ed3fc7f5-c106-4051-a74c-40f53d5e30b1.png" 
                alt="UMI Beauty" 
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Main Navigation - desktop */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/products" 
                  className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  Shop
                </NavLink>
              </li>
              {mainCategories.map(category => (
                <li key={category.id}>
                  <NavLink 
                    to={`/category/${category.slug}`}
                    className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
              <li ref={moreMenuRef} className="relative">
                <button 
                  className="nav-item flex items-center"
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                >
                  More <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                
                {isMoreMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-100">
                    <div className="py-1">
                      {moreCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                          onClick={() => setIsMoreMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                      <Link
                        to="/about"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        to="/contact"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-umi-orange transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-umi-orange transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-umi-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User account */}
            {isAuthenticated ? (
              <div ref={profileMenuRef} className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-umi-orange transition-colors"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <User className="h-5 w-5" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-100">
                    <div className="py-1">
                      <p className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-100">
                        {user?.name}
                      </p>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-umi-orange"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-umi-orange transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-umi-orange transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar (expandable) */}
        {searchOpen && (
          <div className="py-3 border-t border-gray-100 animate-accordion-down">
            <form onSubmit={handleSearch} className="flex">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search for products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" className="ml-2 text-gray-500 hover:text-umi-orange">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu slide-in */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out p-5 overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="font-bold text-xl" onClick={() => setIsMobileMenuOpen(false)}>
              UMI Beauty
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <nav className="mb-6">
            <ul className="space-y-4">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => `block py-1 ${isActive ? 'text-umi-orange font-medium' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/products" 
                  className={({isActive}) => `block py-1 ${isActive ? 'text-umi-orange font-medium' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </NavLink>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <NavLink 
                    to={`/category/${category.slug}`}
                    className={({isActive}) => `block py-1 ${isActive ? 'text-umi-orange font-medium' : 'text-gray-700'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink 
                  to="/about" 
                  className={({isActive}) => `block py-1 ${isActive ? 'text-umi-orange font-medium' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({isActive}) => `block py-1 ${isActive ? 'text-umi-orange font-medium' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          
          <div className="border-t border-gray-100 pt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <p className="font-medium">{user?.name}</p>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-umi-orange"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block text-gray-700 hover:text-umi-orange"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-umi-orange"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="block text-gray-700 hover:text-umi-orange"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block text-gray-700 hover:text-umi-orange"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
