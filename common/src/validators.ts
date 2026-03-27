import { z } from "zod";

// --- AUTH VALIDATORS ---

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
})

export const signinSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Password is required"),
})

// --- BLOG VALIDATORS ---

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title too long"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional().default([]),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  content: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
});