import { Request } from "express";

export interface AuthenticatedUser extends Request{
    user?:{userId:number};
}