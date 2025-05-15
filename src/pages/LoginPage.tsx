
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin, appleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the intended destination, if there's one from protected route redirect
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, rememberMe);
      toast.success("Login successful");
      // Navigate to the intended destination or home
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>

            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-umi-orange hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-umi-orange hover:bg-orange-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="h-5 w-5 mr-2"
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
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleAppleLogin}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Z" />
                    <path d="M19.14,17.5c.87-1.2,1.31-2.43,1.36-3.66a4.56,4.56,0,0,0-2.75-4.2,5.2,5.2,0,0,0-2.43-.6,5.48,5.48,0,0,0-2,.51A4.51,4.51,0,0,1,12,10a4.51,4.51,0,0,1-1.32-.46,5.54,5.54,0,0,0-2-.51,5.22,5.22,0,0,0-2.43.6A4.56,4.56,0,0,0,3.5,13.84c0,1.23.44,2.46,1.36,3.66a12.81,12.81,0,0,0,1.56,1.68A8.19,8.19,0,0,0,7.87,20.1a1.94,1.94,0,0,0,.91.21,2.19,2.19,0,0,0,.95-.21A9.54,9.54,0,0,0,12,18.51a9.54,9.54,0,0,0,2.27,1.59,2.22,2.22,0,0,0,.95.21,2,2,0,0,0,.91-.21,8.19,8.19,0,0,0,1.45-.92A12.79,12.79,0,0,0,19.14,17.5Z" />
                  </svg>
                  Continue with Apple
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-umi-orange hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
