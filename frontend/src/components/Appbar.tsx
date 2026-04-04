import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center justify-between px-10 h-16">
      
      {/* Logo */}
      <Link
        to="/blogs"
        className="text-2xl font-bold text-gray-900 no-underline"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Bytes.
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Write */}
        <Link
          to="/publish"
          className="flex items-center gap-2 text-sm text-gray-500 no-underline hover:text-gray-900 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Write
        </Link>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-gray-900 rounded-full px-4 py-2 hover:bg-gray-700 transition-colors font-medium"
        >
          Sign out
        </button>

      </div>
    </nav>
  );
};