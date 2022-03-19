import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/session", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get(
  "/user/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/user/compliments/received",
  ensureAuthenticated,
  listUserReceivedComplimentsController.handle
);
router.get(
  "/tags",
  ensureAuthenticated,
  listTagsController.handle
)
router.get(
  "/users",
  ensureAuthenticated,
  listUsersController.handle
)

export { router };