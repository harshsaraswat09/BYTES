import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in — redirect to blogs
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/blogs");
  }, []);

  const handleSignin = async () => {
    // Basic frontend validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.signin({ email, password });
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Redirect to blogs
      navigate("/blogs");

    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Allow signin on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSignin();
  };

  return (
    <div className="min-h-screen flex">

      {/* Left side — Form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-gray-900 font-medium underline underline-offset-2"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <button
              onClick={handleSignin}
              disabled={isLoading}
              className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>

      {/* Right side — Quote (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-16 border-l border-gray-100">
        <div className="max-w-md">
          <blockquote className="text-2xl font-serif text-gray-800 leading-relaxed mb-6">
            "The scariest moment is always just before you start."
          </blockquote>
          <p className="text-gray-500 font-medium">— Stephen King</p>
        </div>
      </div>

    </div>
  );
};