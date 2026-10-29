import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-status.ts";
import {blogsRepository} from "../../../repositories/blog.repository.ts";

export const updateBlogHandler = (req: Request<{id: string}>, res: Response)=> {
    const errorsMessages: {message: string, field: string}[] = [];

    if (
        typeof req.body.name !== "string" ||
        req.body.name.trim( ).length === 0 ||
        req.body.name.length > 15
    ) {
        errorsMessages.push({ message: "name error", field: "name" });
    }

    if (
        typeof req.body.description !== "string" ||
        req.body.description.trim( ).length === 0 ||
        req.body.description.length > 500
    ) {
        errorsMessages.push({message: "error Description", field: "description"})
    }

    const urlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

    if (
        typeof req.body.websiteUrl !== "string" ||
        req.body.websiteUrl.trim().length === 0 ||
        req.body.websiteUrl.length > 100 ||
        !urlRegex.test(req.body.websiteUrl)
    ) {
        errorsMessages.push({
            message: "error websiteUrl",
            field: "websiteUrl"
        });
    }

    if (errorsMessages.length > 0) {
        res.status(HttpStatus.BadRequest_400).json({errorsMessages});
        return;
    }

    const isUpdate = blogsRepository.update(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    });

    if (!isUpdate) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);

};