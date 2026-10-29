import {Request, Response} from "express";
import {postsRepository} from "../../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-status";

export const getPostsListHandler = (_req: Request, res: Response) => {
    const posts = postsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(posts);
};