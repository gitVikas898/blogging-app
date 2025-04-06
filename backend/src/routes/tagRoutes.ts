import express from "express"
import { createTag, getAllTags, getTagsForBlogs } from "../controllers/tagController";
import { authMiddleware } from '../middlewares/auth';


const router = express.Router();


router.get("/tags",getAllTags);//checked
router.post("/tags",authMiddleware,createTag);
router.get("/tags/:blogId",getTagsForBlogs);


export default router;