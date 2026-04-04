import { Link } from "react-router-dom";
import { Post } from "../hooks";

interface BlogCardProps {
  post: Post;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const authorInitial = post.author?.name?.[0]?.toUpperCase() || "A";

  return (
    <Link to={`/blog/${post._id}`} className="no-underline text-inherit">
      <div className="py-8 border-b border-gray-100 hover:opacity-75 transition-opacity cursor-pointer">

        {/* Author row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
            {authorInitial}
          </div>
          <span className="text-sm text-gray-900 font-medium">
            {post.author?.name || "Anonymous"}
          </span>
          <span className="text-gray-300 text-sm">·</span>
          <span className="text-sm text-gray-400">
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-bold text-gray-900 mb-2 leading-snug"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {post.title}
        </h2>

        {/* Preview */}
        <p className="text-base text-gray-500 leading-relaxed mb-4">
          {post.content.length > 150
            ? post.content.slice(0, 150) + "..."
            : post.content}
        </p>

        {/* Bottom row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400">
            {post.readingTime} min read
          </span>
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
};