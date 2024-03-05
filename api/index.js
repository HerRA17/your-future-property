import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

process.env.MONGO = "mongodb+srv://hermannrasch93:Chispa1793@your-future-property.p2sazga.mongodb.net/?retryWrites=true&w=majority&appName=Your-Future-Property";
mongoose.connect(process.env.MONGO)
.then(() => console.log("MongoDB connection successful!"))
.catch((err) => console.log("MongoDB connection error: " + err));
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server running in server 3000");
}
);

 app.use("/api/user", userRouter);
 app.use("/api/auth", authRouter);
//  middleware
 app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
 });