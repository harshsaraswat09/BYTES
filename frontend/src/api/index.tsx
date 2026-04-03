import axios from "axios";
import { BACKEND_URL } from "../config";

// Create axios instance with base config
// Every request automatically gets these settings
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor — runs before EVERY request automatically
// Attaches token to every request so we don't do it manually
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor — runs after EVERY response
// If token expired — automatically logout user
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// AUTH APIs
export const authApi = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/signup", data),

  signin: (data: { email: string; password: string }) =>
    api.post("/auth/signin", data),

  getMe: () =>
    api.get("/auth/me"),
};

// BLOG APIs
export const blogApi = {
  getPosts: (page = 1, limit = 10) =>
    api.get(`/blog?page=${page}&limit=${limit}`),

  getPost: (id: string) =>
    api.get(`/blog/${id}`),

  createPost: (data: { title: string; content: string; tags: string[] }) =>
    api.post("/blog", data),

  updatePost: (id: string, data: { title?: string; content?: string; tags?: string[] }) =>
    api.patch(`/blog/${id}`, data),

  deletePost: (id: string) =>
    api.delete(`/blog/${id}`),

  togglePublish: (id: string) =>
    api.patch(`/blog/${id}/publish`),
};