
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-umi-black text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center">
              <img 
                src="/lovable-uploads/ed3fc7f5-c106-4051-a74c-40f53d5e30b1.png" 
                alt="UMI Beauty" 
                className="h-10 w-10 mr-2"
              />
              <h3 className="text-xl font-bold tracking-wider">UMI BEAUTY</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Premium beauty products designed for all skin types. Discover your natural beauty with UMI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-umi-orange transition-colors p-2 border border-gray-700 rounded-full">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-umi-orange transition-colors p-2 border border-gray-700 rounded-full">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/skincare" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/category/makeup" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="/category/haircare" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Haircare
                </Link>
              </li>
              <li>
                <Link to="/category/fragrance" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Fragrance
                </Link>
              </li>
              <li>
                <Link to="/category/tools" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/category/sets" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-umi-orange transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-umi-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-umi-orange"
              />
              <Button
                type="submit"
                className="w-full bg-umi-orange hover:bg-orange-600 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} UMI Beauty Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
