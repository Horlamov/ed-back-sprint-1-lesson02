import {Router} from "express";
import {TEST_PATH} from "./testing.paths";
import {deleteTestingHandler} from "./delete-testing.handler.ts";

export const testingRouter = Router({});

testingRouter
    .get(TEST_PATH, deleteTestingHandler)