import { Router } from "express";
import { createBlogHandler } from "./handler/create-blog.handler";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import {getBlogHandler} from "./handler/get-blog.handler.ts";
import {getBlogListHandler} from "./handler/get-blog-list.handler.ts";
import {updateBlogHandler} from "./handler/update-blog.handler.ts";
import {deleteBlogHandler} from "./handler/delete-blog.handler.ts";


export const blogsRouter = Router({});

blogsRouter
    .get(BLOGS_ROUTES.ROOT,getBlogListHandler )
    .get(BLOGS_ROUTES.BY_ID,getBlogHandler )
    .post(BLOGS_ROUTES.ROOT, createBlogHandler )
    .put(BLOGS_ROUTES.BY_ID, updateBlogHandler)
    .delete(BLOGS_ROUTES.BY_ID, deleteBlogHandler);

