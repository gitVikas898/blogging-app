import express from "express"
import { createBio } from "../controllers/bioController"
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/createBio",authMiddleware,createBio);

export default router