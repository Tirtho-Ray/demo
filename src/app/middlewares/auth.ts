import { NextFunction, type Request, type Response } from "express"
import { USER_ROLE, USER_STATUS } from "../modules/user/user.interface";
import jwt from "jsonwebtoken"
import { User } from "../modules/user/user.model";

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }


        try {
            const jwt_Secret = process.env.jwt_Secret || 'jwt_Secrete_this _is';

            const decode = jwt.verify(token, jwt_Secret) as {
                _id: string,
                name: string,
                email: string,
                role: keyof typeof USER_ROLE,
                status: keyof typeof USER_STATUS
            };

            const { email, role } = decode;

            const user = await User.findOne({ email })
                .select("email role status")
                .lean();

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            if (user.status === USER_STATUS.BLOCKED) {
                return res.status(403).json({
                    message: "User account is blocked"
                });
            }

            if (requiredRoles.length && !requiredRoles.includes(role)) {
                return res.status(403).json({
                    message: "You don't have permission"
                });
            }

            req.user = decode;
            next();

        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token",
                error
            });
        }
    };
};
