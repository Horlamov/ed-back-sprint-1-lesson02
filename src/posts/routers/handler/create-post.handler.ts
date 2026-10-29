import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blog.repository";
import { HttpStatus } from "../../../core/types/http-status";
import { postsRepository } from "../../../repositories/posts.repository";

export const createPostHandler =  (req: Request, res: Response) => {

    const errorsMessages: {message: string, field: string}[] = [];

    if (typeof req.body.title !== "string" ||
        req.body.title.trim().length === 0 ||
        req.body.title.length > 30) {

        errorsMessages.push({message: "title error", field: "title"});
    }
    if (typeof req.body.shortDescription !== "string" ||
        req.body.shortDescription.trim().length === 0 ||
        req.body.shortDescription.length > 100) {

        errorsMessages.push({message: "shortDescription error", field: "shortDescription"});
    }
    if(typeof req.body.content !== "string" ||
        req.body.content.trim().length === 0 ||
        req.body.content.length > 1000) {

        errorsMessages.push({message: "content error", field:"content"});
    }

    if(typeof req.body.blogId !== "string") {
        errorsMessages.push({message: "blogId error", field:"blogId"});
    } else {
        const foundBlog = blogsRepository.findById(req.body.blogId);

        if (!foundBlog) {
            errorsMessages.push({message: "Blog not found", field:"blogId"});
        }
    }

    if (errorsMessages.length > 0) {
        res.status(HttpStatus.BadRequest_400).json({errorsMessages});
        return;
    }



    const newPost = postsRepository.create({

        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
    });

    res.status(HttpStatus.Created_201).send(newPost);
};