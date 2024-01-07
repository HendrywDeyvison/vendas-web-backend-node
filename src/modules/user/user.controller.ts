import { Router, Request, Response } from "express";
import { createUser, getUser, getUsers } from "./user.service";
import * as core from "express-serve-static-core";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";
import { ReturnError } from "@exceptions/dtos/return-error.dto";

const userRouter = Router();

const router = Router();

userRouter.use("/user", router);

router.get("/", async (_, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(404).send(error.message);
    } else {
      new ReturnError(res, error);
    }
  });

  res.send(users);
});

router.post(
  "/",
  async (req: Request<core.ParamsDictionary, any, UserInsertDTO>, res: Response): Promise<void> => {
    const respCreate = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });

    res.send(respCreate);
  },
);

router.get("/id=:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await getUser(id).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
});

router.get("/name=:name", async (req, res) => {
  const name = req.params.name;
  const user = await getUser(undefined, name).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
});

router.get("/cpf_cnpj=:cpf_cnpj", async (req, res) => {
  const cpf_cnpj = req.params.cpf_cnpj;
  const user = await getUser(undefined, undefined, cpf_cnpj).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
});

export default userRouter;
