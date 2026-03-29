import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";




const app = express();

app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json())
app.use(morgan("dev"))


app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Bytes API is running",
    timestamp: new Date(),
  });
});

// Routes will go here
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/blog", blogRoutes);

// ADD THIS — must always be the LAST line

export default app; 