import { Router, Request, Response } from "express";
import { ProductInsertDTO } from "./dtos/product-inser.dto";
import * as core from "express-serve-static-core";

const productRouter = Router();

const router = Router();

productRouter.use("/product", router);

router.get("/", (_, res: Response): void => {
  res.send("Products");
});

router.get("/:product", (_, res: Response): void => {
  res.send(`Product is}`);
});

// router.post("/", async (req: Request<core.ParamsDictionary, any, ProductInsertDTO>, res: Response): Promise<void> => {
//   const respCreate = await createProduct(req.body);
//   res.send(respCreate);
// });

export default productRouter;
