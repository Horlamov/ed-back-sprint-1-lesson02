import {db} from "../db/in-memory.db";
import {Post} from "../posts/types/post";
import {blogsRepository} from "./blog.repository";
import {randomUUID} from "crypto";

export const postsRepository = {
    findAll(): Post[] {
        return db.posts;
    },

    findById(id: string): Post| null {
        return db.posts.find((p) => p.id === id) ?? null;
    },

    create(newPost: Omit<Post, 'id' | 'blogName'>): Post | null {
        const foundBlog = blogsRepository.findById(newPost.blogId);
        if (!foundBlog) return null; // Если блога нет, возвращаем null

        const createdPost: Post = {
            id: randomUUID(),
            ...newPost,
            blogName: foundBlog.name,
        };
        db.posts.push(createdPost);
        return createdPost;
    },


    update(id: string, postData: Omit<Post,'id' | 'blogName'>): boolean {
        const foundPost = db.posts.find(p => p.id === id);
        if (!foundPost) return false;

        const foundBlog = blogsRepository.findById(postData.blogId);
        if (!foundBlog) return false;

        foundPost.title = postData.title;
        foundPost.shortDescription = postData.shortDescription;
        foundPost.content = postData.content;
        foundPost.blogId = postData.blogId;
        foundPost.blogName = foundBlog.name; // Обновляем имя блога
        return true;
    },

    delete(id: string): boolean {
        const index = db.posts.findIndex((p) => p.id === id);
        if (index === -1) return false;

        db.posts.splice(index, 1);
        return true;
    }
};