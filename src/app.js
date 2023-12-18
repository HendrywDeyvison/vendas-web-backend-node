import express from "express";
import { userRouter } from "./modules/user/user.controller.js";
import { productRouter } from "./modules/product/product.controller.js";

const app = express();

app.use(userRouter);
app.use(productRouter);

app.listen(8080, () => {
  console.log("Server app running on port 8080!");
});