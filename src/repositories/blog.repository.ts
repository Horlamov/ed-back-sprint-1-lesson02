import { Blog } from '../blogs/types/blog';
import { db } from '../db/in-memory.db'
import {randomUUID} from "crypto";

export const blogsRepository = {

    findAll(): Blog[] {
        return db.blogs;
    },

    findById(id: string): Blog | null {
        return db.blogs.find((b) => b.id === id) ?? null;
    },

    create(newBlog: Omit<Blog, 'id'>): Blog {
        const createdBlog: Blog = {
            id: randomUUID(),
            ...newBlog,
        };
        db.blogs.push(createdBlog);
        return createdBlog;
    },

    update(id: string, blogData: Omit<Blog, 'id'>): boolean {
        const foundBlog = db.blogs.find(b => b.id === id);
        if (!foundBlog) return false;

        foundBlog.name = blogData.name;
        foundBlog.description = blogData.description;
        foundBlog.websiteUrl = blogData.websiteUrl;
        return true;
    },

    delete(id: string): boolean {
        const index = db.blogs.findIndex(b => b.id === id);
        if(index === -1) return false;
        db.blogs.splice(index, 1);
        return true;
    }

  };

