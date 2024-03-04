import express from "express";
import {test} from "../controllers/user.controller.js";

const userRouter = express.Router();

router.get("/test", test);

export default userRouter;