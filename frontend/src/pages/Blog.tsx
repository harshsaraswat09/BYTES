import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog, error } = useBlog(id || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Appbar />
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="w-3/4 h-8 bg-gray-100 rounded animate-pulse mb-4" />
          <div className="w-1/2 h-4 bg-gray-100 rounded animate-pulse mb-12" />
          <div className="space-y-3">
            <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
            <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Appbar />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-gray-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Appbar />

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Title */}
        <h1
          className="text-4xl font-bold text-gray-900 leading-tight mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {blog?.title}
        </h1>

        {/* Author + meta */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
            {blog?.author?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {blog?.author?.name || "Anonymous"}
            </p>
            <p className="text-xs text-gray-400">
              {blog?.readingTime} min read · {" "}
              {new Date(blog?.createdAt || "").toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          className="text-lg text-gray-700 leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {blog?.content}
        </div>

        {/* Tags */}
        {blog?.tags && blog.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-12 pt-8 border-t border-gray-100">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};