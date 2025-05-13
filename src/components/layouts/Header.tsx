
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/mockData";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with logo and search */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tighter text-umi-black">
              UMI<span className="text-umi-orange">Beauty</span>
            </h1>
          </Link>

          {/* Search - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-6 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Cart icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-umi-black hover:text-umi-orange transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-umi-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User className="h-6 w-6 text-umi-black hover:text-umi-orange transition-colors" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm font-medium text-umi-black truncate">
                      {user?.name}
                    </p>
                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <User className="h-6 w-6 text-umi-black hover:text-umi-orange transition-colors" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-umi-black" />
              ) : (
                <Menu className="h-6 w-6 text-umi-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - only visible on mobile */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex py-3 border-t border-gray-100">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                to="/"
                className="text-umi-black hover:text-umi-orange font-medium transition-colors"
              >
                Home
              </Link>
            </li>
            {categories.slice(0, 4).map((category) => (
              <li key={category.id}>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="text-umi-black hover:text-umi-orange font-medium transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li className="relative group">
              <button className="text-umi-black hover:text-umi-orange font-medium transition-colors">
                More
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                <div className="py-2">
                  {categories.slice(4).map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/about"
                className="text-umi-black hover:text-umi-orange font-medium transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-umi-black hover:text-umi-orange font-medium transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col space-y-4 mt-4 border-t pt-4 border-gray-100">
              <li>
                <Link
                  to="/"
                  className="text-umi-black hover:text-umi-orange font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="text-umi-black hover:text-umi-orange font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/about"
                  className="text-umi-black hover:text-umi-orange font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-umi-black hover:text-umi-orange font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="pt-4 border-t border-gray-100">
                    <p className="text-umi-black font-medium">
                      {user?.name}
                    </p>
                  </li>
                  {user?.isAdmin && (
                    <li>
                      <Link
                        to="/admin"
                        className="text-umi-black hover:text-umi-orange"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-umi-black hover:text-umi-orange"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="pt-4 border-t border-gray-100">
                  <Link
                    to="/login"
                    className="text-umi-black hover:text-umi-orange"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
