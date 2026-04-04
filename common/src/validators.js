"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
// --- AUTH VALIDATORS ---
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Please enter a valid email"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters"),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please enter a valid email"),
    password: zod_1.z.string().min(1, "Password is required"),
});
// --- BLOG VALIDATORS ---
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(150, "Title too long"),
    content: zod_1.z.string().min(1, "Content is required"),
    tags: zod_1.z.array(zod_1.z.string()).optional().default([]),
});
exports.updatePostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(150).optional(),
    content: zod_1.z.string().min(1).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
