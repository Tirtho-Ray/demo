export const USER_ROLE ={
    USER:"USER",
    ADMIN:"ADMIN"
}as const;

export const USER_STATUS ={
    ACTIVE:"ACTIVE",
    BLOCKED:"BLOCKED"
}as const;


export type TUser ={
    _id:string;
    name:string;
    email:string;
    password:string;
    role: keyof typeof USER_ROLE;
    status: keyof typeof USER_STATUS;
}