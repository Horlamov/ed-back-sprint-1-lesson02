import express, { Express, response } from "express";
import { db } from "./db/in-memory.db";
import { HttpStatus } from "./core/types/http-status";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { postsRouter } from "./posts/routers/posts.router";
import { BLOGS_PATH } from "./blogs/constants/blogs.paths";
import { POSTS_PATH } from "./posts/constants/posts.paths";
import { TEST_PATH } from "./testing/testing.paths"
import { testingRouter } from "./testing/router"

export const setupApp = (app: Express) => {
  app.use(express.json());


  app.use(TEST_PATH, testingRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);


  return app;
};

