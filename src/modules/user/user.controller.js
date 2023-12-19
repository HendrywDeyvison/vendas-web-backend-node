import { Router } from "express";
import { createUser, getUsers } from "./user.service.js";

const userRouter = Router();

const router = Router();

userRouter.use("/user", router);

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.post("/", async (req, res) => {
  const respCreate = await createUser(req.body);
  res.send(respCreate);
});

router.get("/:name", (req, res) => {
  res.send(`Username is ${req.params.name}!`);
});

export default userRouter;
