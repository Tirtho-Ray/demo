import express from "express"
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRouter } from "../modules/post/post.route";
const router = express.Router();

const moduleRouter = [
    {
        path:"/auth",
        route:AuthRoutes
    },
    {
        path:"/post",
        route:PostRouter
    },
];

moduleRouter.forEach((route) => router.use(route.path,route.route));

export default router;