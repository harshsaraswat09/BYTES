import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export const signToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    env.JWT_SECRET as string,
    { expiresIn: "7d" } 
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
};