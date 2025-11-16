import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
    return await Post.create(payload);
};

const getAllPost = async () => {
    return await Post.find();
};

const getSinglePost = async (id: string) => {
    return await Post.findById(id);
};

const updatePost = async (id: string, updateData: Partial<TPost>) => {
    const post = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    return post;
};

const deletePost = async (id: string) => {
    return await Post.findByIdAndDelete(id);
};

export const PostServices = {
    createPostIntoDB,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
};
