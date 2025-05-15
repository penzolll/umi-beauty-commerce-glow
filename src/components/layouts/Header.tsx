
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  User 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/mockData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Header = () => {
  const { isAuthenticated, user, login, register, logout, googleLogin, appleLogin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Login/Register form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password");
      return;
    }

    setIsLoggingIn(true);
    
    try {
      await login(loginEmail, loginPassword, rememberMe);
      toast.success("Login successful");
      setLoginEmail("");
      setLoginPassword("");
      setIsProfileOpen(false);
    } catch (err: any) {
      setLoginError(err.message || "Invalid email or password");
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    // Basic validation
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      setRegisterError("All fields are required");
      return;
    }

    // Password matching validation
    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords don't match");
      return;
    }

    // Password strength validation (basic)
    if (registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }

    setIsRegistering(true);

    try {
      await register(registerEmail, registerPassword, registerName);
      toast.success("Registration successful! Please check your email for verification.");
      
      // Clear form
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
      
      // Close profile sheet
      setIsProfileOpen(false);
    } catch (err: any) {
      setRegisterError(err.message || "Registration failed");
      console.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      // The redirect will happen automatically
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await appleLogin();
      // The redirect will happen automatically
    } catch (err) {
      toast.error("Apple login failed");
    }
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

            {/* User account - Sheet for login/register on click */}
            {isAuthenticated ? (
              <div ref={profileMenuRef} className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-umi-orange transition-colors"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium overflow-hidden">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
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
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-gray-700 hover:text-umi-orange transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid grid-cols-2 w-full rounded-none">
                      <TabsTrigger value="login" className="rounded-none py-4">Login</TabsTrigger>
                      <TabsTrigger value="register" className="rounded-none py-4">Register</TabsTrigger>
                    </TabsList>
                    
                    {/* Login Tab */}
                    <TabsContent value="login" className="p-6">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-bold">Login to Your Account</h3>
                          <p className="text-sm text-gray-500 mt-1">Welcome back to UMI Beauty</p>
                        </div>
                        
                        {loginError && (
                          <div className="bg-red-50 text-red-500 px-4 py-2 rounded">
                            {loginError}
                          </div>
                        )}
                        
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                            <Input
                              id="email"
                              type="email"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              placeholder="your@email.com"
                              autoComplete="email"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label htmlFor="password" className="block text-sm font-medium">Password</label>
                              <Link to="/forgot-password" className="text-xs text-umi-orange hover:underline">
                                Forgot Password?
                              </Link>
                            </div>
                            <Input
                              id="password"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="••••••••"
                              autoComplete="current-password"
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <Checkbox
                              id="remember-me"
                              checked={rememberMe}
                              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 cursor-pointer">
                              Remember me
                            </label>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-umi-orange hover:bg-orange-700"
                            disabled={isLoggingIn}
                          >
                            {isLoggingIn ? "Logging in..." : "Login"}
                          </Button>
                        </form>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleGoogleLogin}
                          >
                            <svg
                              className="h-4 w-4 mr-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                                fill="#EA4335"
                              />
                            </svg>
                            Google
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleAppleLogin}
                          >
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Z" />
                              <path d="M19.14,17.5c.87-1.2,1.31-2.43,1.36-3.66a4.56,4.56,0,0,0-2.75-4.2,5.2,5.2,0,0,0-2.43-.6,5.48,5.48,0,0,0-2,.51A4.51,4.51,0,0,1,12,10a4.51,4.51,0,0,1-1.32-.46,5.54,5.54,0,0,0-2-.51,5.22,5.22,0,0,0-2.43.6A4.56,4.56,0,0,0,3.5,13.84c0,1.23.44,2.46,1.36,3.66a12.81,12.81,0,0,0,1.56,1.68A8.19,8.19,0,0,0,7.87,20.1a1.94,1.94,0,0,0,.91.21,2.19,2.19,0,0,0,.95-.21A9.54,9.54,0,0,0,12,18.51a9.54,9.54,0,0,0,2.27,1.59,2.22,2.22,0,0,0,.95.21,2,2,0,0,0,.91-.21,8.19,8.19,0,0,0,1.45-.92A12.79,12.79,0,0,0,19.14,17.5Z" />
                            </svg>
                            Apple
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Register Tab */}
                    <TabsContent value="register" className="p-6">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-bold">Create Account</h3>
                          <p className="text-sm text-gray-500 mt-1">Join UMI Beauty today</p>
                        </div>
                        
                        {registerError && (
                          <div className="bg-red-50 text-red-500 px-4 py-2 rounded">
                            {registerError}
                          </div>
                        )}
                        
                        <form onSubmit={handleRegister} className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                            <Input
                              id="name"
                              type="text"
                              value={registerName}
                              onChange={(e) => setRegisterName(e.target.value)}
                              placeholder="John Doe"
                              autoComplete="name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="register-email" className="block text-sm font-medium mb-1">Email Address</label>
                            <Input
                              id="register-email"
                              type="email"
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                              placeholder="your@email.com"
                              autoComplete="email"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="register-password" className="block text-sm font-medium mb-1">Password</label>
                            <Input
                              id="register-password"
                              type="password"
                              value={registerPassword}
                              onChange={(e) => setRegisterPassword(e.target.value)}
                              placeholder="••••••••"
                              autoComplete="new-password"
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                          </div>
                          
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">Confirm Password</label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              autoComplete="new-password"
                            />
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-umi-orange hover:bg-orange-700"
                            disabled={isRegistering}
                          >
                            {isRegistering ? "Creating Account..." : "Create Account"}
                          </Button>
                        </form>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleGoogleLogin}
                          >
                            <svg
                              className="h-4 w-4 mr-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                                fill="#34A853"
                              />
                              <path
                                d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                                fill="#EA4335"
                              />
                            </svg>
                            Google
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleAppleLogin}
                          >
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Z" />
                              <path d="M19.14,17.5c.87-1.2,1.31-2.43,1.36-3.66a4.56,4.56,0,0,0-2.75-4.2,5.2,5.2,0,0,0-2.43-.6,5.48,5.48,0,0,0-2,.51A4.51,4.51,0,0,1,12,10a4.51,4.51,0,0,1-1.32-.46,5.54,5.54,0,0,0-2-.51,5.22,5.22,0,0,0-2.43.6A4.56,4.56,0,0,0,3.5,13.84c0,1.23.44,2.46,1.36,3.66a12.81,12.81,0,0,0,1.56,1.68A8.19,8.19,0,0,0,7.87,20.1a1.94,1.94,0,0,0,.91.21,2.19,2.19,0,0,0,.95-.21A9.54,9.54,0,0,0,12,18.51a9.54,9.54,0,0,0,2.27,1.59,2.22,2.22,0,0,0,.95.21,2,2,0,0,0,.91-.21,8.19,8.19,0,0,0,1.45-.92A12.79,12.79,0,0,0,19.14,17.5Z" />
                            </svg>
                            Apple
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </SheetContent>
              </Sheet>
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
          className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out p-5 overflow-y-auto ${
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
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 mb-6">
                <Link 
                  to="/login" 
                  className="bg-umi-orange text-white py-2 px-4 rounded text-sm font-medium flex-1 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm font-medium flex-1 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
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
          
          {isAuthenticated && (
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3">
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
