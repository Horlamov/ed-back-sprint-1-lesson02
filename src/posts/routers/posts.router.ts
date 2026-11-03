import { Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import {getPostsListHandler} from "./handlers/get-posts-list.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {getPostHandler} from "./handlers/get-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {superAdminGuardMiddleware} from "../../core/middlewares/auth.middleware";


export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTES.ROOT,getPostsListHandler )
    .post(POSTS_ROUTES.ROOT, superAdminGuardMiddleware, createPostHandler)
    .get(POSTS_ROUTES.BY_ID, superAdminGuardMiddleware, getPostHandler)
    .put(POSTS_ROUTES.BY_ID, updatePostHandler)
    .delete(POSTS_ROUTES.BY_ID, superAdminGuardMiddleware, deletePostHandler)

