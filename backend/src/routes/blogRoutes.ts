import express from "express";
import { createBlog , getBlogById, getBlogs, publishBlog, updateBlog } from "../controllers/blogController";
import { authMiddleware } from "../middlewares/auth";
import { likeBlog } from "../controllers/likeController";
import { createComment, deleteComment, getComments } from "../controllers/commentController";
import { toggleBookmark } from "../controllers/bookMarkController";
import { assignTag, getBlogsByTag } from "../controllers/tagController";
const router = express.Router();


router.post("/createBlog",authMiddleware,createBlog);
router.post("/publishBlog",authMiddleware,publishBlog);
router.patch("/updateBlog/:id",authMiddleware,updateBlog);
router.get("/blogs",getBlogs);
router.get("/blogs/:id", getBlogById);

router.post("/blog/like",authMiddleware,likeBlog)

router.get("/blog/:id/comments",getComments)
router.post("/blog/comment",authMiddleware,createComment);
router.delete("/blog/comment/:id",authMiddleware,deleteComment);

//bookmark blog route

router.post("/blog/bookmark",authMiddleware,toggleBookmark)

//Tag Routes

router.post("/blogs/:id/tags",authMiddleware,assignTag);
router.get("/blogs/by-tag/:tagId",getBlogsByTag);

export default router