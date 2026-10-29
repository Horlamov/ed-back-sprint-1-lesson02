import express, { Express, response } from "express";
import { db } from "./db/in-memory.db";
import { HttpStatus } from "./core/types/http-status";
import { blogsRepository } from "./repositories/blog.repository";
import { postsRepository } from "./repositories/posts.repository";
import { blogsRouter } from "./blogs/routers/blogs.router";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths";
import {POSTS_PATH} from "./posts/constants/posts.paths.ts";
import {postsRouter} from "./posts/routers/posts.router.ts";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.delete('/ht_02/api/testing/all-data', (_req, res) => {
    db.videos = [];
    db.blogs = [];
    db.posts = [];
    res.sendStatus(HttpStatus.NoContent_204);
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);


  return app;
};

