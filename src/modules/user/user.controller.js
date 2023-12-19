import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();

const router = Router();

userRouter.use("/user", router);

router.get("/", async (req, res) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log(users);
  res.send(`teste`);
});

router.get("/:name", (req, res) => {
  res.send(`Username is ${req.params.name}!`);
});

export default userRouter;
