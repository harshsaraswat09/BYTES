import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  togglePublish,
} from "../controllers/blog.controller";
import { validate } from "../middleware/validate";
import { protect } from "../middleware/auth.middleware";
import { createPostSchema, updatePostSchema } from "../validators";

const router = Router();


// PUBLIC ROUTES — no token needed
router.get("/", getPosts);        // get all published posts
router.get("/:id", getPost);      // get single post

// PROTECTED ROUTES — token required for everything below
router.use(protect);

router.post("/", validate(createPostSchema), createPost);
router.patch("/:id", validate(updatePostSchema), updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/publish", togglePublish);

export default router;