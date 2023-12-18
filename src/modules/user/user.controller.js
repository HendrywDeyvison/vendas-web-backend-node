import { Router } from "express";

const userRouter = Router();

const router = Router();

userRouter.use("/user", router);

router.get("/", (req, res) => {
  res.send("Hello World  USER!");
});

router.get("/:name", (req, res) => {
  res.send(`Username is ${req.params.name}!`);
});

export default userRouter;
