import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => console.log("MongoDB connection successful!"))
.catch(err => console.log("MongoDB connection error: " + err));
const app = express();

app.listen(3000, () => {
    console.log("Server running in server 3000");
}
);