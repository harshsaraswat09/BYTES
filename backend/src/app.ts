import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";



const app = express();

app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json())
app.use(morgan("dev"))


// ROUTES

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);


app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Bytes API is running",
    timestamp: new Date(),
  });
});


// 404 HANDLER
// If no route matched — send this
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);


export default app; 