import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(ApiError.unauthorized("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const userExists = await User.exists({ _id: decoded.id });
    if (!userExists) {
      return next(ApiError.unauthorized("User no longer exists"));
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    next(ApiError.unauthorized("Invalid token"));
  }
};

