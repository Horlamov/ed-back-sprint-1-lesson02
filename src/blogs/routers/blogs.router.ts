import { Router } from "express";
import { createBlogHandler } from "../handler/create-blog.handler";

export const blogsRouter = Router({});

blogsRouter.post("/", createBlogHandler);
