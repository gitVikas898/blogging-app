import { PrismaClient } from "@prisma/client";
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

export async function updateBlog(req:AuthenticatedRequest,res:Response):Promise<void> {
    const {title,content}:BlogRequestBody = req.body;
    const id = req.params.id;
    const userId = req.user?.userId;

    try{
        const blog = await prisma.blog.findUnique({
            where:{id:Number(id)}
        })
        
        if(!blog){
            res.status(404).json({message:"Blog not found"});
            return;
        }

        if(blog?.authorId !== userId){
            res.status(500).json({message:"Unauthorised user"})
            return;
        }

        const update = await prisma.blog.update({
            where:{id:Number(id)},
            data:{
                title,
                content
            }
        });
        res.status(200).json({message:"Blog Updated",updateBlog:update});
    }catch(error){
        res.status(500).json({message:(error as Error).message});
        return;
    }
    

}

export async function getBlogs(req:Request,res:Response) {
    try{
        const blogs = await prisma.blog.findMany({
            include:{
                author:{select:{username:true}},
                comments:{
                    select:{
                        content:true,
                        userId:true,
                    }
                },
               _count:{
                select:{
                    Like:true
                }
               }
            }
        })
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
}