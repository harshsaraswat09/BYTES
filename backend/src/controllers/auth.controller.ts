import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { signToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

//**
// @desc - SIGNUP
// @route - /api/v1/auth/signup
// */

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    // step 1- checking if email already registered
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return next(ApiError.conflict("Email already registered"));
    }

    // Step 2 — Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Step 3 — Generate JWT token
    const token = signToken(user._id.toString());

    // Step 4 — Send response
    res.status(201).json({
      message: "Account created successfully",
      token,
      user,
    });
  } catch (err) {
    
    next(err);
  }
};

//**
// @desc - SIGNIN
// @route - /api/v1/auth/login
// */

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const { email, password } = req.body;

    // Step 1 - Find user by email
    
    const user = await User.findOne({ email }).select("+password");

    

    // Step 2 - Check if user exists and password is correct or not
    if (!user || !(await user.comparePassword(password))) {
      return next(ApiError.unauthorized("Invalid email or password"));
    }

    // Step 3 - Generate Token
    const token = signToken(user._id.toString());

    // Step 4 - Send Response
    res.json({
      message: "Signed in successfully",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// GET ME (who am i?)
// GET /api/v1/auth/me
// Protected route — needs token

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    console.log("userId from token:", req.userId);

    const user = await User.findById(req.userId);
    

    if (!user) {
      return next(ApiError.notFound("User not found"));
    }

    res.json({ user });

  } catch (err) {
    next(err);
  }
};
