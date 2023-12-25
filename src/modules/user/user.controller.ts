import { Router, Request, Response } from "express";
import { createUser, getUsers } from "./user.service";
import * as core from "express-serve-static-core";
import { UserInsertDTO } from "./dtos/user-insert.dto";

const userRouter = Router();

const router = Router();

userRouter.use("/user", router);

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers();
  res.send(users);
});

router.post(
  "/",
  async (req: Request<core.ParamsDictionary, any, UserInsertDTO>, res: Response): Promise<void> => {
    const respCreate = await createUser(req.body);
    res.send(respCreate);
  },
);

router.get("/:name", (req, res) => {
  res.send(`Username is ${req.params.name}!`);
});

export default userRouter;
