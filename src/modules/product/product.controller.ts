import { Router, Request, Response } from "express";
import { ProductInsertDTO } from "./dtos/product-inser.dto";
import * as core from "express-serve-static-core";
import { authMiddleware } from "@middlewares/auth.middleware";

const getProductsController = async (_: any, res: Response): Promise<void> => {
  res.send("Products");
};

const getProductById = async (_: any, res: Response): Promise<void> => {
  res.send(`Product is}`);
};

const createProductController = async (
  req: Request<core.ParamsDictionary, any, ProductInsertDTO>,
  res: Response,
): Promise<void> => {
  // const respCreate = await createProduct(req.body);
  res.send("TESTE");
};

const productRouter = Router();

const router = Router();

productRouter.use("/product", router);
router.post("/", createProductController);
router.use(authMiddleware);
router.get("/", getProductsController);
router.get("/:product", getProductById);

export default productRouter;
