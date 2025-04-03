import express from "express"
import { register,login, getAllUsers, getUser } from "../controllers/authController"
import { authMiddleware } from "../middlewares/auth";
import { getBookmarks } from "../controllers/bookMarkController";
import { addIntrest, getUserIntrests } from "../controllers/intrestController";

const router = express.Router();

//authentication
router.post("/register",register);
router.post("/login",login);
//user info routes
router.get("/users",getAllUsers);
router.get("/users/:id",getUser);
//getAllBookmakrs
router.get("/user/bookmarks",authMiddleware,getBookmarks);

//user Intrests
router.get("/user/intrests",authMiddleware,getUserIntrests);
router.post("/user/intrests",authMiddleware,addIntrest);
export default router;