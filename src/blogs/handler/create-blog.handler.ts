import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blog.repository";
import { HttpStatus } from "../../core/types/http-status";
import { randomUUID } from "crypto";

export const createBlogHandler = (req: Request, res: Response) => {
  const { name, description, websiteUrl } = req.body;
  const createBlog = blogsRepository.create({
    name,
    description,
    websiteUrl,
  });

  res.status(HttpStatus.Created_201).send(createBlog);
};
