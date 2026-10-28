import express, { Express, response } from "express";
import { db } from "./db/in-memory.db";
import { HttpStatus } from "./core/types/http-status";
import { blogsRepository } from "./repositories/blog.repository";
import { postsRepository } from "./repositories/posts.repository";
import { blogsRouter } from "./blogs/routers/blogs.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.delete('/ht_02/api/testing/all-data', (_req, res) => {
    db.videos = [];
    db.blogs = [];
    db.posts = [];
    res.sendStatus(HttpStatus.NoContent_204);
  });

  app.get("/ht_02/api/blogs", (_req, res) => {
    const blogs = blogsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(blogs);
  });

  app.post("/ht_02/api/blogs", (req, res) => {
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
  });

  app.get('/ht_02/api/blogs/:id', (req, res)=>{
    const foundBlog = blogsRepository.findById(req.params.id );
    if (!foundBlog) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
    res.status(HttpStatus.Ok_200).json(foundBlog);
  });

  app.put('/ht_02/api/blogs/:id', (req, res)=> {
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

  });

  app.delete('/ht_02/api/blogs/:id', (req, res) => {
    const isDeleted = blogsRepository.delete(req.params.id)
    if (!isDeleted) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
    res.sendStatus(HttpStatus.NoContent_204);
  });


  app.get("/ht_02/api/posts", (_req, res) => {
    const posts = postsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(posts);
  });

  app.post("/ht_02/api/posts", (req, res) => {

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
  });

  app.get("/ht_02/api/posts/:id", (req, res) => {
    const foundPost = postsRepository.findById(req.params.id)
    if (!foundPost)
    {
      res.status(HttpStatus.NotFound_404).send("Not Found");
      return;
    }
    res.status(HttpStatus.Ok_200).send(foundPost);
  });

  app.put("/ht_02/api/posts/:id", (req, res) => {
    const errorsMessages: {message: string, field: string}[] = [];

    if (typeof req.body.title !== "string" ||
        req.body.title.trim( ).length === 0 ||
        req.body.title.length > 30
    ) {
      errorsMessages.push({message: "title", field: "title"});
    }

    if (typeof req.body.shortDescription !== "string" ||
        req.body.shortDescription.trim( ).length === 0 ||
        req.body.shortDescription.length > 100
    ) {
      errorsMessages.push({message: "shortDescription", field: "shortDescription"});
    }

    if(typeof req.body.content !== "string" ||
        req.body.content.trim().length === 0 ||
        req.body.content.length > 1000
    ) {
      errorsMessages.push({message: "content", field:"content"});
    }

    if(typeof req.body.blogId !== "string") {
      errorsMessages.push({message: "blogId error", field: "blogId"});
    } else {
      const foundBlog = blogsRepository.findById(req.body.blogId);
      if (!foundBlog) {
        errorsMessages.push({message: "Blog not found", field: "blogId"});
      }
    }

    if (errorsMessages.length > 0) {
      res.status(HttpStatus.BadRequest_400).json({errorsMessages});
      return;
    }

    const isUpdate = postsRepository.update(req.params.id, {

      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
    });

    if (!isUpdate) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
    res.sendStatus(HttpStatus.NoContent_204);
  });

  app.delete('/ht_02/api/posts/:id', (req, res) => {
  const isDeleted = postsRepository.delete(req.params.id)
  if (!isDeleted) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }
  res.sendStatus(HttpStatus.NoContent_204);
});

  return app;
};

