import mongoose from "mongoose";
import { env } from "./env";

export async function connectToDB(): Promise<void> {
    mongoose.connect(env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected successfully")
    })
    .catch((err)=>{
        console.log("error connecting to DB", err)
    })
}