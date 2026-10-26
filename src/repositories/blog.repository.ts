import { Blog } from '../blogs/types/blog';
import { db } from '../db/in-memory.db'

export const blogsRepository = {
    create(newBlog: Omit<Blog, 'id'>): Blog {
      const id = crypto.randomUUID();
      const createdBlog : Blog = {
        id,
        ...newBlog,
      };
      db.blogs.push(createdBlog);
      return createdBlog;
    }

  };

