import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
import { AuthenticatedUser } from "../utils/interfaces";

const prisma = new PrismaClient();

// Get all tags 
export async function getAllTags(req:Request,res:Response) {
    try{
        const tags = await prisma.tag.findMany({
            include:{
                tag:{
                    select:{blogId:true}
                }
            }
        });
        const tagsWithUsage = tags.map((tag)=>({
            id:tag.id,
            name:tag.name,
            usageCount :tag.tag.length,
        }));

        res.json(tagsWithUsage);
    }catch(error){
        res.status(500).json({error:"Failed to fetch tags"});
    }
}

//Authenticated user can only create a tag 

export async function createTag(req:AuthenticatedUser,res:Response) {
    const {name} = req.body;

    if(!req.user || !req.user.userId){
        res.status(401).json({message:"Unauthorised"});
        return;
    }

    try{
        const existingTag = await prisma.tag.findUnique({
            where:{name}
        });

        if(existingTag){
            res.status(400).json({message:"Tag already exists"});
            return;
        }
        const newTag = await prisma.tag.create({
            data:{name}
        });
        res.status(201).json(newTag);

    }catch(error){
        res.status(500).json({message:"Failed to create a tag"});
    }
}

// assign a tag to a blog 

export async function assignTag(req:AuthenticatedUser,res:Response) {
  const blogId = parseInt(req.params.id);
  const {tagIds} :{tagIds:number[]} = req.body;

  if(!req.user || !req.user.userId){
    res.status(401).json({message:"Unauthorised"});
    return;
}
  try{
    await prisma.blogTags.deleteMany({where:{blogId}});
    const createData = tagIds.map((tagId)=>({blogId,tagId}));
   const result =  await prisma.blogTags.createMany({data:createData});
   res.json(result);
  }catch(e){
        res.status(500).json({e:"Failed to assign tags to blog"})
  }
}

// get all tags that is associated with a blog 

export async function getTagsForBlogs(req:Request,res:Response) {
    const blogId = parseInt(req.params.blogId);

    try{
        const blogTags = await prisma.blogTags.findMany({
            where:{blogId},
            include:{tag:true},
        })
        const tags = blogTags.map((bt)=>bt.tag);
        res.json(tags);
    }catch(error){
        res.status(500).json({error:"Failed to get tags"})
    }
}

//get BlogByTag 

export async function getBlogsByTag(req:Request,res:Response) {
    const tagId = parseInt(req.params.tagId);

    try{
        const blogTags = await prisma.blogTags.findMany({
            where:{tagId},
            include:{
                blog:true,
            }
        });

        const blogs = blogTags.map((bt)=>bt.blog);
        res.json(blogs);
    }catch(error){
        res.status(500).json({error:"Failed to fetch blogs by tag"})
    }
}