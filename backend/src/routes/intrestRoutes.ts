import express from "express"
import { getAllIntrests } from "../controllers/intrestController";

const router = express.Router();

router.get("/interests",getAllIntrests);

export default router