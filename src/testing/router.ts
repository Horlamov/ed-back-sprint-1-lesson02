import {Router} from "express";
import {TEST_PATH, TEST_ROUTES} from "./testing.paths";
import {deleteTestingHandler} from "./delete-testing.handler";

export const testingRouter = Router({});

testingRouter
    .delete(TEST_ROUTES.ALL_DATA, deleteTestingHandler)