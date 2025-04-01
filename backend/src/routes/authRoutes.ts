import express from "express"
import { register,login, getAllUsers, getUser } from "../controllers/authController"
import { authMiddleware } from "../middlewares/auth";
import { getBookmarks } from "../controllers/bookMarkController";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/users",getAllUsers);
router.get("/users/:id",getUser);
router.get("/user/bookmarks",authMiddleware,getBookmarks);

export default router;