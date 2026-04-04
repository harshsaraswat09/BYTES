import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signin");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Appbar />

      <div className="max-w-2xl mx-auto px-6">

        {/* Error */}
        {error && (
          <div className="mt-10 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        )}

        {/* Empty state */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20">
            <p
              className="text-2xl text-gray-900 mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              No stories yet.
            </p>
            <p className="text-sm text-gray-400">
              Be the first to write one.
            </p>
          </div>
        )}

        {/* Blog list */}
        {!loading && !error && blogs.map((blog) => (
          <BlogCard key={blog._id} post={blog} />
        ))}

      </div>
    </div>
  );
};