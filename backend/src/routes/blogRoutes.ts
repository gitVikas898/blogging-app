import express from "express";
import { createBlog , getBlogs } from "../controllers/blogController";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();


router.post("/createBlog",authMiddleware,createBlog)
router.get("/blogs",getBlogs);

export default router