import { Request,Response,NextFunction } from "express";
import jwt ,{JwtPayload} from "jsonwebtoken"

interface AuthRequest extends Request{
    user? :string | JwtPayload
}

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"});
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET as string);
        req.user = decode;
        next();
    }catch(error){
        return res.status(403).json({message:"Invalid Token"})
    }
}