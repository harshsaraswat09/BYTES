import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";


export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {

    
    const result = schema.safeParse(req.body);

    if (!result.success) {
      
      const errors = result.error.flatten().fieldErrors;

      
      return next({
        statusCode: 422,
        message: "Validation failed",
        errors,
        isOperational: true,
      });
    }

    req.body = result.data;

    next();
  };
};