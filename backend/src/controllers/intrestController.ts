import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "../utils/interfaces";
import { Response,Request } from "express";

const prisma = new PrismaClient();

//allows authenticated user to create intrest
export async function addIntrest(req:AuthenticatedUser,res:Response) {
    try{
        const {userId,title} = req.body;

        const defaultIntrests = await prisma.interest.findUnique({
            where:{userId_title:{userId,title}}
        })

        
    if (defaultIntrests) {
        // If it's a default interest, link it to the user
        const userInterest = await prisma.interest.create({
          data: { title, userId },
        });
        res.status(201).json(userInterest);
        return;
      }
  
        //check if intrests already exists 

        const existingIntrest = await prisma.interest.findUnique({
            where:{userId_title:{userId,title}},
        })

        if(existingIntrest){
            res.status(400).json({message:"Intrests already exists"});
            return;
        }

        //create a new Intrest user-specific or general 

        const newIntrest = await prisma.interest.create({
            data:{
                userId,
                title
            }
        })
        res.status(201).json(newIntrest);
    }catch(error){
        res.status(500).json({message:(error as Error).message});
        return;
    }
}

// fetch authenticated users intrests

export async function getUserIntrests(req:AuthenticatedUser,res:Response) {
    try{
        if(!req.user){
            res.status(401).json({message:"Unauthorised user"})
            return;
        }

        const userId = req.user.userId;
        
        const userIntrests = await prisma.interest.findMany({
            where:{userId}
        })

        res.status(200).json(userIntrests);
    }catch(error){
        res.status(500).json({message:(error as Error).message});
        return;
    }
}

export async function getAllIntrests(req:Request,res:Response) {
    try{
         const findAllIntrests = await prisma.interest.findMany({
            where:{userId:null}
         });

         res.json(findAllIntrests)
    
    }catch(error){
        res.status(500).json({message:(error as Error).message});
        return;
    }
}