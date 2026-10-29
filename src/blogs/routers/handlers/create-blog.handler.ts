import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blog.repository";
import { HttpStatus } from "../../../core/types/http-status";

export const createBlogHandler = (req: Request, res: Response) =>{
  let errorsMessages: { message: string; field: string }[] = [];

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
  if (typeof req.body.websiteUrl !== "string" ||
      req.body.websiteUrl.trim().length === 0 ||
      req.body.websiteUrl.length > 100 ||
      !urlRegex.test(req.body.websiteUrl)
  ) {

    errorsMessages.push({
      message: "error websiteUrl",
      field: "websiteUrl"})
  }

  if (
      errorsMessages.length > 0
  ) {
    res.status(HttpStatus.BadRequest_400).json({errorsMessages});
    return;
  }

  const newBlog = blogsRepository.create( {

    name: req.body.name ?? "admin",
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  });

  res.status(HttpStatus.Created_201).send(newBlog);
};