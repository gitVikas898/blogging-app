import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

//register new user function

export const register = async function (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { username: name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//User Login new user function

export const login = async function (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({
        message: "invalid password",
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//get all users
export const getAllUsers = async function (req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//get a specific user

export const getUser = async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
        console.log(typeof userId)
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    const user = await prisma.user.findUnique({
        where:{id:userId},
        include:{
            blogs:{
                select:{
                    id:true,
                    title:true,
                    content:true,
                    createdAt:true
                }
            },
            comments:{
                select:{
                    content:true,
                    user:true,
                    blog:true
                }
            },
            Bio:{
              select:{
                content:true,
                createdAt:true,
                updatedAt:true
              }
            },
            Intrests:{
              select:{
                title:true
              }
            },
            Follow:{
              select:{
                follower:true
                
              }
            },
            _count:{
              select:{
                Follow:true,
              }
            }
        }
    });

    if(!user){
        res.status(404).json({message:"User not found"});
        return;
    }
    const response = {
      id:user?.id,
      username:user?.username,
      email:user?.email,
      blogs:user?.blogs,
      comments:user?.comments,
      bio:user?.Bio,
      intrests:user?.Intrests,
      followerList:user?.Follow,
      followersCount:user?._count?.Follow,
      memberSince:user?.createdAt
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
    return;
  }
};
