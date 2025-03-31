import express from "express"
import { register,login, getAllUsers, getUser } from "../controllers/authController"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/users",getAllUsers);
router.get("/users/:id",getUser);

export default router;