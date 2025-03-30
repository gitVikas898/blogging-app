import express from "express"
import { register,login, getAllUsers } from "../controllers/authController"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/users",getAllUsers);

export default router;