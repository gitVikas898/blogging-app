import express from "express"
import { createBio, updateBio } from "../controllers/bioController"
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/createBio",authMiddleware,createBio);
router.patch("/updateBio",authMiddleware,updateBio);
export default router