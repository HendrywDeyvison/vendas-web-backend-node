import { Router, Request, Response } from "express";
import { createUser, editPassword, getUser, getUsers } from "./user.service";
import * as core from "express-serve-static-core";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";
import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { authAdminMiddleware } from "@middlewares/auth-admin.middleware";
import { authMiddleware } from "@middlewares/auth.middleware";
import { UserEditPasswordDTO } from "./dtos/user-edit-password.dto";

const createUserController = async (
  req: Request<core.ParamsDictionary, any, UserInsertDTO>,
  res: Response,
): Promise<void> => {
  const respCreate = await createUser(req.body);

  res.send(respCreate);
};

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(404).send(error.message);
    } else {
      new ReturnError(res, error);
    }
  });

  res.send(users);
};

const getUserById = async (req: any, res: any): Promise<void> => {
  const id = parseInt(req.params.id);

  const user = await getUser(id);
  res.send(user);
};

const editPasswordController = async (
  req: Request<core.ParamsDictionary, undefined, UserEditPasswordDTO>,
  res: Response,
): Promise<void> => {
  const id = parseInt(req.params.id);

  const user = await editPassword(id, req.body).catch((error) => {
    return new ReturnError(res, error);
  });

  res.send(user);
};

const userRouter = Router();
const router = Router();

userRouter.use("/user", router);

router.post("/", createUserController);
router.use(authMiddleware);
router.patch("/id=:id", editPasswordController);
router.use(authAdminMiddleware);
router.get("/", getUsersController);
router.get("/id=:id", getUserById);

export default userRouter;
