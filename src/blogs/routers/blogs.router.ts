import { Router } from "express";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { createBlogHandler } from "./handlers/create-blog.handler";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";


export const blogsRouter = Router({});

blogsRouter
    .get(BLOGS_ROUTES.ROOT,getBlogListHandler )
    .get(BLOGS_ROUTES.BY_ID,getBlogHandler )
    .post(BLOGS_ROUTES.ROOT, createBlogHandler )
    .put(BLOGS_ROUTES.BY_ID, updateBlogHandler)
    .delete(BLOGS_ROUTES.BY_ID, deleteBlogHandler);

