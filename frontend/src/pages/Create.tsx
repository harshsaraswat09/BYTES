import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { blogApi } from "../api";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Calculate reading time live as user types
  const readingTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

  const handlePublish = async () => {
    if (!title.trim()) {
      setError("Please add a title");
      return;
    }
    if (!content.trim()) {
      setError("Please add some content");
      return;
    }

    // Convert comma separated tags to array
    // "javascript, mongodb, express" → ["javascript", "mongodb", "express"]
    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      setIsLoading(true);
      setError(null);

      const response = await blogApi.createPost({
        title: title.trim(),
        content: content.trim(),
        tags: tagsArray,
      });

      const postId = response.data.post._id;

      // Publish it immediately
      await blogApi.togglePublish(postId);

      // Redirect to the new post
      navigate(`/blog/${postId}`);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to publish post");
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Appbar />

      {/* Top bar */}
      <div className="border-b border-gray-100 px-10 py-3 flex items-center justify-between">

        {/* Word count + reading time */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <span className="text-gray-200 text-xs">|</span>
          <span className="text-xs text-gray-400">
            {readingTime} min read
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}

        {/* Publish button */}
        <button
          onClick={handlePublish}
          disabled={isLoading || !title.trim() || !content.trim()}
          className="bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>

      </div>

      {/* Writing area */}
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Title input */}
        <textarea
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          rows={2}
          className="w-full text-4xl font-bold text-gray-900 placeholder-gray-200 border-none outline-none resize-none mb-6 leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        />

        {/* Divider */}
        <div className="w-12 h-0.5 bg-gray-200 mb-6" />

        {/* Tags input */}
        <input
          type="text"
          placeholder="Add tags (comma separated) e.g. javascript, mongodb"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full text-sm text-gray-400 placeholder-gray-300 border-none outline-none mb-8"
          style={{ fontFamily: "sans-serif" }}
        />

        {/* Content textarea */}
        <textarea
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError(null);
          }}
          rows={30}
          className="w-full text-lg text-gray-700 placeholder-gray-300 border-none outline-none resize-none leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        />

      </div>
    </div>
  );
};