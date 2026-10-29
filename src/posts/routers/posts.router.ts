import { Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import {getPostsListHandler} from "./handlers/get-posts-list.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {getPostHandler} from "./handlers/get-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";



export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTES.ROOT,getPostsListHandler )
    .post(POSTS_ROUTES.BY_ID, createPostHandler)
    .get(POSTS_ROUTES.BY_ID, getPostHandler)
    .put(POSTS_ROUTES.BY_ID, updatePostHandler)
    .delete(POSTS_ROUTES.BY_ID, deletePostHandler)

