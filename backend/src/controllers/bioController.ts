import { PrismaClient } from "@prisma/client";
import { Response,Request } from "express";

const prisma = new PrismaClient();

interface AuthenticatedUser extends Request {
    user?: { userId: number };
}
interface Bio{
    content:string;
}



export async function createBio(req:AuthenticatedUser,res:Response) {
   const {content}:Bio = req.body
   
   if(!req.user){
        res.status(401).json({message:"Unauthorised"});
        return;
   }

   try{
        const bio = await prisma.bio.create({
            data:{
                content,
                userId:req.user.userId
            }
        })
        res.status(201).json(bio);
   }catch(error){
    res.status(500).json({ message: (error as Error).message });
   }
}

export async function updateBio(req:AuthenticatedUser,res:Response) {
    const {content}:Bio = req.body;

      
   if(!req.user){
    res.status(401).json({message:"Unauthorised"});
    return;
}

    try{
        const updatedBio = await prisma.bio.upsert({
            where: { userId: req.user.userId },
            update: { content },
            create: { content, userId: req.user.userId },
            select: {
                content: true,
                createdAt: true,
                updatedAt: true
            }
        });
        res.status(200).json(updatedBio)
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
}