import { Router } from "express";

export const productRouter = Router();

const router = Router();

productRouter.use("/product", router);

router.get("/", (req, res) => {
  res.send("Products");
});

router.get("/:product", (req, res) => {
  res.send(`Product is ${req.params.product}`);
});
