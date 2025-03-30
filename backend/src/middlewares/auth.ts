import { Request,Response,NextFunction } from "express";
import jwt ,{JwtPayload} from "jsonwebtoken"

interface AuthRequest extends Request{
    user? :string | JwtPayload
}

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction):void =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
         res.status(401).json({message:"Unauthorized"});
         return;
    }

    const token = authHeader.split(" ")[1];

    if(!token){
         res.status(401).json({message:"Unauthorized"});
         return;
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET as string);
        req.user = decode;
        next();
    }catch(error){
         res.status(403).json({message:"Invalid Token"})
         return;
    }
}