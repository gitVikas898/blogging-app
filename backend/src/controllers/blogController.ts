import { Prisma, PrismaClient } from "@prisma/client";
import { Request,Response} from "express"
const prisma = new PrismaClient();

interface BlogRequestBody{
    title:string;
    content:string;
}

interface AuthenticatedRequest extends Request{
    user?:{userId:number };
}

export async function createBlog(req:AuthenticatedRequest,res:Response):Promise<void> {
    const {title,content}:BlogRequestBody = req.body;
    if(!req.user){
        res.status(401).json({message:"Unauthorised"});
        return;
    }

    try{
        const blog = await prisma.blog.create({
            data:{title,content,authorId:req.user.userId}
        })
        res.status(201).json(blog);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getBlogs(req:Request,res:Response) {
    try{
        const blogs = await prisma.blog.findMany({
            include:{
                author:{select:{username:true}}
            }
        })
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
}