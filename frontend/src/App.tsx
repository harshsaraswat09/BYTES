import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Create } from "./pages/Create";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route goes to blogs */}
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/publish" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;