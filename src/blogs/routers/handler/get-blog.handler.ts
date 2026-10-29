import { Request, Response } from "express";
import {blogsRepository} from "../../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-status";

export const getBlogHandler = (req: Request <{id: string}>, res: Response)=>{
    const foundBlog = blogsRepository.findById(req.params.id );
    if (!foundBlog) {
        res.sendStatus(HttpStatus.NotFound_404);
        return;
    }
    res.status(HttpStatus.Ok_200).json(foundBlog);
};