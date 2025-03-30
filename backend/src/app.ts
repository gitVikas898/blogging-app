import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

dotenv.config(); // Load environment variables

const app = express();

// 🌟 Middleware setup
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log requests

// 🌟 Routes setup
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/", blogRoutes); // Blog-related routes

// 🌟 Global Error Handling Middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

export default app;
