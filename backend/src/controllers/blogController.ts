import { PrismaClient } from "@prisma/client";
import { Request,Response} from "express"
import estimateReadingTime from '../utils/helperFunctions';
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

   
    const readingTime = estimateReadingTime(content);

    try{
        const blog = await prisma.blog.create({
            data:{title,content,authorId:req.user.userId,readingTime}
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
    const readingTime = estimateReadingTime(content);
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
                content,
                readingTime,
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
               },
               BlogTags:{
                select:{
                    tag:true,
                }
               }
            }
        })
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function publishBlog(req:AuthenticatedRequest,res:Response) {
    const { blogId } = req.body;

    if(!req.user){
        res.status(403).json({message:"Unauthorised"});
        return;
    }

    try{
        const findBlog = await prisma.blog.findUnique({
            where:{id:blogId}
        });

        if(!findBlog){
            res.status(404).json({messsage:"Blog not found"});
            return;
        }

        if(findBlog.authorId !== req.user.userId){
            res.status(403).json({message:"Only you can modify your blog"});
            return;
        }

        const updatedBlog = await prisma.blog.update({
            where:{id:blogId},
            data:{
                isPublished:true,
                updatedAt:new Date(),
            }
        });

        res.status(200).json({
            message:"Blog published!",
            blog:updatedBlog
        })
    }catch(error){
        console.error("Error publishing blog",error);
        res.status(500).json({message:"Internal Server error"})
        return;
    }
}

export async function getBlogById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
  
    try {
      const blogId = parseInt(id);
      const userId = req.user?.userId;
  
      const blog = await prisma.blog.findUnique({
        where: { id: blogId },
        include: {
          author: { select: { username: true } },
          BlogTags: {
            include: { tag: true },
          },
          _count: { select: { Like: true } },
          comments: true,
        }
      });
  
      if (!blog) {
       res.status(404).json({ message: "Blog Not Found" });
       return 
      }
  
      // 👍 Always return like count
      // ✅ Add hasLiked only if user is authenticated
      let hasLiked = false;
  
      if (userId) {
        const like = await prisma.like.findFirst({
          where: { userId, blogId }
        });
        hasLiked = !!like;
      }
  
      res.json({
        ...blog,
        hasLiked: userId ? hasLiked : undefined // ← smart optionality
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      return
    }
  }
  