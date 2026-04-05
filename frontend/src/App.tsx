import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Create } from "./pages/Create";

function App() {
  // Track if loader animation is done
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Show loader on first visit */}
      {loading && (
        <Loader onComplete={() => setLoading(false)} />
      )}

      {/* Only show app after loader is done */}
      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/publish" element={<Create />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;