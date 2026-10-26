import express, { Express, response } from "express";
import { db } from "./db/in-memory.db";
import { HttpStatus } from "./core/types/http-status";
import { Blog } from "./blogs/types/blog";
import { Post } from "./posts/types/post";
import { blogsRouter } from "./blogs/routers/blogs.router";
import {randomUUID} from "crypto";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get("/ht_02/api/blogs", (_req, res) => {
    if (db.blogs.length !== 0) {
      res.status(HttpStatus.Ok_200).send(db.blogs);
    } else {
      res.status(HttpStatus.NotFound_404).send("bye bye");
    }
  });

  app.post("/ht_02/api/blogs", (req, res) => {
    let errorsMessages: { message: string; field: string }[] = [];

    if (
      typeof req.body.name !== "string" ||
      req.body.name.trim( ).length === 0 ||
      req.body.name.length > 15
    ) {
      errorsMessages.push({ message: " name error", field: " name " });
    }

    if (
        typeof req.body.description !== "string" ||
        req.body.description.trim( ).length === 0 ||
        req.body.description > 500
    ) {
      errorsMessages.push({message: "error Description", field: "description"})
    }

    if (
        typeof req.body.websiteUrl !== "string" ||
        req.body.websiteUrl.trim( ).length === 0 ||
        req.body.websiteUrl > 100
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

    const newBlog: Blog  = {
      id: randomUUID(),
      name: req.body.name ?? "admin",
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
    }
    db.blogs.push(newBlog);
    res.status(HttpStatus.Ok_200).send(newBlog);
  });
  app.get('/ht_02/api/blogs/:id', (req, res)=>{
    const foundBlog = db.blogs.find((b) => b.id === req.params.id );
    if (!foundBlog) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
    res.status(HttpStatus.Ok_200).json(foundBlog);
  });
  app.put('/ht_02/api/blogs/:id', (req, res)=> {
    const foundBlog = db.blogs.find((d) => d.id === req.params.id);

    if (!foundBlog) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }

    let errorsMessages: {message: string, field: string}[] = [];

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

    if (
        typeof req.body.websiteUrl !== "string" ||
        req.body.websiteUrl.trim( ).length === 0 ||
        req.body.websiteUrl.length > 100
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

    foundBlog.name = req.body.name;
    foundBlog.description = req.body.description;
    foundBlog.websiteUrl = req.body.websiteUrl;
    res.sendStatus(HttpStatus.NoContent_204)

  });
  app.delete('/ht_02/api/blogs/:id', (req, res) => {
    const foundIndex = (db.blogs.findIndex((b) => b.id === req.params.id))
    if (foundIndex === -1) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
    db.blogs.splice(foundIndex, 1);
    res.sendStatus(HttpStatus.NoContent_204);
  });

  app.get("/ht_02/api/posts/", (_req, res) => {
    if(db.posts.length !== 0 ) {
      res.status(HttpStatus.Ok_200).send(db.posts);
    } else {
      res.status(HttpStatus.NotFound_404).send("Bye bye")
    }
  });

  app.post("/ht_02/api/posts/", (req, res) => {

  });



  app.get("/ht_02/api/posts/:id", (req, res) => {
    const foundPost = db.blogs.find((p)=> p.id === req.params.id)
    if (!foundPost)
    {
      res.status(HttpStatus.NotFound_404).send("Not Found");
      return;
    }
    res.status(HttpStatus.Ok_200).send(foundPost);
  });




  return app;
};

