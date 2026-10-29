import { Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import {getPostsListHandler} from "./handler/get-posts-list.handler";
import {createPostHandler} from "./handler/create-post.handler";
import {getPostHandler} from "./handler/get-post.handler";
import {updatePostHandler} from "./handler/update-post.handler";
import {deletePostHandler} from "./handler/delete-post.handler";



export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTES.ROOT,getPostsListHandler )
    .post(POSTS_ROUTES.BY_ID, createPostHandler)
    .get(POSTS_ROUTES.BY_ID, getPostHandler)
    .put(POSTS_ROUTES.BY_ID, updatePostHandler)
    .delete(POSTS_ROUTES.BY_ID, deletePostHandler)

