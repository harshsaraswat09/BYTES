import { Request, Response, NextFunction } from "express";
import { Post } from "../models/post.model";
import { ApiError } from "../utils/ApiError";

// CREATE POST
// POST /api/v1/blog
// Protected — must be logged in

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, tags } = req.body;

    const newPost = await Post.create({
      title,
      content,
      tags,
      author: req.userId,
    });

    const post = await Post.findById(newPost._id).populate("author", "name email");

    res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (err) {
    next(err);
  }
};

// GET ALL PUBLISHED POSTS
// GET /api/v1/blog
// Public — no token needed

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .populate("author", "name email");

    res.json({ posts });

  } catch (err) {
    next(err);
  }
};

// GET SINGLE POST
// GET /api/v1/blog/:id
// Public — no token needed

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name");

    if (!post || !post.published) {
      return next(ApiError.notFound("Post not found"));
    }

    res.json({ post });

  } catch (err) {
    next(err);
  }
};

// UPDATE POST
// PATCH /api/v1/blog/:id
// Protected — must be the author

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Step 1 — Find the post
    const post = await Post.findById(req.params.id);
    if (!post) return next(ApiError.notFound("Post not found"));

    // Step 2 — Check ownership
    // Only the author can edit their own post
    if (post.author.toString() !== req.userId) {
      return next(ApiError.forbidden("You can only edit your own posts"));
    }

    // Step 3 — Update fields
    const { title, content, tags, published } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    if (published !== undefined) post.published = published;

    await post.save();

    res.json({
      message: "Post updated successfully",
      post,
    });

  } catch (err) {
    next(err);
  }
};

// DELETE POST
// DELETE /api/v1/blog/:id
// Protected — must be the author

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(ApiError.notFound("Post not found"));

    // Ownership check
    if (post.author.toString() !== req.userId) {
      return next(ApiError.forbidden("You can only delete your own posts"));
    }

    await post.deleteOne();

    res.status(204).send(); // 204 = success but no content to send back

  } catch (err) {
    next(err);
  }
};

// PUBLISH / UNPUBLISH POST
// PATCH /api/v1/blog/:id/publish
// Protected — must be the author

export const togglePublish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(ApiError.notFound("Post not found"));

    if (post.author.toString() !== req.userId) {
      return next(ApiError.forbidden("You can only publish your own posts"));
    }

    // Toggle between published and draft
    post.published = !post.published;
    await post.save();

    res.json({
      message: post.published ? "Post published!" : "Post moved to drafts",
      post,
    });

  } catch (err) {
    next(err);
  }
};