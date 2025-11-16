import express from 'express';
import { PostController } from './post.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.interface';

const router = express.Router();

router.post('/create-post',auth(USER_ROLE.USER),PostController.createPost);
router.get("/",PostController.getAllPost);
router.get("/:id", PostController.getSinglePost);
router.put("/:id",auth(USER_ROLE.ADMIN),PostController.updatePost)
router.delete("/:id", auth(USER_ROLE.ADMIN), PostController.deletePost);


export const  PostRouter = router;


