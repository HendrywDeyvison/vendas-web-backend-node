import { Router, Request, Response } from "express";
import { createUser, getUser, getUsers } from "./user.service";
import * as core from "express-serve-static-core";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";
import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { authMiddleware } from "@middlewares/auth.middleware";

const userRouter = Router();

const router = Router();

userRouter.use("/user", router);

router.post(
  "/",
  async (req: Request<core.ParamsDictionary, any, UserInsertDTO>, res: Response): Promise<void> => {
    const respCreate = await createUser(req.body);

    res.send(respCreate);
  },
);

router.use(authMiddleware);

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(404).send(error.message);
    } else {
      new ReturnError(res, error);
    }
  });

  res.send(users);
});

router.get("/id=:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await getUser(id);
  res.send(user);
});

router.get("/name=:name", async (req, res) => {
  const name = req.params.name;
  const user = await getUser(undefined, name);
  res.send(user);
});

router.get("/cpf_cnpj=:cpf_cnpj", async (req, res) => {
  const cpf_cnpj = req.params.cpf_cnpj;
  const user = await getUser(undefined, undefined, cpf_cnpj);
  res.send(user);
});

export default userRouter;
