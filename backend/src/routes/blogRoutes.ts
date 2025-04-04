import express from "express";
import { createBlog , getBlogs, updateBlog } from "../controllers/blogController";
import { authMiddleware } from "../middlewares/auth";
import { likeBlog } from "../controllers/likeController";
import { createComment, deleteComment } from "../controllers/commentController";
import { toggleBookmark } from "../controllers/bookMarkController";
const router = express.Router();


router.post("/createBlog",authMiddleware,createBlog);
router.patch("/updateBlog/:id",authMiddleware,updateBlog);
router.get("/blogs",getBlogs);

router.post("/blog/like",authMiddleware,likeBlog)

router.post("/blog/comment",authMiddleware,createComment);
router.delete("/blog/comment/:id",authMiddleware,deleteComment);

//bookmark blog route

router.post("/blog/bookmark",authMiddleware,toggleBookmark)

export default router