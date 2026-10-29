import { Request, Response } from "express";
import {blogsRepository} from "../../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-status";

export const getBlogListHandler = (_req: Request, res: Response) => {
    const blogs = blogsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(blogs);
};