import { Request,Response,NextFunction } from "express";
import jwt ,{JwtPayload} from "jsonwebtoken"

interface AuthRequest extends Request{
    user? :string | JwtPayload
}

export const OptionalMiddleware = (req:AuthRequest,res:Response,next:NextFunction):void =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return next(); // No Auth Header? Just continue as guest
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return next(); // No token? Just continue as guest
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