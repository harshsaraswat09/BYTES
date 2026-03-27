import express from "express";
import morgan from "morgan";



const app = express();


app.use(express.json())
app.use(morgan("dev"))


app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Bytes API is running",
    timestamp: new Date(),
  });
});

export default app; 