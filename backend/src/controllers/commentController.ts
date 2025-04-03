import { PrismaClient } from "@prisma/client";
import { Response,Request } from "express";
import { AuthenticatedUser } from "../utils/interfaces";

const prisma = new PrismaClient();

export async function createComment(req:AuthenticatedUser, res:Response) {
    const {content , blogId} = req.body;

    const userId = req.user?.userId;

    if(!userId){
        res.status(401).json({message:"Unauthorised"});
        return;
    }

    if(!content || !blogId){
        res.status(401).json({message:"Invalid content and userId"});
    }

    try{
        const comment = await prisma.comment.create({
            data:{
                content,
                userId,
                blogId
            }
        })
        const response = comment.content
        res.status(201).json({message:`Comment: ${response} created`});

    }catch(error){
        res.status(500).json({ message: "Error creating comment", error });
        return;
    }
}

// delete comment 

export async function deleteComment(req:AuthenticatedUser,res:Response) {
    try{
        const {id} = req.params;
        const userId = req.user?.userId;
        // first find the comment if not found then throw error 
        // if found then delete 

        const comment = await prisma.comment.findUnique({
            where:{id:Number(id)}
        });

        if(!comment){
            res.status(404).json({message:"Comment not found"});
            return;
        }

        if(comment.userId !== userId){
            res.status(403).json({message:"Unauthorised user"});
            return;
        }

        const deleteComment = await prisma.comment.delete({
            where:{id:Number(id)}
        });
        
        const response = deleteComment.content;
        res.json({message:`Comment: ${response} deleted`});

    }catch(error){
        res.status(500).json({ message: "Error deleting comment", error });
        return;
    }
}

