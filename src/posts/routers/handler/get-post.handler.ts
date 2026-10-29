import { Request, Response } from "express";
import { postsRepository } from "../../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-status";

export const getPostHandler = (req: Request <{id: string}>, res: Response) => {
    const foundPost = postsRepository.findById(req.params.id)
    if (!foundPost)
    {
        res.status(HttpStatus.NotFound_404).send("Not Found");
        return;
    }
    res.status(HttpStatus.Ok_200).send(foundPost);
};