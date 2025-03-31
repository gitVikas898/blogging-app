import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

interface AuthenticatedUser extends Request {
    user?: { userId: number };
}

export async function likeBlog(req: AuthenticatedUser, res: Response) {
    const { blogId } = req.body;

    if (!req.user || !req.user.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    try {
        
        const userId = req.user.userId;

        
        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
                blogId
            }
        });

        if (existingLike) {
            // Unlike the blog if already liked
            await prisma.like.delete({
                where: { id: existingLike.id }
            });

            const likeCount = await prisma.like.count({
                where: { blogId }
            });

            res.status(200).json({ message: "Unliked", likeCount });
            return 
        }

        // Like the blog
        await prisma.like.create({
            data: {
                userId,
                blogId
            }
        });

        const likeCount = await prisma.like.count({
            where: { blogId }
        });

        res.status(201).json({ message: "Liked", likeCount });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        return;
    }
}
