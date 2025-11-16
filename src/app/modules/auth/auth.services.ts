import { USER_ROLE, USER_STATUS } from "../user/user.interface";
import { User } from "../user/user.model";
import * as jwt from "jsonwebtoken";
import { TLogin, TRegister } from "./auth.interface";
import bcrypt from 'bcrypt';

const register = async (payload: TRegister) => {

    const isExistingUser = await User.findOne({ email: payload.email });
    if (isExistingUser) {
        throw new Error("User already exists");
    }


    const newUser = await User.create({
        ...payload,
        status: USER_STATUS.ACTIVE,
        role: USER_ROLE.USER
    });


    const jwtPayload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status
    };


    const secret = process.env.JWT_SECRET || "jwt_Secrete_this _is";
    const expire = process.env.JWT_EXPIRE || "1d";


    const token = jwt.sign(jwtPayload, secret, {
        expiresIn: '1hr'
    });

    return {
        user: jwtPayload,
        token
    };
};


const login  = async (payload:TLogin) =>{
    
    const user = await User.findOne({email:payload.email})
    if (!user){
        throw new Error("user not found")
    };

    if(user.status ==="BLOCKED"){
        throw new Error("user is blocked ")
    }

    const isPasswordMatch = bcrypt.compare(payload.password,user.password);
     if(!isPasswordMatch){
        throw new Error ("password dont metch")
     };

     const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
    };

   const secret = process.env.JWT_SECRET || "jwt_Secrete_this _is";
    const expire = process.env.JWT_EXPIRE || "1d";


    const token = jwt.sign(jwtPayload, secret, {
        expiresIn: '1hr'
    });

    return {
        user: jwtPayload,
        token
    };
}


export const AuthServices ={
    register,
    login
}

