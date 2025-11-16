import { NextFunction, type Request, type Response } from "express"
import { AuthServices } from "./auth.services"


const registerUser = async(req:Request,res:Response,next:NextFunction) =>{
    
    try {
        const user  = await AuthServices.register(req.body);
    res.status(201).json(
        {
            message:"user Login succfully ",
            data:user
        }
    )
        
    } catch (error) {
        next(error)
    }
    
}
const loginUser = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        
    const user  = await AuthServices.login(req.body);
    res.status(201).json(
        {
            message:"user lohin  succfully ",
            data:user
        }
    )
        
    } catch (error) {
        next(error)
    }
};

export const AuthController = {
    registerUser,loginUser
}