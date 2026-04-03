import { useState, useEffect } from "react";
import { blogApi } from "../api";

// -------------------------------------------------------
// Types — what a blog post looks like
// -------------------------------------------------------
interface Author {
  _id: string;
  name: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  author: Author;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

// -------------------------------------------------------
// useBlogs — fetch all published posts
// -------------------------------------------------------
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogApi.getPosts();
        // NEW backend returns { posts: [...] }
        setBlogs(response.data.posts);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load posts"
        );
      } finally {
        // finally always runs — loading stops whether success or error
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs, error };
};

// -------------------------------------------------------
// useBlog — fetch single post by ID
// -------------------------------------------------------
export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogApi.getPost(id);
        // NEW backend returns { post: {...} }
        setBlog(response.data.post);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load post"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  return { loading, blog, error };
};