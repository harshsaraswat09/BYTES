import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // Case 1 — MongoDB duplicate key error
  // Happens when someone tries to register with existing email
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `${field} already exists`,
    });
  }

  // Case 2 — MongoDB invalid ID format
  // Happens when someone passes a bad post ID in the URL
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  // Case 3 — JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token has expired" });
  }

  // Case 4 — Validation errors from validate middleware
  if (err.statusCode === 422) {
    return res.status(422).json({
      message: err.message,
      errors: err.errors,
    });
  }
};