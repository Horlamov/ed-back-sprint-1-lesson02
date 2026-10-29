import { Request, Response } from "express";
import {db} from "../db/in-memory.db";
import {HttpStatus} from "../core/types/http-status";

export const deleteTestingHandler = (_req: Request, res: Response) => {
    db.videos = [];
    db.blogs = [];
    db.posts = [];
    res.sendStatus(HttpStatus.NoContent_204);
};