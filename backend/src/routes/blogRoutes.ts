import express from "express";
import { createBlog , getBlogs } from "../controllers/blogController";
import { authMiddleware } from "../middlewares/auth";
import { likeBlog } from "../controllers/likeController";
const router = express.Router();


router.post("/createBlog",authMiddleware,createBlog)
router.get("/blogs",getBlogs);
router.post("/blog/like",authMiddleware,likeBlog)
export default router