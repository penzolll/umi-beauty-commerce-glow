
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated || (user && !user.isAdmin)) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  const isActive = (path: string) => {
    return location.pathname === path
      ? "bg-umi-orange text-white"
      : "text-umi-black hover:bg-orange-100";
  };

  if (!isAuthenticated || (user && !user.isAdmin)) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-umi-black">
              UMI<span className="text-umi-orange">Beauty</span> Admin
            </h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className={`block p-2 rounded-md ${isActive("/admin")}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className={`block p-2 rounded-md ${isActive("/admin/products")}`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  className={`block p-2 rounded-md ${isActive("/admin/categories")}`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className={`block p-2 rounded-md ${isActive("/admin/orders")}`}
                >
                  Orders
                </Link>
              </li>
              <li className="pt-4 mt-4 border-t">
                <Link
                  to="/"
                  className="block p-2 rounded-md text-umi-black hover:bg-orange-100"
                >
                  View Store
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-umi-black">{title}</h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
