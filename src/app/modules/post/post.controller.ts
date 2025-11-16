import { Request, Response, NextFunction } from "express";
import { PostServices } from "./post.services";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await PostServices.createPostIntoDB(req.body);
        res.status(201).json({
            message: 'Post created successfully',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostServices.getAllPost();
        res.status(200).json({
            message: 'All posts retrieved successfully',
            data: posts
        });
    } catch (error) {
        next(error);
    }
};

const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
    throw new Error("Post ID is missing");
}
        
        const post = await PostServices.getSinglePost(id);
        if (!post) throw new Error("Post not found");

        res.status(200).json({
            message: 'Single post retrieved successfully',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
    throw new Error("Post ID is missing");
}
        const post = await PostServices.updatePost(id, req.body);

        if (!post) throw new Error("Post not found");

        res.status(200).json({
            message: 'Post updated successfully',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) {
    throw new Error("Post ID is missing");
}
        const deleted = await PostServices.deletePost(id);
        if (!deleted) throw new Error("Post not found");

        res.status(200).json({
            message: 'Post deleted successfully',
            data: deleted
        });
    } catch (error) {
        next(error);
    }
};

export const PostController = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
};
