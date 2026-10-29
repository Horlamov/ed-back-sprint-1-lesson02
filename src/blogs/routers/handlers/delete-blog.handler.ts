import { Request, Response } from "express";
import {blogsRepository} from "../../../repositories/blog.repository.ts";
import {HttpStatus} from "../../../core/types/http-status.ts";

export const deleteBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = blogsRepository.delete(req.params.id)
    if (!isDeleted) {
        res.sendStatus(HttpStatus.NotFound_404);
        return;
    }
    res.sendStatus(HttpStatus.NoContent_204);
};