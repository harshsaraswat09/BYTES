import { z } from "zod";

import {
  signupSchema,
  signinSchema,
  createPostSchema,
  updatePostSchema,
} from "../../backend/src/validators";

export type SignupInput = z.infer<typeof signupSchema>;

// Our Schema ->
// signupSchema = {
//   name: string;
//   email: string;
//   password: string;
// }

// Zod converts it ->
// type SignupInput = {
//   name: string;
//   email: string;
//   password: string;
// }

export type SigninInput = z.infer<typeof signinSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface PostDTO {
  id: string;
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  readingTime: number;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
