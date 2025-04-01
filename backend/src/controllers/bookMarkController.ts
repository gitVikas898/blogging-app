import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {  AuthenticatedUser } from "../utils/interfaces" 

const prisma = new PrismaClient();

export async function toggleBookmark(req: AuthenticatedUser, res: Response) {
    try {
        const { blogId } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
             res.status(401).json({ message: "Unauthorized: User not found" });
             return
        }

        // Check if blog exists
        const blog = await prisma.blog.findUnique({ where: { id: Number(blogId) } });
        if (!blog) {
             res.status(404).json({ message: "Blog not found" })
             return;
            };

        // Check if the blog is already bookmarked
        const existingBookmark = await prisma.bookmark.findFirst({
            where: { userId, blogId: Number(blogId) },
        });

        if (existingBookmark) {
            // Remove bookmark
            await prisma.bookmark.delete({ where: { id: existingBookmark.id } });
            res.status(200).json({ message: "Bookmark removed" });
        } else {
            // Add bookmark
            await prisma.bookmark.create({
                data: { userId, blogId: Number(blogId) }, // Ensuring blogId is a number
            });
             res.status(201).json({ message: "Bookmark added" });
             
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        return;
    }
}

export async function getBookmarks(req:AuthenticatedUser,res:Response) {
    try{
        const userId = req.user?.userId;

        const myBookmarks = await prisma.bookmark.findMany({
            where:{userId},
            include:{blog:true}
        });
        res.json(myBookmarks);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
        return;
    }
}