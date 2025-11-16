import { model, Schema } from "mongoose";
import { TUser, USER_ROLE, USER_STATUS } from "./user.interface";
import  bcrypt  from 'bcrypt';

const userModel = new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:Object.keys(USER_ROLE)

    },
    status:{
        type:String,
        required:true,
        enum:Object.keys(USER_STATUS)
    },
});


userModel.pre('save', async function () {
    const user = this as any
    const hasedPassword = await bcrypt.hash(user.password,10)
    user.password= hasedPassword;
})

export const User =model<TUser>('User',userModel);